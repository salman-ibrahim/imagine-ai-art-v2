import { Divider, Icon, Layout, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { convertStringToSlug } from '../../helpers/commonHelpers';
import { convertImageToBase64, downloadImageToDCIM, requestCameraRollPermission, shareImage } from '../../helpers/imageHelpers';
import { storeData } from '../../helpers/secureStore';
import { toastError, toastSuccess } from '../../helpers/toasts';
import store from '../../store';
import { saveGeneratedArtAction, saveGeneratedArtIdsAction } from '../../store/actions/artActions';
import artDB from '../../db/artDB';

import { strings } from '../../values/strings';
import { useInterstitialAd, useRewardedInterstitialAd } from 'react-native-google-mobile-ads';
import { defaults } from '../../values/defaults';
import { useIsFocused } from '@react-navigation/native';

const ArtActions = ({art}) => {

    const styles = useStyleSheet(themedStyles);

    const [saved, setSaved] = React.useState(false)
    const [lastAction, setLastAtion] = React.useState();

    const focused = useIsFocused();

    const {isLoaded, isClosed, load, show} = useInterstitialAd(defaults.interstitialAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    // useEffect(() => {
    //     if(focused && !isLoaded){
    //         load();
    //     }
    // }, [focused])

    useEffect(() => {
        // Start loading the interstitial straight away
        load();
    }, [load]);

    useEffect(() => {
        if (isClosed) {
            // Load another ad and perform action
            performArtAction();
            load();
        }
    }, [isClosed]);

    useEffect(() => {
        if(isLoaded){
            console.log('Interstitial Loaded');
        }
    }, [isLoaded])

    useEffect(() => {
        artDB.createTable()
        checkArtSavedStatus()
    }, [art.id])

    const checkArtSavedStatus = () => {
        let { savedArtIds } = store.getState().artReducer
        setSaved(savedArtIds.includes(art.id))
    }

    const handleAction = (actionName) => {

        if(isLoaded) {
            setLastAtion(actionName);
            show();
        }
        else {
            performArtAction(actionName);
        }
    }

    const performArtAction = (artAction = lastAction) => {
        switch (artAction) {
            case "save":
                handleLocalSave();
                break;
            case "download":
                downloadImage()
                break;
            case "share":
                handleShareImage();
                break;
            default:
                toastError("Something went wrong! Try Again!");
                break;
        }
    }

    const handleLocalSave = () => {
        const {id } = art
        const { savedArtIds } = store.getState().artReducer
        if(savedArtIds.includes(id)) {
            handleUnsaveSavedImage(savedArtIds, id)
        }
        else {
            handleSaveNewImage(savedArtIds, id)
        }
    }

    const handleUnsaveSavedImage = (savedArtIds, targetId) => {
        let newSavedArtIds = savedArtIds.filter((artId) => artId !== targetId)
        let newSavedArt = store.getState().artReducer.savedArt.filter((art) => art.id !== targetId)

        store.dispatch(saveGeneratedArtIdsAction(newSavedArtIds))
        store.dispatch(saveGeneratedArtAction(newSavedArt))

        artDB.deleteImage(targetId)
        setSaved(false)
    }

    const handleSaveNewImage = (savedArtIds, targetId) => {
        const {id, image, query, source} = art

        let newSavedArtIds = [...savedArtIds, targetId]
        let newSavedArt = [...store.getState().artReducer.savedArt, art]

        store.dispatch(saveGeneratedArtIdsAction(newSavedArtIds))
        store.dispatch(saveGeneratedArtAction(newSavedArt))

        artDB.insertImage(id, query, image, source)
        setSaved(true)
    }

    const downloadImage = () => {
        try {
            requestCameraRollPermission()
                .then( async (permissionGranted) => {
                    if(permissionGranted) {
                        const { image, query, source } = art
                        const imageName = await convertStringToSlug(query)
                        downloadImageToDCIM(image, imageName, source)
                        toastSuccess("Image Downloaded")
                    }
                })
                .catch((error) => {
                    console.log("Error requesting camera roll permission: ", error);
                    toastError("Camera Roll premission is required to download images")
                })
        } 
        catch (error) {
            console.log("Error downloading image: ", error);
            toastError("Error downloading image")
        }
    }

    const handleShareImage = async () => {
        try {
            const { image, id, query, source } = art
            shareImage(image, query, strings.shareMessage)
        } catch (error) {
            toastError("Error sharing image")
        }
    }

    return (
        <View style={styles.container}>
            <View horizontal style={styles.actionsContainer}>
                <TouchableOpacity style={styles.singleAction} onPress={handleLocalSave}>
                    <View style={styles.alignCenter}>
                        <Icon fill='orange' height={20} width={20} name={ saved ? 'bookmark' : 'bookmark-outline'}/>
                        <Text> { saved ? 'Unsave' : 'Save' }</Text>
                    </View>
                </TouchableOpacity>
                
                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.singleAction} onPress={() => handleAction('download')}>
                    <View style={styles.alignCenter}>
                        <Icon fill='orange' height={20} width={20} name='download-outline'/>
                        <Text>Download</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.singleAction} onPress={() => handleAction('share')}>
                    <View style={styles.alignCenter}>
                        <Icon fill='orange' height={20} width={20} name='share-outline'/>
                        <Text>Share</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ArtActions;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'color-basic-1100',
        shadowOpacity: 0.1,
        elevation: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    singleAction: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        marginVertical:10
    },
    dividerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 'auto',
        width: 1,
        backgroundColor: 'border-basic-color-3',
    },    
    textDark: {
        color: 'color-basic-900',
    },
    alignCenter: {
        alignItems:'center'
    }
});
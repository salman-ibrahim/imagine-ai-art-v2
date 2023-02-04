import { Divider, Icon, Layout, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { convertStringToSlug } from '../../helpers/commonHelpers';
import { convertImageToBase64, downloadImageToDCIM, shareImage, requestCameraRollPermission } from '../../helpers/imageHelpers';
import { storeData } from '../../helpers/secureStore';
import { toastError } from '../../helpers/toasts';
import store from '../../store';
import { saveGeneratedArtActions } from '../../store/actions/artActions';

import { strings } from '../../values/strings';

const ArtActions = ({art}) => {

    const styles = useStyleSheet(themedStyles);

    const [saved, setSaved] = React.useState(false)

    useEffect(() => {
        let savedArt = store.getState().artReducer.savedArt
        let isSaved = savedArt.some((art) => art.id == id)
        if(isSaved) {
            setSaved(true)
        }
    }, [])

    const handleLocalSave = () => {
        const {id, image, query} = art
        let savedArt = store.getState().artReducer.savedArt
        let newSavedArt = [...savedArt, {id, image, query}]
        store.dispatch(saveGeneratedArtActions(newSavedArt))
        storeData('savedArt', JSON.stringify(newSavedArt))
        setSaved(true)
    }

    const handleUnsaveSavedImage = () => {
        const {id} = art
        let savedArt = store.getState().artReducer.savedArt
        let newSavedArt = savedArt.filter((art) => art.id !== id)
        store.dispatch(saveGeneratedArtActions(newSavedArt))
        storeData('savedArt', JSON.stringify(newSavedArt))
        setSaved(false)
    }

    const downloadImage = async () => {
        try {
            const permissionGranted = await requestCameraRollPermission()
        
            if (!permissionGranted) {
              toastError("Permission to access camera roll was denied");
              return;
            }
            else {
                const imageName = convertStringToSlug(query)
                await downloadImageToDCIM(image, imageName)
                toastSuccess("Image Downloaded")
            }
        } catch (error) {
            toastError("Error downloading image")
        }
    }

    const handleShareImage = async () => {
        try {
            shareImage(art.image, strings.shareMessage)
        } catch (error) {
            toastError("Error sharing image")
        }
    }

    return (
        <View style={styles.container}>
            <View horizontal style={styles.statsContainer}>
                <TouchableOpacity style={styles.singleStat} onPress={saved ? handleUnsaveSavedImage : handleLocalSave}>
                <View>
                    <Icon fill='orange' height={20} width={20} name={ saved ? 'bookmark' : 'bookmark-outline'}/>
                </View>
                </TouchableOpacity>
                
                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.singleStat} onPress={downloadImage}>
                    <View >
                        <Icon fill='orange' height={20} width={20} name='download-outline'/>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.singleStat} onPress={handleShareImage}>
                    <View >
                        <Icon fill='orange' height={20} width={20} name='share-outline'/>
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
        // marginBottom: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'color-basic-1100',
        shadowOpacity: 0.1,
        elevation: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    singleStat: {
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
});
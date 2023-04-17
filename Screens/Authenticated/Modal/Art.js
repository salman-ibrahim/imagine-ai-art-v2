import { View } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Icon, Spinner, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components'
import { useFocusEffect } from '@react-navigation/native'
import { toastError, toastSuccess } from '../../../helpers/toasts'
import ArtActions from '../../../components/Art/ArtActions'
import artService from '../../../services/ArtService'
import { convertImageToBase64 } from '../../../helpers/imageHelpers'
import Base64Image from '../../../components/subcomponents/Base64Image'
import { refundArtworkPriceToWallet } from '../../../helpers/walletHelpers'
import { BannerAd, BannerAdSize, useInterstitialAd } from 'react-native-google-mobile-ads'
import { defaults } from '../../../values/defaults'

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

const CrossIcon = (props) => (
    <Icon {...props} name='close-circle-outline' />
)

/**
 * Screen to display the generated art
 * @param {Object} navigation - React native navigation object
 * @param {Object} route - React native route object to fetch passed params
 * @returns Generate Art Screen
 */
const Art = ({ navigation, route }) => {

    const { isLoaded, isClosed, load, show } = useInterstitialAd(defaults.interstitialAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start loading the interstitial straight away
        load();
    }, [load]);

    useEffect(() => {
        if (isClosed) {
            // Action after the ad is closed
            navigateBack();
        }
    }, [isClosed, navigation]);

    const { id, query, image, source, status, isExplicit } = route.params

    const styles = useStyleSheet(themedStyles);
    
    const [art, setArt] = React.useState({})
    const [artStatus, setArtStatus] = React.useState(status)
    const [loading, setLoading] = React.useState(status == "starting")
    const [intervalId, setIntervalId] = React.useState(null)


    /**
     * Initialize states that identify if the art is being generated or previous art is being fetched
     */
    useFocusEffect(
        React.useCallback(() => {
            iniStates()

            if(status == 'starting' || status == 'processing') {
                setLoading(true)
                setArtStatus(status)
            }
        }, [id])
    );


    /**
     * Start polling for art status if this is a new art generation
     */
    useEffect(() => {
        if(status == 'starting' || status == 'processing') {
            const interval = setInterval(() => {
                if(artStatus == 'starting' || artStatus == 'processing') {
                    callFetchApi()
                }
            } , 5000)

            setIntervalId(interval)
        }

    }, [artStatus])


    /**
     * Clear interval when art is generated or failed so the polling stops
     */
    useEffect(() => {
        if(artStatus == 'succeeded' || artStatus == 'failed') {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [artStatus])

    /**
     * Call the fetch API to get the art status
     */
    const callFetchApi = () => {
        
        if(!loading){
            setLoading(true)
        }
        
        artService.fetchArt(id)
            .then( async (response) => {
                console.log("RESULT",response.status);
                setArtStatus(response.status)
                if(response.status == 'succeeded') {
                    const base64Image = await convertImageToBase64(response.output[0])
                    setArt({
                        id: response.id,
                        query: response.input.prompt,
                        image: base64Image,
                        source: response.output[0]
                    })
                    setLoading(false)
                    toastSuccess('Art generated successfully');
                }
                if(response.status == 'failed') {
                    toastError('Something went wrong, please try again later');
                    navigateBack()
                }
            }).catch((err) => {
                toastError('Something went wrong, please try again later');
                setArtStatus('failed')
                if(!isExplicit){
                    refundArtworkPriceToWallet()
                }
                navigateBack()
            })
    }

    /**
     * Initialize states
     */
    const iniStates = () => {
        if(id != art.id) {
            setArt({
                id: id,
                query: query,
                image: image,
                source: source
            })
            setArtStatus(status)
        }
        if(image != null) {
            setLoading(false)
        }
    }

    /**
     * Reset states
     */
    const resetStates = () => {
        setArt({})
        setArtStatus('succeeded')
        setLoading(true)
    }

    /**
     * Navigate back to the previous screen
     */
    const navigateBack = () => {
        navigation.goBack()
    }
    
    /**
     * Renders back button on top navigation
     * @returns Back button
     */
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={isLoaded ? show : navigateBack}/>
    )
        
    /**
     * Handle cancel button click to stop the art generation
     */
    const handleCancel = () => {
        // Cancel the art generation
    }

    return (
        <>
            <TopNavigation title="Result" alignment="center" accessoryLeft={BackAction}/>

            <View style={styles.container}>
                <Text category="h5">{ art.query }</Text>
                <View style={styles.artContainer}>
                    {
                        loading ? 
                        <>
                            <Spinner size='giant' />
                            <Text>Generating your art, this may take upto 15 seconds.</Text>
                        </>
                        :
                        <Base64Image image={art.image} style={styles.art}/>
                    }
                </View>
                {
                    loading ?
                    <>
                        <View style={styles.bannerContainer}>
                            <BannerAd unitId={defaults.bannerAdUnitId} size={BannerAdSize.BANNER} />
                        </View>
                        {/* <Button style={styles.button} onPress={handleCancel} status='danger' accessoryLeft={ CrossIcon }> Cancel </Button>
                        <Text style={styles.text}>Cancelling the art in progress may cost you.</Text> */}
                    </>
                    :
                    <ArtActions art={art} />
                }
            </View>
        </>
    )
}

export default Art

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'background-basic-color-2',
        borderTopRightRadius:25,
        borderTopLeftRadius:25
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },  
    artContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    art: {
        borderRadius:20,
        width: '100%',
        aspectRatio:1,
        resizeMode: 'contain'
    },
    button: {
        marginTop: 20,
        borderRadius:10
    },
    text: {
        marginTop: 10,
        textAlign: 'center'
    }
})
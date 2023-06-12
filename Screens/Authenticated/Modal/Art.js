import { BackHandler, View } from 'react-native'
import React, { useEffect } from 'react'
import { Icon, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components'
import { useFocusEffect } from '@react-navigation/native'
import ArtActions from '../../../components/Art/ArtActions'
import Base64Image from '../../../components/subcomponents/Base64Image'
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


    // The code below belongs to AdMob
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

    // The code above belongs to AdMob

    const { id, query, image } = route.params

    const styles = useStyleSheet(themedStyles);
    
    const [art, setArt] = React.useState({})

    // [DEPRECATED] - in favor of art actions
    /**
     * Add a back press handler to make sure user sees an ad before going back
     */
    // useEffect(() => {
    //     const backAction = () => {
    //         if(isLoaded) {
    //             show()
    //         } else {
    //             navigateBack()
    //         }
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
            
    //     backHandler.remove();
    // }, []);

    /**
     * Initialize states that identify if the art is being generated or previous art is being fetched
     */
    useFocusEffect(
        React.useCallback(() => {
            iniStates()
        }, [id])
    );

    /**
     * Initialize states
     */
    const iniStates = () => {
        if(id != art.id) {
            setArt({
                id: id,
                query: query,
                image: image,
            })
        }
    }

    /**
     * Reset states
     */
    const resetStates = () => {
        setArt({})
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

    return (
        <>
            <TopNavigation title="Result" alignment="center" accessoryLeft={BackAction}/>

            <View style={styles.container}>
                <Text category="h5">{ query }</Text>

                    <View style={styles.artContainer}>
                        <Base64Image image={image} style={styles.art}/>
                    </View>

                {/* Show the banner everytime art is viewed */}
                <View style={styles.bannerContainer}>
                    <BannerAd unitId={defaults.bannerAdUnitId} size={BannerAdSize.BANNER} />
                </View>
                <ArtActions art={art} />
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
        marginVertical: 10
    },  
    artView: {
        flexGrow: 1
    },
    artContainer: {
        flex: 1,
        margin: 'auto',
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
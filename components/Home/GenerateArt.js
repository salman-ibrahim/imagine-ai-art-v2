import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Icon, Input, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { deductArtworkPriceFromWallet } from '../../helpers/walletHelpers';
import { toastError, toastInfo } from '../../helpers/toasts';
import artService from '../../services/ArtService';
import store from '../../store';
import { defaults } from '../../values/defaults';
import { useSelector } from 'react-redux';
import { nsfw } from '../../values/dictionary';
import { RewardedAd, RewardedAdEventType, useRewardedAd } from 'react-native-google-mobile-ads';


const rewarded = RewardedAd.createForAdRequest(defaults.rewardedAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
});

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

const checkIcon = (props) => (
    <Icon {...props} name='checkmark-outline'/>
);

const arrowRightIcon = (props) => (
    <Icon {...props} name='arrow-circle-right-outline'/>
);

const videoClipIcon = (props) => (
    <Icon {...props} name='video-outline' ></Icon>
)

const GenerateArt = () => {

    const styles = useStyleSheet(themedStyles);
    const navigator = useNavigation();

    const wallet = useSelector(state => state.userReducer.wallet);
    const adsReadyToLoad = useSelector(state => state.interfaceReducer.adsReadyToLoad)
    const artCost = defaults.artCost;
    
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});
    const [adLoaded, setAdLoaded] = React.useState(false);
    const [isExplicit, setIsExplicit] = React.useState(false);

    const { isLoaded, isClosed, isEarnedReward , load, show, reward } = useRewardedAd(defaults.rewardedAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start Loading Right 
        if(adsReadyToLoad){
            load()
        }
    },[load, adsReadyToLoad])

    useEffect(() => {
        if(isClosed) {
            // Perform action if the advert is closed
            load()
        }
    }, [isClosed])

    useEffect(() => {
        if(isEarnedReward){
            // Perform action intended for rewarded ad completion
            claimReward()
            load()
        }
    },[isEarnedReward])

    useEffect(() => {
        if(isLoaded){
            console.log("Rewarded Advert Loaded for Free Art");
        }
    }, [isLoaded])

    const multilineInputState = useInputState();

    useEffect( () => {        
        if(nsfw.some(word => multilineInputState.value.toLowerCase().includes(word))){
            setIsExplicit(true);
        }
        else if (isExplicit){
            setIsExplicit(false)
        }
    },[multilineInputState.value])

    const claimReward = () => {
        handleGenerateArtByVideo();
        setTimeout(() => {
            rewarded.load();
        }, 3000);
    }

    const startAdToClaimFreeArt = () => {
        if(multilineInputState.value.trim() == "") {
            toastInfo('Please enter some text, before watching video');
        }
        else if(isLoaded) {
            show();
        }
        else {
            toastInfo('Advert Not Loaded Yet, Try Again!');
            load();
        }
    }

    const handleGenerateArtByVideo = () => {
        if(!loading) {
            if(multilineInputState.value.trim() !== "") {
                setLoading(true)
                toastInfo('Generating Art');
                artService.placeArtJob(multilineInputState.value).then((response) => {
                    setData(response);
                    setLoading(false);

                    navigator.navigate('ArtModal', { id: response.id, query: response.input.prompt, image: null, source: null, status: 'starting', isExplicit: isExplicit });

                }).catch((err) => {
                    setLoading(false);
                    console.log(err);
                    if(isExplicit){
                        toastError('NSFW Content Found, Art Generation Failed');
                    }
                    else {
                        toastError('Something went wrong');
                    }
                })
            }
            else {
                toastInfo('Please enter some text');
            }
        } 
    }

    const handleGenerateArt = () => {
        // const wallet = store.getState().userReducer.wallet;
        // const artCost = defaults.artCost;

        if(wallet < artCost) {
            toastInfo('You do not have enough balance to generate art', 'Oops!');
            return;
        }

        if(!loading) {
            if(multilineInputState.value.trim() !== "") {
                setLoading(true)
                toastInfo('Generating Art');
                artService.placeArtJob(multilineInputState.value).then((response) => {
                    setData(response);
                    setLoading(false);
                    deductArtworkPriceFromWallet()
                    navigator.navigate('ArtModal', { id: response.id, query: response.input.prompt, image: null, source: null, status: 'starting' });

                }).catch((err) => {
                    setLoading(false);
                    console.log(err);
                    if(isExplicit){
                        toastError('NSFW Content Found');
                    }
                    else {
                        toastError('Something went wrong');
                    }
                })
            }
            else {
                toastInfo('Please enter some text');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text category='h4' style={styles.heading}>What are your Imaginations?</Text>
            <View horizontal style={styles.pointsContainer}>
                <Input
                    multiline={true}
                    style={styles.input}
                    textStyle={{ maxHeight: 70, minHeight: 30 }}
                    placeholder='Astronaut Riding Horse on Mars'
                    {...multilineInputState}
                />
                { isExplicit && <Text status={'warning'} style={styles.infoText}>Explicit prompts may lead to failure, and you may lose brushes.</Text> }
            </View>

            {
                wallet < artCost ? 
                (
                    <Button style={loading? styles.buttonDisabled : styles.buttonVideo} onPress={startAdToClaimFreeArt} accessoryRight={ loading ? '' : videoClipIcon}> { !adsReadyToLoad ? <Spinner /> : 'Watch Video to Generate' }</Button>     
                ) : (
                    <Button style={loading? styles.buttonDisabled : styles.button} onPress={handleGenerateArt} accessoryRight={ loading ? '' : arrowRightIcon}> { loading ? <Spinner /> : 'Generate Art' }</Button>
                )
            }
        </View>
    )
}

export default GenerateArt;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: 'color-basic-1100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        elevation: 1,
        marginBottom: 20,
    },
    pointsContainer: {
        
    },
    dayContainer: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    pointsCircle: {
        backgroundColor: 'background-basic-color-4',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedPointCircle: {
        backgroundColor: 'color-success-500',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dividerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 20,
        backgroundColor: 'text-basic-color'
    },    
    button: {
        marginTop: 20,
        borderRadius:10
    },
    buttonDisabled: {
        marginTop: 20,
        borderRadius:10,
        backgroundColor: 'color-basic-600',
        borderColor: 'color-basic-600'
    },
    buttonVideo: {
        marginTop: 20,
        borderRadius:10,
        backgroundColor:'color-success-600',
        borderColor: 'color-success-600'
    },
    tintColor: {
        tintColor: 'text-basic-color'
    },
    heading: {
        marginVertical: 16,
    },
    input: {
        borderRadius:10
    },
    infoText: {
        fontSize:10,
        marginLeft:5,
        marginTop:5
    }
});
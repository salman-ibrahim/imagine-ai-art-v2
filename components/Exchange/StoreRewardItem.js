import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Icon, ListItem, StyleService, useStyleSheet } from '@ui-kitten/components'
import { completePurchase } from '../../helpers/walletHelpers';
import {RewardedAd, RewardedAdEventType, TestIds} from 'react-native-google-mobile-ads';
import { defaults } from '../../values/defaults';
import { toastInfo } from '../../helpers/toasts';
import { getData, storeData } from '../../helpers/secureStore';
import { addOneDayToExistingDate, fetchCurrentTimeOnline, getTimeForTomorrowStartOfDayOnline, verifyIfTwentyFourHoursHavePassed } from '../../helpers/commonHelpers';
import useCountdown from '../../customHooks/useCountdown';
import { setRewardClaimAvailabilityAction } from '../../store/actions/artActions';
import { connect } from 'react-redux';
import store from '../../store';

const rewarded = RewardedAd.createForAdRequest(defaults.rewsardedAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
});

const renderVideoIcon = (props) => (
    <Icon {...props} name='video-outline' />
)

const StoreRewardItem = ({item, rewardClaimAvailable}) => {

    const styles = useStyleSheet(themedStyles);

    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        if(item.cost == 'ad') {
            const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
                console.log('Rewarded advert loaded');
                setLoaded(true);
            });
            const unsubscribeEarned = rewarded.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                reward => {
                    console.log('User earned reward of ', reward.amount);
                    claimReward(reward.amount)
                },
            );

            // Start loading the rewarded ad straight away
            rewarded.load();

            // Unsubscribe from events on unmount
            return () => {
                unsubscribeLoaded();
                unsubscribeEarned();
            };
        }
        else if(item.cost == 'free') {
            getData('lastFreeClaim').then((lastFreeClaim) => {
                if(lastFreeClaim == undefined) {
                    console.log(rewardClaimAvailable);
                    store.dispatch(setRewardClaimAvailabilityAction(true))
                }
            })
        }
    }, [item.cost]);

    const renderActionButton = () => (
        item.cost === 'free' ?
        <Button style={styles.button} onPress={rewardClaimAvailable ? claimReward : null}>{rewardClaimAvailable ? "CLAIM" : 'countdown'}</Button>
        :
        <Button style={styles.button} disabled={!loaded} onPress={showRewardedAd} accessoryRight={renderVideoIcon}></Button>
    )

    const claimReward = (amount) => {
        if(item.cost == 'ad') {
            setLoaded(false)
            completePurchase(amount)
            setTimeout(() => {
                rewarded.load();
            }, 3000);
        }
        else {
            getData('lastFreeClaim').then((lastFreeClaim) => {
                if(lastFreeClaim != undefined) {
                    if(verifyIfTwentyFourHoursHavePassed(lastFreeClaim)) {
                        fetchCurrentTimeOnline().then((currentTime) => {
                            store.dispatch(setRewardClaimAvailabilityAction(true))
                            storeData('lastFreeClaim', currentTime)
                            completePurchase(item.value)
                        })
                    }
                    else {
                        toastInfo('You can claim your reward once a day.', 'Please Wait')
                    }
                }
                else {
                    fetchCurrentTimeOnline().then((currentTime) => {
                        store.dispatch(setRewardClaimAvailabilityAction(true))
                        storeData('lastFreeClaim', currentTime)
                        completePurchase(item.value)
                    })
                }
            })
        }
    }

    const showRewardedAd = () => {
        if(loaded){
            rewarded.show();
        }
        else {
            toastInfo('Ad is not loaded yet.', 'Please Wait')
        }
    }

    return (
        <ListItem
            style={styles.item}
            title={item.title}
            description={item.description}
            accessoryRight={renderActionButton}
        />
    )
}

const mapStateToProps = (state) => ({ rewardClaimAvailable: state.userReducer.rewardClaimAvailable })
export default connect(mapStateToProps, null) (StoreRewardItem)

const themedStyles = StyleService.create({
    item: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        marginVertical: 4,
        paddingHorizontal: 16,
        overflow:'hidden'
    },
    button: {
        borderRadius:10,
        width:'25%'
    }
})
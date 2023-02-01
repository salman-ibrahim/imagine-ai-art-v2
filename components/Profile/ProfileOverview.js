import { Divider, Icon, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { View } from 'react-native';

const ProfileOverview = () => {

    const styles = useStyleSheet(themedStyles);
    
    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={styles.container}>
            {/* <Text category='h4'>Overview</Text> */}
            <View horizontal style={styles.statsContainer}>
                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='credit-card-outline'/>
                    <Text>Balance</Text>
                    <Text>250</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='clipboard-outline'/>
                    <Text>Invites</Text>
                    <Text>12</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='award-outline'/>
                    <Text>Rewards</Text>
                    <Text>2</Text>
                </View>

            </View>
        </View>
    )
}

export default ProfileOverview;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
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
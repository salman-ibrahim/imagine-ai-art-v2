import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, ListItem, StyleService, useStyleSheet } from '@ui-kitten/components'
import { completePurchase } from '../../helpers/walletHelpers';

const StoreRewardItem = ({item}) => {

    const styles = useStyleSheet(themedStyles);

    const renderActionButton = () => (
        <Button style={styles.button} onPress={claimReward}>{item.cost.toUpperCase()}</Button>
    )

    const claimReward = () => {
        completePurchase(item.value)
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

export default StoreRewardItem

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
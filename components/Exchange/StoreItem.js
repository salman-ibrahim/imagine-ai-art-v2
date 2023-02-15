import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, ListItem, StyleService, useStyleSheet } from '@ui-kitten/components'
import { completePurchase } from '../../helpers/walletHelpers';
import { purchaseBrushes } from '../../helpers/IAPHelper';
import { toastError } from '../../helpers/toasts';

const StoreItem = ({item}) => {

    const styles = useStyleSheet(themedStyles);
    
    const renderActionButton = () => (
        <Button style={styles.button} onPress={makePurchase}>{item.cost}</Button>
    )

    const makePurchase = () => {
        const identifier = item.package.product.identifier;
        purchaseBrushes(item.package)
            .then((purchase) => {
                if(purchase == identifier) {
                    completePurchase(item.value)
                }
                else {
                    toastError("Purchase failed.")
                }
            })
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

export default StoreItem

const themedStyles = StyleService.create({
    item: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        marginVertical: 4,
        paddingHorizontal: 12,
        overflow:'hidden'
    },
    button: {
        borderRadius:10,
        minWidth:'25%'
    }
})
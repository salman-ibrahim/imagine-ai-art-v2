import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Icon, ListItem, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { completePurchase } from '../../helpers/walletHelpers';
import { purchaseBrushes } from '../../helpers/IAPHelper';
import { toastError } from '../../helpers/toasts';

const StoreItem = ({item, lastItem}) => {

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
            lastItem ? 
            <View style={styles.badge}>
                <Text>BEST VALUE</Text>
                <ListItem
                    style={styles.lastItem}
                    title={item.title}
                    description={item.description}
                    accessoryRight={renderActionButton}
                />
            </View>
            :
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
        marginBottom: 8,
        paddingHorizontal: 12,
        overflow:'hidden',
    },
    lastItem: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        paddingHorizontal: 12,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: 'color-warning-600',
        marginTop: 2,
    },
    badge: {
        backgroundColor: 'color-warning-600',
        borderRadius: 16,
        alignItems:'center',
        paddingTop: 2,
    },
    button: {
        borderRadius:10,
        minWidth:'25%'
    }
})
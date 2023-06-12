import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Layout, List, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components'
import StoreRewardItem from './StoreRewardItem';
import StoreItem from './StoreItem';
import { useEffect } from 'react';

const StoreList = (props) => {

    const { paidItems, paidItemsLoading } = props

    const styles = useStyleSheet(themedStyles);
    const [storeItems, setStoreItems ] = React.useState(freeStoreItems);

    useEffect(() => {
        setStoreItems([...freeStoreItems, ...paidItems])
    },[paidItems.length])
    return (
        <>
        <List 
            data={storeItems}
            renderItem={({ item, index}) => {
                return (
                    item.type === 'reward' ? 
                    (
                        <StoreRewardItem item={item} key={item.id} />
                    )
                    :
                    (
                        <StoreItem item={item} key={item.id} lastItem={storeItems.length == (index+1)} />
                    )
                )
            }}

            />
            {
                paidItemsLoading &&
                <List 
                    data={[1]}
                    renderItem={() => (
                        <View style={styles.spinnerContainer}>
                            <Spinner />
                        </View>
                    )}
                />
            }
        </>
    )
}

export default StoreList

const themedStyles = StyleService.create({
    container: {
        flex: 1,
    },
    spinnerContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius:25
    },
    spinner: {
        alignSelf: 'center',
    }
})

/**
 * type = reward & cost = free (is free item)
 * type = purchase & cost is for paid item
 * type - 
 */
const freeStoreItems = [
    // {
    //     id: 1,
    //     title: "Daily Bonus",
    //     type: 'reward',
    //     value: 2,
    //     description: '2 Free Brush',
    //     cost: 'free',
    // },
    // {
    //     id: 3,
    //     title: "Test Pack",
    //     type: 'purchase',
    //     value: 50,
    //     description: '50 Brushes',
    //     cost: 0.99,
    // },
    // {
    //     id: 4,
    //     title: "Sack of Brushes",
    //     type: 'purchase',
    //     value: 100,
    //     description: '100 Brushes',
    //     cost: 1.49,
    // },
    // {
    //     id: 5,
    //     title: "Bag of Brushes",
    //     type: 'purchase',
    //     value: 200,
    //     description: '200 Brushes',
    //     cost: 2.99,
    // },
    {
        id: 6,
        title: "Watch Ad to Get Free Brushes",
        type: 'reward',
        value: 0,
        description: 'Upto 5 Free Brush',
        cost: 'ad',
    },
]
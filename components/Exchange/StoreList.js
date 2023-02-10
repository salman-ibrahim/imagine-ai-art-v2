import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Layout, List, StyleService, useStyleSheet } from '@ui-kitten/components'
import StoreRewardItem from './StoreRewardItem';
import StoreItem from './StoreItem';

const StoreList = () => {

    const styles = useStyleSheet(themedStyles);

    return (
        <Layout>
        <List 
            data={storeItems}
            renderItem={({ item }) => {
                return (
                    item.type === 'reward' ? 
                    (
                        <StoreRewardItem item={item} />
                    )
                    :
                    (
                        <StoreItem item={item} />
                    )
                )
            }}
        />
        </Layout>
    )
}

export default StoreList

const themedStyles = StyleService.create({

})

const storeItems = [
    {
        id: 1,
        title: "Daily Bonus",
        type: 'reward',
        value: 1,
        description: '1 Free Brush',
        cost: 'free',
    },
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
        title: "Watch Ad to Get 1 Free Brush",
        type: 'reward',
        value: 1,
        description: '1 Free Brush',
        cost: 'ad',
    },
]
import { Button, Divider, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { FlatList, ScrollView, View } from 'react-native';
import SingleItem from '../subcomponents/SingleItem';

const SavedArt = () => {

    const styles = useStyleSheet(themedStyles);
    
    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={styles.container}>
            <Text category='h4'>Saved Art</Text>
            <FlatList
                numColumns={2}
                data={items}
                ItemSeparatorComponent={() => <View style={{margin: 5}}/>}
                renderItem={
                    ({item}) => 
                        <View style={styles.gridItem}>
                            <SingleItem item={item}/>
                        </View>
                    }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default SavedArt;

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
    },
    gridItem: {
        flex: 1,
    }
});

const items = [
    {
        id: 1,
        query: 'iPhone 12 Pro Max',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204',
    },
    {
        id: 2,
        query: 'Samsung Galaxy S21 Ultra',
        price: 999,
        image: 'https://www.pakmobizone.pk/wp-content/uploads/2022/01/Samsung-Galaxy-S21-FE-5G-Graphite-8.jpg',
    },
    {
        id: 3,
        query: 'Apple AirPods Pro 2nd Gen',
        price: 999,
        image: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg',
    },
    {
        id: 4,
        query: 'Apple Watch Series 6',
        price: 999,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/FQKW2?wid=1673&hei=1353&fmt=jpeg&qlt=95&.v=1517334319257',
    }
]
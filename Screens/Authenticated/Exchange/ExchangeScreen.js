import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Icon, Layout, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import StoreList from '../../../components/Exchange/StoreList';
import { getProducts } from '../../../helpers/IAPHelper';
import { useEffect } from 'react';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const ExchangeScreen = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

    const [storeItems, setStoreItems ] = React.useState([]);
    const [loading, setLoading ] = React.useState(true)
    useEffect(() => {
        callApi();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const callApi = () => {
        getProducts()
        .then((products) => {
            preparePaidProducts(products);
            setLoading(false)
        })
    }

    const preparePaidProducts = (products) => {
        let storeItems = [];

        products.forEach((product) => {
            let item = {
                id: product.product.price,
                title: product.identifier,
                type: 'purchase',
                value: parseInt(product.product.description.split(' ')[0]),
                description: product.product.description,
                cost: product.product.priceString,
                package: product,
            }
            storeItems.push(item);
        })
        setStoreItems(storeItems);
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <Layout style={styles.container}>
        <View style={styles.scrollBody}>
            <StoreList paidItems={storeItems} paidItemsLoading={loading} />
        </View>
    </Layout>
    );
};

export default ExchangeScreen;

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: 'background-basic-color-2',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    scrollBody: {
        flex: 1,
        marginTop: 16,
        overflow: 'visible'
    },
    button: {
        marginVertical: 4,
    }
  });

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Icon, Layout, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import StoreList from '../../../components/Exchange/StoreList';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const ExchangeScreen = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <Layout style={styles.container}>
        <View style={styles.scrollBody}>
            <StoreList />
            <View style={styles.upcomingContainer}>
                <Text>More Coming Soon...</Text>
            </View>
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
    },
    upcomingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    }
  });

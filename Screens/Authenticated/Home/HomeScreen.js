import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, Icon, Layout, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../../../Theme/theme-context';
import { logoutUser } from '../../../helpers/firebaseAuth';
import { ScrollView } from 'react-native';
import DailyCheckin from '../../../components/Home/DailyCheckin';
import FeaturedItems from '../../../components/Home/FeaturedItems';
import axiosInstance from '../../../config/axiosConfig';
import authService from '../../../services/AuthService';
import GenerateArt from '../../../components/Home/GenerateArt';
import SavedArt from '../../../components/Home/SavedArt';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const HomeScreen = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);
    
    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                // navigation.navigate('Login');
                console.log("LOGOUT SUCCESS");
            })
            .catch((error) => {
                console.log("LOGOUT FAILED: ", error);
            });
    }

    return (

        <Layout style={styles.container}>
            <ScrollView style={styles.scrollBody}>
                {/* <DailyCheckin/> */}
                <GenerateArt />
                {/* <FeaturedItems/> */}
                <SavedArt />
            </ScrollView>
        </Layout>
    );
};

export default HomeScreen;

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
        paddingTop: 16,
        overflow: 'visible'
    },
    button: {
        marginVertical: 4,
    },
});
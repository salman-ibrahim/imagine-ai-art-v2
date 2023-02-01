import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, Layout, TopNavigation, Text } from '@ui-kitten/components';
import { ThemeContext } from '../Theme/theme-context';
const HomeScreen = ({ navigation }) => {

    const themeContext = React.useContext(ThemeContext);

    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Divider/>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category={'h4'}>Hello World!</Text>
                <Button onPress={navigateDetails}>OPEN DETAILS</Button>
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default HomeScreen;

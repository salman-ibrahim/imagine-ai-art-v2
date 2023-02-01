import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);



const ActivityScreen = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>ACTIVITY</Text>
        </Layout>
    );
};

export default ActivityScreen;

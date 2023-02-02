import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Authenticated/Home/HomeScreen';
import ActivityScreen from '../Screens/Authenticated/Activity/ActivityScreen';
import ExchangeScreen from '../Screens/Authenticated/Exchange/ExchangeScreen';
import InviteScreen from '../Screens/Authenticated/Invite/InviteScreen';
import AppBottomNavigation from './AppBottomNavigation';
import HomeLayout from '../Layouts/HomeLayout';
import ProfileScreen from '../Screens/Authenticated/Global/ProfileScreen';
import Art from '../Screens/Authenticated/Modal/Art';
import { useRoute } from '@react-navigation/native';

const { Navigator, Screen, Group } = createBottomTabNavigator();

const HomeNavigator = () => (
    
    <HomeLayout
        navigator={
            <Navigator tabBar={props => <AppBottomNavigation {...props} />}>
                {/* Main Screens */}
                <Group>
                    <Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
                    {/* <Screen options={{headerShown: false}} name='Activity' component={ActivityScreen}/> */}
                    <Screen options={{headerShown: false}} name='Store' component={ExchangeScreen}/>
                    {/* <Screen options={{headerShown: false}} name='Invite' component={InviteScreen}/> */}
                    <Screen options={{headerShown: false}} name="Settings" component={ProfileScreen} />
                </Group>
                {/* Modal Screens */}
                <Group screenOptions={{presentation: 'modal'}}>
                    <Screen options={{headerShown: false }} name='ArtModal' component={Art} tabBarVisible={false}/>
                </Group>
            </Navigator>
        }
    />
);

export default HomeNavigator;
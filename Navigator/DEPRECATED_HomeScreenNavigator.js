import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/Authenticated/Global/ProfileScreen';
import HomeScreen from '../Screens/Authenticated/Home/HomeScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeScreenNavigator = () => (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='Home' component={HomeScreen}/>
            <Screen name='Profile' component={ProfileScreen}/>
        </Navigator>
);

export default HomeScreenNavigator;
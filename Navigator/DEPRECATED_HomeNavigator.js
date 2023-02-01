import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../Screens/HomeScreen";
import DetailsScreen from "../Screens/DetailsScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='Home' component={HomeScreen}/>
            <Screen name='Details' component={DetailsScreen}/>
        </Navigator>
);

export default HomeNavigator;

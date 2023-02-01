import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Authentication/Login';
import Signup from '../Screens/Authentication/Signup';
import Reset from '../Screens/Authentication/Reset';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='Login' component={Login}/>
            <Screen name='Signup' component={Signup}/>
            <Screen name='Reset' component={Reset} />
        </Navigator>
);

export default AuthNavigator;

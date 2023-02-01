import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';

const { Navigator, Screen } = createStackNavigator();

const OnboardingNavigator = () => (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='Onboarding' component={OnboardingScreen}/>
        </Navigator>
);

export default OnboardingNavigator;

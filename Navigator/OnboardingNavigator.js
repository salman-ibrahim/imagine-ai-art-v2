import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../Screens/Onboarding/Onboarding';

const { Navigator, Screen } = createStackNavigator();

const OnboardingNavigator = () => (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='Onboarding' component={Onboarding}/>
        </Navigator>
);

export default OnboardingNavigator;

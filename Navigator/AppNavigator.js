import React, { useEffect, useState } from "react";

import {NavigationContainer} from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData } from "../helpers/secureStore";
import { DECODE_STATUS } from "../helpers/secureStoreStatuses";
import * as SplashScreen from 'expo-splash-screen';
import OnboardingNavigator from "./OnboardingNavigator";

const navigatorTheme = (theme) => {
    let themeValues = {}
    themeValues = theme === 'light' 
    ? 
    { dark: false, colors: { background: '#ffffff', },} 
    : 
    { dark: true, colors: { background: '#222B45', },}
    
    return themeValues;
}

SplashScreen.preventAutoHideAsync()

const AppNavigator = (props) => {
    
    const { theme, isAuthenticated } = props;

    const [onboarded, setOnboarded] = useState(null);
    const [appIsReady, setAppIsReady] = useState(false);
    
    // const initAuth = () => {
    //     return getData('auth')
    //         .then((data) => {
    //             return DECODE_STATUS[data]
    //         })
    // }

    const initAuth = () => {
        return getData('onboarded')
            .then((data) => {
                return DECODE_STATUS[data]
            })
    }

    // useEffect(() => {
    //     const unsubscribe = listenToAuthStateChange();

    //     return unsubscribe;
    // }, [])
    
    useEffect(() => {
        if (!appIsReady && onboarded !== null) {
            setAppIsReady(true);
        }
    }, [onboarded])

    useEffect(() => {
        initAuth();
        if (isAuthenticated) {
            setOnboarded(true);
        } else {
            setOnboarded(false);
        }

        if (appIsReady) {
            setTimeout(() => {
                SplashScreen.hideAsync();
            }, 1000);
        }
    }, [isAuthenticated, appIsReady])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#ffffff' : "#222B45"}}>
            <NavigationContainer
                theme={navigatorTheme(theme)}
            >
                {
                    onboarded ? <HomeNavigator /> : <OnboardingNavigator/>
                }
            </NavigationContainer>
        </SafeAreaView>
    )
};

export default AppNavigator;
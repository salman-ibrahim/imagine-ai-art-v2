import { StatusBar } from 'react-native';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from "./Navigator/AppNavigator";
import {ThemeContext} from "./Theme/theme-context";
import { SafeAreaProvider, initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context';
import { deleteData, getData, storeData } from './helpers/secureStore';
// import './config/firebaseConfig';
import { Provider } from 'react-redux';
import store from './store';
import Toast from 'react-native-toast-message';

if(__DEV__) {
    import('./config/reactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default (props) => {
    
    const [theme, setTheme] = React.useState('light');

    getData('appTheme').then((data) => {
        if (data) {
            setTheme(data);
        }
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        storeData('appTheme',nextTheme);
    };

    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack}/>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>   
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme === 'light' ? '#ffffff' : "#222B45"}/>
                    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                        <AppNavigator theme={theme}/>
                    </SafeAreaProvider>
                </ApplicationProvider>
            </ThemeContext.Provider>
            <Toast />
        </Provider>
    )
};

import React, { useEffect } from 'react';
import {BottomNavigation, BottomNavigationTab, Divider, Icon} from '@ui-kitten/components';
import { toastInfo } from '../helpers/toasts';
import store from '../store';
import { setProfileHeaderVisible } from '../store/actions/interfaceActions';

const HomeIcon = (props) => (
    <Icon {...props} name='home'/>
)

const AppBottomNavigation = (props) => {

    const { navigation, state } = props;

    const [ navigatorVisible, setNavigatorVisible ] = React.useState(true);



    useEffect(() => {
            // Indicate that the current active screen is modal so hide the profile overview
    if(state.routeNames[state.index].includes('Modal')) {
        store.dispatch(setProfileHeaderVisible(false))
        // Hide bottom navigation
        setNavigatorVisible(false)
    }
    else {
        store.dispatch(setProfileHeaderVisible(true))
        setNavigatorVisible(true)
    }
    }, [state.index])

    const handleNavigation = (index) => {
        setSelectedIndex(index);
        navigation.navigate(screens[index])
    }

    const homeIcon = (props) => (
        <Icon {...props} name={state.index == 0 ? 'home':'home-outline'}/>
    );

    // const activityIcon = (props) => (
    //     <Icon {...props} name={state.index == 1 ? 'archive' :'archive-outline'}/>
    // );

    const exchangeIcon = (props) => (
        <Icon {...props} name={state.index == 1 ? 'gift' : 'gift-outline'}/>
    );

    // const inviteIcon = (props) => (
    //     <Icon {...props} name={state.index == 3 ? 'share' : 'share-outline'}/>
    // );

    // const profileIcon = (props) => (
    //     <Icon {...props} name={state.index == 4 ? 'person' : 'person-outline'} />
    // )

    const gearIcon = (props) => (
        <Icon {...props} name={state.index == 2 ? 'settings' : 'settings-outline'} />
    )

    return (
        navigatorVisible 
        ?
        <>
        <Divider/>
        <BottomNavigation
            selectedIndex={state.index}
            
            onSelect={index => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab title='HOME' icon={homeIcon}/>
            {/* <BottomNavigationTab title='ACTIVITY' icon={activityIcon}/> */}
            <BottomNavigationTab title='STORE' icon={exchangeIcon}/>
            {/* <BottomNavigationTab title='INVITE' icon={inviteIcon}/> */}
            <BottomNavigationTab title='SETTINGS' icon={gearIcon} />
        </BottomNavigation>
        </>
        :
        null
    );
};

export default AppBottomNavigation;

import React from 'react';
import {BottomNavigation, BottomNavigationTab, Divider, Icon} from '@ui-kitten/components';

const HomeIcon = (props) => (
    <Icon {...props} name='home'/>
)

const AppBottomNavigation = (props) => {

    const { navigation, state } = props;

    const handleNavigation = (index) => {
        setSelectedIndex(index);
        navigation.navigate(screens[index])
    }

    const homeIcon = (props) => (
        <Icon {...props} name={state.index == 0 ? 'home':'home-outline'}/>
    );

    const activityIcon = (props) => (
        <Icon {...props} name={state.index == 1 ? 'archive' :'archive-outline'}/>
    );

    const exchangeIcon = (props) => (
        <Icon {...props} name={state.index == 2 ? 'gift' : 'gift-outline'}/>
    );

    const inviteIcon = (props) => (
        <Icon {...props} name={state.index == 3 ? 'share' : 'share-outline'}/>
    );

    const profileIcon = (props) => (
        <Icon {...props} name={state.index == 4 ? 'person' : 'person-outline'} />
    )

    return (
        <>
        <Divider/>
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab title='HOME' icon={homeIcon}/>
            <BottomNavigationTab title='ACTIVITY' icon={activityIcon}/>
            <BottomNavigationTab title='EXCHANGE' icon={exchangeIcon}/>
            <BottomNavigationTab title='INVITE' icon={inviteIcon}/>
            <BottomNavigationTab title='PROFILE' icon={profileIcon} />
        </BottomNavigation>
        </>
    );
};

export default AppBottomNavigation;

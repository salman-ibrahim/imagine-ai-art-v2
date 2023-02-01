import React from 'react';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import {useNavigation} from "@react-navigation/native";

const HomeIcon = (props) => (
    <Icon {...props} name='home'/>
)

const MainBottomNavigation = ({navigation}) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [screens, setScreens ] = React.useState(['Home', 'Details'])

    const handleNavigation = (index) => {
        setSelectedIndex(index);
        navigation.navigate(screens[index])
    }

    const homeIcon = (props) => (
        <Icon {...props} name={selectedIndex == 0 ? 'home':'home-outline'}/>
    );

    const activityIcon = (props) => (
        <Icon {...props} name={selectedIndex == 1 ? 'archive' :'archive-outline'}/>
    );

    const exchangeIcon = (props) => (
        <Icon {...props} name={selectedIndex == 2 ? 'gift' : 'gift-outline'}/>
    );

    const inviteIcon = (props) => (
        <Icon {...props} name={selectedIndex == 3 ? 'person-add' : 'person-add-outline'}/>
    );

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <BottomNavigationTab title='HOME' icon={homeIcon}/>
            <BottomNavigationTab title='ACTIVITY' icon={activityIcon}/>
            <BottomNavigationTab title='EXCHANGE' icon={exchangeIcon}/>
            <BottomNavigationTab title='INVITE' icon={inviteIcon}/>
        </BottomNavigation>
    );
};

export default MainBottomNavigation;

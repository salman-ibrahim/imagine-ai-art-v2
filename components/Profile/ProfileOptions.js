import { Button, Divider, Icon, Layout, StyleService, Text, Toggle, useStyleSheet } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import ExternalLinkIcon from '../../assets/icons/ExternalLinkIcon';
import HeadphonesIcon from '../../assets/icons/HeadphonesIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import PrivacyPolicyIcon from '../../assets/icons/PrivacyPolicyIcon';
import ReceiptIcon from '../../assets/icons/ReceiptIcon';
import StarIcon from '../../assets/icons/StarIcon';
import ThemeIcon from '../../assets/icons/ThemeIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import { prepareSupportEmailBody, requestInAppReview, shareApp } from '../../helpers/commonHelpers';
// import { logoutUser } from '../../helpers/firebaseAuth';
import { getData } from '../../helpers/secureStore';
import { ThemeContext } from '../../Theme/theme-context';
import { strings } from '../../values/strings';
import ShareIcon from '../../assets/icons/ShareIcon';

const ProfileOptions = () => {

    const styles = useStyleSheet(themedStyles);
    const themeContext = React.useContext(ThemeContext);

    const [darkMode, setDarkMode] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    useEffect(() => {
        getData('appTheme')
            .then((theme) => {
                if (theme === 'dark') {
                    setDarkMode(true);
                } else {
                    setDarkMode(false);
                }
                setLoading(false);
            })
    }, [])
    

    const toggleTheme = () => {
        console.log('Mode Switch');
        themeContext.toggleTheme();
        setDarkMode(!darkMode);
    }

    const handleLogout = () => {
        // logoutUser()
        //     .then(() => {
        //         console.log("LOGOUT SUCCESS");
        //     })
        //     .catch((error) => {
        //         console.log("LOGOUT FAILED: ", error);
        //     });
    }

    return (
        <ScrollView style={styles.container}>
            {/* Transactions */}
            {/* <TouchableOpacity>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <WalletIcon/>
                        <Text category='h6' style={{marginLeft:20}}>Transactions</Text>
                    </View>
                    <Icon style={styles.tintColor} height={20} width={20} name='chevron-right'/>
                </View>
            </TouchableOpacity>
            <Divider/> */}

            {/* Rate Us */}
            <TouchableOpacity onPress={() => requestInAppReview()}>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <StarIcon/>
                        <Text category='h6' style={{marginLeft:20}}>Rate us on Playstore</Text>
                    </View>
                    <Icon style={styles.tintColor} height={20} width={20} name='chevron-right'/>
                </View>
            </TouchableOpacity>
            <Divider/>

            {/* Terms */}
            <TouchableOpacity onPress={() => Linking.openURL("https://rewardy.gamearina.com/play-store-terms-conditions.php")}>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <ReceiptIcon/>
                        <Text category='h6' style={{marginLeft:20}}>Terms of Service</Text>
                    </View>
                    <ExternalLinkIcon height={20} width={20}/>
                </View>
            </TouchableOpacity>
            <Divider/>

            {/* Privacy Policy */}
            <TouchableOpacity onPress={() => Linking.openURL("https://rewardy.gamearina.com/play-store-privacy-policy.php")}>
            <View style={styles.menuItem}>
                <View style={styles.menuTitle}>
                    <PrivacyPolicyIcon/>
                    <Text category='h6' style={{marginLeft:20}}>Privacy Policy</Text>
                </View>
                <ExternalLinkIcon height={20} width={20}/>
            </View>
            </TouchableOpacity>
            <Divider/>

            {/* Contact Us */}
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${strings.supportEmail}?subject=${strings.supportSubject}`) }>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <HeadphonesIcon/>
                        <Text category='h6' style={{marginLeft:20}}>Contact Us</Text>
                    </View>
                    <ExternalLinkIcon height={20} width={20}/>
                </View>
            </TouchableOpacity>
            <Divider/>

            {/* Share App */}
            <TouchableOpacity onPress={() => shareApp()}>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <ShareIcon/>
                        <Text category='h6' style={{marginLeft:20}}>Share</Text>
                    </View>
                    <Icon style={styles.tintColor} height={20} width={20} name='chevron-right'/>
                </View>
            </TouchableOpacity>
            <Divider/>

            {/* Dark Mode */}
            <TouchableOpacity>
                <View style={styles.menuItem}>
                    <View style={styles.menuTitle}>
                        <ThemeIcon style={styles.tintColor}/>
                        <Text category='h6' style={{marginLeft:20}} onPress={toggleTheme}>Dark Mode</Text>
                    </View>
                    <Toggle checked={darkMode} disabled={loading} status='basic' onChange={toggleTheme} checkedIcon={checkIcon}/>
                </View>
            </TouchableOpacity>
            <Divider/>

            {/* Logout */}
            {/* <View style={styles.menuItem}>
                <View style={styles.menuTitle}>
                    <LogoutIcon/>
                    <Text category='h6' style={{marginLeft:20}} onPress={handleLogout}>Logout</Text>
                </View>
            </View> */}
            <Divider/>
        </ScrollView>
    )
}

export default ProfileOptions;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        flexGrow: 1,
        overflow: 'hidden',
        shadowColor: 'color-basic-1100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        elevation: 5,
        marginBottom: 20,
        height: 'auto',
    },
    menuItem: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    menuTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textLight: {
        color: 'color-basic-100',
        marginLeft: 20,
    },
    divider: {
        height: 'auto',
        width: 2,
        backgroundColor: 'border-basic-color-1',
    },    
    tintColor: {
        tintColor: 'text-basic-color'
    }
});
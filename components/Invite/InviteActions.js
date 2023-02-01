import { Button, Divider, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import InviteIcon from '../../assets/icons/InviteIcon'
import WhatsAppIcon from '../../assets/icons/WhatsAppIcon'

const InviteActions = () => {
    
    const styles = useStyleSheet(themedStyles)

    const renderFacebookIcon = (props) => (
        <Icon {...props} name='facebook' />
    );

    const renderWhatsAppIcon = (props) => (
        <WhatsAppIcon {...props} />
    );

    const renderTwitterIcon = (props) => (
        <Icon {...props} name='twitter' />
    );

    const renderShareIcon = (props) => (
        <Icon {...props} name='share' />
    );

    const renderCopyIcon = (props) => (
        <Icon {...props} name='copy' />
    );

    return (
        <>
        <View style={styles.container}>
            <View style={styles.code}>
                <Text style={styles.codeHeadline} >Your Invitation Code</Text>
                <Text category='h2'>ABCDE123</Text>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.copy}>
                <Text>Copy Code</Text>
            </View>
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
            <Text>Share Code Via:</Text>
            <View style={styles.shareButtons}>
                <Button accessoryLeft={renderWhatsAppIcon({tintColor:''})} status='success' appearance='outline' size='small'>WhatsApp</Button>
                <Button accessoryLeft={renderTwitterIcon()} status='info' appearance='outline' size='small'>Twitter</Button>
                <Button accessoryLeft={renderShareIcon()} status='basic' appearance='outline' size='small' style={styles.buttonControl}>More</Button>
            </View>
        </View>
        </>
    )
}

export default InviteActions

const themedStyles = StyleService.create({
    container: {
        flexDirection: 'row',
        marginVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 3,
        borderColor: 'color-primary-default',
        borderRadius: 10,
        padding: 10,
        borderStyle: 'dashed',
    },
    code: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    codeHeadline: {
        color: 'color-basic-600',
        fontWeight: 'bold',
    },
    copy: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: 'color-primary-default'
    },
    shareButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 16,
    },
    buttonControl: {
        borderColor: 'color-basic-100',
    }
})
import { Button, Divider, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
// import { registerWithGoogle } from '../helpers/firebaseAuth';

const SocialAuth = (props) => {
    const { actionType } = props;

    const renderGoogleIcon = (props) => (
        <Icon {...props} name='google'/>
    );

    const renderFacebookIcon = (props) => (
        <Icon {...props} name='facebook'/>
    );

    return (
        <>
            {/* Divider */}
            <View style={styles.divider}>
                <Divider style={{flex:1, backgroundColor:'#fff'}}/>
                <Text style={{marginHorizontal:10, color:'#fff'}}>or</Text>
                <Divider style={{flex:1, backgroundColor:'#fff'}}/>
            </View>

            {/* Social Auth */}
            <View style={styles.socialCard}>
                <Button style={styles.button} appearance='filled' status='danger' accessoryLeft={renderGoogleIcon}>Google</Button>
                <Button style={styles.button} appearance='filled' status='info' accessoryLeft={renderFacebookIcon}>Facebook</Button>
            </View>
        </>
    )
}

export default SocialAuth;

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    socialCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        marginVertical: 3
    },
})
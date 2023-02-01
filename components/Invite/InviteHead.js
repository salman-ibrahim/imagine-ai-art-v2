import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import InviteIcon from '../../assets/icons/InviteIcon'

const InviteHead = () => {
    
    const styles = useStyleSheet(themedStyles)

    return (
        <View style={styles.container}>
            <Text category='h2' style={styles.bottomLine}>Refer Your Friend and Earn</Text>
            <InviteIcon/>
            <Text category='h6' style={styles.bottomLine}>Your friend gets 100 points when using your code and you get 100 points in return.</Text>
        </View>
    )
}

export default InviteHead

const themedStyles = StyleService.create({
    container: {
        paddingHorizontal: 16,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
    },
    bottomLine: {
        textAlign: 'center',
        marginVertical: 8,
    }
})
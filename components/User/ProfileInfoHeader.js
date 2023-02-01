
import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import CoinIcon from '../../assets/icons/CoinIcon'

const ProfileInfoHeader = (props) => {

  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.textWhite} category='h4'>John Doe</Text>
        <View style={styles.balance} >
          <CoinIcon/>
          <Text style={styles.textWhite} category='h6'>100</Text>
        </View>
      </View>

      <View style={styles.useImagePlaceholder}>
        <Avatar style={styles.userImage} source={require('../../assets/profile.jpeg')}/>
      </View>
    </View>
  )
}

export default ProfileInfoHeader

const themedStyles = StyleService.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'color-primary-500',
      margin: 16,
      padding: 16,
      borderRadius: 16,
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'color-basic-1100',
      shadowOpacity: 1,
      elevation: 5,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'column',
    },
    useImagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        height:50,
        width:50,
        borderColor: 'color-primary-800',
        borderWidth:2,
    },
    balance: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    textWhite: {
        color: 'color-basic-100',
    }
  })
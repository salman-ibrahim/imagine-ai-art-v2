
import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, Icon, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import CoinIcon from '../../assets/icons/CoinIcon'
import { getData, storeData } from '../../helpers/secureStore'
import store from '../../store'
import { setUserWalletAction } from '../../store/actions/userActions'
import { strings } from '../../values/strings'

const ProfileInfoHeader = (props) => {

  const { wallet } = props
  const styles = useStyleSheet(themedStyles)

  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    getData('wallet')
    .then((wallet) => {
      if(wallet == undefined) {
        storeData('wallet', '3')
        store.dispatch(setUserWalletAction(3))
      }
      else {
        const balance = parseInt(wallet, 10)
        store.dispatch(setUserWalletAction(balance))
      }
      setLoading(false)
    })
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.textWhite} category='h4'>{strings.appTitle}</Text>
      </View>

      <View style={styles.balance} >
        {
          loading ?
            <Spinner />
            :
            <>
              <Text style={styles.textWhite} category='h6'>{wallet}</Text>
              <Icon fill='white' name='brush-outline' height={30} width={30} />
            </>
        }
        </View>
    </View>
  )
}

const mapStateToProps = (state) => ({wallet: state.userReducer.wallet})
export default connect(mapStateToProps, null) (ProfileInfoHeader);

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
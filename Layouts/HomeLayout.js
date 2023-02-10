import { useNavigation, useRoute } from '@react-navigation/native'
import { Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { connect } from 'react-redux'
import ProfileInfoHeader from '../components/User/ProfileInfoHeader'
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

const HomeLayout = ({navigator, profileVisible}) => {


mobileAds()
  .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,
  })
  .then(() => {
      console.log('Request configuration updated');
  });

mobileAds()
    .initialize()
    .then(adapterStatuses => {
    console.log('adapterStatuses', adapterStatuses);
});


  const styles = useStyleSheet(themedStyles)
  return (
    <Layout style={styles.container}>
        { profileVisible && <ProfileInfoHeader/> }
        {navigator}
    </Layout>
  )
}

const mapStateToProps = (state) => ({profileVisible: state.interfaceReducer.profileVisible})
export default connect(mapStateToProps, null) (HomeLayout)

const themedStyles = StyleService.create({
    container: {
        flex: 1,
    }
})
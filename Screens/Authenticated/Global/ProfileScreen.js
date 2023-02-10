import { Button, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import ProfileOptions from '../../../components/Profile/ProfileOptions'
import ProfileOverview from '../../../components/Profile/ProfileOverview'
import { ThemeContext } from '../../../Theme/theme-context'
import { defaults } from '../../../values/defaults'

const ProfileScreen = (props) => {

  const styles = useStyleSheet(themedStyles)

  return (
        <Layout style={styles.container}>
            <View style={styles.scrollBody}>
                {/* <ProfileOverview/> */}
                <ProfileOptions/>
                <View style={styles.bannerContainer}>
                    <BannerAd unitId={defaults.bannerAdUnitId} size={BannerAdSize.BANNER} />
                </View>
            </View>
        </Layout>
  )
}

export default ProfileScreen

const themedStyles = StyleService.create({
  container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: 'background-basic-color-2',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-1',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: 'color-basic-1100',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  scrollBody: {
      flex: 1,
      marginTop: 16,
      overflow: 'visible'
  },
  button: {
      marginVertical: 4,
  },
});
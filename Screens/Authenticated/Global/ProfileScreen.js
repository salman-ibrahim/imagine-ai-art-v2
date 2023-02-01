import { Button, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import ProfileOptions from '../../../components/Profile/ProfileOptions'
import ProfileOverview from '../../../components/Profile/ProfileOverview'
import { ThemeContext } from '../../../Theme/theme-context'

const ProfileScreen = (props) => {

  const styles = useStyleSheet(themedStyles)

  return (
        <Layout style={styles.container}>
            <View style={styles.scrollBody}>
                <ProfileOverview/>
                <ProfileOptions/>
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
  scrollBody: {
      flex: 1,
      marginTop: 16,
      overflow: 'visible'
  },
  button: {
      marginVertical: 4,
  },
});
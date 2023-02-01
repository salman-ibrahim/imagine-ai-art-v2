import { Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import ProfileInfoHeader from '../components/User/ProfileInfoHeader'

const HomeLayout = ({navigator}) => {

  const styles = useStyleSheet(themedStyles)
  return (
    <Layout style={styles.container}>
        <ProfileInfoHeader/>
        {navigator}
    </Layout>
  )
}

export default HomeLayout

const themedStyles = StyleService.create({
    container: {
        flex: 1,
    }
})
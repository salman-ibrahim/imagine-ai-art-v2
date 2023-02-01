import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Icon, Layout, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';
import InviteHead from '../../../components/Invite/InviteHead';
import InviteActions from '../../../components/Invite/InviteActions';
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);



const InviteScreen = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles)

    return (
          <Layout style={styles.container}>
              <ScrollView style={styles.scrollBody}>
                <InviteHead/>
                <InviteActions/>
              </ScrollView>
          </Layout>
    )
};

export default InviteScreen;


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
  });
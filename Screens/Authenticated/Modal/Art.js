import { Image, View } from 'react-native'
import React, { useEffect } from 'react'
import { Icon, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { toastSuccess } from '../../../helpers/toasts'
import ArtActions from '../../../components/Art/ArtActions'

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

const Art = ({ navigation, route }) => {

    const { id, query, image } = route.params

    const styles = useStyleSheet(themedStyles);
    
    const navigateBack = () => {
        navigation.goBack()
    }

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    )
    return (
        <>
            <TopNavigation title="Result" alignment="center" accessoryLeft={BackAction}/>
        <View style={styles.container}>
            <Text category="h5">{ query || "Astronaut Riding Horse on Mars"}</Text>
            <View style={styles.artContainer}>
                <Image source={{uri: image || 'https://picsum.photos/1000/1000'}} style={styles.art}/>
            </View>
            <ArtActions />
        </View>
        </>
    )
}

export default Art

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'background-basic-color-2',
        borderTopRightRadius:25,
        borderTopLeftRadius:25
    },
    artContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    art: {
        borderRadius:20,
        width: '100%',
        aspectRatio:1,
        resizeMode: 'contain'
    }
})
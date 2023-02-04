import { Image, View } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Icon, Spinner, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { toastError, toastSuccess } from '../../../helpers/toasts'
import ArtActions from '../../../components/Art/ArtActions'
import artService from '../../../services/ArtService'
import { convertImageToBase64 } from '../../../helpers/imageHelpers'

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

const CrossIcon = (props) => (
    <Icon {...props} name='close-circle-outline' />
)

const Art = ({ navigation, route }) => {

    const { id, query, image, status } = route.params

    const styles = useStyleSheet(themedStyles);
    
    const [art, setArt] = React.useState({})
    const [artStatus, setArtStatus] = React.useState(status)
    const [loading, setLoading] = React.useState(false)
    const [intervalId, setIntervalId] = React.useState(null)

    useEffect(() => {
        iniStates()
        const interval = setInterval(() => {
            if(artStatus == 'starting' || artStatus == 'processing') {
                callFetchApi()
            }
        } , 5000)

        setIntervalId(interval)

        return () => clearInterval(interval);
    }, [id])

    // Clear interval on status change
    useEffect(() => {
        if(artStatus == 'succeeded' || artStatus == 'failed') {
            clearInterval(intervalId);
        }
    }, [artStatus])

    const callFetchApi = () => {
        
        if(!loading){
            setLoading(true)
        }
        
        artService.fetchArt(id)
            .then((response) => {
                console.log("RESULT",response);
                setArtStatus(response.status)
                if(response.status == 'succeeded') {
                    setArt({
                        id: response.id,
                        query: response.input.prompt,
                        image: convertImageToBase64(response.output[0]),
                    })
                    setLoading(false)
                    toastSuccess('Art generated successfully');
                }
                if(response.status == 'failed') {
                    toastError('Something went wrong, please try again later');
                    navigateBack()
                }
            }).catch((err) => {
                toastError('Something went wrong, please try again later');
                setArtStatus('failed')
                navigateBack()
            })
    }

    const iniStates = () => {
        if(id != art.id) {
            setArt({
                id: id,
                query: query,
                image: image,
            })
            setArtStatus(status)
        }
    }

    const navigateBack = () => {
        navigation.goBack()
    }
    
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    )
        
    const handleCancel = () => {
        // Cancel the art generation
    }

    return (
        <>
            <TopNavigation title="Result" alignment="center" accessoryLeft={BackAction}/>

            <View style={styles.container}>
                <Text category="h5">{ art.query }</Text>
                <View style={styles.artContainer}>
                    {
                        loading ? 
                        <>
                            <Spinner size='giant' />
                            <Text>Generating your art, this may take upto 15 seconds.</Text>
                        </>
                        :
                        <Image source={{ uri: `data:image/png;base64,${art.image}` }} style={styles.art}/>
                    }
                </View>
                {
                    loading ?
                    <>
                        <Button style={styles.button} onPress={handleCancel} status='danger' accessoryLeft={ CrossIcon }> Cancel </Button>
                        <Text style={styles.text}>Cancelling the art in progress may cost you.</Text>
                    </>
                    :
                    <ArtActions art={art} />
                }
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
    },
    button: {
        marginTop: 20,
        borderRadius:10
    },
    text: {
        marginTop: 20,
        textAlign: 'center'
    }
})
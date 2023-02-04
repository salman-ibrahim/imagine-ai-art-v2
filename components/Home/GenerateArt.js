import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Icon, Input, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { ScrollView, View } from 'react-native';
import { toastError, toastInfo } from '../../helpers/toasts';
import artService from '../../services/ArtService';

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

const checkIcon = (props) => (
    <Icon {...props} name='checkmark-outline'/>
);

const arrowRightIcon = (props) => (
    <Icon {...props} name='arrow-circle-right-outline'/>
);

const GenerateArt = () => {

    const styles = useStyleSheet(themedStyles);
    const navigator = useNavigation();

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({});

    const multilineInputState = useInputState();

    const handleGenerateArt = () => {
        if(!loading) {
            if(multilineInputState.value.trim() !== "") {
                setLoading(true)
                toastInfo('Generating Art');
                artService.placeArtJob(multilineInputState.value).then((response) => {
                    setData(response);
                    setLoading(false);

                    navigator.navigate('ArtModal', { id: response.id, query: response.input.prompt, image: null, source: null, status: 'starting' });

                }).catch((err) => {
                    setLoading(false);
                    toastError('Something went wrong');
                })
            }
            else {
                toastInfo('Please enter some text');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text category='h4' style={styles.heading}>What are your Imaginations?</Text>
            <View horizontal style={styles.pointsContainer}>
                <Input
                    multiline={true}
                    style={styles.input}
                    textStyle={{ maxHeight: 70, minHeight: 30 }}
                    placeholder='Astronaut Riding Horse on Mars'
                    {...multilineInputState}
                />
            </View>

            <Button style={loading? styles.buttonDisabled : styles.button} onPress={handleGenerateArt} accessoryRight={ loading ? '' : arrowRightIcon}> { loading ? <Spinner /> : 'Generate Art' }</Button>
        </View>
    )
}

export default GenerateArt;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: 'color-basic-1100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        elevation: 1,
        marginBottom: 20,
    },
    pointsContainer: {
        
    },
    dayContainer: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    pointsCircle: {
        backgroundColor: 'background-basic-color-4',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedPointCircle: {
        backgroundColor: 'color-success-500',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dividerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 20,
        backgroundColor: 'text-basic-color'
    },    
    button: {
        marginTop: 20,
        borderRadius:10
    },
    buttonDisabled: {
        marginTop: 20,
        borderRadius:10,
        backgroundColor: 'color-basic-600',
        borderColor: 'color-basic-600'
    },
    tintColor: {
        tintColor: 'text-basic-color'
    },
    heading: {
        marginVertical: 16,
    },
    input: {
        borderRadius:10
    }
});
import { Button, Divider, Icon, Input, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { ScrollView, View } from 'react-native';

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
};

const GenerateArt = () => {

    const styles = useStyleSheet(themedStyles);
    
    const multilineInputState = useInputState();
    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={styles.container}>
            <Text category='h4' style={styles.heading}>What are your Imaginations?</Text>
            <View horizontal style={styles.pointsContainer}>
                <Input
                    multiline={true}
                    textStyle={{ maxHeight: 70 }}
                    placeholder='Astronaut Riding Horse on Mars'
                    {...multilineInputState}
                />
            </View>

            <Button style={styles.button} appearance='controlled'>Generate Art</Button>
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
    },
    tintColor: {
        tintColor: 'text-basic-color'
    },
    heading: {
        marginVertical: 16,
    }
});
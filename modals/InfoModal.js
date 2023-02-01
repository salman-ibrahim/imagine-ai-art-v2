import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Modal, Text } from '@ui-kitten/components';

const InfoModal = (props) => {

    const {toggle, visible, message} = props;
    
    const handleToggle = () => {
        toggle();
    }

    const renderInfoIcon = (props) => ( 
        <Icon {...props} name='alert-circle-outline'/>
    );

    return (
        <View style={styles.container}>
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={handleToggle}>
                <View>
                    <Card disabled={true} style={styles.body}>
                        <ScrollView style={styles.content}>
                            <Icon name='alert-circle-outline' width={35} height={35} fill={'blue'}/>
                            <Text category='h6'>INFO</Text>
                            <Text>
                                {message}
                            </Text>
                        </ScrollView>
                        <Button onPress={handleToggle}>Okay</Button>
                    </Card>
                </View>
        </Modal>

        </View>
    );
};

export default InfoModal;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    body: {
        borderRadius: 20,
        padding: 10,
        textAlign: 'center',
    },
    content: {
        marginBottom: 10,
    },

});
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import TermsOfService from '../components/subcomponents/TermsOfService';

const TermsModal = (props) => {

    const [visible, setVisible] = React.useState(false);
    
    return (
        <View style={styles.container}>


        <Text style={styles.formText}>By signing up you agree to <Text style={styles.link} onPress={() => setVisible(true)}>terms and condition</Text>.</Text>
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
                <View>
                    <Card disabled={true} style={styles.body}>
                        <ScrollView style={styles.content}>
                            <Text category='h6'>Terms and Conditions</Text>
                            <Text>
                                {/* Data From API */}
                            </Text>
                            <TermsOfService/>
                        </ScrollView>
                        <Button onPress={() => setVisible(false)}>Okay</Button>
                    </Card>
                </View>
        </Modal>

        </View>
    );
};

export default TermsModal;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        textAlign:'left'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    link: {
        textDecorationLine: 'underline',
    },
    formText: {
        textAlign: 'center',
        marginTop: 10,
    },
    body: {
        borderRadius: 20,
        margin: 10,
        padding: 10,
        maxHeight: 500,
        overflow: 'scroll',
    },
    content: {
        maxHeight: 400,
        marginBottom: 10,
    },
});
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, CheckBox, Modal, Text } from '@ui-kitten/components';
import TermsOfService from '../components/subcomponents/TermsOfService';

const TermsModal = (props) => {
    const { agreement, handleAgreement } = props;

    const [visible, setVisible] = React.useState(false);
    const [agreed, setAgreed] = React.useState(false);

    const updateAgreement = (agreed) => {
        setAgreed(agreed);
        handleAgreement(agreed);
    }

    return (
        <View style={styles.container}>

        {
            agreement ?
            <CheckBox
            style={{marginTop:10}}
            checked={agreed}
            onChange={nextChecked => updateAgreement(nextChecked)}>
                <View><Text style={styles.formText}>I agree to <Text style={styles.link} onPress={() => setVisible(true)}>terms and condition</Text>.</Text></View>
            </CheckBox>
            :
            <Text style={styles.formText}>By getting started you agree to <Text style={styles.link} onPress={() => setVisible(true)}>terms and condition</Text>.</Text>
        }
        
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
                            {/* <TermsOfService/> */}
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
        textAlign:'left'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    link: {
        textDecorationLine: 'underline',
    },
    formText: {
        fontWeight: 'bold',
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
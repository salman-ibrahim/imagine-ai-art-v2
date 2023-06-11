import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Modal, Spinner, Text } from '@ui-kitten/components';
import { defaults } from '../values/defaults';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const GeneratingArtModal = (props) => {

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
            style={styles.modalBody}
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={handleToggle}>
                <View>
                    <Card disabled={true} style={styles.body}>
                        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                            {/* <Icon style={{textA:'center'}} name='alert-circle-outline' width={35} height={35} fill={'blue'}/> */}
                            <View>
                                <Spinner size='large'/>
                            </View>
                            <Text style={styles.heading} category='h6'>GENERATING ART</Text>
                            <Text style={{textAlign:"center"}}>
                                Please wait while we shape your Imaginations, This may take upto 15 seconds.
                            </Text>
                        </ScrollView>

                        <View style={styles.bannerContainer}>
                            <BannerAd unitId={defaults.bannerAdUnitId} size={BannerAdSize.BANNER} />
                        </View>
                    </Card>
                </View>
        </Modal>

        </View>
    );
};

export default GeneratingArtModal;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
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
        // padding: 10,
    },
    contentContainer: {
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        paddingVertical: 10,
    },
    modalBody: {
        width: '100%',
        paddingHorizontal: 10,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
});
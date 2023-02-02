import { Divider, Icon, Layout, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import React from 'react'
import { View } from 'react-native';

const ArtActions = () => {

    const styles = useStyleSheet(themedStyles);

    return (
        <View style={styles.container}>
            <View horizontal style={styles.statsContainer}>
                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='bookmark'/>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='download-outline'/>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.singleStat}>
                    <Icon fill='orange' height={20} width={20} name='share-outline'/>
                </View>

            </View>
        </View>
    )
}

export default ArtActions;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        // marginBottom: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'color-basic-1100',
        shadowOpacity: 0.1,
        elevation: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    singleStat: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        marginVertical:10
    },
    dividerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 'auto',
        width: 1,
        backgroundColor: 'border-basic-color-3',
    },    
    textDark: {
        color: 'color-basic-900',
    },
});
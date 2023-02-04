import { Button, Divider, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { FlatList, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import SingleItem from '../subcomponents/SingleItem';

const SavedArt = ({savedArt}) => {

    const styles = useStyleSheet(themedStyles);
    
    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={styles.container}>
            {
                savedArt.length === 0 
                ?
                <Text category='h4' style={{textAlign:'center'}}>No Saved Art</Text>
                :
                <Text category='h4'>Saved Art</Text>
            }
            <FlatList
                numColumns={2}
                data={savedArt}
                ItemSeparatorComponent={() => <View style={{margin: 5}}/>}
                renderItem={
                    ({item}) => 
                        <View style={styles.gridItem}>
                            <SingleItem item={item}/>
                        </View>
                    }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const mapStateToProps = (state) => ({savedArt: state.artReducer.savedArt});
export default connect(mapStateToProps, null) (SavedArt);

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
    },
    gridItem: {
        flex: 1,
    }
});
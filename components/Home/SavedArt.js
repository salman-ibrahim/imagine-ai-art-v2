import { Button, Divider, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { FlatList, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../helpers/secureStore';
import store from '../../store';
import { saveGeneratedArtAction, saveGeneratedArtIdsAction } from '../../store/actions/artActions';
import SingleItem from '../subcomponents/SingleItem';
import artDB from '../../db/artDB';
import GenerateArt from './GenerateArt';

const SavedArt = ({savedArt}) => {

    const styles = useStyleSheet(themedStyles);

    useEffect(() => {
        // Get data from art DB
        artDB.getImages((art) => {
            let artIds = art.map((art) => art.id)
            store.dispatch(saveGeneratedArtAction(art))
            store.dispatch(saveGeneratedArtIdsAction(artIds))
        })
    }, [])

    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={{flex:1}}>
            {/* {
                savedArt.length === 0 
                ?
                <Text category='h4' style={{textAlign:'center'}}>No Saved Art</Text>
                :
                <Text category='h4'>Saved Art</Text>
            } */}
            <FlatList
                style={{overflow:'visible'}}
                ListHeaderComponent={() => (
                    <>
                    <GenerateArt />
                    {
                        savedArt.length === 0 
                        ?
                        <Text category='h4' style={{textAlign:'center'}}>No Saved Art</Text>
                        :
                        <Text category='h4'>Saved Art</Text>
                    }
                    </>
                )}
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
        flex: 1,
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
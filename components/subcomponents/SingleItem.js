import { useNavigation } from "@react-navigation/native";
import { Button, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const SingleItem = (props) => {
    const { id, query, image, source } = props.item;
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();

    const viewArt = () => {
        navigation.navigate("ArtModal", { id, query, image, source, status: 'succeeded'});
    }
    
    return (
        <View style={styles.container}>
                <TouchableOpacity onPress={viewArt}>
                    <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
                <Text category="h6" style={styles.text}>{query}</Text>
            </View>
    );
}

export default SingleItem;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-3',
        margin: 5,
        borderRadius: 16,
        justifyContent: 'center',
        padding: 16,
        shadowColor: 'color-basic-800',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
    },
    image: {
        width: "100%",
        
        aspectRatio:1,
        resizeMode: 'cover',
        borderRadius: 16,
    },
    text: {
        marginTop: 10,
        marginHorizontal: 5,
    }
});
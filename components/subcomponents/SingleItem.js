import { Button, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";

const SingleItem = (props) => {
    const { id, query, image } = props.item;

    const styles = useStyleSheet(themedStyles);

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text category="h6">{query}</Text>
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
    strikethrough: {
        textDecorationLine: 'line-through',
        color: 'color-basic-600',
    },
    button: {
        marginTop: 10,
    }
});
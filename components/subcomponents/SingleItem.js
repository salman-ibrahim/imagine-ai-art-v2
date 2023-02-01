import { Button, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";

const SingleItem = (props) => {
    const { id, name, price, image, offerPrice } = props.item;

    const styles = useStyleSheet(themedStyles);

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text category="h6">{name}</Text>
            <Text style={styles.strikethrough}>Rs. {price}</Text>
            <Text>Rs. {offerPrice}</Text>
            <Button style={styles.button}>Purchase</Button>
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
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'border-basic-color-5',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: 'color-basic-600',
    },
    button: {
        marginTop: 10,
    }
});
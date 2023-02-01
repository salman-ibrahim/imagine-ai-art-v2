import * as SecureStore from 'expo-secure-store';

export const storeData = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.log(e);
    }
}

export const getData = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (value) {
            return value;
        }
    } catch (e) {
        console.log(e);
    }
}

export const deleteData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (e) {
        console.log(e);
    }
}


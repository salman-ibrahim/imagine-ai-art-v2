import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { toastError } from './toasts';
import { convertStringToSlug } from './commonHelpers';
import { Share } from 'react-native';

export const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}

export const addMimeTypeToBase64 = (base64, mimeType = "application/octet-stream") => {
    return `data:${mimeType};base64,${base64}`;
}

export const downloadImageToDCIM = async (image, name) => {
    try{
        const imageUri = FileSystem.cacheDirectory + name+'.png';
        const base64Image = image.replace('data:application/octet-stream;base64,','');
        await FileSystem.writeAsStringAsync(imageUri, base64Image, { encoding: FileSystem.EncodingType.Base64 });

        const asset = await MediaLibrary.createAssetAsync(imageUri);    
        const album = await MediaLibrary.getAlbumAsync('Imagine');

        if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        } else {
        await MediaLibrary.createAlbumAsync('Imagine', asset, false);
        }
    }
    catch(error){
        console.log("FAILED",error);
    }
}

export const shareImage = async (image, query, message = '') => {
    // try {
    //     const name = await convertStringToSlug(query);
    //     const imageUri = FileSystem.cacheDirectory + name + '.png';
    //     const base64Image = image.replace('data:application/octet-stream;base64,', '');
    //     await FileSystem.writeAsStringAsync(imageUri, base64Image, { encoding: FileSystem.EncodingType.Base64, mimeType: 'image/png' });

    //     console.log("imageUri", imageUri);
    //     await Share.share({
    //         title: 'Share the Image',
    //         url: imageUri,
    //         message: imageUri,
    //     });

    //     await FileSystem.deleteAsync(imageUri);
    // } 
    // catch (error) {
    //     console.error(error);
    // }

    const name = await convertStringToSlug(query)
    const imageUri = FileSystem.cacheDirectory + name+'.png';
    const base64Image = image.replace('data:application/octet-stream;base64,','');
    await FileSystem.writeAsStringAsync(imageUri, base64Image, { encoding: FileSystem.EncodingType.Base64 });
    
    await Sharing.shareAsync(imageUri, {
        mimeType: 'image/png',
        dialogTitle: message.replace('{image}', query),
    });

}

export const requestCameraRollPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
};
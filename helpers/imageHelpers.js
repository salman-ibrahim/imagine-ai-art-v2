import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { toastError } from './toasts';

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

export const downloadImageToDCIM = async (image, name) => {
    const asset = await MediaLibrary.createAssetAsync(`data:image/png;base64,${image}`);
    const album = await MediaLibrary.getAlbumAsync('Imagine');

    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    } else {
      await MediaLibrary.createAlbumAsync('Imagine', asset, false);
    }

    await MediaLibrary.createAssetAsync(asset.uri, imageName);
}

export const shareImage = async (image, message = '') => {
    const result = await Sharing.shareAsync(image, {
        mimeType: 'image/png',
        dialogTitle: 'Share the image',
        message: message,
    });
    if (result.action === Sharing.sharedAction) {
        console.log('Image was shared successfully');
    } else {
        toastError("Something went wrong while sharing.")
    }
}

const getCameraRollPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      return true;
    } else {
      console.error('Camera roll permission was denied');
      return false;
    }
};
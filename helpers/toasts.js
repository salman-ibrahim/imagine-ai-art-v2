import Toast from 'react-native-toast-message'

export const toastSuccess = (message, headline = "Success") => {
    Toast.show({
        type: 'success',
        position: 'bottom',
        text1: headline,
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}

export const toastError = (message, headline = "Error") => {
    Toast.show({
        type: 'error',
        position: 'bottom',
        text1:headline,
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}

export const toastInfo = (message, headline = "Info") => {
    Toast.show({
        type: 'info',
        position: 'bottom',
        text1: headline,
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}
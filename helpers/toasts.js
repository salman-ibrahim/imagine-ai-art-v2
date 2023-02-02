import Toast from 'react-native-toast-message'

export const toastSuccess = (message) => {
    Toast.show({
        type: 'success',
        position: 'bottom',
        text1: "Success",
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}

export const toastError = (message) => {
    Toast.show({
        type: 'error',
        position: 'bottom',
        text1:"Error",
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}

export const toastInfo = (message) => {
    Toast.show({
        type: 'info',
        position: 'bottom',
        text1:'Info',
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
    });
}
/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
 Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
 dev: {
        FIREBASE_API_KEY: "AIzaSyCnLJpeedhqDmtQiyU-WrzzRcK01qPcUOw",
        FIREBASE_AUTH_DOMAIN: "task-app-25bd1.firebaseapp.com",
        FIREBASE_PROJECT_ID: "task-app-25bd1",
        FIREBASE_STORAGE_BUCKET: "task-app-25bd1.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "361155148588",
        FIREBASE_APP_ID: "1:361155148588:web:6b6e09173eeab671b54a89",
        FIREBASE_MEASUREMENT_ID: "G-00LDV0T5L2",
    },
 staging: {
        FIREBASE_API_KEY: "AIzaSyCnLJpeedhqDmtQiyU-WrzzRcK01qPcUOw",
        FIREBASE_AUTH_DOMAIN: "task-app-25bd1.firebaseapp.com",
        FIREBASE_PROJECT_ID: "task-app-25bd1",
        FIREBASE_STORAGE_BUCKET: "task-app-25bd1.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "361155148588",
        FIREBASE_APP_ID: "1:361155148588:web:6b6e09173eeab671b54a89",
        FIREBASE_MEASUREMENT_ID: "G-00LDV0T5L2",
    },
 prod: {
        FIREBASE_API_KEY: "AIzaSyCnLJpeedhqDmtQiyU-WrzzRcK01qPcUOw",
        FIREBASE_AUTH_DOMAIN: "task-app-25bd1.firebaseapp.com",
        FIREBASE_PROJECT_ID: "task-app-25bd1",
        FIREBASE_STORAGE_BUCKET: "task-app-25bd1.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "361155148588",
        FIREBASE_APP_ID: "1:361155148588:web:6b6e09173eeab671b54a89",
        FIREBASE_MEASUREMENT_ID: "G-00LDV0T5L2",
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
    return ENV.dev;
 } else if (env === 'staging') {
    return ENV.staging;
 } else if (env === 'prod') {
    return ENV.prod;
 }
};

export default getEnvVars;
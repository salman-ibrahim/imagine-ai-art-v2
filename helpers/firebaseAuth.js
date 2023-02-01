import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { storeData } from "./secureStore";
import { setAuthenticationStatusAction } from "../store/actions/userActions";
import store from "../store";
import { ENCODE_STATUS } from "./secureStoreStatuses";


/**
 * Register a user with email and password
 * @param {string} email - email address
 * @param {string} password - password
 * @returns user credential
 */
export const registerWithEmailAndPassword = (email, password, name, dob) => {

    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            // var user = userCredential.user;
            // Send verification email
            sendSignupVerificationEmail();
            // Update user profile
            updateUserProfile(name, null);
            console.log('SUCCESS');
            return Promise.resolve(userCredential);
        })
        .catch((error) => {
            console.log('ERROR');
            return Promise.reject(error);
        });
}


/**
 * 
 * @param {string} email - email address
 * @param {string} password - password
 * @returns userCredential
 */
export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            storeData('idToken', userCredential._tokenResponse.idToken)
            return Promise.resolve(userCredential);
        })
        .catch((error) => {
            console.log('ERROR');
            return Promise.reject(error);
        });
}


/**
 * Listen to auth state change
 * @returns void
 */
export const listenToAuthStateChange = () => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            if(user.emailVerified) {
                console.log('User is signed in.');
                storeData('auth', ENCODE_STATUS.TRUE)

                // Need to diversify the whole user object with each key handled individually
                storeData('user', user);
                store.dispatch(setAuthenticationStatusAction(true));
            }
            else {
                console.log('Email is unverified');
                storeData('auth', ENCODE_STATUS.FALSE)
                storeData('user', ENCODE_STATUS.FALSE);
                store.dispatch(setAuthenticationStatusAction(false));
            }
        }
        else {
            console.log('User is signed out.');
            storeData('auth', ENCODE_STATUS.FALSE);
            storeData('user', ENCODE_STATUS.FALSE);
            store.dispatch(setAuthenticationStatusAction(false));
        }
    });
}


/**
 * Send Verification Email
 * @returns void
 */
export const sendSignupVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Verification email sent');
        })
        .catch((e) => {
            console.log(e);
        })
}

/**
 * Update user profile
 * @param {string} displayName - user display name
 * @param {string} photoURL - user photo url
 * @returns void
 * @todo - add more user profile fields
 */
export const updateUserProfile = (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
        displayName: displayName,
    })
        .then(() => {
            console.log('User profile updated');
        })
        .catch((e) => {
            console.log(e);
        })
}
/**
 * Logout user and clear session
 * @returns void
 */
export const logoutUser = () => {
    return signOut(auth)
        .then(() => {
            console.log('User signed out');
            storeData('auth', ENCODE_STATUS.FALSE)
            storeData('user', ENCODE_STATUS.FALSE);
            store.dispatch(setAuthenticationStatusAction(false));
            return Promise.resolve();
        })
        .catch((e) => {
            console.log(e);
            return Promise.reject(e);
        })
}

/**
 * Reset Password
 * @param {string} email - email address
 * @returns void
 */

export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent');
            return Promise.resolve();
        })
        .catch((e) => {
            console.log(e);
            return Promise.reject(e);
        })
}


/**
 * Get bearer token
 */
export const getBearerToken = () => {
    return getIdToken(auth.currentUser)
        .then((idToken) => {
            console.log('Bearer token retrieved');
            console.log(idToken);
            return Promise.resolve(idToken);
        })
        .catch((e) => {
            console.log(e);
            return Promise.reject(e);
        })
}

// Path: helpers/firebaseAuth.js

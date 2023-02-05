import { SET_AUTHENTICATION_STATUS, SET_ONBOARDING_STATUS, SET_USER_WALLET } from "../constants/constants";

export const setAuthenticationStatusAction = payload => ({
    type: SET_AUTHENTICATION_STATUS,
    payload
});

export const setOnboardingStatusAction = payload => ({
    type: SET_ONBOARDING_STATUS,
    payload
});

export const setUserWalletAction = payload => ({
    type: SET_USER_WALLET,
    payload
})
// Path: store/reducers/authReducer.js
import { SET_AUTHENTICATION_STATUS, SET_ONBOARDING_STATUS } from "../constants/constants";

export const setAuthenticationStatusAction = payload => ({
    type: SET_AUTHENTICATION_STATUS,
    payload
});

export const setOnboardingStatusAction = payload => ({
    type: SET_ONBOARDING_STATUS,
    payload
});
// Path: store/reducers/authReducer.js
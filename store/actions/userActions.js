import { SET_AUTHENTICATION_STATUS } from "../constants/constants";

export const setAuthenticationStatusAction = payload => ({
    type: SET_AUTHENTICATION_STATUS,
    payload
});

// Path: store/reducers/authReducer.js
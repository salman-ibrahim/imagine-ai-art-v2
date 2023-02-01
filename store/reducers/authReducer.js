import { SET_AUTHENTICATION_STATUS, SET_ONBOARDING_STATUS } from "../constants/constants";

const initialState = {
    isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION_STATUS:
            return {...state, isAuthenticated: action.payload};
        case SET_ONBOARDING_STATUS:
            return {...state, onboarded: action.payload};
        default:
            return state;
    }
}
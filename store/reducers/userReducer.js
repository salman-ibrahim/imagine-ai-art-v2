import { SET_USER, SET_USER_WALLET } from "../constants/constants";

const initialState = {
    user: null,
    wallet: 0,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_USER_WALLET:
            return {...state, wallet: action.payload};
        default:
            return state;
    }
}
import { SET_PROFILE_HEADER_VISIBLE } from "../constants/constants";

const initialState = {
    profileVisible: true,
};

export default function interfaceReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_HEADER_VISIBLE:
            return {...state, profileVisible: action.payload};
        default:
            return state;
    }
}
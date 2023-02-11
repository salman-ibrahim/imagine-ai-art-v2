import { SET_ADS_READY_TO_LOAD, SET_PROFILE_HEADER_VISIBLE } from "../constants/constants";

const initialState = {
    profileVisible: true,
    adsReadyToLoad: false,
};

export default function interfaceReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_HEADER_VISIBLE:
            return {...state, profileVisible: action.payload};
        case SET_ADS_READY_TO_LOAD:
            return {...state, adsReadyToLoad: action.payload};
        default:
            return state;
    }
}
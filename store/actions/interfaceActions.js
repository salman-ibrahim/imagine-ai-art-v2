import { SET_ADS_READY_TO_LOAD, SET_PROFILE_HEADER_VISIBLE } from "../constants/constants";

export const setProfileHeaderVisible = payload => ({
    type: SET_PROFILE_HEADER_VISIBLE,
    payload
});

export const setAdsReadyToLoadAction = payload => ({
    type: SET_ADS_READY_TO_LOAD,
    payload
});

// Path: store/actions/interfaceActions.js
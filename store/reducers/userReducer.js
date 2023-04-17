import { SET_REWARD_CLAIM_AVAILABILITY, SET_USER, SET_USER_WALLET } from "../constants/constants";

const initialState = {
    user: null,
    wallet: 0,
    rewardClaimAvailable: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_USER_WALLET:
            return {...state, wallet: action.payload};
        case SET_REWARD_CLAIM_AVAILABILITY:
            return {...state, rewardClaimAvailable: action.payload};
        default:
            return state;
    }
}
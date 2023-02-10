import { SAVE_GENERATED_ART, SAVE_GENERATED_ART_IDS, SET_REWARD_CLAIM_AVAILABILITY } from "../constants/constants";

export const saveGeneratedArtAction = (payload) => ({
    type: SAVE_GENERATED_ART,
    payload: [...payload]
});

export const saveGeneratedArtIdsAction = (payload) => ({
    type: SAVE_GENERATED_ART_IDS,
    payload: [...payload]
})

export const setRewardClaimAvailabilityAction = (payload) => ({
    type: SET_REWARD_CLAIM_AVAILABILITY,
    payload: payload
})
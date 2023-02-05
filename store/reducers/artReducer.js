import { SAVE_GENERATED_ART, SAVE_GENERATED_ART_IDS } from "../constants/constants";

const initialState = {
    savedArt: [],
    savedArtIds: [],
};

export default function artReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_GENERATED_ART:
            return {...state, savedArt: action.payload};
        case SAVE_GENERATED_ART_IDS:
            return {...state, savedArtIds: action.payload};
        default:
            return state;
    }
}
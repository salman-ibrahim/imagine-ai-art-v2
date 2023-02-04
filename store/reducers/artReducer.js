import { SAVE_GENERATED_ART } from "../constants/constants";

const initialState = {
    savedArt: [],
};

export default function artReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_GENERATED_ART:
            return {...state, savedArt: action.payload};
        default:
            return state;
    }
}
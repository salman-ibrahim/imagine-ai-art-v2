import PredictionService from "./PredictionService";
import Constants from "expo-constants";

const REPLICATE_ENDPOINTS = {
    PLACE_PREDICTION_JOB: '/v1/predictions',
    FETCH_PREDICTION: '/v1/predictions/{id}',
    CANCEL_PREDICTION: '/v1/predictions/{id}/cancel',
}

const STABILITY_ENDPOINTS = {
    STABILITY_DIFFUSION_TEXT_TO_IMAGE: '/v1/generation/stable-diffusion-v1-5/text-to-image'
}

const REPLICATE_MODELS = {
    STABLE_DIFFUSION: 'f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1',
}

const STABILITY_MODELS = {
    STABLE_DIFFUSION: 'stable-diffusion-v1-5',
}

const ENDPOINTS = {
    ...REPLICATE_ENDPOINTS,
    ...STABILITY_ENDPOINTS
}

const MODELS = {
    ...REPLICATE_MODELS,
    ...STABILITY_MODELS
}

class ArtService extends PredictionService {

    constructor() {
        super();
        this.init();
    }
    
    init = async () => {
        await this.setAuthorizationHeader();
        this.api.setUnauthorizedCallback(this.destroySession.bind(this));
        Promise.resolve();
    };
    
    setAuthorizationHeader = async () => {
        this.api.attachHeaders({
            Authorization: `Bearer ${Constants.expoConfig.extra.STABILITY_AI_API_KEY}`
        });
    };

    placeArtJob = async (query) => {
        try {
            const data = {
                version: MODELS.STABLE_DIFFUSION,
                input: {
                    prompt: query
                }
            }
            const response = await this.apiClient.post(ENDPOINTS.PLACE_PREDICTION_JOB, data);
            return Promise.resolve(response.data);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    fetchArt = async (id) => {
        try {
            console.log(ENDPOINTS.FETCH_PREDICTION.replace('{id}', id));
            const response = await this.apiClient.get(ENDPOINTS.FETCH_PREDICTION.replace('{id}', id));
            return Promise.resolve(response.data);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    cancelArt = async (id) => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.CANCEL_PREDICTION.replace('{id}', id));
            return Promise.resolve(response.data);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    generateArt = async (reqData) => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.STABILITY_DIFFUSION_TEXT_TO_IMAGE, reqData, {headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }});
            console.log("response is ", response.data.artifacts[0].finishReason);
            return Promise.resolve(response.data);
        }
        catch (e) {
            return Promise.reject(e.response.data);
        }
    }
}

const artService = new ArtService();
export default artService;
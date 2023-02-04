import { getData } from "../helpers/secureStore";
import PredictionService from "./PredictionService";

const ENDPOINTS = {
    PLACE_PREDICTION_JOB: '/v1/predictions',
    FETCH_PREDICTION: '/v1/predictions/{id}',
    CANCEL_PREDICTION: '/v1/predictions/{id}/cancel',
}

const MODELS = {
    STABLE_DIFFUSION: 'f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1',
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
            Authorization: 'Token 9330e4ad7a3c1a2e2bf4f7ed4fe23605541eaf3b'
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
}

const artService = new ArtService();
export default artService;
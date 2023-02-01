import { getData } from "../helpers/secureStore";
import ApiService from "./ApiService";

const ENDPOINTS = {
    LOGIN: '/login',
    REGISTER: '/register'
}

class ArtService extends ApiService {

    constructor() {
        super();
        this.init();
    }
    
    init = async () => {
        await this.setAuthorizationHeader();
        this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    };
    
    setAuthorizationHeader = async () => {
        const token = await getData('idToken')
        if (token) {
            this.api.attachHeaders({
            Authorization: 'Token a2f78985e8c032005c2cc43ccc70d0c809cc4e2d'
            });
            Promise.resolve();
        }
    };

    login  = async (data) => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.LOGIN, data);
            console.log(response);
            return Promise.resolve(response);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    register = async (data) => {
        try {
            const response = await this.apiClient.post(ENDPOINTS.REGISTER, data);
            console.log(response);
            return Promise.resolve(response);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
}

const artService = new ArtService();
export default artService;
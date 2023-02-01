import { getData } from "../helpers/secureStore";
import ApiService from "./ApiService";

const ENDPOINTS = {
    LOGIN: '/login',
    REGISTER: '/register'
}

class AuthService extends ApiService {

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
            Authorization: `Bearer ${token}`
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

const authService = new AuthService();
export default authService;
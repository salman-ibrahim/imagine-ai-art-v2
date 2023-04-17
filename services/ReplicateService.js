import axios from 'axios';
// import getEnvVars from '../environment';
import Constants from 'expo-constants';

// const {PREDICTION_MODEL_STABLE_DIFFUSION_URL} = getEnvVars();

class ReplicateService {
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse = error => {
    try {
      const { status } = error.response;
      switch (status) {
      case 401:
        console.log("inside 401")
        this.unauthorizedCallback();
        break;
      default:
        break;
      }
      
      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };

  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
}

const options = {
  baseURL: Constants.expoConfig.extra.PREDICTION_MODEL_STABLE_DIFFUSION_URL,
};
console.log("replicate url is ", options.baseURL)
const replicateService = new ReplicateService(options);

export default replicateService;

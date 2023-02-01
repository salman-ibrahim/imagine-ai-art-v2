import axios from 'axios';
import getEnvVars from '../environment';

const {PREDICTION_MODEL_STABLE_DIFFUSION_URL} = getEnvVars();

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
  baseURL: PREDICTION_MODEL_STABLE_DIFFUSION_URL
};
console.log("base url is ", PREDICTION_MODEL_STABLE_DIFFUSION_URL)
const replicateService = new ReplicateService(options);

export default replicateService;

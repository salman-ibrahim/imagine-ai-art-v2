import axios from 'axios';
// import getEnvVars from '../environment';
import Constants from 'expo-constants';

// const {API_BASE_URL} = getEnvVars();

class HttpService {
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
  baseURL: Constants.expoConfig.extra.API_BASE_URL,
};
console.log("base url is ", options.baseURL)
const httpService = new HttpService(options);

export default httpService;

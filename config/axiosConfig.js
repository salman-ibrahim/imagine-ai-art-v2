import axios from 'axios';
import getEnvVars from '../environment';
import { getBearerToken } from '../helpers/firebaseAuth';

const {API_BASE_URL} = getEnvVars();

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axiosInstance;

//
// Path: config/axiosConfig.js

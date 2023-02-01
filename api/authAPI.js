import {default as axios} from "../config/axiosConfig";

export const login = (data) => {
    return axios.post('/login', data)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export const register = (data) => {
    return axios.post('/register', data)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
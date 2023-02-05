import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import interfaceReducer from './interfaceReducer';
import artReducer from './artReducer';

export default combineReducers({
    authReducer,
    userReducer,
    interfaceReducer,
    artReducer,
});

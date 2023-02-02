import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import interfaceReducer from './InterfaceReducer';

export default combineReducers({
    authReducer,
    userReducer,
    interfaceReducer,
});

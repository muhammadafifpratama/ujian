import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    INPUT_TEXT,
    LOADING_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from './types';

export const onInputText = (prop, value) => {
    return {
        type: INPUT_TEXT,
        payload: { 
            prop, value
        }
    }
}

export const onUserEnter = ({ username}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING_LOGIN })

            await AsyncStorage.setItem('username', username);
            dispatch({ 
                type: USER_LOGIN_SUCCESS,
                payload: { username }
            })
        } catch(err) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.response ? err.response.data.message : err.message
            })
        }
    }
}

export const userEnterCheck = () => {
    return async (dispatch) => {
        try {
            const username = await AsyncStorage.getItem('username');
            if(!username) {
                return dispatch({ type: USER_LOGIN_FAIL })
            }

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: { username }
            })
        } catch(err) {
            dispatch({ type: USER_LOGIN_FAIL })
        }  
    }
}

export const onUserLogout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('username')
        dispatch({ type: USER_LOGIN_FAIL })
    }
}
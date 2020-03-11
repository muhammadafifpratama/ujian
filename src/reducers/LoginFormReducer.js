import {
    INPUT_TEXT,
    USER_LOGIN_FAIL,
    LOADING_LOGIN,
    USER_LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    error: '',
    loading: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case INPUT_TEXT :
            return { ...state, [action.payload.prop]: action.payload.value }
        case USER_LOGIN_FAIL :
            return { ...state, loading: false, error: action.payload }
        case LOADING_LOGIN :
            return { ...state, loading: true, error: '' }
        case USER_LOGIN_SUCCESS :
            return INITIAL_STATE
        default :
            return state      
    }
}
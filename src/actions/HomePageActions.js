import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    FILL_LIST_POST,
    INIT_RESTAURANT_DETAILS
} from './types';

export const getHomeListPost = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('https://store.steampowered.com/api/featured/')
            dispatch({
                type: FILL_LIST_POST,
                payload: res.data.featured_win
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const initRestaurantDetails = (resto) => {
    return {
        type: INIT_RESTAURANT_DETAILS,
        payload: resto
    }
}
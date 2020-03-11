import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    FILL_LIST_POST,
    INIT_RESTAURANT_DETAILS
} from './types';

export const getHomeListPost = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('https://developers.zomato.com/api/v2.1/search?start=1&count=10&sort=rating', {
                headers: {
                    "user-key": "75162bb707dfc9544420513e4f7bb699"
                }
            })
            dispatch({
                type: FILL_LIST_POST,
                payload: res.data.restaurants
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
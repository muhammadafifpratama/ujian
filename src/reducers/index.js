import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoginFormReducer from './LoginFormReducer';
import HomeListPostReducer from './HomeListPostReducer';
import RestaurantDetailsReducer from './RestaurantDetailsReducer';
import reviewreducer from './reviewdetails'
import transaksireducer from './transaksireducer'

export default combineReducers({
    user: UserReducer,
    loginForm: LoginFormReducer,
    homeListPost: HomeListPostReducer,
    restaurantDetails: RestaurantDetailsReducer,
    reviewdetails: reviewreducer,
    transaksi: transaksireducer
})
import {
    INIT_RESTAURANT_DETAILS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    featured_image: '',
    user_rating: {
        aggregate_rating: ''
    },
    location: {
        address: ''
    },
    cuisines: '',
    timings: '',
    currency: '',
    average_cost_for_two: '',
    id: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_RESTAURANT_DETAILS:
            return action.payload
        default:
            return state
    }
}
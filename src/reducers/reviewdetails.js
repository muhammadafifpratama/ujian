const INITIAL_STATE = {
    rating: '',
    review_text: '',
    rating_text: '',
    review_time_friendly: '',
    user: {
        name: '',
    },
    review: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INIT_Review_DETAILS':
            return action.payload
        case 'FILL_LIST_review': 
            return { review: action.payload, loading: false }
        default:
            return state
    }
}
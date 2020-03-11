import axios from 'axios';

// export const initreviewdetail = (review) => {
//     return {
//         type: 'INIT_Review_DETAILS',
//         payload: review
//     }
// }

export const getreviewlist = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('https://developers.zomato.com/api/v2.1/reviews?res_id=19257791&start=1&count=2', {
                headers: {
                    "user-key": "74b25737566cc5cfe2644bcdf3265f8e"
                }
            })

            dispatch({
                type: 'FILL_LIST_review',
                payload: res.data.user_reviews
            })
        } catch (err) {
            console.log(err)
        }
    }
}
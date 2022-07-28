import { csrfFetch } from "./csrf";

const USER_REVIEWS = 'reviews/reviewsUser';
const SPOT_REVIEWS = 'reviews/allReviews';
const CREATE_REVIEW  = 'reviews/createReview';
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = 'review/deleteReview';

const userReviews = reviews => ({
    type: USER_REVIEWS,
    reviews,
});

const spotReviews = reviews => ({
    type: SPOT_REVIEWS,
    reviews,
});

const createReview = reviews => ({
    type: CREATE_REVIEW,
    reviews,
});

const editReview = reviews => ({
    type: EDIT_REVIEW,
    reviews,
});

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id,
});

// Get all Reviews of the Current User
export const allUserReviews = () => async (dispatch) => {
    const response = await fetch('/api/your-reviews');
    if (response.ok) {
        const data = await response.json();
        dispatch(userReviews(data));
    }
}

// Get all Reviews by a Spot's id
export const allSpotReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/:spotId`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(spotReviews(reviews));
      return reviews;
    }
  };

// Create a Review for a Spot based on the Spot's id
export const addReview = (spotId, reviewData) => async (dispatch) => {
    const { review, stars } = reviewData;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        }),
    });
    const data = await response.json();
    dispatch(createReview(data));
    return response;
};

// Edit a Review
export const updateSpot = (spotId, reviewData) => async dispatch => {
    const { review, stars } = reviewData;
    const response = await csrfFetch(`/api/`, {
      method: 'PUT',
      body: JSON.stringify({
        review,
        stars
    }),
    })
    if (response.ok) {
      const updatedReview = await response.json()
      dispatch(editReview(updatedReview))
      return updatedReview;
    }
    return response
  };


// Delete a Review
export const removeReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });
    dispatch(deleteReview(id));
    return response;
};



const initialState = {};

export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case USER_REVIEWS:
            newState = Object.assign({}, state);
            action.reviews.map(review => newState[review.id] = review);
            return newState;
        case SPOT_REVIEWS:
            newState = Object.assign({}, state);
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        case CREATE_REVIEW:
            newState = Object.assign({}, state);
            newState[action.review.id] = action.payload;
            return newState;
        case EDIT_REVIEW:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

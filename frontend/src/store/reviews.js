import { csrfFetch } from "./csrf"

const GET_ROOM_REVIEWS = 'reviews/GET_ROOM_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getRoomReviews = (reviews) => ({
  type: GET_ROOM_REVIEWS,
  reviews
})


const addReview = (newReview) => ({
  type: ADD_REVIEW,
  newReview
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})


export const getAllRoomReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getRoomReviews(reviews.Review))
    return reviews;
  }
}

export const addNewReview = (reviewData) => async (dispatch) => {
  const { userId, spotId, stars, review } = reviewData;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId, spotId, stars, review
    })
  })

  if (response.ok) {
    const newReview = await response.json()
    dispatch(addReview(newReview));
    return newReview;
  }
}

export const updateReview = (reviewData) => async (dispatch) => {
  const { reviewId, userId, stars, review } = reviewData;
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reviewId, userId, stars, review
    })
  })


  if (response.ok) {
    const review = await response.json()
    dispatch(editReview(review));
    return review;
  }
}

export const removeReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const review = await response.json();
    dispatch(deleteReview(reviewId))
    return review;
  }
}


const reviewsReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case GET_ROOM_REVIEWS: {
      for (let review of action.reviews) newState[review.id] = review
      return newState
    }
    case ADD_REVIEW: {
      newState = { ...state }
      newState[action.newReview.id] = action.newReview
      return newState
    }
    case EDIT_REVIEW: {
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    }
    case DELETE_REVIEW: {
      newState = { ...state }
      delete newState[action.reviewId]
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer

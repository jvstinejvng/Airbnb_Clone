import { csrfFetch } from './csrf';

const ADD_IMAGES = 'images/createImages';
const DELETE_IMAGE = 'images/deleteImages';

const createImages = (img) => {
    return {
        type: ADD_IMAGES,
        payload: img,
    };
};

const deleteImage = (id) => {
    return {
        type: DELETE_IMAGE,
        id,
    };
};

export const addSpotImage = (spotId, newImage) => async (dispatch) => {
    const { url } = newImage;
    const response = await csrfFetch(`/api/image/spots//${spotId}`, {
        method: "POST",
        body: JSON.stringify({
            url
        }),
    });
    const data = await response.json();
    dispatch(createImages(data));
    return response;
};

export const addReviewImage = (reviewId, newImage) => async (dispatch) => {
    const { url } = newImage;
    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        body: JSON.stringify({
            url
        }),
    });
    const data = await response.json();
    dispatch(createImages(data));
    return response;
};

export const removeImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
    });
    dispatch(deleteImage(id));
    return response;
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGES:
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_IMAGE:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default imageReducer;

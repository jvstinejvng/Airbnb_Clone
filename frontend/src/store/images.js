import { csrfFetch } from "./csrf"

const CREATE_IMAGES = 'images/CREATE_IMAGES'
const GET_IMAGES ='images/GET_IMAGES'
const DELETE_IMAGE = 'images/deleteImages';


export const getAllImages = (state) => Object.values(state.images)

const createImages = (image) => ({
  type: CREATE_IMAGES,
  image
})

const getImages = (images) => ({
  type: GET_IMAGES,
  images
})

const deleteImage = (id) => {
  return {
      type: DELETE_IMAGE,
      id,
  };
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

export const listAllImages = () => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);
  if (response.ok) {
    const imageObj = await response.json();
    dispatch(getImages(imageObj.images))
  }
  return response;
}

export const addNewImages = (spotId, imageData) => async (dispatch) => {
  const { userId, type, url } = imageData;
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({
      userId, spotId, type, url
    })
  })
  if (response.ok) {
    const newImage = await response.json()
    dispatch(createImages(newImage));
    return newImage;
  }
}

export const removeImage = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${id}`, {
      method: 'DELETE',
  });
  dispatch(deleteImage(id));
  return response;
};


const initialState = {}
const imageReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case GET_IMAGES: {
      action.images.map(image => newState[image.id] = image)
      return newState
    }
    case CREATE_IMAGES: {
      newState[action.image.id] = action.image;
      return newState;
    }
    case DELETE_IMAGE:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

export default imageReducer;

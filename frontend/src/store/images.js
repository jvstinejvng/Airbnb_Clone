import { csrfFetch } from "./csrf"

const CREATE_IMAGES = 'images/CREATE_IMAGES'
const GET_IMAGES ='images/GET_IMAGES'

export const getAllImages = (state) => Object.values(state.images)

const createImages = (image) => ({
  type: CREATE_IMAGES,
  image
})

const getImages = (images) => ({
  type: GET_IMAGES,
  images
})

export const listAllImages = () => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);
  if (response.ok) {
    const imageObj = await response.json();
    dispatch(getImages(imageObj.images))
  }
  return response;
}

export const addNewImages = (imageData) => async (dispatch) => {
  const { userId, spotId, type, url } = imageData;
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
    default:
      return state;
  }
}

export default imageReducer;

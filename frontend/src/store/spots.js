import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/GET_SPOTS'
const FIND_SPOTS = 'spots/FIND_SPOTS'
const EDIT_SPOTS = 'spots/EDIT_SPOTS'
const CREATE_SPOTS = 'spots/CREATE_SPOTS'
const DELETE_SPOTS = 'spots/DELETE_SPOTS'

export const getAllRooms = (state) => Object.values(state.spots)

const getSpot = (spots) => ({
  type: GET_SPOTS,
  spots
})

const findSpot = (spot) => ({
  type: FIND_SPOTS,
  spot
})

const editSpot = (spot) => ({
  type: EDIT_SPOTS,
  spot
})

const createSpot = (newSpot) => ({
  type: CREATE_SPOTS,
  newSpot
})

const deleteSpot = (spotId) => ({
  type: DELETE_SPOTS,
  spotId
})

export const allSpots = (country) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spotsObj = await response.json();
    dispatch(getSpot(spotsObj.Spots))
  }
  return response;
}

export const findSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(findSpot(spot))
  }
  return response;
}

export const addSpot = (spotData) => async (dispatch) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price, type, category, pets, yard, children, personalpets} = spotData;
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    body: JSON.stringify({
      ownerId, address, city, state, country, lat, lng, name, description, price, type, category, pets, yard, children, personalpets
    })
  })
  if (response.ok) {
    const newSpot = await response.json()
    dispatch(createSpot(newSpot));
    return newSpot;
  }
}

export const spotEdit = (spotData) => async (dispatch) => {
  const { spotId, ownerId, address, city, state, country, lat, lng, name, description, price, type, category, pets, yard, children, personalpets } = spotData;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
      spotId, ownerId, address, city, state, country, lat, lng, name, description, price, type, category, pets, yard, children, personalpets
    })
  })
  if (response.ok) {
    const spot = await response.json()
    dispatch(editSpot(spot));
    return spot;
  }
}

export const spotDelete = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    body: JSON.stringify({
      spotId
    })
  })
  const deletedSpot = await response.json();
  dispatch(deleteSpot(spotId));
  return deletedSpot;
}

const initialState = {}
const spotReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case GET_SPOTS: {
      for (let spot of action.spots) newState[spot.id] = spot
      return newState
    }
    case FIND_SPOTS: {
      newState[action.spot.id] = action.spot;
      return { ...state, ...newState };
    }
    case CREATE_SPOTS: {
      newState[action.newSpot.id] = action.newSpot;
      return newState;
    }
    case EDIT_SPOTS: {
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case DELETE_SPOTS: {
      delete newState[action.spotId]
      return newState;
    }
    default:
      return state;
  }
}

export default spotReducer;

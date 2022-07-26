import { csrfFetch } from "./csrf";

const GET_SPOT = "spots/get-spot";
const GET_ALL_SPOTS = "spots/get-all-spots";

const getAll = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,

  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

//Get all spots
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots")
  if (response.ok) {
      const spots = await response.json();
      dispatch(getAll(spots))
      const all = {};
      spots.forEach(spot => all[spot.id] = spot);
      return { ...all };
  }
};

//Get a spot
export const findASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(getSpot(spot))
  }
  return response;
};

const initialState = {}
const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = {};
      action.spots.forEach(spot => allSpots[spot.id] = spot);
      return { ...allSpots, ...state };
    }
    case GET_SPOT: {
      newState[action.spot.id] = action.spot;
      return {...state, ...newState}
    }
    default:
      return state;
  }
}

export default spotsReducer;
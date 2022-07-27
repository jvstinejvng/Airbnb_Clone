import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spots/allSpots';
const SPOT_DETAILS = 'spots/spotDetails';
const CREATE_SPOT = 'spots/createSpot';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_SPOT = 'spots/delete_Spot';

const allSpots = spots => {
  return {
    type: ALL_SPOTS,
    spots
  };
};

const spotDetails = spot => {
  return {
    type: SPOT_DETAILS,
    spot
  };
};

const createNewSpot = spot => {
  return {
    type: CREATE_SPOT,
    spot
  };
};

const editSpot = spot => {
  return {
    type: EDIT_SPOT,
    spot
  };
};

const deleteSpot = id => {
  return {
    type: DELETE_SPOT,
    id
  }
};

//get all spots - works 
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spots = await response.json();
    dispatch(allSpots(spots));
    return spots
  }
  return response;
};

// Get details of a Spot from an id - works
export const getSpotById = id => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetails(spot));
    return spot
  }
  return response;
};

// Create a new Spot 
export const createSpot = newSpot => async dispatch => {
  const { address, city, state, country, lat, lng, name, description, price, previewImage } = newSpot;
  const response = await csrfFetch(`/api/spots`, {
      method: "POST",
      body: JSON.stringify({ 
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price, 
        previewImage,  
      }),
  });
  const spotData = await response.json();
  dispatch(createNewSpot(spotData));
  return response;
};

// Edit a spot 
export const updateSpot = (spotId, spotData) => async dispatch => {
  const { address, city, state, country, lat, lng, name, description, price, previewImage } = spotData
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify({  
      address, 
      city, 
      state, 
      country, 
      lat, 
      lng, 
      name, 
      description, 
      price, 
      previewImage, 
    }),
  })
  if (response.ok) {
    const spotData = await response.json()
    dispatch(editSpot(spotData))
    return spotData;
  }
  return response
};

// Delete a spot
export const removeSpot = id => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    const spotData = await response.json()
    dispatch(deleteSpot(id))
    return spotData
  }
  return response;
};

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_SPOTS: {
      newState = Object.assign({}, state);
      action.spots.forEach(spot => newState[spot.id] = spot);
      return newState;
    }
    case SPOT_DETAILS: {
      newState = Object.assign({}, state);
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case CREATE_SPOT: {
      newState = Object.assign({}, state);
      newState[action.spot.id] = action.spot;
      return newState;    
    }
    case EDIT_SPOT: {
      newState = Object.assign({}, state);
      newState[action.spot.id] = action.spot;
      return newState;    
    }
    case DELETE_SPOT: {
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}



export default spotsReducer;
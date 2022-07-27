import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spots/allSpots';
const SPOT_DETAILS = 'spots/SpotDetail';
const CREATE_SPOT = 'spots/createSpot';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_SPOT = 'spots/deleteSpot';

const allSpots = spot => {
  return {
    type: ALL_SPOTS,
    spot
  };
};

const spotDetail = spot => {
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

//get all spots
export const getAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/all');
  if (response.ok) {
    const spots = await response.json();
    dispatch(allSpots(spots.Spots));
    return response
  }
  return response;
};

// Get details of a Spot from an id
export const getSpotById = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetail(spot));
    return spot
  }
  return response;
};

// Create a new Spot
export const createSpot = (newSpot) => async (dispatch) => {
  const { id, ownerId, address, city, state, country, lat, lng, name, description, price, previewImage } = newSpot;
  const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({ 
        id, 
        ownerId,
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
export const updateSpot = spotData => async dispatch => {
  const { id, ownerId, address, city, state, country, lat, lng, name, description, price, previewImage } = spotData
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id, 
      ownerId,
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
    })
  })
  if (response.ok) {
    const spotId = await response.json()
    dispatch(editSpot(spotId))
    return spotId;
  }
  return response
};

// Delete a spot
export const removeSpot = id => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    const message = await response.json()
    dispatch(deleteSpot(id))
    return message
  }
  return response;
};

const initialState = {}
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const allSpots = {};
        action.spots.forEach(spot => { allSpots[spot.id] = spot});
      return { ...allSpots, ...state };
    }
    case SPOT_DETAILS: {
      const spot = action.spot;
      return { ...spot, ...state };
    }
    case CREATE_SPOT: {
      let newSpot = {...state};
      newSpot[action.spot.id] = action.spot;
      return newSpot;
    }
    case DELETE_SPOT: {
      const deleteSpot = {...state};
      delete deleteSpot[action.id];
      return deleteSpot
    }
    default:
      return state;
  }
}

export default spotsReducer
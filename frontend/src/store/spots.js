import { csrfFetch } from "./csrf";


const GET_SPOTS = 'spots/getAllSpots';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot'
// const EDIT_SPOT = "spots/edit";
const GET_ONE_SPOT = 'spots/getOneSpot';

const getAllSpots = (payload) => {
  return {
      type: GET_SPOTS,
      payload,
  };
};

const getOneSpot = (payload) => {
  return {
      type: GET_ONE_SPOT,
      payload,
  };
};

const createSpot = (payload) => {
  return {
      type: CREATE_SPOT,
      payload,
  };
};

const deleteSpot = (id) => {
  return {
      type: DELETE_SPOT,
      id,
  };
};




//Get all spots
export const loadSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
    dispatch(getAllSpots(data.Spots));
    return response;
};

//Get a spot detail

export const loadOneSpot = (id) => async dispatch => {
  const response = await csrfFetch("/api/spots/your-spots");
  const data = await response.json();
  dispatch(getOneSpot(data));
  return response;
};

//Get the current user's spots

export const loadUserSpots = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(getAllSpots(data.Spots));
  return response;
};

//Create a spot
export const addSpot = (newSpot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price, previewImage } = newSpot;
  const response = await csrfFetch("/api/spots/create", {
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
const data = await response.json();
dispatch(createSpot(data));
return response;
};


// //edit a spot
// export const spotEdit = (spot) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(spot),
//   });
//   if (response.ok) {
//     const editedSpot = await response.json();
//     dispatch(editSpot(editedSpot));
//     return editedSpot;
//   }
//   return response;
// };

//delete a spot
export const removeSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'DELETE',
  });
  dispatch(deleteSpot(id));
  return response;
};


const initialState = {};
const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS: {
      newState = Object.assign({}, state);
      action.payload.map(spot => newState[spot.id] = spot);
      return newState;
    }
    case CREATE_SPOT: {
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_SPOT: {
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    }
    // case EDIT_SPOT: {
    //   const newState = { ...state };
    //   newState[action.editedSpot.id] = action.editedSpot;
    //   return newState;
    // }
    case GET_ONE_SPOT: {
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;

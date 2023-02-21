import { csrfFetch } from "./csrf"

const FETCH_API_KEY = 'maps/FETCH_API_KEY'

const fetchAPIKey = (APIKey) => ({
  type: FETCH_API_KEY,
  APIKey
})

export const getAPIKey = () => async (dispatch) => {
  const response = await csrfFetch(`/api/maps/key`, {
    method: "POST"
  })
  const data = await response.json();
  dispatch(fetchAPIKey(data.mapsAPIKey))
}

const initialState = { key: null }

const mapReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case FETCH_API_KEY: {
      newState.key = action.APIKey
      return newState
    }
    default:
      return state;
  }
}

export default mapReducer;

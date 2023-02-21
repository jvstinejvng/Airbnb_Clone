import { csrfFetch } from './csrf';

const GET_USERS = 'session/GET_USERS';

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const listAllUsers = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users`);
  if (response.ok) {
    const usersObj = await response.json();
    dispatch(getUsers(usersObj.users))
  }
  return response;
}

const initialState = {}
const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USERS:
      newState = {}
      action.users.map(user => newState[user.id] = user)
      return newState
    default:
      return state;
  }
};

export default userReducer;

import { csrfFetch } from "./csrf"

const GET_BOOKINGS = 'bookings/GET_BOOKINGS'
const FIND_BOOKINGS = 'bookings/FIND_BOOKINGS'
const EDIT_BOOKINGS = 'bookings/EDIT_BOOKINGS'
const CREATE_BOOKINGS = 'bookings/CREATE_BOOKINGS'
const DELETE_BOOKINGS = 'bookings/DELETE_BOOKINGS'

export const getAllBookings = (state) => Object.values(state.bookings)

const listBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings
})

const findBookings = (bookings) => ({
  type: FIND_BOOKINGS,
  bookings
})

const editBookings = (bookings) => ({
  type: EDIT_BOOKINGS,
  bookings
})

const createBookings = (newBooking) => ({
  type: CREATE_BOOKINGS,
  newBooking
})

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKINGS,
  bookingId
})

export const getSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const bookingObj = await response.json();
    dispatch(listBookings(bookingObj.bookings))
  }
  return response;
}

export const listAllBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`)
  if (response.ok) {
    const bookings = await response.json()
    dispatch(findBookings(bookings.Bookings))
  }
  return response;
}

export const getNewBooking = (bookingData) => async (dispatch) => {
  const { userId, spotId, startDate, endDate } = bookingData;
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    body: JSON.stringify({
      userId, spotId, startDate, endDate
    })
  })
  if (response.ok) {
    const newBooking = await response.json()
    dispatch(createBookings(newBooking));
    return newBooking;
  }
}

export const updateBooking = (bookingData) => async (dispatch) => {
  const { bookingId, userId, spotId, startDate, endDate } = bookingData;
  const response = await csrfFetch(`/api/spots/${spotId}/bookings/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify({
      userId, spotId, startDate, endDate
    })
  })
  if (response.ok) {
    const bookings = await response.json()
    dispatch(editBookings(bookings));
    return bookings;
  }
}

export const bookingDelete = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  })
  const deleteBooking = await response.json();
  dispatch(deleteBooking(bookingId));
  return deleteBooking;
}

const initialState = {}
const bookingReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case GET_BOOKINGS: {
      action.bookings.map(booking => newState[booking.id] = booking)
      return newState;
    }
    case FIND_BOOKINGS: {
      action.bookings.map(booking => newState[booking.id] = booking)
      return newState;
    }
    case CREATE_BOOKINGS: {
      newState = { ...state }
      newState[action.newBooking.id] = action.newBooking;
      return newState;
    }
    case EDIT_BOOKINGS: {
      newState = { ...state }
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case DELETE_BOOKINGS: {
      newState = { ...state }
      delete newState[action.bookingId]
      return newState;
    }
    default:
      return state;
  }
}

export default bookingReducer;

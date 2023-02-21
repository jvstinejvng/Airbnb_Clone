import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./images";
import bookingReducer from "./bookings";
import spotReducer from "./spots";
import sessionReducer from "./session";
import mapReducer from "./maps";
import userReducer from "./users"
import reviewsReducer from "./reviews";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  images: imageReducer,
  bookings: bookingReducer,
  map: mapReducer,
  users: userReducer,
  reviews: reviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

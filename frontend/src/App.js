// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";

import SignupForm from "./components/UserForms/SignupForm";
import SpotDetails from "./components/SpotDetails";
import HomePage from "./components/HomePage"
import UserSpots from "./components/UserSpots";
import BecomeAHost from "./components/BecomeAHost";
import UserBookings from "./components/UserBookings";
import Footer from "./components/NavigationBar/Footer";
import SearchResults from "./components/HomePage/SearchResults";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupForm isLoaded={isLoaded} />
          </Route>
          <Route path="/bookings">
            <UserBookings isLoaded={isLoaded} />
          </Route>
          <Route path="/hosting">
            <BecomeAHost isLoaded={isLoaded} />
          </Route>
          <Route path="/yourlistings">
            <UserSpots isLoaded={isLoaded} />
          </Route>
          <Route path="/rooms/:spotId">
            <SpotDetails isLoaded={isLoaded} />
          </Route>
          <Route path="/search/:result/:pets">
            <SearchResults isLoaded={isLoaded} />
          </Route>
          <Route path='filter/:category'>
            <HomePage isLoaded={isLoaded} />
          </Route>
          <Route exact path="/">
            <HomePage isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;

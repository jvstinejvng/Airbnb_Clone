import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";

import SpotsPage from "./components/Spots";
import CreateSpot from "./components/SpotsForm";
import SpotDetail from "./components/SpotDetail";
import EditSpot from "./components/SpotEdit"
import UserSpots from "./components/UserSpots";
import CreateReview from "./components/SpotDetail/createReview";
import Reviews from "./components/UserReviews";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <SpotsPage />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/users/current/spots">
            <UserSpots />
          </Route>
          <Route exact path="/spots/:spotId/createReview">
            <CreateReview />
          </Route>
          <Route exact path="/user/reviews">
            <Reviews />
          </Route>
        </Switch>
    </>
)}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import BecomeAHost from "./components/BecomeAHost";
import CreateReview from "./components/CreateReview";
import EditListing from "./components/EditListing"
import HomePage from "./components/HomePage";
import ListingDetail from "./components/ListingDetail";
import NavigationBar from "./components/NavigationBar";
import UserListing from "./components/UserListings";
import UserReviews from "./components/UserReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  return (
    <>
      <NavigationBar isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/spots/create">
            <BecomeAHost />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditListing />
          </Route>
          <Route exact path="/spots/:spotId">
            <ListingDetail />
          </Route>
          <Route exact path="/users/current/spots">
            <UserListing />
          </Route>
          <Route exact path="/spots/:spotId/createReview">
            <CreateReview />
          </Route>
          <Route exact path="/user/reviews">
            <UserReviews />
          </Route>
          <Route path="*">
            <div className="NotFound">404 Page Not Found</div>
          </Route>
        </Switch>
    </>
)}

export default App;

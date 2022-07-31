import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

import SpotsPage from "./components/Spots";
import SpotDetail from "./components/SpotDetail";
import CreateSpot from "./components/SpotsForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/spots">
            <SpotsPage />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
        </Switch>
    </>
)}

export default App;

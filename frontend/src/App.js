import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Modal } from "../src/context/Modal";

import LoginFormModal from "./components/LoginFormModal";
import Navigation from "./components/Navigation";
import SignupFormModal from "./components/SignupFormModal";


import AllSpots from "./components/Spots/allSpotsHomepage";
import CreateSpot from "./components/Spots/CreateSpot";
import EditSpot from "./components/Spots/EditSpot";
import SpotDetails from "./components/Spots/SpotDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/signup">
            <SignupFormModal />
          </Route>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route exact path="/spots/createspot">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/createspot">
            <EditSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
        
        </Switch>
      )}
    </>
  );
}


export default App;
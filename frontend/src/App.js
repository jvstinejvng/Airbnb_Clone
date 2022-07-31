import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";

import SpotsPage from "./components/Spots";
import CreateSpot from "./components/SpotsForm";


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
        </Switch>
    </>
)}

export default App;

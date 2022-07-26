import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormModal from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetail from "./components/SpotDetail";
import SpotsPage from "./components/Spots";
import NewSpotForm from "./components/SpotsForm";

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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/">
            <SpotsPage />
          </Route>
          <Route>
            <NewSpotForm exact path="/spots/create"/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Main from "./pages/Main";
import Portal from "./pages/Portal";

import Modal from "./core/UI/Modal";

import AppRoutes from "./constants/app-routes";

const App = () => {
  const isLoggedIn = true;

  return (
    <>
      <Modal />
      <BrowserRouter>
        <Switch>
          <Route path={AppRoutes.MainPage.path} exact>
            <Redirect to={AppRoutes.ContactPage.path} />
          </Route>
          <Route path={AppRoutes.ContactPage.path}>
            {isLoggedIn ? (
              <Main />
            ) : (
              <Redirect to={AppRoutes.SignInPage.path} />
            )}
          </Route>
        </Switch>
        <Portal />
      </BrowserRouter>
    </>
  );
};

export default App;

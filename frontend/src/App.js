import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "./pages/Main";
import Portal from "./pages/Portal";

import AppRoutes from "./constants/app-routes";

import Modal from "./core/UI/Modal";
import Snackbar from "./core/UI/Snackbar";

const App = () => {
  const { notification, modal } = useSelector((state) => state.ui);

  const isLoggedIn = true;

  return (
    <>
      {notification && (
        <Snackbar color={notification.color} message={notification.message} />
      )}
      {/* <Modal /> */}
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

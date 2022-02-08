import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Main from "./pages/Main";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

import AppRoutes from "./constants/app-routes";

import Snackbar from "./core/UI/Snackbar";

import { validateToken } from "./redux/auth-slice";

const App = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.ui);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const _token = localStorage.getItem("TOKEN");
    if (_token !== null) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Snackbar color={notification.color} message={notification.message} />
      )}
      <BrowserRouter>
        <Switch>
          <Route path={AppRoutes.MainPage.path} exact>
            <Redirect to={AppRoutes.ContactPage.path} />
          </Route>
          <Route path={AppRoutes.SignInPage.path} exact>
            {isLoggedIn ? (
              <Redirect to={AppRoutes.ContactPage.path} />
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path={AppRoutes.SignUpPage.path} exact>
            {isLoggedIn ? (
              <Redirect to={AppRoutes.ContactPage.path} />
            ) : (
              <SignUp />
            )}
          </Route>
          <Route path={AppRoutes.ContactPage.path}>
            {isLoggedIn ? (
              <Main />
            ) : (
              <Redirect to={AppRoutes.SignInPage.path} />
            )}
          </Route>
          <Route path="*">
            <Redirect to={AppRoutes.ContactPage.path} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;

import React from "react";

import { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SignInPage from "./pages/SignInPage";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import { AuthContextProvider } from "./context/auth-context";
import { validateToken } from "./redux/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const _token = localStorage.getItem("TOKEN");
    if (_token !== null) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/contacts" />
          </Route>
          <Route path="/sign-up" exact>
            <SignUpPage />
          </Route>
          <Route path="/sign-in" exact>
            <SignInPage />
          </Route>
          <Route path="/contacts">
            {isLoggedIn ? <Main /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

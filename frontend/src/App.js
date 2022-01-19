import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import { AuthContextProvider } from "./context/auth-context";

function App() {
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
            <Main />
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

import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import SignInPage from "./pages/SignInPage";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import { AuthContextProvider } from "./context/auth-context";
import store from "./redux/store";

function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
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
      </Provider>
    </AuthContextProvider>
  );
}

export default App;

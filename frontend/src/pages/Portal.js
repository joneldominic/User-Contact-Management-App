import { Switch, Route } from "react-router-dom";

import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";

const Portal = (props) => {
  return (
    <Switch>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route path="/sign-in" exact>
        <SignIn />
      </Route>
    </Switch>
  );
};

export default Portal;

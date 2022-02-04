import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Main from "./pages/Main";

import AppRoutes from "./constants/app-routes";

// import Avatar from "./core/UI/Avatar";
// import Button from "./core/UI/Button";
// import Card from "./core/UI/Card";
// import CardActions from "./core/UI/CardActions";
// import CardContent from "./core/UI/CardContent";
// import CardHeader from "./core/UI/CardHeader";

import Portal from "./pages/Portal";

const App = () => {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoutes.MainPage.path} exact>
          <Redirect to={AppRoutes.ContactPage.path} />
        </Route>
        <Route path={AppRoutes.ContactPage.path}>
          {isLoggedIn ? <Main /> : <Redirect to={AppRoutes.SignInPage.path} />}
        </Route>
      </Switch>
      <Portal />
    </BrowserRouter>
  );
};

export default App;

// <div>
// <Card>
//   <CardHeader
//     avatar={<Avatar>JT</Avatar>}
//     title="Card Title goes Here"
//     subtitle="Subtitle"
//   />
//   <CardContent>Content goes here....</CardContent>
//   <CardActions>
//     <Button
//       variant="contained"
//       color="primary"
//       sx={{ [`margin-left`]: "auto" }}
//     >
//       Success
//     </Button>
//   </CardActions>
// </Card>
// </div>

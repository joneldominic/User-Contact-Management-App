import React from "react";

import ContactDetailDisplay from "./ContactDetail/Display/ContactDetailDisplay";
import ContactDetailEdit from "./ContactDetail/Edit/ContactDetailEdit";
import NewContact from "./ContactDetail/New/NewContact";

// import styles from "./RightSection.module.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NoContactSelected from "./ContactDetail/NoContactSelected/NoContactSelected";

const RightSection = (props) => {
  return (
    <div className={`${props.className}`}>
      <Switch>
        <Route path="/contacts" exact>
          <NoContactSelected />
        </Route>
        <Route path="/contacts/new" exact>
          <NewContact />
        </Route>
        <Route path="/contacts/:contactId" exact>
          <ContactDetailDisplay />
        </Route>
        <Route path="/contacts/:contactId/edit" exact>
          <ContactDetailEdit />
        </Route>
        <Route path="*">
          <Redirect to="/contacts" />
        </Route>
      </Switch>
    </div>
  );
};

export default RightSection;

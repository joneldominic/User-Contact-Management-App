import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ContactDetailsView from "./ContactDetailsView";
import ContactDetailsEdit from "./ContactDetailsEdit";
import ContactDetailsNew from "./ContactDetailsNew";
import NoContactSelected from "./NoContactSelected";

import { ContactDetailsContainer, ContactDetailsCard } from "./styles";

const ContactDetails = () => {
  return (
    <ContactDetailsContainer>
      <ContactDetailsCard>
        <Switch>
          <Route path="/contacts" exact>
            <NoContactSelected />
          </Route>
          <Route path="/contacts/new" exact>
            <ContactDetailsNew />
          </Route>
          <Route path="/contacts/:contactId" exact>
            <ContactDetailsView />
          </Route>
          <Route path="/contacts/:contactId/edit" exact>
            <ContactDetailsEdit />
          </Route>
          <Route path="*">
            <Redirect to="/contacts" />
          </Route>
        </Switch>
      </ContactDetailsCard>
    </ContactDetailsContainer>
  );
};

export default ContactDetails;

import React from "react";

import ContactList from "../ContactList/ContactList";
import ContactDetails from "../ContactDetails/ContactDetails";

import { ContactContainer } from "./styles";

const Contacts = () => {
  return (
    <ContactContainer>
      <ContactList></ContactList>
      <ContactDetails></ContactDetails>
    </ContactContainer>
  );
};

export default Contacts;

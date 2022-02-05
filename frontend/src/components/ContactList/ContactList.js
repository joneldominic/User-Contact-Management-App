import React from "react";

import SearchBar from "./SearchBar";
import FloatingAddButton from "./FloatingAddButton";

import {
  ContactListContainer,
  ContactListCard,
  ContactListCardContent,
  Divider,
} from "./styles";

const ContactList = () => {
  return (
    <ContactListContainer>
      <ContactListCard>
        <ContactListCardContent>
          <SearchBar />
          <Divider />
        </ContactListCardContent>
      </ContactListCard>
      <FloatingAddButton />
    </ContactListContainer>
  );
};

export default ContactList;

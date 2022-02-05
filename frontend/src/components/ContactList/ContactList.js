import React from "react";

import SearchBar from "./SearchBar";
import FloatingAddButton from "./FloatingAddButton";
import ContactListItem from "./ContactListItem";

import {
  ContactListContainer,
  ContactListCard,
  ContactListCardContent,
  Divider,
  ContactListItemContainer,
} from "./styles";

const ContactList = () => {
  return (
    <ContactListContainer>
      <ContactListCard>
        <ContactListCardContent>
          <SearchBar />
          <Divider />
          <ContactListItemContainer>
            <ContactListItem />
            <ContactListItem />
            <ContactListItem isSelected />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
            <ContactListItem />
          </ContactListItemContainer>
        </ContactListCardContent>
      </ContactListCard>
      <FloatingAddButton />
    </ContactListContainer>
  );
};

export default ContactList;

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import FloatingAddButton from "./FloatingAddButton";
import ContactListItem from "./ContactListItem";

import {
  ContactListContainer,
  ContactListCard,
  ContactListCardContent,
  Divider,
  ContactListItemContainer,
  LoadingSpinner,
} from "./styles";

import { getContacts } from "../../redux/contact-slice";
import NoContact from "./NoContact";

const ContactList = () => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.auth.user);
  const contactList = useSelector((state) => state.contact.contactList);
  const [filteredContactList, setFilteredContactList] = useState([]);

  const isLoading = useSelector((state) => state.contact.isLoading);

  console.log(isLoading);

  useEffect(() => {
    dispatch(getContacts(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  return (
    <ContactListContainer>
      <ContactListCard>
        <ContactListCardContent>
          <SearchBar />
          <Divider />
          <ContactListItemContainer>
            {isLoading && <LoadingSpinner />}
            {!isLoading && filteredContactList.length > 0 ? (
              filteredContactList.map((_contact) => (
                <ContactListItem key={_contact.id} contact={_contact} />
              ))
            ) : (
              <NoContact
                message="No Contact Found"
                subMessage="Try adding one using the button below."
              />
            )}
          </ContactListItemContainer>
        </ContactListCardContent>
      </ContactListCard>
      <FloatingAddButton />
    </ContactListContainer>
  );
};

export default ContactList;

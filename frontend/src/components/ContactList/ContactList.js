import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

import { uiActions } from "../../redux/ui-slice";

const ContactList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id: userId } = useSelector((state) => state.auth.user);
  const contactList = useSelector((state) => state.contact.contactList);
  const hasPending = useSelector((state) => state.contact.hasPending);
  const isLoading = useSelector((state) => state.contact.isLoading);

  const [filteredContactList, setFilteredContactList] = useState([]);

  useEffect(() => {
    dispatch(getContacts(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  const onChangeKeywordHandler = (keyword) => {
    setFilteredContactList(
      contactList.filter((_contact) => {
        return `${_contact.firstname} ${_contact.middlename} ${_contact.lastname}`
          .toLowerCase()
          .includes(keyword.toLowerCase());
      })
    );
  };

  const onClearFilterHandler = () => {
    setFilteredContactList(contactList);
  };

  const onAddButtonClickHandler = () => {
    if (hasPending.status) {
      dispatch(uiActions.setModal({ show: true, id: hasPending.from }));
    } else {
      history.push("/contacts/new");
    }
  };

  return (
    <ContactListContainer>
      <ContactListCard>
        <ContactListCardContent>
          <SearchBar
            onChange={onChangeKeywordHandler}
            onClear={onClearFilterHandler}
          />
          <Divider />
          <ContactListItemContainer>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              filteredContactList.length > 0 &&
              filteredContactList.map((_contact) => (
                <ContactListItem key={_contact.id} contact={_contact} />
              ))}
            {!isLoading && filteredContactList.length === 0 && (
              <NoContact
                message="No Contact Found"
                subMessage="Try adding one using the button below."
              />
            )}
          </ContactListItemContainer>
        </ContactListCardContent>
      </ContactListCard>
      <FloatingAddButton onClick={onAddButtonClickHandler} />
    </ContactListContainer>
  );
};

export default ContactList;

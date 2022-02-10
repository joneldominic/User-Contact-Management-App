import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import SearchBar from "./SearchBar";
import FloatingAddButton from "./FloatingAddButton";
import ContactListItem from "./ContactListItem";
import NoContact from "./NoContact";
import Modal from "../../core/UI/Modal";

import {
  ContactListContainer,
  ContactListCard,
  ContactListCardContent,
  Divider,
  ContactListItemContainer,
  LoadingSpinner,
} from "./styles";

import { getContacts, contactActions } from "../../redux/contact-slice";
import { uiActions } from "../../redux/ui-slice";

import AppRoutes from "../../constants/app-routes";

const ContactList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { id: userId } = useSelector((state) => state.auth.user);
  const contactList = useSelector((state) => state.contact.contactList);
  const isLoading = useSelector((state) => state.contact.isLoading);
  const hasPending = useSelector((state) => state.contact.hasPending);
  const { show: showModal, id: modalId } = useSelector(
    (state) => state.ui.modal
  );

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
    const { pathname } = location;

    if (pathname === `${AppRoutes.ContactPage.path}/new`) {
      return;
    }

    if (hasPending.status) {
      dispatch(uiActions.setModal({ show: true, id: "contactlist" }));
    } else {
      history.push(`${AppRoutes.ContactPage.path}/new`);
    }
  };

  const onModalConfirmClickHandler = () => {
    dispatch(
      contactActions.setPending({
        status: false,
        from: "",
      })
    );
    dispatch(uiActions.setModal({ show: false, id: "" }));
    history.push(`${AppRoutes.ContactPage.path}/new`);
  };

  const onModalCancelClickHandler = () => {
    dispatch(uiActions.setModal({ show: false, id: "" }));
  };

  return (
    <>
      {showModal && modalId === "contactlist" && (
        <Modal
          color="warning"
          title="Are you sure?"
          message="Changes will not be save. This process cannot be undone."
          option1={{
            color: "primary",
            label: "Confirm",
            callback: onModalConfirmClickHandler,
          }}
          option2={{
            color: "warning",
            label: "Cancel",
            callback: onModalCancelClickHandler,
          }}
        />
      )}
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
        <FloatingAddButton
          onClick={onAddButtonClickHandler}
          disabled={isLoading}
        />
      </ContactListContainer>
    </>
  );
};

export default ContactList;

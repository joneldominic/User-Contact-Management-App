import React, { useState, useEffect, useContext } from "react";
import {
  addNewContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../service/contact-service";
import AuthContext from "./auth-context";
import { useHistory } from "react-router-dom";

const ContactContext = React.createContext({
  contactList: [],
  createContact: ({
    firstname,
    middlename,
    lastname,
    number,
    email,
    title,
    address1,
    address2,
    notes,
  }) => {},
  updateContact: ({
    id,
    firstname,
    middlename,
    lastname,
    number,
    email,
    title,
    address1,
    address2,
    notes,
  }) => {},
  deleteContact: (contactId) => {},
  getContact: (contactId) => {},
});

export const ContactContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [contactList, setContactList] = useState([]);
  const [listOutdated, setListOutdated] = useState(true);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      getContacts(authCtx.authUser.id)
        .then((response) => {
          console.log("From Contact Context");
          setContactList(response.data);
          setListOutdated(false);
        })
        .catch((err) => {
          console.log(err.response);
          alert(
            err.response.data.apierror.subErrors.map(
              (_error) =>
                `field: ${_error.field}  |  message: ${_error.message}\n\n`
            )
          );
        });
    }
  }, [authCtx, listOutdated]);

  const onCreateContactHandler = (contactInfo) => {
    addNewContact(authCtx.authUser.id, contactInfo)
      .then((response) => {
        console.log("From Contact Context On Create");
        console.log(contactInfo);
        console.log(response);
        history.replace("/contacts");
        setListOutdated(true);
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          err.response.data.apierror.subErrors.map(
            (_error) =>
              `field: ${_error.field}  |  message: ${_error.message}\n\n`
          )
        );
      });
  };

  const onUpdateContactHandler = (contactInfo) => {
    updateContact(authCtx.authUser.id, contactInfo)
      .then((_) => {
        console.log("From Contact Context On Update");
        history.replace("/contacts");
        setListOutdated(true);
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          err.response.data.apierror.subErrors.map(
            (_error) =>
              `field: ${_error.field}  |  message: ${_error.message}\n\n`
          )
        );
      });
  };

  const onDeleteContact = (contactId) => {
    deleteContact(authCtx.authUser.id, contactId)
      .then((_) => {
        console.log("From Contact Context On Delete");
        setListOutdated(true);
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          err.response.data.apierror.subErrors.map(
            (_error) =>
              `field: ${_error.field}  |  message: ${_error.message}\n\n`
          )
        );
      });
  };

  const onGetContact = (contactId) => {
    return contactList.find((_contact) => +_contact.id === +contactId);
  };

  return (
    <ContactContext.Provider
      value={{
        contactList: contactList,
        createContact: onCreateContactHandler,
        updateContact: onUpdateContactHandler,
        deleteContact: onDeleteContact,
        getContact: onGetContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContext;

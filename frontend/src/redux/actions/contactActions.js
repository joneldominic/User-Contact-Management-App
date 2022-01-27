import {
  addNewContactService,
  deleteContactService,
  getContactsService,
  updateContactService,
} from "../../service/contact-service";
import {
  CONTACT_REQ_IN_PROGRESS,
  CONTACT_REQ_SUCCESS,
  CONTACT_REQ_FAILURE,
  CONTACT_SELECT,
  CONTACT_DESELECT,
} from "./types";

export const getContacts = (userId, selectedContactId) => {
  return (dispatch) => {
    dispatch(contactSendRequest());

    getContactsService(userId)
      .then((response) => {
        dispatch(contactReqSuccess(response.data));
        if (selectedContactId !== undefined) {
          dispatch(selectContact(selectedContactId));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response && err.response.data) {
          switch (err.response.status) {
            case 401:
              console.log("Invalid Token!");
              alert("Invalid Token!");
              localStorage.clear();
              dispatch(contactReqFailure("Invalid Token!"));
              break;
            default:
              dispatch(
                contactReqFailure("Something Went Wrong! Please Try Again")
              );
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(
            contactReqFailure(["Something Went Wrong! Please Try Again"])
          );
        }
      });
  };
};

export const deleteContact = (contactId, callBack) => {
  return (dispatch, getState) => {
    dispatch(contactSendRequest());

    const { auth } = getState();
    const userId = auth.user.id;

    deleteContactService(userId, contactId)
      .then((_) => {
        dispatch(contactDeselect());
        dispatch(getContacts(userId));
        callBack && callBack();
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("Invalid Token!");
              alert("Invalid Token!");
              localStorage.clear();
              dispatch(contactReqFailure("Invalid Token!"));
              break;
            default:
              dispatch(
                contactReqFailure("Something Went Wrong! Please Try Again")
              );
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(contactReqFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const updateContact = (updatedContact) => {
  return (dispatch, getState) => {
    dispatch(contactSendRequest());

    const { auth } = getState();
    const userId = auth.user.id;

    updateContactService(userId, updatedContact)
      .then((response) => {
        if (response.status === 201) {
          dispatch(getContacts(userId));
        } else {
          alert("Something Wrong! Please Try Again");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              console.log("Invalid Contact Details");
              const errorMessages = err.response.data.apierror.subErrors.map(
                (_error) => {
                  switch (_error.field) {
                    case "number":
                      return "Phone must be a valid Phone Number";
                    case "email":
                      return "Email Must be a valid Email Address. ";
                    default:
                      return "Invalid Contact Details";
                  }
                }
              );
              dispatch(contactReqFailure(errorMessages));
              break;
            case 401:
              console.log("Invalid Token!");
              alert("Invalid Token!");
              localStorage.clear();
              dispatch(contactReqFailure("Invalid Token!"));
              break;
            default:
              dispatch(
                contactReqFailure("Something Went Wrong! Please Try Again")
              );
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(contactReqFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const addNewContact = (newContact, callBack) => {
  return (dispatch, getState) => {
    dispatch(contactSendRequest());

    const { auth } = getState();
    const userId = auth.user.id;

    addNewContactService(userId, newContact)
      .then((response) => {
        if (response.status === 201) {
          const { id: newContactId } = response.data;
          dispatch(contactDeselect());
          dispatch(getContacts(userId, newContactId));
          callBack && callBack(response.data.id);
        } else {
          alert("Something Wrong! Please Try Again");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              console.log("Invalid Contact Details");
              const errorMessages = err.response.data.apierror.subErrors.map(
                (_error) => {
                  switch (_error.field) {
                    case "number":
                      return "Phone must be a valid Phone Number";
                    case "email":
                      return "Email Must be a valid Email Address. ";
                    default:
                      return "Invalid Contact Details";
                  }
                }
              );
              dispatch(contactReqFailure(errorMessages));
              break;
            case 401:
              console.log("Invalid Token!");
              alert("Invalid Token!");
              localStorage.clear();
              dispatch(contactReqFailure("Invalid Token!"));
              break;
            default:
              dispatch(
                contactReqFailure("Something Went Wrong! Please Try Again")
              );
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(contactReqFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const selectContact = (contactId) => {
  return (dispatch, getState) => {
    const contactList = getState().contact.contacts;
    const contact = contactList.find((_contact) => +_contact.id === +contactId);
    dispatch(contactSelect(contact));
  };
};

export const contactSendRequest = () => {
  return { type: CONTACT_REQ_IN_PROGRESS };
};

export const contactReqSuccess = (content) => {
  return { type: CONTACT_REQ_SUCCESS, payload: content };
};

export const contactReqFailure = (error) => {
  return { type: CONTACT_REQ_FAILURE, payload: error };
};

export const contactSelect = (contact) => {
  return { type: CONTACT_SELECT, payload: contact };
};

export const contactDeselect = () => {
  return { type: CONTACT_DESELECT };
};

import {
  deleteContactService,
  getContactsService,
} from "../../service/contact-service";
import {
  CONTACT_REQ_IN_PROGRESS,
  CONTACT_REQ_SUCCESS,
  CONTACT_REQ_FAILURE,
  CONTACT_SELECT,
  CONTACT_DESELECT,
} from "./types";

export const getContacts = (userId) => {
  return (dispatch) => {
    dispatch(contactSendRequest());

    getContactsService(userId)
      .then((response) => {
        console.log(response.data);
        dispatch(contactReqSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          const errorMessages = err.response.data.apierror.subErrors.map(
            (_error) =>
              `field: ${_error.field}  |  message: ${_error.message}\n\n`
          );
          dispatch(contactReqFailure(errorMessages));
          alert(errorMessages);
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

export const deleteContact = (contactId) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const userId = auth.user.id;

    deleteContactService(userId, contactId)
      .then((_) => {
        dispatch(contactDeselect());
        dispatch(getContacts(userId));
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          const errorMessages = err.response.data.apierror.subErrors.map(
            (_error) =>
              `field: ${_error.field}  |  message: ${_error.message}\n\n`
          );
          dispatch(contactReqFailure(errorMessages));
          alert(errorMessages);
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

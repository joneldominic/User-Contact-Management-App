import { getContactsService } from "../../service/contact-service";
import {
  CONTACT_REQ_IN_PROGRESS,
  CONTACT_REQ_SUCCESS,
  CONTACT_REQ_FAILURE,
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
        console.log(err.response);
        const errorMessages = err.response.data.apierror.subErrors.map(
          (_error) =>
            `field: ${_error.field}  |  message: ${_error.message}\n\n`
        );
        dispatch(contactReqFailure(errorMessages));
        alert(errorMessages);
      });
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

import { createSlice } from "@reduxjs/toolkit";

import {
  addNewContactService,
  deleteContactService,
  getContactsService,
} from "../services/contact-service";

import notificationMessage from "../constants/notification-messages";

import { asyncAwaitCatch } from "../utils/helper-functions";
import { uiActions } from "./ui-slice";

const initialState = {
  isLoading: false,
  contactList: [],
  selectedContact: null,
  hasPending: { status: false, from: "" },
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    requestPending(state, action) {
      state.isLoading = true;
      state.contactList = [];
    },
    requestFulfilled(state, action) {
      state.isLoading = false;
      state.contactList = action.payload;
    },
    requestRejected(state, action) {
      state.isLoading = false;
    },
    selectContact(state, action) {
      const contactList = state.contactList;
      const contact = contactList.find(
        (_contact) => +_contact.id === +action.payload
      );
      state.selectedContact = contact;
    },
    setPending(state, action) {
      state.hasPending = {
        status: action.payload.status,
        from: action.payload.from,
      };
    },
  },
});

export const getContacts = (userId) => {
  return async (dispatch) => {
    dispatch(contactActions.requestPending());

    const [response, error] = await asyncAwaitCatch(getContactsService(userId));

    if (response) {
      if (response.status === 200) {
        dispatch(contactActions.requestFulfilled(response.data));
      } else {
        dispatch(contactActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(contactActions.requestRejected());
      if (error.response) {
        switch (error.response.status) {
          case 404:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidUserDetails)
            );
            break;
          case 401:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidToken)
            );
            localStorage.clear();
            break;
          case 409:
            dispatch(
              uiActions.showNotification(notificationMessage.duplicateUsername)
            );
            break;
          default:
            dispatch(
              uiActions.showNotification(notificationMessage.unknownError)
            );
            break;
        }
      } else {
        dispatch(
          uiActions.showNotification(notificationMessage.connectionError)
        );
      }
    }
  };
};

export const addNewContact = (newContact, callback) => {
  return async (dispatch, getState) => {
    dispatch(contactActions.requestPending());

    const { auth } = getState();
    const userId = auth.user.id;

    const [response, error] = await asyncAwaitCatch(
      addNewContactService(userId, newContact)
    );

    if (response) {
      if (response.status === 201) {
        await dispatch(getContacts(userId));
        dispatch(
          contactActions.setPending({
            status: false,
            from: "",
          })
        );
        dispatch(contactActions.selectContact(response.data.id));
        callback(response.data.id);
        dispatch(
          uiActions.showNotification(notificationMessage.contactAddSuccessful)
        );
      } else {
        dispatch(contactActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(contactActions.requestRejected());
      if (error.response) {
        switch (error.response.status) {
          case 400:
            dispatch(
              uiActions.showNotification(
                notificationMessage.invalidContactDetails
              )
            );
            break;
          case 401:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidToken)
            );
            localStorage.clear();
            break;
          default:
            dispatch(
              uiActions.showNotification(notificationMessage.unknownError)
            );
            break;
        }
      } else {
        dispatch(
          uiActions.showNotification(notificationMessage.connectionError)
        );
      }
    }
  };
};

export const deleteContact = (contactId, callback) => {
  return async (dispatch, getState) => {
    dispatch(contactActions.requestPending());

    const { auth } = getState();
    const userId = auth.user.id;

    const [response, error] = await asyncAwaitCatch(
      deleteContactService(userId, contactId)
    );

    if (response) {
      if (response.status === 200) {
        await dispatch(getContacts(userId));
        dispatch(
          uiActions.showNotification(
            notificationMessage.contactDeleteSuccessful
          )
        );
      } else {
        dispatch(contactActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(contactActions.requestRejected());
      if (error.response) {
        switch (error.response.status) {
          case 401:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidToken)
            );
            localStorage.clear();
            break;
          default:
            dispatch(
              uiActions.showNotification(notificationMessage.unknownError)
            );
            break;
        }
      } else {
        dispatch(
          uiActions.showNotification(notificationMessage.connectionError)
        );
      }
    }
  };
};

export const contactActions = contactSlice.actions;

export default contactSlice;

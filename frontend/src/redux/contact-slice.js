import { createSlice } from "@reduxjs/toolkit";

import { getContactsService } from "../services/contact-service";

import notificationMessage from "../constants/notification-messages";

import { asyncAwaitCatch } from "../utils/helper-functions";
import { uiActions } from "./ui-slice";

const initialState = {
  isLoading: false,
  contactList: [],
  // selectedContact: undefined,
  // hasUpdate: false,
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

export const contactActions = contactSlice.actions;

export default contactSlice;

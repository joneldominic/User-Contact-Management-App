import { createSlice } from "@reduxjs/toolkit";

import { addNewUserService } from "../services/user-service";

import notificationMessage from "../constants/notification-messages";

import { asyncAwaitCatch } from "../utils/helper-functions";
import { uiActions } from "./ui-slice";

const initialState = { isLoading: false, userAdded: false };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestPending(state, action) {
      state.isLoading = true;
      state.userAdded = false;
    },
    requestFulfilled(state, action) {
      state.isLoading = false;
      state.userAdded = true;
    },
    requestRejected(state, action) {
      state.isLoading = false;
    },
    clearState(state, action) {
      state.isLoading = false;
      state.userAdded = false;
    },
  },
});

export const addNewUser = (userInfo) => {
  return async (dispatch) => {
    dispatch(userActions.requestPending());

    const [response, error] = await asyncAwaitCatch(
      addNewUserService(userInfo)
    );

    if (response) {
      if (response.status === 201) {
        dispatch(userActions.requestFulfilled());
        dispatch(
          uiActions.showNotification(notificationMessage.registrationSuccessful)
        );
      } else {
        dispatch(userActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(userActions.requestRejected());
      if (error.response) {
        switch (error.response.status) {
          case 400:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidUserDetails)
            );
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

export const userActions = userSlice.actions;

export default userSlice;

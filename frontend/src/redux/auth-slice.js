import { createSlice } from "@reduxjs/toolkit";

import { authenticateUserService } from "../services/auth-service";
import { fetchUserDataService } from "../services/user-service";

import notificationMessage from "../constants/notification-messages";

import { asyncAwaitCatch } from "../utils/helper-functions";
import { uiActions } from "./ui-slice";

const initialState = { isLoading: false, user: null, isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestPending(state, action) {
      state.isLoading = true;
      state.user = null;
      state.isLoggedIn = false;
    },
    requestFulfilled(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    requestRejected(state, action) {
      state.isLoading = false;
    },
    clearAuth(state, action) {
      state.isLoading = false;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const authenticateUser = (credentials) => {
  return async (dispatch) => {
    dispatch(authActions.requestPending());

    const [response, error] = await asyncAwaitCatch(
      authenticateUserService(credentials)
    );

    if (response) {
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("TOKEN", token);
        dispatch(validateToken());
      } else {
        dispatch(authActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(authActions.requestRejected());
      if (error.response) {
        switch (error.response.status) {
          case 401:
            dispatch(
              uiActions.showNotification(notificationMessage.invalidCredential)
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

export const validateToken = () => {
  return async (dispatch) => {
    dispatch(authActions.requestPending());

    const [response, error] = await asyncAwaitCatch(fetchUserDataService());

    if (response) {
      if (response.status === 200) {
        const userData = response.data;
        dispatch(authActions.requestFulfilled(userData));
      } else {
        dispatch(authActions.requestRejected());
        dispatch(uiActions.showNotification(notificationMessage.unknownError));
      }
    } else if (error) {
      dispatch(authActions.requestRejected());
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

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authActions.clearAuth());
  };
};

export const authActions = authSlice.actions;

export default authSlice;

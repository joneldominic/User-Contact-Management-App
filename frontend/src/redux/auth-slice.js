import { createSlice } from "@reduxjs/toolkit";

import { authenticateUserService } from "../services/auth-service";
import { fetchUserDataService } from "../services/user-service";

import notificationMessage from "../constants/notification-messages";

import { asyncAwaitCatch } from "../utils/helper-functions";

import { uiActions } from "./ui-slice";
import { contactActions } from "./contact-slice";

const initialState = { isLoading: false, user: null, isLoggedIn: false };

let logoutTimer;

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
        dispatch(startSession());
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
            dispatch(logout());
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

export const startSession = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("TOKEN");

    if (token !== null) {
      await dispatch(validateToken());

      if (getState().auth.isLoggedIn) {
        const tokenData = JSON.parse(
          Buffer.from(token.split(".")[1], "base64")
        );

        const currentTime = new Date().getTime() / 1000;
        const adjExpirationTime = new Date(tokenData.exp).getTime();

        const duration = (adjExpirationTime - currentTime) * 1000;

        if (duration <= 3600) {
          if (logoutTimer) {
            clearTimeout(logoutTimer);
          }
          dispatch(logout());
        } else {
          logoutTimer = setTimeout(() => {
            dispatch(
              uiActions.showNotification(notificationMessage.sessionTimeout)
            );
            dispatch(logout());
          }, duration);
        }
      }
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(contactActions.clearContact());
    dispatch(authActions.clearAuth());
  };
};

export const authActions = authSlice.actions;

export default authSlice;

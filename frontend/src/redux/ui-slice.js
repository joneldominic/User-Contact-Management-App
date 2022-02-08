import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  modal: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        color: action.payload.color,
        message: action.payload.message,
      };
    },
    closeNotification(state, action) {
      state.notification = null;
    },
    showModal(state, action) {
      state.modal = {
        color: action.payload.color,
        title: action.payload.title,
        message: action.payload.message,
        option1: action.payload.option1,
        option2: action.payload.option2,
      };
    },
    closeModal(state, action) {
      state.modal = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

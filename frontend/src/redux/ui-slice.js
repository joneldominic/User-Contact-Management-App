import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  modal: { show: false, location: "" },
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
    setModal(state, action) {
      state.modal = {
        show: action.payload.show,
        location: action.payload.location,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

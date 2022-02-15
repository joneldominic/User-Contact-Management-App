import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  modal: { show: false, id: "" },
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
        id: action.payload.id,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

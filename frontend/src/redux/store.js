import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import contactSlice from "./contact-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    contact: contactSlice.reducer,
  },
});

export default store;

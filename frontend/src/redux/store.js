import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, auth: authSlice.reducer },
});

export default store;

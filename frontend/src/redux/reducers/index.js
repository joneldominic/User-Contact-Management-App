import { combineReducers } from "redux";

import auth from "./auth";
import contact from "./contact";

export default combineReducers({
  auth,
  contact,
});

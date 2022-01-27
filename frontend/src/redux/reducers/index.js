import { combineReducers } from "redux";

import auth from "./auth";
import contact from "./contact";
import user from "./user";

export default combineReducers({
  auth,
  contact,
  user,
});

import { AUTH_REQ, AUTH_SUCCESS, AUTH_FAILURE } from "../actions/types";

const initialState = {
  user: {},
  isLoggedIn: false,
  error: { hasError: false, errorMessage: "" },
  isLoading: false,
};

const auth = (state = initialState, action) => {
  console.log("Reducer Auth :", action.type);
  switch (action.type) {
    case AUTH_REQ:
      return {
        user: {},
        isLoggedIn: false,
        error: { hasError: false, errorMessage: "" },
        isLoading: true,
      };
    case AUTH_SUCCESS:
      const data = action.payload;
      return {
        user: data,
        isLoggedIn: true,
        error: { hasError: false, errorMessage: "" },
        isLoading: false,
      };

    case AUTH_FAILURE:
      const errorMessage = action.payload;
      return {
        user: {},
        isLoggedIn: false,
        error: { hasError: true, errorMessage },
        isLoading: false,
      };

    default:
      return state;
  }
};

export default auth;

import {
  AUTH_REQ_IN_PROGRESS,
  AUTH_REQ_SUCCESS,
  AUTH_REQ_FAILURE,
  AUTH_CLEAR,
} from "../actions/types";

const initialState = {
  user: {},
  isLoggedIn: false,
  error: { hasError: false, errorMessage: "" },
  isLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQ_IN_PROGRESS:
      return {
        user: {},
        isLoggedIn: false,
        error: { hasError: false, errorMessage: "" },
        isLoading: true,
      };
    case AUTH_REQ_SUCCESS:
      const data = action.payload;
      return {
        user: data,
        isLoggedIn: true,
        error: { hasError: false, errorMessage: "" },
        isLoading: false,
      };
    case AUTH_REQ_FAILURE:
      const errorMessage = action.payload;
      return {
        user: {},
        isLoggedIn: false,
        error: { hasError: true, errorMessage },
        isLoading: false,
      };
    case AUTH_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

export default auth;

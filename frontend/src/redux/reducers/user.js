import {
  USER_REQ_IN_PROGRESS,
  USER_REQ_SUCCESS,
  USER_REQ_FAILURE,
} from "../actions/types";

const initialState = {
  error: { hasError: false, errorMessages: [] },
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQ_IN_PROGRESS:
      return {
        error: { hasError: false, errorMessages: [] },
        isLoading: true,
      };
    case USER_REQ_SUCCESS:
      return {
        error: { hasError: false, errorMessages: [] },
        isLoading: false,
      };
    case USER_REQ_FAILURE:
      const errorMessages = action.payload;
      return {
        error: { hasError: true, errorMessages },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user;

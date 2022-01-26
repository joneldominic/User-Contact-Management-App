import {
  CONTACT_REQ_IN_PROGRESS,
  CONTACT_REQ_SUCCESS,
  CONTACT_REQ_FAILURE,
} from "../actions/types";

const initialState = {
  contacts: [],
  hasUpdate: false,
  error: { hasError: false, errorMessages: [] },
  isLoading: false,
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_REQ_IN_PROGRESS:
      return {
        ...state,
        hasUpdate: false,
        error: { hasError: false, errorMessages: [] },
        isLoading: true,
      };
    case CONTACT_REQ_SUCCESS:
      const data = action.payload;
      return {
        contacts: data,
        hasUpdate: true,
        error: { hasError: false, errorMessages: [] },
        isLoading: false,
      };
    case CONTACT_REQ_FAILURE:
      const errorMessages = action.payload;
      return {
        ...state,
        hasUpdate: false,
        error: { hasError: true, errorMessages },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default contact;

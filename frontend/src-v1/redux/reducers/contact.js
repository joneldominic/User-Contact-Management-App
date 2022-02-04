import {
  CONTACT_REQ_IN_PROGRESS,
  CONTACT_REQ_SUCCESS,
  CONTACT_REQ_FAILURE,
  CONTACT_SELECT,
  CONTACT_DESELECT,
} from "../actions/types";

const initialState = {
  contacts: [],
  selectedContact: undefined,
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
        ...state,
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
    case CONTACT_SELECT:
      const selectedContact = action.payload;
      return {
        ...state,
        hasUpdate: false,
        error: { hasError: false, errorMessages: [] },
        selectedContact,
      };
    case CONTACT_DESELECT:
      return {
        ...state,
        selectedContact: undefined,
      };
    default:
      return state;
  }
};

export default contact;

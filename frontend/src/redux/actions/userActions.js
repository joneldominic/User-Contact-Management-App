import { addNewUserService } from "../../service/auth-service";
import {
  USER_REQ_IN_PROGRESS,
  USER_REQ_SUCCESS,
  USER_REQ_FAILURE,
} from "../actions/types";

export const addNewUser = (userInfo, callback) => {
  return (dispatch) => {
    dispatch(userSendRequest());

    addNewUserService(userInfo)
      .then((response) => {
        if (response.status === 201) {
          callback();
          dispatch(userSuccess());
        } else {
          dispatch(userFailure("Something Went Wrong! Please Try Again"));
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              console.log("Invalid User Details");
              const errorMessages = err.response.data.apierror.subErrors.map(
                (_error) => {
                  if (_error.field === "password") {
                    return `Password must contain at least one digit [0-9].
                    Password must contain at least one lowercase Latin character [a-z].
                    Password must contain at least one uppercase Latin character [A-Z].
                    Password must contain at least one special character like ! @ # & ( ).
                    Password must contain a length of at least 8 characters and a maximum of 20 characters.
                    `;
                  }
                  return "Invalid User Details";
                }
              );
              dispatch(userFailure(errorMessages));
              break;
            case 409:
              console.log("Username Conflict");
              dispatch(userFailure(["Username Already Exists!"]));
              break;
            default:
              dispatch(userFailure("Something Went Wrong! Please Try Again"));
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(userFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const userSendRequest = () => {
  return { type: USER_REQ_IN_PROGRESS };
};

export const userSuccess = (content) => {
  return { type: USER_REQ_SUCCESS };
};

export const userFailure = (error) => {
  return { type: USER_REQ_FAILURE, payload: error };
};

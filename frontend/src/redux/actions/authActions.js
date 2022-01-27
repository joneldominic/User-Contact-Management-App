import {
  fetchUserDataService,
  userLoginService,
} from "../../service/auth-service";
import {
  AUTH_REQ_IN_PROGRESS,
  AUTH_REQ_SUCCESS,
  AUTH_REQ_FAILURE,
  AUTH_CLEAR,
} from "./types";

export const authenticate = (credentials) => {
  return (dispatch) => {
    dispatch(authSendRequest());
    userLoginService(credentials)
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("TOKEN", token);
          dispatch(validateToken());
        } else {
          dispatch(authFailure("Something Went Wrong! Please Try Again"));
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("Authentication Failed. Incorrect Credentials");
              dispatch(
                authFailure("Authentication Failed. Incorrect Credentials")
              );
              break;
            default:
              dispatch(authFailure("Something Went Wrong! Please Try Again"));
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(authFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const validateToken = () => {
  return (dispatch) => {
    dispatch(authSendRequest());
    fetchUserDataService()
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("Invalid Token!");
              alert("Invalid Token!");
              dispatch(logout());
              break;
            default:
              dispatch(authFailure("Something Went Wrong! Please Try Again"));
              alert("Something Went Wrong! Please Try Again");
          }
        } else {
          alert("Something Went Wrong! Please Try Again");
          alert(err);
          dispatch(authFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authClear());
  };
};

export const authSendRequest = () => {
  return { type: AUTH_REQ_IN_PROGRESS };
};

export const authSuccess = (content) => {
  return { type: AUTH_REQ_SUCCESS, payload: content };
};

export const authFailure = (error) => {
  return { type: AUTH_REQ_FAILURE, payload: error };
};

export const authClear = () => {
  return { type: AUTH_CLEAR };
};

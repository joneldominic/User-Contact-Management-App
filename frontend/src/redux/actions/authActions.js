import { fetchUserData, userLogin } from "../../service/auth-service";
import { AUTH_REQ, AUTH_SUCCESS, AUTH_FAILURE } from "./types";

export const authenticate = (credentials) => {
  return (dispatch) => {
    dispatch(sendRequest());
    userLogin(credentials)
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
          }
        } else {
          dispatch(authFailure("Something Went Wrong! Please Try Again"));
        }
      });
  };
};

export const validateToken = () => {
  return (dispatch) => {
    dispatch(sendRequest());
    fetchUserData()
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((e) => {
        console.log("Invalid Token!");
        alert("Invalid Token!");
        localStorage.clear();
        dispatch(authFailure("Invalid Token!"));
      });
  };
};

export const sendRequest = () => {
  return { type: AUTH_REQ };
};

export const authSuccess = (content) => {
  return { type: AUTH_SUCCESS, payload: content };
};

export const authFailure = (error) => {
  return { type: AUTH_FAILURE, payload: error };
};

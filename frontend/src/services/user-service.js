import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const fetchUserDataService = () => {
  return axios({
    method: "GET",
    url: `${API_URL}/api/auth/userinfo`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const addNewUserService = (requestBody) => {
  return axios({
    method: "POST",
    url: `${API_URL}/api/users`,
    data: requestBody,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

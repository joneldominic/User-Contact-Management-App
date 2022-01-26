import axios from "axios";

const API_URL = "http://localhost:8080";

const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const userLoginService = (requestBody) => {
  return axios({
    method: "POST",
    url: `${API_URL}/api/auth/login`,
    data: requestBody,
  });
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
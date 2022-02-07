import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const authenticateUserService = (requestBody) => {
  return axios({
    method: "POST",
    url: `${API_URL}/api/auth/login`,
    data: requestBody,
  });
};

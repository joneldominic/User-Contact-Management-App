import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const getContactsService = (userId) => {
  return axios({
    method: "GET",
    url: `${API_URL}/api/users/${userId}/contacts`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const addNewContactService = (userId, requestBody) => {
  return axios({
    method: "POST",
    url: `${API_URL}/api/users/${userId}/contacts`,
    data: requestBody,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const deleteContactService = (userId, contactId) => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/api/users/${userId}/contacts/${contactId}`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const updateContactService = (userId, contactInfo) => {
  return axios({
    method: "PUT",
    url: `${API_URL}/api/users/${userId}/contacts/${contactInfo.id}`,
    data: contactInfo,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

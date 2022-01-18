import axios from "axios";

const API_URL = "http://localhost:8080";

const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const getContacts = (userId) => {
  return axios({
    method: "GET",
    url: `${API_URL}/api/users/${userId}/contacts`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const addNewContact = (userId, requestBody) => {
  return axios({
    method: "POST",
    url: `${API_URL}/api/users/${userId}/contacts`,
    data: requestBody,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const deleteContact = (userId, contactId) => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/api/users/${userId}/contacts/${contactId}`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const updateContact = (userId, contactInfo) => {
  return axios({
    method: "PUT",
    url: `${API_URL}/api/users/${userId}/contacts/${contactInfo.id}`,
    data: contactInfo,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};


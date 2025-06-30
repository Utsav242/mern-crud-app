// apiEndpoints.js

const BASE_URL = "http://localhost:8000/api";

export const API_ENDPOINTS = {
  GET_USERS: `${BASE_URL}/user`,
  GET_USER_BY_ID: (id) => `${BASE_URL}/user/${id}`,
  DELETE_USER: (userId) => `${BASE_URL}/delete/user/${userId}`,
  ADD_USER: `${BASE_URL}/user`,
  UPDATE_USER: (id) => `${BASE_URL}/update/user/${id}`,
  REGISTER_USER: `${BASE_URL}/auth/register`, 
  LOGIN_USER: `${BASE_URL}/auth/login`, // Added login endpoint
  // Add more endpoints as needed
};

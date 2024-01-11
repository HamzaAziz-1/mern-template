// api.js
import axios from "axios";

import { BASE_URL } from "../utils/config";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const logoutUser = async () => {
  try {
    const response = await api.delete("/auth/logout");
  } catch (error) {
    throw error;
  }
};

export { loginUser, registerUser,logoutUser };

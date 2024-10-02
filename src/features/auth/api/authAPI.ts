import axios from "axios";
import { Base_URL } from "@/constants";
import { API_URL_AUTH } from "@/constants";

export const AuthAPI = {
  login: (credentials: { email: string; password: string }) => {
    return axios.post(`${API_URL_AUTH}/signin`, credentials);
  },
  register: (reqBody: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) => {
    return axios.post(`${API_URL_AUTH}/signup`, reqBody);
  },

  forgetPassword: (email: string) => {
    return axios.post(`${API_URL_AUTH}/forgotPasswords`, { email });
  },

  updateLoggedUserData: (reqBody: {
    name: string;
    email: string;
    phone: string;
  }) => {
    const token = localStorage.getItem("userToken");

    return axios.put(`${Base_URL}/api/v1/users/updateMe/`, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  verifyResetCode: async (code: string) => {
    return axios.post(`${API_URL_AUTH}/verifyResetCode`, { code });
  },
};

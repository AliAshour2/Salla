import axios from "axios";
import { Base_URL } from "@/constants";
import { API_URL_AUTH } from "@/constants";

export const AuthAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL_AUTH}/signin`, credentials);
    return response.data;
  },
  register: async (reqBody: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) => {
    const response = await axios.post(`${API_URL_AUTH}/signup`, reqBody);
    return response.data;
  },

  forgetPassword : async (email: string) => {
    const response = await axios.post(`${API_URL_AUTH}/forgotPasswords`, {email});
    return response.data;
  },

  updateLoggedUserData: async (reqBody: {
    name: string;
    email: string;
    phone: string;
    
  }) => {
    const token = localStorage.getItem("userToken");
    
    const response = await axios.put(
      `${Base_URL}/api/v1/users/updateMe/`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },


};

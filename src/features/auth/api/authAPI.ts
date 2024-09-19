import axios from "axios";

const Base_URL = "https://ecommerce.routemisr.com";
const API_URL_AUTH = "https://ecommerce.routemisr.com/api/v1/auth";

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

import axios from "axios";


const API_URL = "https://ecommerce.routemisr.com/api/v1/auth";
export const AuthAPI = {
    login: async (credentials: { email: string; password: string }) => {
      const response = await axios.post(`${API_URL}/signin`, credentials);
      return response.data;
    },
    register: async (reqBody: { name: string; email: string; password: string; rePassword: string; phone: string }) => {
      const response = await axios.post(`${API_URL}/signup`, reqBody);
      return response.data;
    }
  };
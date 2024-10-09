import { Base_URL } from "@/constants";
import axios from "axios";
export const GetAllBrandsAPI = () => {
  return axios.get(`${Base_URL}/api/v1/brands`);
};




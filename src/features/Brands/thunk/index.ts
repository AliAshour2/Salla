import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllBrandsAPI } from "../api";
import { handleError } from "@/features/helper/apiErrorHandleHelber";
import { TBrand } from "@/types";



export const GetAllBrandsThunk = createAsyncThunk<TBrand[]>(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllBrandsAPI();
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

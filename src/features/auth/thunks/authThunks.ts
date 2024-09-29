import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthAPI } from "../api/authAPI";
import { setToken } from "../slices/authSlice";
import { handleError } from "@/features/helper/apiErrorHandleHelber";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await AuthAPI.login(credentials);
      dispatch(setToken(response.data));
      return response;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    reqBody: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      phone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await AuthAPI.register(reqBody);
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const updateLoggedUserData = createAsyncThunk(
  "auth/updateLoggedUserData",
  async (
    credentials: { name: string; email: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthAPI.updateLoggedUserData(credentials);
      return response;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.forgetPassword(email);
      return response;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.verifyResetCode(code);
      return response;
    } catch (err) {
      return handleError(err, rejectWithValue);
    }
  }
);

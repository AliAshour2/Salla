import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../types/authTypes";
import { AuthAPI } from "../api/authAPI";
import { RootState } from "@/app/store";


const getTokenFromLocalStorage = localStorage.getItem("userToken");



const initialState: AuthState = {
  
  token: getTokenFromLocalStorage ? getTokenFromLocalStorage : null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue ,dispatch }
  ) => {
    try {

      const response = await AuthAPI.login(credentials);
      dispatch(setToken(response.data))
      return response
    } catch (err ) {
      if (axios.isAxiosError(err )) {
        return rejectWithValue(
          err.response?.data.message  || "An error occurred"
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
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
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data.message || "An error occurred"
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.token = null;
      localStorage.removeItem("userToken");
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.message === "success") {
          state.token = action.payload.token;
          localStorage.setItem("userToken", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state: AuthState) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state: AuthState, action: PayloadAction<{ token: string }>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
          localStorage.setItem("userToken", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state: AuthState, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

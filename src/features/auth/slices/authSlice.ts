import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/authTypes";
import { RootState } from "@/app/store";
import { loginUser, registerUser, updateLoggedUserData } from "../thunks/authThunks";

const getTokenFromLocalStorage = localStorage.getItem("userToken");

const initialState: AuthState = {
  token: getTokenFromLocalStorage ? getTokenFromLocalStorage : null,
  status: "idle",
  error: null,
};


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
      })
      .addCase(updateLoggedUserData.pending, (state: AuthState) => {
        state.status = "loading";
      })
      .addCase(updateLoggedUserData.fulfilled, (state: AuthState) => {
        state.status = "succeeded";
      })
      .addCase(updateLoggedUserData.rejected, (state: AuthState) => {
        state.status = "failed";
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

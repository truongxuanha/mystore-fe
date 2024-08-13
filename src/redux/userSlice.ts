import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "../services/authService";
import { IAuthState } from "../types";

const currentUserString = localStorage.getItem("currentUser");
let currentUser = null;

if (currentUserString && currentUserString !== "undefined") {
  currentUser = JSON.parse(currentUserString);
}

const initialState: IAuthState = {
  loading: false,
  error: null,
  isLogin: false,
  currentUser: currentUser,
  token: localStorage.getItem("access_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLogin = false;
      state.loading = false;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogin = false;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload.data.user
          ? action.payload.data
          : null;
        state.token = action.payload.data.token;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
        state.isLogin = false;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

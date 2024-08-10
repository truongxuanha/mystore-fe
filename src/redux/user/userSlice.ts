import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "../../services/authService";
import { IAuthState } from "../../types/AllType.type";
const currentUserStr = (localStorage.getItem("currentUser") as string) ?? null;
const initialState: IAuthState = {
  loading: "idle",
  error: null,
  isLogin: false,
  currentUser: currentUserStr ? JSON.parse(currentUserStr) : null,
  token: localStorage.getItem("access_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLogin = false;
      state.loading = "idle";
      localStorage.removeItem("currentUser");
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.isLogin = false;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
        state.currentUser = null;
        state.isLogin = false;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

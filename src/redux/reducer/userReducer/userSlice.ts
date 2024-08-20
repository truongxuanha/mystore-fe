import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "./authThunk";
import { IAuthState } from "../../../types";
import {
  getTokenStorage,
  getUserStorage,
  removeUserStorage,
} from "../../../services/storage";

const initialState: IAuthState = {
  loading: false,
  error: null,
  currentUser: getUserStorage(),
  token: getTokenStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      removeUserStorage();
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
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.currentUser = action.payload.data.user
          ? action.payload.data
          : null;
        state.token = action.payload.data.token;
      })
      .addCase(authLogin.rejected, (state) => {
        state.loading = false;

        state.currentUser = null;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

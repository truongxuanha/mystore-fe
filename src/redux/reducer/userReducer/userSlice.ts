import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authProfle, authRegister } from "./authThunk";
import { IAuthState, UserAccount } from "../../../types";
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
  infoUser: <UserAccount>{},
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
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload as string;
      });
    builder
      .addCase(authProfle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authProfle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.infoUser = action.payload;
      })
      .addCase(authProfle.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

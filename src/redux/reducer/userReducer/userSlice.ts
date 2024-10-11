import { createSlice } from "@reduxjs/toolkit";
import {
  authCreateAddress,
  authCustomer,
  authGetAddressAcc,
  authLogin,
  authProfle,
  authRegister,
} from "./authThunk";
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
  all_customers: [],
  totalCustomer: 0,
  addressAcc: [],
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
    builder
      .addCase(authCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.all_customers = action.payload;
        state.totalCustomer = action.payload.totalItem;
      })
      .addCase(authCustomer.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(authGetAddressAcc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authGetAddressAcc.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.addressAcc = action.payload;
      })
      .addCase(authGetAddressAcc.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(authCreateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authCreateAddress.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authCreateAddress.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;

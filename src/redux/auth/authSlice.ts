import { createSlice } from "@reduxjs/toolkit";
import {
  authGetAllAccount,
  authCreateAddressThunk,
  authGetAddressAcc,
  authLogin,
  authProfle,
  authRegister,
  authCustomer,
  authForPasswordThunk,
  authVerifyOtpThunk,
  authResetPasswordThunk,
  authChangeProfileThunk,
  authChangePassThunk,
} from "./authThunk";
import { IAuthState, UserAccount } from "../../types";
import { getTokenStorage, getUserStorage, removeUserStorage } from "../../services/storage";

const initialState: IAuthState = {
  loading: false,
  error: null,
  currentUser: getUserStorage(),
  token: getTokenStorage(),
  infoUser: <UserAccount>{},
  all_accounts: [],
  all_customers: [],
  totalAccount: 0,
  totalCustomer: 0,
  addressAcc: [],
  loadingForpass: false,
  dataReqOtp: undefined,
  verifyOtp: null,
  infoForPassWord: {},
  countdown: 0,
  loadingChangeProfile: false,
  loadingChangePass: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.infoUser = {} as UserAccount;
      removeUserStorage();
    },
    startCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown -= 1;
      }
    },
    resetCountdown: (state) => {
      state.countdown = 0;
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
        state.currentUser = action.payload.data.user ? action.payload.data : null;
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
      .addCase(authGetAllAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authGetAllAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.all_accounts = action.payload.data;
        state.totalAccount = action.payload.totalPage;
      })
      .addCase(authGetAllAccount.rejected, (state) => {
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
        state.all_customers = action.payload.data;
        state.totalCustomer = action.payload.totalPage;
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
      .addCase(authCreateAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authCreateAddressThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authCreateAddressThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(authForPasswordThunk.pending, (state) => {
        state.loadingForpass = true;
      })
      .addCase(authForPasswordThunk.fulfilled, (state, action) => {
        state.loadingForpass = false;
        state.dataReqOtp = action.payload;
      })
      .addCase(authForPasswordThunk.rejected, (state) => {
        state.loadingForpass = false;
      });
    builder
      .addCase(authVerifyOtpThunk.pending, (state) => {
        state.loadingForpass = true;

        state.error = null;
      })
      .addCase(authVerifyOtpThunk.fulfilled, (state, action) => {
        state.loadingForpass = false;
        state.verifyOtp = action.payload;
        state.error = null;
      })
      .addCase(authVerifyOtpThunk.rejected, (state) => {
        state.loadingForpass = false;
      });
    builder
      .addCase(authResetPasswordThunk.pending, (state) => {
        state.loadingForpass = true;

        state.error = null;
      })
      .addCase(authResetPasswordThunk.fulfilled, (state) => {
        state.loadingForpass = false;
        state.error = null;
      })
      .addCase(authResetPasswordThunk.rejected, (state) => {
        state.loadingForpass = false;
      });
    builder
      .addCase(authChangeProfileThunk.pending, (state) => {
        state.loadingChangeProfile = true;

        state.error = null;
      })
      .addCase(authChangeProfileThunk.fulfilled, (state) => {
        state.loadingChangeProfile = false;
        state.error = null;
      })
      .addCase(authChangeProfileThunk.rejected, (state) => {
        state.loadingChangeProfile = false;
      });
    builder
      .addCase(authChangePassThunk.pending, (state) => {
        state.loadingChangePass = true;

        state.error = null;
      })
      .addCase(authChangePassThunk.fulfilled, (state) => {
        state.loadingChangePass = false;
        state.error = null;
      })
      .addCase(authChangePassThunk.rejected, (state) => {
        state.loadingChangePass = false;
      });
  },
});

export const { logout, startCountdown, decrementCountdown, resetCountdown } = authSlice.actions;

export default authSlice.reducer;

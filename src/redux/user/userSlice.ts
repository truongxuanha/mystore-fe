import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "../../services/AuthServices";
import { UserAccount } from "../../types/UserType.type";

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export interface IAuthState {
  loading: LoadingState;
  error: string | null;
  isLogin: boolean;
  currentUser: UserAccount | null;
  token: string | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  isLogin: false,
  currentUser: (() => {
    const userFromLocalStorage = localStorage.getItem("currentUser");
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  })(),
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
        state.isLogin = action.payload.data.user.id;
        state.currentUser = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem("access_token", action.payload.data.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.data.user)
        );
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

import { createAsyncThunk } from "@reduxjs/toolkit";

import { InitialRegisterState, InitialLoginState } from "../types";
import { axiosIntance } from "../utils/axiosConfig";

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (initAccount: InitialRegisterState, { rejectWithValue }) => {
    try {
      const response = await axiosIntance.post(
        `/account/register`,
        initAccount
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (initAccount: InitialLoginState, { rejectWithValue }) => {
    try {
      const response = await axiosIntance.post(`/account/login`, initAccount);
      const data = response.data;
      if (data.status === true) {
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export interface initialTokenRefresh {
  refresh: string;
}
export const authRefreshToken = createAsyncThunk(
  "auth/authRefresh",
  async (initialTokenRefresh: initialTokenRefresh) => {
    try {
      const res = await axiosIntance.post(
        "/account/refresh",
        initialTokenRefresh
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

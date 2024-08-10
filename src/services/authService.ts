import { createAsyncThunk } from "@reduxjs/toolkit";

import { InitialRegisterState, InitialLoginState } from "../types/AllType.type";
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

      const { data } = response.data;
      console.log(data);
      localStorage.setItem("access_token", data.token);
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

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API_AUTH } from "../utils/api";
import { InitialRegisterState, InitialLoginState } from "../types/AllType.type";

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (initAccount: InitialRegisterState, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL_API_AUTH}/account/register`,
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
      const response = await axios.post(
        `${URL_API_AUTH}/account/login`,
        initAccount
      );

      const { data } = response;
      localStorage.setItem("currentUser", JSON.stringify(data.data));
      localStorage.setItem("access_token", data.data.token);
      return data;
    } catch (error) {
      return rejectWithValue("Login failed!!!");
    }
  }
);

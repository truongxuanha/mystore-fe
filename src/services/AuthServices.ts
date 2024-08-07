import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API_AUTH } from "../utils/api";
import {
  InitialRegisterState,
  InitialLoginState,
} from "../types/UserType.type";

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (initAccount: InitialRegisterState, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL_API_AUTH}/account/register`,
        initAccount
      );
      console.log(response.data);
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
      console.log(response);
      return data;
    } catch (error) {
      return rejectWithValue("Login failed!!!");
    }
  }
);

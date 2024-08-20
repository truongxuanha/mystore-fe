import { createAsyncThunk } from "@reduxjs/toolkit";

import { InitialRegisterState, InitialLoginState } from "../../../types";

import { registerUser } from "../../../api/register";
import { loginUser } from "../../../api/login";

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (initAccount: InitialRegisterState, { rejectWithValue }) => {
    try {
      const data = await registerUser(initAccount);
      return data;
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (initAccount: InitialLoginState, { rejectWithValue }) => {
    try {
      const data = await loginUser(initAccount);

      localStorage.setItem("access_token", data.data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

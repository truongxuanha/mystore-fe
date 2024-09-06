import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerUser } from "../../../api/register";
import { loginUser } from "../../../api/login";
import { InitialRegisterState } from "../../../api/register/type";
import { InitialLoginState } from "../../../api/login/type";
import { getInfo } from "../../../api/profile";

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (initAccount: InitialRegisterState, { rejectWithValue }) => {
    try {
      const data = await registerUser(initAccount);
      return data;
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
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
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const authProfle = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getInfo();
      console.log(data);
      return data;
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

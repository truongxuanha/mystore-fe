import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerUser } from "../../../api/register";
import { loginUser } from "../../../api/login";
import { InitialRegisterState } from "../../../api/register/type";
import { InitialLoginState } from "../../../api/login/type";
import { getInfo } from "../../../api/profile";
import {
  createAddressUser,
  getAddressUser,
  getAllCustomer,
} from "../../../api/account";
import { AddressType } from "../../../api/account/type";

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

export const authCustomer = createAsyncThunk(
  "auth/customer",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCustomer();

      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  }
);

export const authCreateAddress = createAsyncThunk(
  "auth/createAddress",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCustomer();

      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  }
);

export const authGetAddressAcc = createAsyncThunk(
  "auth/getAddressAcc",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAddressUser();

      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  }
);

export const authCreateAddressThunk = createAsyncThunk(
  "auth/getAddressAcc",
  async (address: AddressType, { rejectWithValue }) => {
    try {
      const data = await createAddressUser(address);

      return data;
    } catch (errer) {
      rejectWithValue(errer);
    }
  }
);

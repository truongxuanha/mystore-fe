import { createAsyncThunk } from "@reduxjs/toolkit";
import { createManufactureApi, getAllManufacturerApi, getManufacturer } from "./api";
import { ParamsManuApiType, ProviderType } from "./type";

export const getManuThunk = createAsyncThunk("manufacturer/getManufacturer", async (_, { rejectWithValue }) => {
  try {
    const res = await getManufacturer();
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getAllManuThunk = createAsyncThunk("manufacturer/getAllManufacturer", async ({ query, page, item }: ParamsManuApiType, { rejectWithValue }) => {
  try {
    const res = await getAllManufacturerApi({ query, page, item });
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createManufactureThunk = createAsyncThunk(
  "manufacturer/createManufacturer",
  async ({ img, name, phone, website }: ProviderType, { rejectWithValue }) => {
    try {
      const res = await createManufactureApi({ img, name, phone, website });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

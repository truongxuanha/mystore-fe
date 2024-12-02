import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllManufacturerApi, getManufacturer } from "./api";
import { ParamsManuApiType } from "./type";

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

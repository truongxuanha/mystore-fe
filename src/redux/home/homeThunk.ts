import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBanner } from "./api";

export const getBanners = createAsyncThunk("product/getBanner", async (_, { rejectWithValue }) => {
  try {
    const data = await getBanner();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

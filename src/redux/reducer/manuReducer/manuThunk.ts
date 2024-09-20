import { createAsyncThunk } from "@reduxjs/toolkit";

import { getManufacturer } from "../../../api/manufacturer";

export const getManuThunk = createAsyncThunk(
  "cart/postCreateCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getManufacturer();
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

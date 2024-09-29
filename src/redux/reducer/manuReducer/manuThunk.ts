import { createAsyncThunk } from "@reduxjs/toolkit";

import { getManufacturer } from "../../../api/manufacturer";

export const getManuThunk = createAsyncThunk(
  "manufacturer/getManufacturer",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getManufacturer();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

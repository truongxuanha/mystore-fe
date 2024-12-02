import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBill } from "./api";
import { ParamsGetAllBill } from "./type";

export const getAllBillThunk = createAsyncThunk("billAdmin/getAllBillAdmin", async ({ query, page, status, item }: ParamsGetAllBill, { rejectWithValue }) => {
  try {
    const res = await getAllBill({ query, page, status, item });
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

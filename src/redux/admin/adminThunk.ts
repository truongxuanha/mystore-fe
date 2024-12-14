import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRevenueApi, getStaticticalApi } from "./api";

export const getRemenueThunk = createAsyncThunk("admin/getRemenue", async () => {
  try {
    const res = await getRevenueApi();
    return res.data;
  } catch (err) {
    return err;
  }
});

export const getStaticticalThunk = createAsyncThunk("admin/getStatictical", async () => {
  try {
    const res = await getStaticticalApi();
    return res.data;
  } catch (err) {
    return err;
  }
});

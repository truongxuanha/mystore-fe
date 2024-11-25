import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBannerApi, getBannerApi, getPopupApi } from "./api";

export const getBannersThunk = createAsyncThunk("product/getBanner", async (_, { rejectWithValue }) => {
  try {
    const data = await getBannerApi();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getPopupThunk = createAsyncThunk("home/getPopup", async (_, { rejectWithValue }) => {
  try {
    const data = await getPopupApi();
    return data.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteBannersThunk = createAsyncThunk("banner/deleteBanner", async (id: string | number, { rejectWithValue }) => {
  try {
    const data = await deleteBannerApi(id);
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

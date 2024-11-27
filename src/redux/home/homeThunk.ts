import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBannerApi, deleteBannerApi, getBannerApi, getPopupApi } from "./api";
import { BannerCreateType } from "./type";

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

export const createBannersThunk = createAsyncThunk("banner/createBanner", async ({ image, path }: BannerCreateType, { rejectWithValue }) => {
  try {
    const data = await createBannerApi({ image, path });
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

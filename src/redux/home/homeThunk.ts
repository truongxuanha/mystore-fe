import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPopupApi, deletePopupApi, getBannerApi, getPopupApi, updatePopupApi } from "./api";
import { CallBackType } from "types/redux.type";
import { SalePopupReduxType, SalePopupType } from "./type";

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
export const createPopupThunk = createAsyncThunk(
  "home/crreatePopup",
  async ({ callBack, popup_img, url_transit }: SalePopupReduxType & CallBackType, { rejectWithValue }) => {
    try {
      const data = await createPopupApi({ popup_img, url_transit });
      callBack();
      return data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const updatePopupThunk = createAsyncThunk(
  "home/updatePopup",
  async ({ callBack, popup_img, url_transit, popup_id }: SalePopupType & CallBackType, { rejectWithValue }) => {
    try {
      const data = await updatePopupApi({ popup_img, url_transit, popup_id });
      callBack();
      return data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const deletePopupThunk = createAsyncThunk("home/removePopup", async ({ callBack, id }: { id: number } & CallBackType, { rejectWithValue }) => {
  try {
    const data = await deletePopupApi(id);
    callBack();
    return data.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

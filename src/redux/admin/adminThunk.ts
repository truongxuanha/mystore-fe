import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBannerApi, deleteBannerApi, deleteCustomerApi, getRevenueApi, getStaticticalApi, updateCustomerApi } from "./api";
import { BannerCreateType } from "./type";
import { toastifySuccess, toastifyWarning } from "utils/toastify";
import dayjs from "dayjs";

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

export const createBannerThunk = createAsyncThunk("admin/createBanner", async ({ image, path, createAt = dayjs(), callBack }: BannerCreateType) => {
  try {
    const res = await createBannerApi({ image, path, createAt });
    toastifySuccess("Thêm banner thành công!");
    callBack();
    return res.data;
  } catch (err) {
    toastifySuccess("Thêm banner thất bại!");
    return err;
  }
});
export const deleteBannersThunk = createAsyncThunk(
  "admin/deleteBanner",
  async ({ id, callBack }: { id: string | number; callBack: any }, { rejectWithValue }) => {
    try {
      const data = await deleteBannerApi(id);
      toastifySuccess("Xóa banner thành công!");
      callBack();
      return data?.data;
    } catch (err) {
      toastifyWarning("Xóa banner thất bại!");
      return rejectWithValue(err);
    }
  },
);
export const updateCustomerThunk = createAsyncThunk(
  "admin/updateCustomer",
  async ({ id, status, callBack }: { id: string; status: number; callBack: any }, { rejectWithValue }) => {
    try {
      const data = await updateCustomerApi(id, status);
      toastifySuccess("Cập nhật thành công!");
      callBack();
      return data?.data;
    } catch (err) {
      toastifyWarning("Cập nhật thất bại!");
      return rejectWithValue(err);
    }
  },
);
export const deleteCustomerThunk = createAsyncThunk("admin/deleteCustomer", async ({ id, callBack }: { id: string; callBack: any }, { rejectWithValue }) => {
  try {
    const data = await deleteCustomerApi(id);
    toastifySuccess("Xóa thành công!");
    callBack();
    return data?.data;
  } catch (err) {
    toastifyWarning("Xóa thất bại!");
    return rejectWithValue(err);
  }
});

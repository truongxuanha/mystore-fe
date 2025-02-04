import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBannerApi,
  createImageDescriptionApi,
  deleteBannerApi,
  deleteCustomerApi,
  deleteImageDescriptionApi,
  getImportDetailApi,
  getRevenueApi,
  getStaticticalApi,
  importProductApi,
  updateCustomerApi,
} from "./api";
import { BannerCreateType, CreateImportType } from "./type";
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

export const getStaticticalThunk = createAsyncThunk("admin/getStatictical", async ({ startDate, endDate }: { startDate?: any; endDate?: any }) => {
  try {
    const res = await getStaticticalApi({ startDate, endDate });
    return res.data;
  } catch (err) {
    return err;
  }
});

export const createBannerThunk = createAsyncThunk("admin/createBanner", async ({ image, path, createAt = dayjs(), callBack }: BannerCreateType) => {
  try {
    const res = await createBannerApi({ image, path, createAt });
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
      callBack();
      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const updateCustomerThunk = createAsyncThunk(
  "admin/updateCustomer",
  async ({ id, status, callBack }: { id: string; status?: number; callBack: any }, { rejectWithValue }) => {
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

export const importProductThunk = createAsyncThunk(
  "admin/importProduct",
  async ({ params, callBack }: { params: CreateImportType; callBack: any }, { rejectWithValue }) => {
    try {
      const data = await importProductApi({ ...params });
      toastifySuccess("Nhập hàng thành công!");
      callBack();
      return data?.data;
    } catch (err) {
      toastifyWarning("Nhập hàng thất bại!");
      return rejectWithValue(err);
    }
  },
);

export const getImportDetailThunk = createAsyncThunk("admin/getImportDetail", async (id: number, { rejectWithValue }) => {
  try {
    const data = await getImportDetailApi(id);
    // callBack();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const createImageDescriptionThunk = createAsyncThunk("admin/createImageDescription", async ({ formData, callBack }: any, { rejectWithValue }) => {
  try {
    const data = await createImageDescriptionApi(formData);
    callBack();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const deleteImageDescriptionThunk = createAsyncThunk("admin/deleteImageDescription", async ({ id, callBack }: any, { rejectWithValue }) => {
  try {
    const data = await deleteImageDescriptionApi(id);
    callBack();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

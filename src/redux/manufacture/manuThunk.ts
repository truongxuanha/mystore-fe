import { createAsyncThunk } from "@reduxjs/toolkit";
import { createManufactureApi, getAllManufacturerApi, getManufacturer, removeProviderApi } from "./api";
import { ParamsManuApiType, ProviderType } from "./type";
import { CallBackType } from "types/redux.type";
import { toastifySuccess } from "utils/toastify";

export const getManuThunk = createAsyncThunk("manufacturer/getManufacturer", async (_, { rejectWithValue }) => {
  try {
    const res = await getManufacturer();
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getAllManuThunk = createAsyncThunk("manufacturer/getAllManufacturer", async ({ query, page, item }: ParamsManuApiType, { rejectWithValue }) => {
  try {
    const res = await getAllManufacturerApi({ query, page, item });
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createManufactureThunk = createAsyncThunk(
  "manufacturer/createManufacturer",
  async ({ img, name, phone, website, callBack }: ProviderType & CallBackType, { rejectWithValue }) => {
    try {
      const res = await createManufactureApi({ img, name, phone, website });
      callBack();
      toastifySuccess("Thêm nhà cung cấp thành công!");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const updateManufactureThunk = createAsyncThunk(
  "manufacturer/updateManufacturer",
  async ({ id, img, name, phone, website, callBack }: ProviderType & CallBackType, { rejectWithValue }) => {
    try {
      const res = await createManufactureApi({ id, img, name, phone, website });
      callBack();
      toastifySuccess("Cập nhật nhà cung cấp thành công!");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const removeProviderThunk = createAsyncThunk(
  "manufacturer/removeProvider",
  async ({ id, callBack }: { id: number } & CallBackType, { rejectWithValue }) => {
    try {
      const res = await removeProviderApi(id);
      callBack();
      toastifySuccess("Xóa nhà cung cấp thành công!");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

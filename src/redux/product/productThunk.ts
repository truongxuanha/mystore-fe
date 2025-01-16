import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  cretaeProduct,
  deleteProduct,
  editProduct,
  getCategoryProductApi,
  getHotProduct,
  getImageProductApi,
  getInFoProduct,
  getProduct,
  getProductNew,
  randomProduct,
} from "./api";
import { CreateProductType, EditProductType, ProductParaType } from "./type";
import { toastifyWarning } from "utils/toastify";
import { texts } from "libs/contains/texts";

export const getProducts = createAsyncThunk("product/getProducts", async (rest: ProductParaType, { rejectWithValue }) => {
  try {
    const data = await getProduct({
      ...rest,
    });
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getInFoProducts = createAsyncThunk("product/getInfoProducts", async (id: number, { rejectWithValue }) => {
  try {
    const data = await getInFoProduct(id);
    return data?.data.data[0];
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getProductNews = createAsyncThunk("product/getProductsNew", async (_, { rejectWithValue }) => {
  try {
    const data = await getProductNew();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const getHotProducts = createAsyncThunk("product/getHotProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await getHotProduct();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getProductRandom = createAsyncThunk("product/getRandom", async (_, { rejectWithValue }) => {
  try {
    const data = await randomProduct();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (
    { id_manu, createAt, thumbnail, product_name, price, discount, quantity, description, other_discount, callBack }: CreateProductType,
    { rejectWithValue },
  ) => {
    try {
      const data = await cretaeProduct({ id_manu, createAt, thumbnail, product_name, price, discount, other_discount, quantity, description });
      if (!data.status) {
        throw new Error("Thêm sản phẩm thất bại");
      }
      callBack();
      return data?.data;
    } catch (err) {
      toastifyWarning(texts.errors.ADD_PRODUCT_FAILED);
      return rejectWithValue(err);
    }
  },
);

export const editProductThunk = createAsyncThunk(
  "product/editProduct",
  async (
    { id_manu, createAt, thumbnail, product_name, price, discount, quantity, description, other_discount, product_id }: EditProductType,
    { rejectWithValue },
  ) => {
    try {
      const data = await editProduct({ id_manu, createAt, thumbnail, product_name, price, discount, other_discount, quantity, description, product_id });
      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteProductThunk = createAsyncThunk("product/deleteProduct", async (id: number, { rejectWithValue }) => {
  try {
    const data = await deleteProduct(id);
    if (data && data.status === 200) {
      return data.data;
    } else {
      throw new Error(data.data);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Đã có lỗi xảy ra!";
    return rejectWithValue(errorMessage);
  }
});

export const getCategoryProductThunk = createAsyncThunk("product/getCategoryProduct", async (_, { rejectWithValue }) => {
  try {
    const data = await getCategoryProductApi();
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getImageProductThunk = createAsyncThunk("product/getImageProduct", async (id: number, { rejectWithValue }) => {
  try {
    const data = await getImageProductApi(id);
    return data?.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

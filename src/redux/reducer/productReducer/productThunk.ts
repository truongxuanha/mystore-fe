import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHotProduct,
  getInFoProduct,
  getProduct,
  getProductNew,
  randomProduct,
} from "../../../api/product";
import { ProductParaType } from "../../../api/product/type";
import { ProductsType } from "../../../types";
import { getBanner } from "../../../api/banner";

// interface GetProductsResponse {
//   status: boolean;
//   data: ProductsType[];
//   totalItem: number;
//   totalPage: number;
// }

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    { currentPage, itemsPerPage, manufacturer }: ProductParaType,
    { rejectWithValue }
  ) => {
    try {
      const data = await getProduct({
        currentPage,
        itemsPerPage,
        manufacturer,
      });

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export const getInFoProducts = createAsyncThunk(
  "product/getInfoProducts",
  async (slug: ProductsType["slug"], { rejectWithValue }) => {
    try {
      const data = await getInFoProduct(slug);

      return data?.data.data[0];
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export const getProductNews = createAsyncThunk(
  "product/getProductsNew",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProductNew();

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);
export const getHotProducts = createAsyncThunk(
  "product/getHotProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getHotProduct();

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export const getBanners = createAsyncThunk(
  "product/getBanner",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getBanner();

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export const getProductRandom = createAsyncThunk(
  "product/getRandom",
  async (_, { rejectWithValue }) => {
    try {
      const data = await randomProduct();

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

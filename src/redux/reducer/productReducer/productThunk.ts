import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHotProduct,
  getInFoProduct,
  getProduct,
  getProductNew,
} from "../../../api/product";
import { ProductParaType } from "../../../api/product/type";
import { ProductsType } from "../../../types";

interface GetProductsResponse {
  status: boolean;
  data: ProductsType[];
  totalPage: number;
}

export const getProducts = createAsyncThunk<
  GetProductsResponse,
  ProductParaType
>(
  "product/getProducts",
  async (
    { currentPage, itemsPerPage }: ProductParaType,
    { rejectWithValue }
  ) => {
    try {
      const data = await getProduct({ currentPage, itemsPerPage });

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
      console.log(data?.data.data[0]);
      return data?.data.data[0];
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);
export const getHotProducts = createAsyncThunk<GetProductsResponse>(
  "product/getProducts",
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

export const getProductNews = createAsyncThunk<GetProductsResponse>(
  "product/getProducts",
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
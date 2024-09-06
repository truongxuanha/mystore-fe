import dayjs from "dayjs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateCartType, ProductsType, UpdateItem } from "types";
import { axiosInstance } from "../../../utils/axiosConfig";

export const postCreateCart = createAsyncThunk(
  "cart/postCreateCart",
  async ({ id_product, quantity }: CreateCartType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/create", [
        {
          createAt: dayjs().format("YYYY-MM-DD"),
          id_product,
          quantity,
        },
      ]);
      return response.data;
    } catch (err) {
      console.error("Error creating cart:", err);
      return rejectWithValue(err);
    }
  }
);

export const getProductByAccount = createAsyncThunk(
  "cart/getProductByAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart/get-by-account");
      return response.data.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }: UpdateItem, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`cart/${id}/update`, { quantity });
      await dispatch(getProductByAccount());

      return res.data.data;
    } catch (err) {
      console.error("Error updating cart item:", err);
      return rejectWithValue(err);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id: ProductsType["id"], { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`cart/${id}/remove`);
      await dispatch(getProductByAccount());
      return id;
    } catch (err) {
      console.error("Error removing cart item:", err);
      return rejectWithValue(err);
    }
  }
);

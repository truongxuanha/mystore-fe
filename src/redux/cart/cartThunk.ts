import dayjs from "dayjs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateCartType, ProductsType, UpdateItem } from "types";
import { axiosInstance } from "../../utils/axiosConfig";

export const postCreateCart = createAsyncThunk("cart/postCreateCart", async ({ product_id, quantity }: CreateCartType, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/cart/create", [
      {
        createAt: dayjs().format("YYYY-MM-DD"),
        product_id,
        quantity,
      },
    ]);
    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getProductByAccount = createAsyncThunk("cart/getProductByAccount", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/cart/get-by-account");
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, quantity }: UpdateItem, { dispatch, rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`cart/${id}/update`, { quantity });
    await dispatch(getProductByAccount());

    return res.data.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id: ProductsType["id"], { dispatch, rejectWithValue }) => {
  try {
    await axiosInstance.delete(`cart/${id}/remove`);
    await dispatch(getProductByAccount());
    return id;
  } catch (err) {
    return rejectWithValue(err);
  }
});

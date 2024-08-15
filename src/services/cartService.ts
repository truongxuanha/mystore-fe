import dayjs from "dayjs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsType } from "types";
import { requestJWT } from "../utils/axiosConfig";

interface CreateCartType {
  id_product?: ProductsType["id_product"];
  quantity?: number;
}

export const postCreateCart = createAsyncThunk(
  "cart/postCreateCart",
  async ({ id_product, quantity }: CreateCartType, { rejectWithValue }) => {
    try {
      const response = await requestJWT.post("/cart/create", [
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
      const response = await requestJWT.get("/cart/get-by-account");
      return response.data.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

export interface UpdateItem {
  id: ProductsType["id"];
  quantity: ProductsType["quantity"];
  token: string | null;
}

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, token, quantity }: UpdateItem, { rejectWithValue }) => {
    try {
      await requestJWT.put(
        `cart/${id}/update`,
        { quantity },
        {
          headers: {
            token,
          },
        }
      );
      return id;
    } catch (err) {
      console.error("Error updating cart item:", err);
      return rejectWithValue(err);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id: ProductsType["id"], { rejectWithValue }) => {
    try {
      await requestJWT.delete(`cart/${id}/remove`);

      return id;
    } catch (err) {
      console.error("Error removing cart item:", err);
      return rejectWithValue(err);
    }
  }
);

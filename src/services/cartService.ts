import dayjs from "dayjs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsType } from "types";
import { requestJWT } from "../utils/axiosConfig";

interface CreateCartType {
  token: string | null;
  id_product?: ProductsType["id_product"];
  quantity?: number;
}

export const postCreateCart = createAsyncThunk(
  "cart/postCreateCart",
  async (
    { token, id_product, quantity }: CreateCartType,
    { rejectWithValue }
  ) => {
    try {
      const response = await requestJWT.post(
        "/cart/create",
        [
          {
            createAt: dayjs().format("YYYY-MM-DD"),
            id_product,
            quantity,
          },
        ],
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error creating cart:", err);
      return rejectWithValue(err);
    }
  }
);

export const getProductByAccount = createAsyncThunk(
  "cart/getProductByAccount",
  async ({ token }: CreateCartType, { rejectWithValue }) => {
    try {
      const response = await requestJWT.get("/cart/get-by-account", {
        headers: {
          token,
        },
      });
      return response.data.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  }
);

interface RemoveItem {
  id: ProductsType["id"];
  token: string | null;
}

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ id, token }: RemoveItem, { rejectWithValue }) => {
    try {
      await requestJWT.delete(`cart/${id}/remove`, {
        headers: {
          token,
        },
      });
      console.log(id);
      return id;
    } catch (err) {
      console.error("Error removing cart item:", err);
      return rejectWithValue(err);
    }
  }
);

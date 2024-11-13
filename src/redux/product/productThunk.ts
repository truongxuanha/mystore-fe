import { createAsyncThunk } from "@reduxjs/toolkit";
import { cretaeProduct, deleteProduct, editProduct, getCmtByIdProduct, getHotProduct, getInFoProduct, getProduct, getProductNew, randomProduct } from ".";
import { CommentProductType, CreateProductType, EditProductType, ProductParaType } from "./type";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ currentPage = 1, itemsPerPage = 8, sort = "", manufacturer = "all", query = "" }: ProductParaType, { rejectWithValue }) => {
    try {
      const data = await getProduct({
        currentPage,
        itemsPerPage,
        manufacturer,
        sort,
        query,
      });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

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
  async ({ id_manu, createAt, thumbnail, product_name, price, discount, quantity, description, other_discount }: CreateProductType, { rejectWithValue }) => {
    try {
      const data = await cretaeProduct({ id_manu, createAt, thumbnail, product_name, price, discount, other_discount, quantity, description });

      return data?.data;
    } catch (err) {
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

export const getCommentByIdProductThunk = createAsyncThunk(
  "product/CmtByIdProduct",
  async ({ item, page, sort, product_id, star }: CommentProductType, { rejectWithValue }) => {
    try {
      const data = await getCmtByIdProduct({ item, page, sort, product_id, star });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

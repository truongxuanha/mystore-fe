import { createAsyncThunk } from "@reduxjs/toolkit";
import { cretaeProduct, deleteProduct, getHotProduct, getInFoProduct, getProduct, getProductNew, randomProduct } from "../../../api/product";
import { CreateProductType, ProductParaType } from "../../../api/product/type";
import { ProductsType } from "../../../types";
import { getBanner } from "../../../api/banner";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ currentPage = 1, itemsPerPage = 8, sort = "", manufacturer = "all" }: ProductParaType, { rejectWithValue }) => {
    try {
      const data = await getProduct({
        currentPage,
        itemsPerPage,
        manufacturer,
        sort,
      });

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  },
);

export const getInFoProducts = createAsyncThunk("product/getInfoProducts", async (slug: ProductsType["slug"], { rejectWithValue }) => {
  try {
    const data = await getInFoProduct(slug);

    return data?.data.data[0];
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});

export const getProductNews = createAsyncThunk("product/getProductsNew", async (_, { rejectWithValue }) => {
  try {
    const data = await getProductNew();

    return data?.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});
export const getHotProducts = createAsyncThunk("product/getHotProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await getHotProduct();

    return data?.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});

export const getBanners = createAsyncThunk("product/getBanner", async (_, { rejectWithValue }) => {
  try {
    const data = await getBanner();

    return data?.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});

export const getProductRandom = createAsyncThunk("product/getRandom", async (_, { rejectWithValue }) => {
  try {
    const data = await randomProduct();

    return data?.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async ({ id_manu, createAt, thumbnail, name, price, discount, quantity, description, other_discount }: CreateProductType, { rejectWithValue }) => {
    try {
      const data = await cretaeProduct({ id_manu, createAt, thumbnail, name, price, discount, other_discount, quantity, description });

      return data?.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return rejectWithValue(err);
    }
  },
);

export const deleteProductThunk = createAsyncThunk("product/deleteProduct", async (id: number, { rejectWithValue }) => {
  try {
    const data = await deleteProduct(id);

    return data?.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return rejectWithValue(err);
  }
});

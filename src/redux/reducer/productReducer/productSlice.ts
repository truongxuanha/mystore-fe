import { ProductsType } from "./../../../types/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getHotProducts,
  getInFoProducts,
  getProductNews,
  getProducts,
} from "./productThunk";

export interface ProductStateType {
  products: ProductsType[];
  isLoading: boolean;
  totalPage: number;
  infoProduct: ProductsType | null;
}

const setisLoading = (state: ProductStateType, isLoading: boolean) => {
  state.isLoading = isLoading;
};

const initialState: ProductStateType = {
  isLoading: false,
  products: [],
  totalPage: 1,
  infoProduct: null,
};

const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ data: ProductsType[]; totalPage: number }>
        ) => {
          setisLoading(state, false);
          state.products = action.payload.data;
          state.totalPage = action.payload.totalPage;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        setisLoading(state, false);
        state.products = [];
        state.totalPage = 1;
      });

    builder
      .addCase(getInFoProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInFoProducts.fulfilled, (state, action) => {
        setisLoading(state, false);
        state.infoProduct = action.payload ?? null;
      })
      .addCase(getInFoProducts.rejected, (state) => {
        setisLoading(state, false);
      });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;

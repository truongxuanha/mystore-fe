import { createSlice } from "@reduxjs/toolkit";
import {
  getProductByAccount,
  postCreateCart,
  removeCartItem,
  updateCartItem,
} from "../services/cartService";

import { CartState } from "../types";

const initialState: CartState = {
  cartItems: [],
  loadingCart: false,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCreateCart.pending, (state) => {
        state.loadingCart = true;
      })
      .addCase(postCreateCart.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cartItems = action.payload;
      })
      .addCase(postCreateCart.rejected, (state) => {
        state.loadingCart = false;
      })

      .addCase(getProductByAccount.pending, (state) => {
        state.loadingCart = true;
      })
      .addCase(getProductByAccount.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cartItems = action.payload;
      })
      .addCase(getProductByAccount.rejected, (state) => {
        state.loadingCart = false;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.loadingCart = true;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loadingCart = false;
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.loadingCart = false;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loadingCart = true;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loadingCart = false;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.loadingCart = false;
      });
  },
});

export default cartSlice.reducer;

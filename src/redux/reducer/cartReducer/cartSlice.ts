import { createSlice } from "@reduxjs/toolkit";
import {
  getProductByAccount,
  postCreateCart,
  removeCartItem,
  updateCartItem,
} from "./cartThunk";

import { CartState } from "../../../types";

const initialState: CartState = {
  cartItems: [],
  loadingCart: false,
  error: null,
};

const setLoading = (state: CartState, loading: boolean) => {
  state.loadingCart = loading;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCreateCart.pending, (state) => setLoading(state, true))
      .addCase(postCreateCart.fulfilled, (state) => setLoading(state, false))
      .addCase(postCreateCart.rejected, (state) => setLoading(state, false))

      .addCase(getProductByAccount.pending, (state) => setLoading(state, true))
      .addCase(getProductByAccount.fulfilled, (state, action) => {
        setLoading(state, false);
        state.cartItems = action.payload;
      })
      .addCase(getProductByAccount.rejected, (state) =>
        setLoading(state, false)
      )

      .addCase(removeCartItem.pending, (state) => setLoading(state, true))
      .addCase(removeCartItem.fulfilled, (state) => setLoading(state, false))
      .addCase(removeCartItem.rejected, (state) => setLoading(state, false))

      .addCase(updateCartItem.pending, (state) => setLoading(state, true))
      .addCase(updateCartItem.fulfilled, (state) => setLoading(state, false))
      .addCase(updateCartItem.rejected, (state) => setLoading(state, false));
  },
});

export default cartSlice.reducer;

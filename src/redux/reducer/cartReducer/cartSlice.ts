import { createSlice } from "@reduxjs/toolkit";
import { getProductByAccount, postCreateCart, removeCartItem, updateCartItem } from "./cartThunk";

import { CartState, ProductsType } from "../../../types";

const initialState: CartState = {
  cartItems: [],
  loadingCart: false,
  error: null,
  cartLength: 0,
};

const setLoading = (state: CartState, loading: boolean) => {
  state.loadingCart = loading;
};
const total = function(action: ProductsType[]) {
  return action.reduce((total, item) => total + item.quantity, 0);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartLength = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateCart.pending, (state) => setLoading(state, true))
      .addCase(postCreateCart.fulfilled, (state) => setLoading(state, false))
      .addCase(postCreateCart.rejected, (state) => setLoading(state, false))

      .addCase(getProductByAccount.pending, (state) => setLoading(state, true))
      .addCase(getProductByAccount.fulfilled, (state, action) => {
        setLoading(state, false);
        state.cartItems = action.payload ?? [];
        state.cartLength = total(state.cartItems);
      })
      .addCase(getProductByAccount.rejected, (state) => {
        setLoading(state, false);
        state.cartItems = [];
        state.cartLength = 0;
      })

      .addCase(removeCartItem.pending, (state) => setLoading(state, true))
      .addCase(removeCartItem.fulfilled, (state) => setLoading(state, false))
      .addCase(removeCartItem.rejected, (state) => setLoading(state, false))

      .addCase(updateCartItem.pending, (state) => setLoading(state, true))
      .addCase(updateCartItem.fulfilled, (state) => setLoading(state, false))
      .addCase(updateCartItem.rejected, (state) => setLoading(state, false));
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

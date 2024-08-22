// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/userReducer/userSlice";
import cartReducer from "./reducer/cartReducer/cartSlice";
import productReducer from "./reducer/productReducer/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

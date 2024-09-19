// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/userReducer/userSlice";
import cartReducer from "./reducer/cartReducer/cartSlice";
import productReducer from "./reducer/productReducer/productSlice";
import searchReducer from "./reducer/searchReducer/searchSlice";
import manufactureReducer from "./reducer/manuReducer/manuSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    manufacturer: manufactureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

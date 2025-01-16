import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import searchReducer from "./search/searchSlice";
import manufactureReducer from "./manufacture/manuSlice";
import orderReducer from "./order/orderSlice";
import homeReducer from "./home/homeSlice";
import billReducer from "./bill/billSlice";
import commentReducer from "./comment/commentSlice";
import adminReducer from "./admin/adminSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: [
    "loading",
    "error",
    "all_accounts",
    "all_customers",
    "totalAccount",
    "totalCustomer",
    "addressAcc",
    "loadingForpass",
    "dataReqOtp",
    "infoForPassWord",
    "verifyOtp",
  ],
};
const orderPersistConfig = {
  key: "order",
  storage,
  whitelist: ["typeOrder"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    manufacturer: manufactureReducer,
    order: persistedOrderReducer,
    home: homeReducer,
    bill: billReducer,
    comment: commentReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

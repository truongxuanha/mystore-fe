// store.ts
import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
import authReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

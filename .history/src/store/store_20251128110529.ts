// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
// NOTE: adjust this import to match your file location for bookDetailSlice
// If your bookDetail slice is at src/store/bookDetailSlice.ts use:
import bookDetailReducer from "@/store/bookDetailSlice";
// If it's at src/features/bookDetail/bookDetailSlice.ts use:
// import bookDetailReducer from "@/features/bookDetail/bookDetailSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    bookDetail: bookDetailReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

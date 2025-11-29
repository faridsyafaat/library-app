import { configureStore } from "@reduxjs/toolkit";
import bookDetailReducer from "./bookDetailSlice";
import cartReducer from "../cartSlice";            // 👈 tambah import cartSlice
import authReducer from "../auth/authSlice";       // 👈 kalau Anda pakai auth

export const store = configureStore({
  reducer: {
    bookDetail: bookDetailReducer,
    cart: cartReducer,          
    auth: authReducer,         
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";            // kalau ini path-mu berbeda, sesuaikan
import bookDetailReducer from "@/store/bookDetailSlice";       // <<< pastikan path ini benar

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    bookDetail: bookDetailReducer,   // <<== DAFTARKAN DI SINI
    // tambahkan reducer lain kalau ada
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

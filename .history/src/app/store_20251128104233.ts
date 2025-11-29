import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import bookDetailReducer from "@/features/bookDetail/bookDetailSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    bookDetail: bookDetailReducer,
    auth: authReducer,      // ← Tambahkan ini
  },
});

// TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

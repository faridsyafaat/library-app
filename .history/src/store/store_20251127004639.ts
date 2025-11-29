import { configureStore } from "@reduxjs/toolkit";
import bookDetailReducer from "./bookDetailSlice";

// PATH YANG BENAR
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    bookDetail: bookDetailReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


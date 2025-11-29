import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
// import other reducers...

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // ...lainnya
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

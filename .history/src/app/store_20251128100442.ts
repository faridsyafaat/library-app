import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hook typed
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

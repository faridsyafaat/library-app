import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartBook {
  id: number;
  title: string;
  author?: string;
  coverImage?: string;
  price?: number;
  quantity: number;
}

interface CartState {
  items: CartBook[];
  count: number;       // ✅ tambahkan count
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartBook>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

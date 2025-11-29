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
  count: number;
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
   
    setCart: (state, action: PayloadAction<CartBook[]>) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },

      addToCart: (state, action: PayloadAction<CartBook>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

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
      state.error = null;
    },
  },
});

export const { setCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

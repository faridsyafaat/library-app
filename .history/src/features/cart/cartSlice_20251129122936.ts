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
    /**
     * Digunakan untuk menyimpan data cart dari API GET /api/cart
     */
    setCart: (state, action: PayloadAction<CartBook[]>) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },

    /**
     * Add to cart (client-side)
     * Dipakai ketika user mengklik "Add to Cart" di DetailBookSection
     * Post API tetap berjalan, tetapi Redux juga update UI.
     */
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

    /**
     * Mengosongkan cart (dipakai saat logout atau reset)
     */
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      state.error = null;
    },
  },
});

export const { setCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

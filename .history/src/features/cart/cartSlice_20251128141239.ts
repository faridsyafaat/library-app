import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartBook {
  id: number;
  title: string;
  coverImage?: string;
  quantity: number;
}

interface CartState {
  items: CartBook[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartBook>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
    },
    clearCart: (state: CartState) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

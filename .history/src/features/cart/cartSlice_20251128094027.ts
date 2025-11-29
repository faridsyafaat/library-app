import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Book {
  id: number;
  cover: string;
  category: string;
  title: string;
  author: string;
}

interface CartState {
  items: Book[];
  selected: number[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  selected: [],
  loading: false,
};

// === GET CART ===
export const fetchCart = createAsyncThunk<Book[]>(
  "cart/fetchCart",
  async () => {
    const res = await axios.get("http://localhost:3000/cart");
    return res.data;
  }
);

// === CHECKOUT ===
export const checkoutCart = createAsyncThunk<void, number[]>(
  "cart/checkoutCart",
  async (selectedIds: number[]) => {
    await axios.post("http://localhost:3000/checkout", {
      books: selectedIds,
    });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    toggleSelect: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((x) => x !== id);
      } else {
        state.selected.push(id);
      }
    },

    toggleSelectAll: (state) => {
      if (state.selected.length === state.items.length) {
        state.selected = [];
      } else {
        state.selected = state.items.map((b) => b.id);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart, toggleSelect, toggleSelectAll } = cartSlice.actions;
export default cartSlice.reducer;

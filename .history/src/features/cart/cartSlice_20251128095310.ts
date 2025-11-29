import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

// =============== FETCH CART ===============
export const fetchCart = createAsyncThunk<Book[]>(
  "cart/fetchCart",
  async () => {
    const res = await axios.get("http://localhost:3000/cart");
    return res.data;
  }
);

// =============== ADD TO CART ===============
export const addToCartAsync = createAsyncThunk<void, Book>(
  "cart/addToCartAsync",
  async (book) => {
    await axios.post("http://localhost:3000/cart", book);
  }
);

// =============== CHECKOUT ===============
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

export const { toggleSelect, toggleSelectAll } = cartSlice.actions;
export default cartSlice.reducer;

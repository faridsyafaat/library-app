import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ======================
// TYPES
// ======================
interface Book {
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

// ======================
// ASYNC THUNKS
// ======================
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axios.get("http://localhost:3000/cart");
  return res.data;
});

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (selected: number[]) => {
    const res = await axios.post("http://localhost:3000/checkout", {
      items: selected,
    });
    return res.data;
  }
);

// ======================
// INITIAL STATE
// ======================
const initialState: CartState = {
  items: [],
  selected: [],
  loading: false,
};

// ======================
// SLICE
// ======================
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
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })

      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.selected = [];
        state.loading = false;
      })
      .addCase(checkoutCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

// ======================
// EXPORT ACTIONS & REDUCER
// ======================
export const { toggleSelect, toggleSelectAll } = cartSlice.actions;

export default cartSlice.reducer;

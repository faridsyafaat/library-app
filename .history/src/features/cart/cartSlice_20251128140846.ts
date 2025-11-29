import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env?.VITE_API_URL ?? "http://localhost:5000";

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
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk<CartBook[], string>(
  "cart/fetchCartItems",
  async (userId) => {
    const res = await axios.get(`${API_BASE}/cart/${userId}`);
    return res.data as CartBook[];
  }
);

export const addToCartAsync = createAsyncThunk<CartBook[], { bookId: number; userId?: string }>(
  "cart/addToCartAsync",
  async ({ bookId }) => {
    const res = await axios.post(`${API_BASE}/cart/add`, { bookId, quantity: 1 });
   
    return res.data as CartBook[];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartBook[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Failed to fetch cart";
      })

      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action: PayloadAction<CartBook[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Failed to add to cart";
      });
      (state, action) => {
  state.items.push(action.payload);
  state.count += 1;
}

  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

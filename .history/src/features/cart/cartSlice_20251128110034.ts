// src/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export interface CartBook {
  id: number;
  title: string;
  author?: string;
  coverImage?: string;
  price?: number;
  qty?: number;
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

// fetch all cart items (example endpoint: GET /cart or /cart/:userId if needed)
export const fetchCart = createAsyncThunk<CartBook[]>(
  "cart/fetchCart",
  async (userId?: number | string) => {
    const url = userId ? `${API_BASE}/cart/${userId}` : `${API_BASE}/cart`;
    const res = await axios.get(url);
    return res.data as CartBook[];
  }
);

// add a book to cart (POST /cart)
export const addToCart = createAsyncThunk<CartBook, CartBook>(
  "cart/addToCart",
  async (book) => {
    const res = await axios.post(`${API_BASE}/cart`, book);
    return res.data as CartBook;
  }
);

// optional: remove from cart (DELETE /cart/:id)
export const removeFromCart = createAsyncThunk<number, number>(
  "cart/removeFromCart",
  async (id) => {
    await axios.delete(`${API_BASE}/cart/${id}`);
    return id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // local-only helpers if needed (not required)
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartBook[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Failed to fetch cart";
      })

      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartBook>) => {
        // push returned item (backend may return created resource)
        state.items.push(action.payload);
      })

      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

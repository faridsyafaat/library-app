import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AppDispatch } from "@/app/store";

export interface CartItem {
  id: number;
  title: string;
  coverImage: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        exists.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { setCartItems, addItem } = cartSlice.actions;
export default cartSlice.reducer;

// =========================
// THUNK TANPA ANY
// =========================

// GET CART
export const fetchCart = () => async (dispatch: AppDispatch) => {
  const res = await axios.get("http://localhost:5000/api/cart");
  dispatch(setCartItems(res.data));
};

// ADD TO CART
export const addToCartApi =
  (book: CartItem) => async (dispatch: AppDispatch) => {
    await axios.post("http://localhost:5000/api/cart/add", book);
    dispatch(addItem(book));
  };

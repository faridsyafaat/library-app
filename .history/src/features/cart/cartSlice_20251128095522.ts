import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: number;
  title: string;
  coverImage: string;
  price?: number;
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

// ============ THUNKS API ==============

// GET /cart
export const fetchCart = () => async (dispatch: any) => {
  const res = await axios.get("http://localhost:5000/api/cart");
  dispatch(setCartItems(res.data));
};

// POST /cart/add
export const addToCartApi =
  (book: CartItem) => async (dispatch: any) => {
    await axios.post("http://localhost:5000/api/cart/add", book);
    dispatch(addItem(book));
  };

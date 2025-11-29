import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  count: number;
}

const initialState: CartState = {
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    }
  },
});

export const { increment, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;

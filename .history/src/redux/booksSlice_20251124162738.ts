import { createSlice } from "@reduxjs/toolkit";

interface BooksState {
  items: any[];
}

const initialState: BooksState = {
  items: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;

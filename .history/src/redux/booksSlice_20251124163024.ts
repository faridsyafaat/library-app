import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  author: string;
}

interface BooksState {
  items: Book[];
}

const initialState: BooksState = {
  items: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;

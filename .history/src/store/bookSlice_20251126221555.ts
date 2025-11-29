import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBookById = createAsyncThunk(
  "book/getBookById",
  async (id: string) => {
    const res = await fetch(`https://api.yourdomain.com/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book detail");
    return await res.json();
  }
);

interface BookState {
  book: any;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  book: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching book";
      });
  },
});

export default bookSlice.reducer;

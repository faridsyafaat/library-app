import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDetail } from "@/types/BookDetail";

export const fetchBookById = createAsyncThunk<BookDetail, string>(
  "bookDetail/fetchBookById",
  async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.data as BookDetail; // ✅ ambil data langsung
  }
);
interface BookDetailState {
  book: BookDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookDetailState = {
  book: null,
  loading: false,
  error: null,
};

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch book detail";
      });
  },
});

export default bookDetailSlice.reducer;

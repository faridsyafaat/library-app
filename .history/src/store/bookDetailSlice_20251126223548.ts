import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookById = createAsyncThunk(
  "bookDetail/fetchBookById",
  async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data.book;
  }
);

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState: {
    book: null,
    loading: false,
    error: null,
  },
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
        state.error = action.error.message || "Failed to load book";
      });
  },
});

export default bookDetailSlice.reducer;

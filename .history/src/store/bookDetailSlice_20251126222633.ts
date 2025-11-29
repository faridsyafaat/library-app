import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BookDetail } from "../types/BookDetail";

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

// API kamu -->
// GET https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/:id

export const fetchBookDetail = createAsyncThunk(
  "bookDetail/fetchBookDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${id}`
      );
      return res.data.data; // karena data ada di "data"
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch book detail");
    }
  }
);

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    clearBookDetail: (state) => {
      state.book = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBookDetail } = bookDetailSlice.actions;

export default bookDetailSlice.reducer;

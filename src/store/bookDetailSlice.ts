import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDetail } from "@/types/BookDetail";

// --- Async thunk ---
export const fetchBookById = createAsyncThunk<
  BookDetail,
  string,
  { rejectValue: string }
>(
  "bookDetail/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data as BookDetail;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message ?? err.message);
      }
      return rejectWithValue((err as Error).message ?? "Unknown error");
    }
  }
);


// --- Slice state ---
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

// --- Slice ---
const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    clearBook: (state) => {
      state.book = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch book detail";
      });
  },
});

// --- Export reducer & actions ---
export const { clearBook } = bookDetailSlice.actions;
export default bookDetailSlice.reducer;

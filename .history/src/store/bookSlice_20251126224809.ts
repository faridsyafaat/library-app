// src/store/bookSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDetail } from "@/types/BookDetail";

export const fetchBookById = createAsyncThunk<
  BookDetail, // return type
  string, // arg type
  { rejectValue: string } // thunkAPI.rejectWithValue type
>("book/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Sesuaikan dengan struktur response-mu; di contoh sebelumnya payload ada di res.data.data
    // Jika response: { data: { book: {...} } } gunakan res.data.data.book
    // Di sini aku asumsikan endpoint mengembalikan book di res.data.data (sesuaikan jika perlu)
    return res.data.data as BookDetail;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message ?? "Request failed"
      );
    }
    return rejectWithValue("Unknown error");
  }
});

interface BookState {
  book: BookDetail | null;
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
  reducers: {
    // optional reducer untuk clear
    clearBook(state) {
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
        state.error = action.payload ?? action.error.message ?? "Failed";
      });
  },
});

export const { clearBook } = bookSlice.actions;
export default bookSlice.reducer;

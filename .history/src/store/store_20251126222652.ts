import { configureStore } from "@reduxjs/toolkit";
import bookDetailReducer from "./bookDetailSlice";

export const store = configureStore({
  reducer: {
    bookDetail: bookDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import bookDetailReducer from "./bookDetail";

export const store = configureStore({
  reducer: {
    bookDetail: bookDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

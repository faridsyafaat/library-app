import axios from "axios";
import type { RootState } from "@/redux/store";
import store from "@/redux/store"; 

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20", // ganti sesuai
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor: attach token from redux (if ada)
api.interceptors.request.use((config) => {
  try {
    const state: RootState = store.getState();
    const token = state.auth?.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // ignore
  }
  return config;
});

export default api;

import axios from "axios";
import type { RootState } from "@/redux/store";
import store from "@/redux/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
    "https://be-library-api-xh3x6c5iiq-et.a.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const state: RootState = store.getState();
    const token = state.auth?.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error(err);
  }
  return config;
});

export default api;

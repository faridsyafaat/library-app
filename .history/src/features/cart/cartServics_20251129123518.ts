import axios from "axios";

// Replace with your actual API base URL or set via env
const API_BASE = process.env.REACT_APP_API_BASE || "https://be-library-api-xh3x6c5iiq-et.a.run.app/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface CartItemResponse {
  id: number; // cart item id
  bookId: number;
  quantity: number;
  book: {
    id: number;
    title: string;
    coverImage?: string;
    Author?: { name?: string };
    price?: number;
  };
}

export const getCart = async (): Promise<CartItemResponse[]> => {
  const res = await api.get("/cart");
  // try to normalize several possible shapes from backend
  const data = res.data?.data ?? res.data?.items ?? res.data;
  if (!Array.isArray(data)) return [];
  return data as CartItemResponse[];
};

export const addToCart = async (bookId: number, quantity = 1) => {
  const payload = { bookId, quantity };
  const res = await api.post("/cart/items", payload);
  return res.data;
};

export default api;

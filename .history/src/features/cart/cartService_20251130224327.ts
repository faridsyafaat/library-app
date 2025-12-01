import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", 
});

export const getCart = async (token?: string) => {
  const res = await API.get("/cart", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
  return res.data?.data || [];
};

export const addToCart = async (bookId: number, token?: string) => {
  const res = await API.post(
    "/cart",
    { bookId },
    {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    }
  );
  return res.data?.data || [];
};

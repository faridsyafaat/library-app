import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", 
});

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data?.data || []; 
};

export const addToCart = async (bookId: number) => {
  const res = await API.post("/cart", { bookId });
  return res.data?.data;
};

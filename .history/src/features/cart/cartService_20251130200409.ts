import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ganti sesuai backend
});

// Ambil cart user, pakai token
export const getCart = async (token?: string) => {
  const res = await API.get("/cart", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
  return res.data?.data || [];
};

// Tambah item ke cart
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

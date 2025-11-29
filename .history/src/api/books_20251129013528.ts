import axios from "axios";

export type Book = {
  id: number | string;
  title: string;
  coverImage: string;
  rating: number;
  Author: {
    name: string;
  };
};

export async function getBooks(page = 1, limit = 20): Promise<Book[]> {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=${page}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.data?.books ?? [];
}

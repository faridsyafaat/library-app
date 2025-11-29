import axios from "axios";

export type Author = {
  id: number | string;
  name: string;
  photo: string;
  totalBooks: number;
};

const BASE_URL = "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors";

export async function getAuthors(): Promise<Author[]> {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/authors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Swagger menunjukkan format response pakai `data`
  return res.data?.data ?? [];
}

export async function getBooksByAuthor(id: string | number) {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/authors/${id}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data?.data ?? [];
}

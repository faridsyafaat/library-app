import axios from "axios";

export type Author = {
  id: number;
  name: string;
  photo: string;
  totalBooks: number;
};

export async function getAuthors(): Promise<Author[]> {
  const res = await axios.get("http://localhost:3000/authors");
  return res.data;
}

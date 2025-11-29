import axios from "axios";

export type Author = {
  id: number | string;
  name: string;
  photo: string;
  totalBooks: number;
};

export async function getAuthors(): Promise<Author[]> {
 
  const res = await axios.get("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors");
  return res.data as Author[];
}

export async function getAuthorById(id: string | number): Promise<Author> {
  const res = await axios.get(`http://localhost:3000/authors/${id}`);
  return res.data as Author;
}


// src/api/authors.ts
export type Author = {
  id: number | string;
  name: string;
  photo: string;
  totalBooks: number;
};

export async function getAuthorById(id: string | number) {
  // ganti base URL sesuai backend-mu atau gunakan axios instance
  const res = await fetch(`https://your-api.com/authors/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch author");
  }
  const data = await res.json();
  return data as Author;
}

export async function getBooksByAuthor(id: string | number) {
  const res = await fetch(`https://your-api.com/authors/${id}/books`);
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

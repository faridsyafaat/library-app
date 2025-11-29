import axios from "axios";

export type Author = {
  id: number | string;
  name: string;
  photo: string;
  totalBooks: number;
};

// Get all authors
export async function getAuthors(): Promise<Author[]> {
  const res = await axios.get(
    "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors"
  );

  return res.data?.data ?? [];
}

// Get single author by ID
export async function getAuthorById(id: string | number): Promise<Author> {
  const authors = await getAuthors();
  const author = authors.find((a) => String(a.id) === String(id));

  if (!author) {
    throw new Error("Author not found");
  }

  return author;
}

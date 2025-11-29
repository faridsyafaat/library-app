export type Book = {
  id: number | string;
  title: string;
  cover: string;
  rating: number;
  authorName: string;
};

export async function getBooksByAuthor(authorId: string | number) {
  const res = await fetch(`https://your-api.com/authors/${authorId}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json() as Promise<Book[]>;
}

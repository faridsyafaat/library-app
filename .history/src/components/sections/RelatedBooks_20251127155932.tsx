// src/components/sections/RelatedBooks.tsx
import { useNavigate } from "react-router-dom";
import { DUMMY_BOOKS } from "@/data/dummyBooks";
import BookCard from "../books/BookCard";

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating?: number;
  category?: string;
};

type Props = {
  categoryName?: string;
  currentBookId?: string | number;
  title?: string;
};

export default function RelatedBooks({
  categoryName,
  currentBookId,
  title = "Related Books",
}: Props) {
  const navigate = useNavigate();

  // ambil data (dummy sekarang — nanti ganti dengan hasil query API)
  const books: Book[] = DUMMY_BOOKS.map((b) => ({
    ...b,
    id: String(b.id),
    rating: b.rating ?? 4.5,
    category: (b as any).category ?? undefined,
  }));

  // kalau categoryName ada → filter by category (case-insensitive) + exclude currentBookId
  // kalau tidak ada → tampilkan buku lain selain currentBookId
  const normalizedCurrentId = currentBookId !== undefined ? String(currentBookId) : undefined;

  const related = books
    .filter((book) => {
      if (normalizedCurrentId && book.id === normalizedCurrentId) return false;

      if (categoryName) {
        // jika book.category tidak ada atau tidak cocok → exclude
        if (!book.category) return false;
        return book.category.toLowerCase() === String(categoryName).toLowerCase();
      }

      // default: include book (except current)
      return true;
    })
    .slice(0, 4);

  return (
    <section className="mt-10 px-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {related.length === 0 ? (
        <p className="text-gray-500 text-sm">No related books found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((book) => (
            <div
              key={book.id}
              className="cursor-pointer"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <BookCard
                book={{
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  rating: book.rating ?? 4.5,
                  cover: book.cover,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

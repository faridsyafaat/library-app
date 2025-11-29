import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
};

// Dummy data sementara
const DUMMY_BOOKS: Book[] = [
  {
    id: 1,
    title: "Rasa Bakso Pak Bowo",
    author: "Tuhu",
    cover: "/image/book1.png",
    rating: 4.9,
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/image/book2.png",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Lisa Kleypas",
    author: "Irrsistible",
    cover: "/image/book3.png",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Oliver Twist",
    author: "Charles Dickens",
    cover: "/image/book4.png",
    rating: 4.9,
  },
];

export default function AuthorBookSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>(DUMMY_BOOKS);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?authorId=${authorId}`);
        if (!res.ok) return;

        const json: { data?: { books?: Partial<Book>[] } } = await res.json();
        const apiBooks = json.data?.books;

        if (apiBooks && apiBooks.length > 0) {
          const normalized: Book[] = apiBooks.map((b) => ({
            id: b.id ?? 0,
            title: b.title ?? "Untitled",
            author: b.author ?? "Unknown",
            cover: b.cover ?? null,
            rating: b.rating ?? 0,
          }));
          setBooks(normalized);
        }
      } catch {
        // Keep using dummy if API fails
      }
    };

    if (authorId) fetchBooks();
  }, [authorId]);

  const fallback = "/image/fallback.png";

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-5">Book List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {books.slice(0, 4).map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/books/${book.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer overflow-hidden"
          >
            <img
              src={book.cover ?? fallback}
              alt={book.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== fallback) target.src = fallback;
              }}
              className="rounded-t-xl w-full h-56 object-cover bg-gray-100"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-gray-500 text-xs">{book.author}</p>

              <div className="flex items-center text-xs text-yellow-500 mt-2 gap-1">
                ⭐ <span className="text-gray-700">{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

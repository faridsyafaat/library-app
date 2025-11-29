i// src/components/author/AuthorBookSection.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
};

const DUMMY_BOOKS: Book[] = [
  {
    id: 1,
    title: "21 Rasa Bakso Pak Bowo",
    author: "Author name",
    cover: "/image/book1.png",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Lisa Kleypas",
    author: "Author name",
    cover: "/image/book2.png",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Oliver Twist",
    author: "Author name",
    cover: "/image/book3.png",
    rating: 4.9,
  },
  {
    id: 4,
    title: "White Fang",
    author: "Author name",
    cover: "/image/book4.png",
    rating: 4.9,
  },
];

export default function AuthorBookSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>(DUMMY_BOOKS);
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to fetch real books for the author; if succeed, replace dummy
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?authorId=${authorId}`);
        if (!res.ok) return; // bail out, keep dummy
        const data = await res.json();
        // adapt to your API shape: try common properties
        const apiBooks: Book[] = data.books ?? data.data?.books ?? [];
        if (Array.isArray(apiBooks) && apiBooks.length > 0) {
          // normalize items if needed (ensure cover field exists)
          const normalized = apiBooks.map((b: any) => ({
            id: b.id,
            title: b.title ?? b.name ?? "Untitled",
            author: b.Author?.name ?? b.author ?? "Unknown",
            cover: b.coverImage ?? b.cover ?? null,
            rating: b.rating ?? 0,
          }));
          setBooks(normalized);
        }
      } catch (err) {
        // silent fail: keep dummy
        // console.error("Failed fetching author books:", err);
      }
    };

    // only try fetch when authorId is valid
    if (authorId) {
      fetchBooks();
    }
  }, [authorId]);

  // helper fallback image path
  const fallback = "/image/fallback.png"; // please place a fallback image in public/image/fallback.png

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
                const t = e.currentTarget;
                if (t.src !== fallback) t.src = fallback;
              }}
              className="rounded-t-xl w-full h-56 object-cover bg-gray-100"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-gray-500 text-xs">{book.author}</p>

              <div className="flex items-center text-xs text-yellow-500 mt-2 gap-1">
                <span>⭐</span>
                <span className="text-gray-700">{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

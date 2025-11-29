import { useEffect, useState } from 'react';
import axios from 'axios';

interface RelatedBookItem {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
}

interface RelatedBooksProps {
  categoryName: string;
  currentBookId: number;
}

// Dummy fallback jika API belum ada data
const defaultBooks: RelatedBookItem[] = [
  {
    id: 999,
    title: 'Default Book 1',
    author: 'Default Author',
    rating: 4,
    coverImage: '/image/default1.jpg',
  },
  {
    id: 1000,
    title: 'Default Book 2',
    author: 'Default Author',
    rating: 5,
    coverImage: '/image/default2.jpg',
  },
];

export default function RelatedBooks({
  categoryName,
  currentBookId,
}: RelatedBooksProps) {
  const [books, setBooks] = useState<RelatedBookItem[]>(defaultBooks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryName) return; // Kalau category kosong, pakai default

    setLoading(true);
    axios
      .get(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?category=${categoryName}`)
      .then((res) => {
        const apiBooks: RelatedBookItem[] = res.data.map((b: any) => ({
          id: b.id,
          title: b.title,
          author: b.Author?.name || 'Unknown Author',
          rating: b.rating || 0,
          coverImage: b.coverImage || '/image/default1.jpg',
        }));
        setBooks(apiBooks.length > 0 ? apiBooks : defaultBooks);
      })
      .catch(() => {
        // Kalau API error → pakai default
        setBooks(defaultBooks);
      })
      .finally(() => setLoading(false));
  }, [categoryName]);

  const filteredBooks = books.filter((b) => b.id !== currentBookId);

  if (loading) return <div className="p-4">Loading related books...</div>;
  if (filteredBooks.length === 0) return null;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-yellow-500">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RelatedBookItem {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
}

interface RelatedBooksProps {
  currentBookId: number;
  categoryName: string;
}

// Dummy fallback data
const fallbackBooks: RelatedBookItem[] = [
  { id: 2, title: "The Psychology of Money", author: "Jason Zweig", rating: 4, coverImage: "/image/book2.png" },
  { id: 3, title: "Lisa Kleypas", author: "Irresistible", rating: 4, coverImage: "/image/book3.png" },
  { id: 4, title: "Oliver Twist", author: "Charles Dickens", rating: 3, coverImage: "/image/book4.png" },
];

export default function RelatedBooks({ currentBookId, categoryName }: RelatedBooksProps) {
  // Fetch related books dari API
  const { data, isError } = useQuery<RelatedBookItem[]>({
    queryKey: ["relatedBooks", categoryName],
    queryFn: async () => {
      const res = await axios.get(`/api/books?category=${categoryName}`);
      return res.data;
    },
    staleTime: 1000 * 60, // 1 menit cache
  });

  // fallback dummy jika API gagal / data belum siap
  const booksToShow = (data || fallbackBooks).filter((b) => b.id !== currentBookId);

  if (booksToShow.length === 0) return null;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {booksToShow.map((book) => (
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
      {isError && <p className="text-red-500 mt-2">Failed to load related books.</p>}
    </section>
  );
}

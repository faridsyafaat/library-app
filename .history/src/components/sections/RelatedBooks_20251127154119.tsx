import BookCard from "../books/BookCard";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

type Book = {
  id: string | number;
  title: string;
  author: string;
  cover: string;
  rating: number;
};

type Props = {
  categoryName: string;
  currentBookId: string | number;
};

export default function RelatedBooks({ categoryName, currentBookId }: Props) {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["related-books", categoryName],
    queryFn: async () => {
      const res = await fetch(
        `https://your-api.com/books?category=${categoryName}`
      );
      return res.json();
    },
  });

  const relatedBooks: Book[] = (data || [])
    .filter((b: Book) => b.id !== currentBookId)
    .slice(0, 4);

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Related Books</h2>

      {isLoading && (
        <p className="text-sm text-gray-400">Loading related books...</p>
      )}

      {error && (
        <p className="text-sm text-red-500">Failed to load books.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}

        {!isLoading && relatedBooks.length === 0 && (
          <p className="col-span-full text-gray-500 text-sm">
            No related books found.
          </p>
        )}
      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import type { Book } from "@/api/books";
import BookCard from "../books/BookCard";

type Props = {
  related: Book[];
  title?: string;
};

export default function RelatedBooks({ related, title = "Related Books" }: Props) {
  const navigate = useNavigate();

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {related.length === 0 ? (
        <p className="text-gray-500 text-sm">No related books found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {related.map((book) => (
            <BookCard
              key={book.id}
              book={{
                ...book,
                rating: book.rating ?? 4.5, // fallback kalau belum ada rating
              }}
              onDetail={() => navigate(`/books/${book.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

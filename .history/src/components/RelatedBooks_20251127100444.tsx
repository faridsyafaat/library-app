import { relatedBooksDummy } from "@/data/relatedBooksDummy";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Props {
  categoryName: string;
  currentBookId: number;
}

export default function RelatedBooks({ categoryName, currentBookId }: Props) {
  const relatedList = relatedBooksDummy[categoryName] || [];

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {relatedList
          .filter((b) => b.id !== currentBookId)
          .map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
            >
              <img
                src={book.coverImage}
                className="h-40 w-full object-cover"
                alt={book.title}
              />

              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500">{book.author}</p>

                <div className="flex items-center gap-1 mt-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-medium">{book.rating}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

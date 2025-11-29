import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BookType } from "@/types";

interface RelatedBooksProps {
  currentBookId: number;
  categoryName: string;
}

export default function RelatedBooks({
  currentBookId,
  categoryName,
}: RelatedBooksProps) {
  const fetchRelatedBooks = async (): Promise<BookType[]> => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?category=${categoryName}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data as BookType[];
  };

  const { data: relatedBooks, isLoading, isError } = useQuery<BookType[]>({
    queryKey: ["relatedBooks", categoryName],
    queryFn: fetchRelatedBooks,
    enabled: !!categoryName, // ⚡ Fetch hanya jika categoryName valid
  });

  if (isLoading) return <p className="p-4">Loading related books...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load related books</p>;
  if (!relatedBooks?.length)
    return <p className="p-4 text-gray-500">No related books found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Related Books in "{categoryName}"
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedBooks
          .filter((b) => b.id !== currentBookId)
          .map((book) => (
            <div
              key={book.id}
              className="bg-white shadow rounded-lg p-3 cursor-pointer hover:scale-105 transition"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-56 object-cover rounded mb-2"
              />
              <p className="font-semibold truncate">{book.title}</p>
              <p className="text-gray-500 text-sm truncate">
                {book.Category?.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

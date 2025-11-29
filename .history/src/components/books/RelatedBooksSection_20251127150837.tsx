import { useRelatedBooks } from "@/api/useRelatedBooks";
import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DUMMY_BOOKS } from "@/data/dummyBooks";

interface Props {
  category: string;
  bookId: string;
}

export default function RelatedBooksSection({ category, bookId }: Props) {
  const { data, isLoading, isError } = useRelatedBooks(category, bookId);

  // Jika API belum ada atau error → pakai dummy
  const finalBooks = data?.length ? data : DUMMY_BOOKS;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      {/* SKELETON LOADING */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-52 w-full" />
          ))}
        </div>
      )}

      {/* DATA ACTUAL ATAU DUMMY */}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {finalBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

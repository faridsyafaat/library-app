import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DUMMY_BOOKS } from "@/data/dummyBooks";
import { useRelatedBooks } from "@/api/useRelatedBooks";

interface Props {
  category: string;
  bookId: string;
}

export default function RelatedBooksSection({ category, bookId }: Props) {
  const { data, isLoading } = useRelatedBooks(category, bookId);

  // Jika data ada → pakai data asli, kalau kosong → pakai dummy
  const finalBooks = data?.length ? data : DUMMY_BOOKS;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      {/* LOADING */}
      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-[160px] h-[260px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {finalBooks.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

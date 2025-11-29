import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BookType } from "@/types";

export default function DetailPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const fetchBook = async (): Promise<BookType> => {
    const res = await axios.get(`/api/books/${bookId}`);
    return res.data;
  };

  const { data: book, isLoading } = useQuery<BookType>({
    queryKey: ["book", bookId],
    queryFn: fetchBook,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={bookId} />
      <RelatedBooks
        currentBookId={book.id}
        categoryName={book.Category?.name ?? "Self-Help"} // kasih default kalau Category belum ada
      />
    </>
  );
}

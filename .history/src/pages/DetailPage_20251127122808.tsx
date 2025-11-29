import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import type { BookType } from "@/types";

export default function DetailPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const fetchBook = async (): Promise<BookType> => {
    const res = await axios.get(`/api/books/${bookId}`);
    return res.data;
  };

  const { data: book, isLoading, isError } = useQuery<BookType, Error>({
    queryKey: ["book", bookId],
    queryFn: fetchBook,
    enabled: !!bookId, // hanya fetch kalau id ada
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError || !book)
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to load book detail
      </p>
    );

  return (
    <>
      <NavbarAfter />
      <DetailBookSection book={book} />
      <ReviewSection bookId={book.id} />
      <RelatedBooks
        categoryName={book.Category?.name ?? "Unknown"}
        currentBookId={book.id}
      />
    </>
  );
}

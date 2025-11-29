import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import type { BookDetail } from "@/types/BookDetail";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const bookId = Number(id);

  const { data: book, isLoading } = useQuery<BookDetail>({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const res = await axios.get(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${bookId}`
      );
      return res.data.data as BookDetail;
    },
    enabled: !!bookId,
  });

  if (isLoading || !book) return <p className="p-4 text-center">Loading...</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection book={book} />
      <ReviewSection bookId={bookId} />
      <RelatedBooks currentBookId={bookId} categoryName={book.Category?.name ?? ""} />
    </>
  );
}

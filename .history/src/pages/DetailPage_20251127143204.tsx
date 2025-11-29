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
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data as BookType;
  };

  const { data: book, isLoading, isError } = useQuery<BookType, Error>({
    queryKey: ["book", bookId],
    queryFn: fetchBook,
  });

  if (isLoading) return <p className="text-center mt-20">Loading book...</p>;
  if (isError || !book) return <p className="text-center mt-20 text-red-500">Failed to load book</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection book={book} />
      <ReviewSection bookId={book.id} />
      <RelatedBooks currentBookId={book.id} categoryName={book.Category?.name ?? ""} />
    </>
  );
}

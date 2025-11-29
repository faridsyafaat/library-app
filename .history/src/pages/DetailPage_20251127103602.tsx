import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";

// ==== TYPE DEFINITIONS ====
interface CategoryType {
  id: number;
  name: string;
}

interface BookType {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
  Category?: CategoryType;
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>(); // id dari URL

  // convert id ke number
  const bookId = id ? parseInt(id) : undefined;

  const { data: book, isLoading } = useQuery<BookType>({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const res = await axios.get(`/api/books/${bookId}`);
      return res.data;
    },
    enabled: !!bookId, // query jalan hanya kalau bookId ada
  });

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection book={book} />
      <ReviewSection bookId={book.id} />
      <RelatedBooks
        categoryName={book.Category?.name ?? ""}
        currentBookId={book.id}
      />
    </>
  );
}

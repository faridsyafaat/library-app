import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function DetailPage() {
  const { id } = useParams();
  const book = useAppSelector((state) => state.bookDetail.book);

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={Number(id)} />
      {book && (
        <RelatedBooks
          currentBookId={book.id}
          categoryName={book.Category?.name ?? ""}
        />
      )}
    </>
  );
}

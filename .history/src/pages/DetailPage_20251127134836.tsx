import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function DetailPage() {
  const { id } = useParams();
  const book = useAppSelector((state) => state.bookDetail.book);
  const loading = useAppSelector((state) => state.bookDetail.loading);

  // Tampilkan loading jika book belum siap
  if (loading || !book) return <p className="text-center mt-20">Loading book detail...</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={Number(id)} />

      {/* RelatedBooks hanya render kalau book & category tersedia */}
      {book.Category?.name && (
        <RelatedBooks
          currentBookId={book.id}
          categoryName={book.Category.name}
        />
      )}
    </>
  );
}

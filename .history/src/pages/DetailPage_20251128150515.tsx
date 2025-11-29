import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import FooterSection from "@/components/layout/FooterSection";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function DetailPage() {
  const { id } = useParams();
  const currentBookId = id ? parseInt(id, 10) : 0;

  // Ambil book dari store agar bisa ambil categoryName
  const book = useAppSelector((state) => state.bookDetail.book);

  const categoryName = book?.Category?.name ?? "";

  return (
    <>
      <NavbarAfter />

      {/* Kirim bookId ke DetailBookSection */}
      <DetailBookSection />

      {/* Kirim bookId ke ReviewSection */}
      <ReviewSection bookId={currentBookId} />

      {/* Kirim categoryName dan currentBookId ke RelatedBooks */}
      <RelatedBooks
        categoryName={categoryName}
        currentBookId={currentBookId}
      />

      <FooterSection />
    </>
  );
}

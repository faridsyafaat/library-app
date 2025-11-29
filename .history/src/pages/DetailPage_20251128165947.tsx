import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";
import ReviewSection from "@/components/sections/ReviewSection";
import FooterSection from "@/components/layout/FooterSection";

export default function DetailPage() {
  const { id } = useParams();

  // Ambil bookId dari URL, default 0 kalau tidak ada
  const bookId = id ? parseInt(id, 10) : 0;

  return (
    <>
      <NavbarAfter />

      {/* Detail Book Section */}
      <DetailBookSection bookId={bookId} />

      {/* Review Section */}
      <ReviewSection bookId={bookId} />

      {/* Related Books */}
      <RelatedBooks
        categoryName="" // Bisa diisi category dari state atau props
        currentBookId={bookId}
      />

      <FooterSection />
    </>
  );
}

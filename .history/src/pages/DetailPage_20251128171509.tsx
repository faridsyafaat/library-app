import { useParams } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import FooterSection from "@/components/layout/FooterSection";

export default function DetailPage() {
  const { id } = useParams();
  const bookId = id ? parseInt(id, 10) : 0;

  if (!bookId) return <div className="p-4">Invalid book ID</div>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection bookId={bookId} />
      <ReviewSection bookId={bookId} />
      <RelatedBooks
        categoryName="" 
        currentBookId={bookId}
      />

      <FooterSection />
    </>
  );
}

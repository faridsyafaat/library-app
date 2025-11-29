import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";
import ReviewSection from "@/components/sections/ReviewSection";
import FooterSection from "@/components/layout/FooterSection";

export default function DetailPage() {
  const { id } = useParams();

  const currentBookId = id ? parseInt(id, 10) : 0;

  if (!currentBookId) {
    return <div className="p-4 text-red-500">Invalid book ID</div>;
  }

  return (
    <>
      <NavbarAfter />
      <DetailBookSection bookId={currentBookId} />
      <ReviewSection bookId={currentBookId} />
      <RelatedBooks
        categoryName="" 
        currentBookId={currentBookId}
      />
      <FooterSection />
    </>
  );
}

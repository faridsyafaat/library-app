import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";
import ReviewSection from "@/components/sections/ReviewSection";  
import FooterSection from "@/components/layout/FooterSection";  

export default function DetailPage() {
  const { id } = useParams();
  const currentBookId = id ? parseInt(id, 10) : 0;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection /> 
      <ReviewSection bookId={currentBookId} />
      <RelatedBooks
        categoryName="" 
        currentBookId={currentBookId}
      />
      <FooterSection />
    </>
  );
}

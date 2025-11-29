import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";


export default function DetailPage() {
  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={1} />
      <RelatedBooks />
    </>
  );
}

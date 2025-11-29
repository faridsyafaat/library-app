import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  // Dummy data untuk testing
  const dummyBookId = 1;
  const dummyCategoryName = "Fiction";

  return (
    <>
      <NavbarAfter />

      {/* DetailBookSection tetap sesuai Figma */}
      <DetailBookSection />

      {/* ReviewSection pakai dummy bookId */}
      <ReviewSection bookId={dummyBookId} />

      {/* RelatedBooks pakai dummy category dan bookId */}
      <RelatedBooks
        categoryName={dummyCategoryName}
        currentBookId={dummyBookId}
      />
    </>
  );
}

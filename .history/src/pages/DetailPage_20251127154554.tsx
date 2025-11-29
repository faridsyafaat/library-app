import NavbarAfter from '@/components/layout/NavbarAfter';
import DetailBookSection from '@/components/sections/DetailBookSection';
import ReviewSection from '@/components/sections/ReviewSection';
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  // Dummy data untuk testing
  const dummyBookId = 1;
 
  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={dummyBookId} />
      <RelatedBooks />
     
    </>
  );
}import NavbarAfter from '@/components/layout/NavbarAfter';
import DetailBookSection from '@/components/sections/DetailBookSection';
import ReviewSection from '@/components/sections/ReviewSection';
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  // Dummy data untuk testing
  const dummyBookId = 1;
  const dummyCategory = "Fiction";

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={dummyBookId} />
      <RelatedBooks 
        categoryName={dummyCategory}
        currentBookId={dummyBookId}
      />
    </>
  );
}

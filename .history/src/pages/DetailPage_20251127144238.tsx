import NavbarAfter from '@/components/layout/NavbarAfter';
import DetailBookSection from '@/components/sections/DetailBookSection';
import ReviewSection from '@/components/sections/ReviewSection';

export default function DetailPage() {
  // Dummy data untuk testing
  const dummyBookId = 1;
 
  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={dummyBookId} />
     
    </>
  );
}
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";

export default function DetailPage() {
  return (
    <>
      <NavbarAfter />
      <DetailBookSection />

      {/* Terapkan ID buku sesuai kebutuhan */}
      <ReviewSection bookId={1} />
    </>
  );
}

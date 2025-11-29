import React from "react";
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import FooterSection from "@/components/layout/FooterSection";

export default function DetailPage() {
  // kalau DetailBookSection ambil data sendiri via useParams/useSelector,
  // jangan kirim props `book` — cukup render saja.
  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={1} />
      <RelatedBooks categoryName="Fiction" currentBookId="1" />
      <FooterSection />
    </>
  );
}

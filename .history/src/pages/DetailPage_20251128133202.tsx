// src/pages/DetailPage.tsx
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function DetailPage() {
  const { id } = useParams();
  const book = useAppSelector((state) => state.bookDetail.book);

  const categoryName = book?.Category?.name ?? "";

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <RelatedBooks categoryName={categoryName} currentBookId={Number(id)} />
    </>
  );
}

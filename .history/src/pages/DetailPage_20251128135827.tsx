import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  const { id } = useParams(); 

  const numericId = id ? parseInt(id, 10) : 0; // convert ke number

  return (
    <>
      <NavbarAfter />
      <DetailBookSection id={id} />

      <RelatedBooks
        categoryName=""
        currentBookId={numericId}
      />
    </>
  );
}

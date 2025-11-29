import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <>
      <NavbarAfter />
      <DetailBookSection id={id} />

      <RelatedBooks
        categoryName=""
        currentBookId={id ?? ""}
      />
    </>
  );
}

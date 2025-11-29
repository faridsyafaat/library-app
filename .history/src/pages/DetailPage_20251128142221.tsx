import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import { useParams } from "react-router-dom";
import RelatedBooks from "@/components/sections/RelatedBooks";

export default function DetailPage() {
  const { id } = useParams();

  // convert id ke number jika RelatedBooks expect number
  const currentBookId = id ? parseInt(id, 10) : 0;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection /> {/* tidak perlu props karena sudah ambil id di dalam komponen */}
      <RelatedBooks
        categoryName="" // bisa ganti sesuai kategori jika perlu
        currentBookId={currentBookId}
      />
    </>
  );
}

// src/pages/DetailPage.tsx
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import RelatedBooks from "@/components/sections/RelatedBooks"; // pastikan path benar
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function DetailPage() {
  const { id } = useParams(); // id bertipe string | undefined

  // Ambil book dari store (sama seperti di DetailBookSection)
  const book = useAppSelector((state) => state.bookDetail.book);

  // Ambil category name dari book (fallback ke empty string)
  const categoryName = book?.Category?.name ?? "";

  // currentBookId: sesuaikan tipe yang RelatedBooks butuhkan.
  // Jika RelatedBooksProps mengharapkan string:
  const currentBookIdStr = id ?? "";

  // Jika RelatedBooksProps mengharapkan number, aktifkan baris berikut:
  // const currentBookIdNum = id ? Number(id) : NaN;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      {/* 
        Pilih salah satu prop currentBookId sesuai tipe yang RelatedBooks butuhkan.
        Saya gunakan string di bawah; kalau RelatedBooks mengharapkan number,
        ganti currentBookId={currentBookIdNum} (dan pastikan bukan NaN).
      */}
      <RelatedBooks categoryName={categoryName} currentBookId={currentBookIdStr} />
    </>
  );
}

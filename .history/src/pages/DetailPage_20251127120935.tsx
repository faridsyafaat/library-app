import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";

// Dummy fallback data
const dummyBookId = 1;
const dummyCategoryName = "Fiction";

export default function DetailPage() {
  // Fetch detail book untuk keperluan API (optional, bisa dipakai RelatedBooks nanti)
  const { data: bookData } = useQuery(
    ["book", dummyBookId],
    async () => {
      try {
        const res = await axios.get(`/api/books/${dummyBookId}`);
        return res.data;
      } catch (err) {
        console.error("Failed to fetch book detail:", err);
        return null; // fallback bisa tetap dummy
      }
    },
    { staleTime: 1000 * 60 }
  );

  // Tentukan categoryName & currentBookId untuk RelatedBooks
  const categoryName = bookData?.Category?.name || dummyCategoryName;
  const currentBookId = bookData?.id ?? dummyBookId;

  return (
    <>
      <NavbarAfter />

      {/* DetailBookSection tetap sesuai Figma */}
      <DetailBookSection />

      {/* ReviewSection pakai bookId dummy / API fallback */}
      <ReviewSection bookId={currentBookId} />

      {/* RelatedBooks pakai categoryName & currentBookId, fallback dummy di komponen */}
      <RelatedBooks categoryName={categoryName} currentBookId={currentBookId} />
    </>
  );
}

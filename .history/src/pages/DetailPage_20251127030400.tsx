import { useParams } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";

export default function DetailPage() {
  const { id } = useParams(); // ambil ID dari URL

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={Number(id)} /> 
    </>
  );
}

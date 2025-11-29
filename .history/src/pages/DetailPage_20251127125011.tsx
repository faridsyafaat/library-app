import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={Number(id)} />   
    </>
  );
}

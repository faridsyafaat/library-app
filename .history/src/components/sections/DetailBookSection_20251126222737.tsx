import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookDetail } from "@/store/bookDetailSlice";
import DetailBookSection from "@/components/sections/DetailBookSection";

export default function DetailBookPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { book, loading, error } = useAppSelector((s) => s.bookDetail);

  useEffect(() => {
    if (id) dispatch(fetchBookDetail(id));
  }, [id]);

  if (loading) return <p>Loading detail...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return null;

  return <DetailBookSection book={book} />;
}

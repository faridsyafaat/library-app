import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookDetail } from "@/store/bookDetailSlice";
import DetailBookSection from "@/components/sections/DetailBookSection";

const DetailBookPage = () => {
  const { id } = useParams(); // ➜ http://localhost:5173/books/123
  const dispatch = useAppDispatch();

  const { book, loading, error } = useAppSelector((state) => state.bookDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading book detail...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return null;

  return <DetailBookSection book={book} />;
};

export default DetailBookPage;

import type { BookDetail } from "@/types/BookDetail";
import { fetchBookById } from "@/store/bookDetailSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const DetailBookSection = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { book, loading } = useAppSelector((state) => state.bookDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <img src={book.coverImage} alt={book.title} />
      <h1>{book.title}</h1>
      <p>{book.Author?.name}</p>
      <p>{book.Category?.name}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default DetailBookSection;

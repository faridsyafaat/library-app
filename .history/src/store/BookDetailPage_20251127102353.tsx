import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RelatedBooks from "@/components/sections/RelatedBooks";

const BookDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(`/api/books/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Book not found!</p>;

  return (
    <div>
      {/* Pastikan data.Category ada */}
      <RelatedBooks
        categoryName={data.Category?.name ?? ""}
        currentBookId={data.id}
      />
    </div>
  );
};

export default BookDetailPage;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RelatedBooks from "@/components/sections/RelatedBooks";

const BookDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () =>
      axios.get(`/api/books/${id}`).then((res) => res.data.data),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {/* .... Detail Buku .... */}

      <RelatedBooks
        categoryName={data.Category.name}
        currentBookId={data.id}
      />
    </div>
  );
};

export default BookDetailPage;

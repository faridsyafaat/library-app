import { useEffect, useState } from "react";
import api from "@/api/axios";

export const useBooks = (page = 1, limit = 20) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await api.get("/books", {
          params: { page, limit }
        });
        setBooks(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, limit]);

  return { books, loading, totalPages };
};

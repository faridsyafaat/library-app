// src/pages/HomeAfter.tsx
import React, { useState, useMemo } from "react";
import HeroSection from "@/components/sections/HeroSection"; // kamu sudah punya
import FilterBar from "@/components/home/FilterBar";
import BookList from "@/components/book/BookList";
import Pagination from "@/components/ui/Pagination";
import { useBooks } from "@/hooks/useBooks";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export default function HomeAfter() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  // Fetch categories from API (optional) - adjust endpoint if needed
  const { data: catRes } = useQuery(["categories"], async () => {
    const r = await api.get("/categories"); // asumsikan ada
    return r.data as { id: string; name: string }[];
  }, { staleTime: 1000 * 60 * 5 });

  const categories = catRes ?? [
    // fallback bila API kategori belum tersedia
    { id: "fiction", name: "Fiction" },
    { id: "non-fiction", name: "Non-Fiction" },
    { id: "self-improve", name: "Self-Improvement" },
    { id: "finance", name: "Finance" },
    { id: "science", name: "Science" },
    { id: "education", name: "Education" },
  ];

  // Use TanStack Query custom hook
  const { data, isLoading, isError } = useBooks({
    page,
    limit,
    search,
    category,
  });

  const books = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit, total: 0 };

  // reset to page 1 when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div className="container mx-auto px-4 py-6">
      <HeroSection />

      <div className="mt-8">
        <FilterBar
          search={search}
          onSearch={setSearch}
          categories={categories}
          activeCategory={category}
          onSelectCategory={(c) => setCategory(c)}
        />

        {isLoading ? (
          <p>Loading books...</p>
        ) : isError ? (
          <p>Error loading books.</p>
        ) : books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <>
            <BookList books={books} onDetail={(id) => console.log("go to", id)} />
            <Pagination page={meta.page} limit={meta.limit} total={meta.total} onChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}

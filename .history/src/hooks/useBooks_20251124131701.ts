import { useQuery } from "@tanstack/react-query";
import { getBooks, type BooksResponse } from "@/api/books";

type Params = {
  page: number;
  limit: number;
  search?: string;
  category?: string | null;
};

export const useBooks = ({ page, limit, search, category }: Params) => {
  return useQuery<BooksResponse>({
    queryKey: ["books", page, limit, search, category],
    queryFn: () =>
      getBooks({
        page,
        limit,
        search: search || "",
        category: category || undefined,
      }),

    // pengganti keepPreviousData di React Query v5
    placeholderData: (prev) => prev,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/api/books";

type Params = {
  page: number;
  limit: number;
  search?: string;
  category?: string | null;
};

export const useBooks = ({ page, limit, search, category }: Params) => {
  return useQuery({
    queryKey: ["books", page, limit, search, category],
    queryFn: () =>
      getBooks({
        page,
        limit,
        search: search || "",
        category: category || undefined,
      }),
    keepPreviousData: true,
  });
};

import api from "./axios";

export type Book = {
  id: string | number;
  title: string;
  author?: string;
  cover?: string;
  category?: string;
  stock?: number;
  description?: string;
  
};

export type BooksResponse = {
  data: Book[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export const getBooks = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string | null;
}) => {
  const res = await api.get<BooksResponse>("/books", {
    params,
  });
  return res.data;
};

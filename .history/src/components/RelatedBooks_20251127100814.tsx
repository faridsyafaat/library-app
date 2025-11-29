import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

interface Author {
  id: number;
  name: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Category {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Book {
  id: number;
  title: string;
  description?: string;
  isbn?: string;
  publishedYear?: number | null;
  coverImage?: string | null;
  price?: number;
  stock?: number;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  authorId?: number;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
  availableCopies?: number;
  borrowCount?: number;
  totalCopies?: number;
  Author?: Author | null;
  Category?: Category | null;
}

interface ApiListResponse {
  success: boolean;
  message?: string;
  data: {
    books: Book[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface RelatedBooksProps {
  currentBookId: number;
  categoryId: number;
  /** optional: how many related items to show */
  limit?: number;
}

export default function RelatedBooks({
  currentBookId,
  categoryId,
  limit = 6,
}: RelatedBooksProps) {
  const { data, isLoading, isError } = useQuery<ApiListResponse>({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axios.get<ApiListResponse>(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books"
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <p>Loading related books...</p>;
  if (isError) return <p>Failed to load related books.</p>;

  const books = data?.data?.books ?? [];

  // Filter by categoryId and exclude current book
  const related: Book[] = books
    .filter((b: Book) => {
      // ensure categoryId exists and not the same as currentBookId
      return typeof b.categoryId === "number" && b.categoryId === categoryId && b.id !== currentBookId;
    })
    .slice(0, limit);

  if (related.length === 0) {
    return null; // or return a small fallback UI
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="flex gap-6 overflow-x-auto pb-3">
        {related.map((book: Book) => {
          const cover = book.coverImage && book.coverImage !== "string" ? book.coverImage : "/images/placeholder-book.png";
          const authorName = book.Author?.name ?? "Unknown";
          const rating = typeof book.rating === "number" ? book.rating.toFixed(1) : "-";

          return (
            <Card
              key={book.id}
              className="min-w-[200px] w-[200px] rounded-2xl shadow-md flex-shrink-0"
            >
              <Link to={`/books/${book.id}`} className="block">
                <img
                  src={cover}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />

                <CardContent className="p-4">
                  <h3 className="font-semibold text-[15px] line-clamp-2">{book.title}</h3>

                  <p className="text-sm text-gray-500 mb-2 line-clamp-1">{authorName}</p>

                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-4 h-4" />
                    <span>{rating}</span>
                    <span className="text-xs text-gray-400">({book.reviewCount ?? 0})</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

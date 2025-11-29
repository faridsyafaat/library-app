import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dayjs from "dayjs";

// ==== TYPE DEFINITIONS ====
interface UserType {
  id: number;
  name: string;
}

interface ReviewType {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  User: UserType;
}

interface BookType {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  Review: ReviewType[];
}

interface ReviewSectionProps {
  bookId: number;
}

// ==== COMPONENT ====
export default function ReviewSection({ bookId }: ReviewSectionProps) {
  const { data: bookData, isLoading } = useQuery<BookType>({
    queryKey: ["book-detail", bookId],
    queryFn: async () => {
      const res = await axios.get(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/136/${bookId}`
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Memuat ulasan...</p>;
  }

  const reviews = bookData?.Review ?? [];

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.star, 0) / reviews.length).toFixed(1)
      : "0";

  const renderStars = (count: number) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < count ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 mt-10 container">
      {/* === TITLE === */}
      <h2 className="text-3xl font-bold">Review</h2>

      {/* === RATING SUMMARY === */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-lg font-semibold">{averageRating}</span>
          </div>

          <p className="text-lg text-gray-700">({reviews.length} ulasan)</p>
        </div>
      )}

      {/* === LIST REVIEW === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <img
                src="/image/author.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{review.User.name}</p>
                <p className="text-xs text-gray-500">
                  {dayjs(review.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </CardHeader>

            <CardContent>
              {renderStars(review.star)}
              <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">Belum ada ulasan.</p>
      )}
    </div>
  );
}

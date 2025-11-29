import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dayjs from "dayjs";

interface ReviewAPI {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  User: {
    id: number;
    name: string;
  };
}

interface Review {
  id: number;
  user: string;
  star: number;
  comment: string;
  createdAt: string;
  avatar?: string;
}

export default function ReviewSection({ bookId }: { bookId: number }) {
  const { data: bookData, isLoading } = useQuery({
    queryKey: ["book-detail", bookId],
    queryFn: async () => {
      const res = await axios.get(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${bookId}`
      );
      return res.data.data;
    },
  });

  // ❗ hanya satu kali deklarasi reviews
  const reviews: Review[] =
    bookData?.Review?.map((r: ReviewAPI) => ({
      id: r.id,
      user: r.User?.name ?? "Anonymous",
      star: r.star,
      comment: r.comment,
      createdAt: r.createdAt,
      avatar: "/image/author.png",
    })) ?? [];

  // ➤ hitung rata-rata rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.star, 0) / reviews.length).toFixed(1)
      : 0;

  const renderStars = (count: number) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );

  if (isLoading) {
    return <p className="text-sm text-gray-500">Memuat ulasan...</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-bold mb-2">Review</h2>

      {reviews.length > 0 && (
        <div className="flex items-center justify-between">
          {/* KIRI: STAR + RATING */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-sm text-gray-500">/ 5</span>
          </div>

          {/* KANAN: JUMLAH ULASAN */}
          <p className="text-sm text-gray-600">{reviews.length} ulasan</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <img
                src={review.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{review.user}</p>
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
    </div>
  );
}

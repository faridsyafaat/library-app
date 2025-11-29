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

  const reviews: Review[] =
    bookData?.Review?.map((r: ReviewAPI) => ({
      id: r.id,
      user: r.User?.name ?? "Anonymous",
      star: r.star,
      comment: r.comment,
      createdAt: r.createdAt,
      avatar: "/image/author.png",
    })) ?? [];

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
  <div className="container space-y-4 mt-6">
    <h3 className="text-xl font-semibold">Ulasan ({reviews.length})</h3>

    {reviews.length === 0 && (
      <p className="text-gray-500 text-sm">Belum ada review</p>
    )}

    {/* GRID 2 KOLOM */}
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
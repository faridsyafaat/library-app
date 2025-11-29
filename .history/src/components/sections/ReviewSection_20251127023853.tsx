import dayjs from "dayjs";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ReviewSection({ reviews = [] }) {
  const averageRating =
    reviews.reduce((acc, r) => acc + r.star, 0) / reviews.length || 0;

  return (
    <div className="mt-12">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        <p className="text-xl font-semibold">
          {averageRating.toFixed(1)}{' '}
          <span className="text-gray-600">({reviews.length} Ulasan)</span>
        </p>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rv) => (
          <Card
            key={rv.id}
            className="p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={"/image/author.png"}
                onError={(e) => (e.currentTarget.src = "/image/author.png")}
                className="w-12 h-12 rounded-full object-cover"
                alt="user"
              />
              <div>
                <p className="font-semibold">{rv.User?.name}</p>
                <p className="text-sm text-gray-500">
                  {dayjs(rv.createdAt).format("DD MMMM YYYY, HH:mm")}
                </p>
              </div>
            </div>

            {/* STAR */}
            <div className="flex mt-3 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rv.star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* COMMENT */}
            <p className="text-gray-700 leading-relaxed">{rv.comment}</p>
          </Card>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 rounded-full border text-gray-700 shadow-sm hover:bg-gray-50 transition">
          Load More
        </button>
      </div>
    </div>
  );
}

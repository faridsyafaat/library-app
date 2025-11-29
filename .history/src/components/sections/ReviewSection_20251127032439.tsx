import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewSection() {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    axios
      .get("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/1")
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!book) return <p>Loading...</p>;

  const averageRating = book.rating || 0;
  const reviewCount = book.reviewCount || 0;

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 px-4">
      
      {/* ==== JUDUL & SUMMARY ==== */}
      <h2 className="text-2xl font-bold">Review</h2>

      <div className="flex justify-between items-center mt-2">
        <p className="text-yellow-500 font-semibold">
          ★ {averageRating.toFixed(1)}
        </p>
        <p className="text-gray-600 text-sm">{reviewCount} Ulasan</p>
      </div>

      {/* ==== LIST REVIEW ==== */}
      {book.Review && book.Review.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {book.Review.map((review: any) => (
            <div
              key={review.id}
              className="border p-4 rounded-xl shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{review.User?.name}</span>
                <span className="text-yellow-500">★ {review.star}</span>
              </div>

              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Belum ada review.</p>
      )}
    </section>
  );
}

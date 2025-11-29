import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );

        console.log("RAW RESPONSE:", res.data);

        // Cek success + data.categories
        if (res.data?.success && res.data?.data?.categories && Array.isArray(res.data.data.categories)) {
          setCategories(res.data.data.categories);
        } else {
          console.warn("⚠ Unexpected API shape:", res.data);
          setCategories([]);
        }
      } catch (err) {
        console.error("🔥 Error fetching categories:", err);
        setError("Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center py-6 text-gray-500">No categories available.</div>;
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fit,minmax(162px,1fr))]">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bg-white rounded-xl shadow-md p-2 flex flex-col items-center hover:scale-105 transition cursor-pointer"
          >
            {/* Dummy image, bisa diganti sesuai kategori */}
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className="w-[162px] h-[64px] object-contain mb-2"
            />
            <span className="text-sm font-bold text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

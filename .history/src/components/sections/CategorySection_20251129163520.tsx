import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );

        console.log("RAW RESPONSE:", res.data);

        // Pastikan struktur sesuai
        if (res.data && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else if (res.data && res.data.data?.categories) {
          setCategories(res.data.data.categories);
        } else {
          console.error("⚠ Unexpected response shape:", res.data);
          setCategories([]);
        }
      } catch (err) {
        console.error("🔥 Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-6">Loading categories...</div>;
  if (categories.length === 0)
    return <div className="text-center py-6">No categories available.</div>;

  return (
    <div className="container py-6">
      <div
        className="grid grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fit,minmax(162px,1fr))]"
      >
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bg-white rounded-xl shadow-md p-2 flex flex-col items-center hover:scale-105 transition cursor-pointer"
          >
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

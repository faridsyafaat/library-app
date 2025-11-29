import { useEffect, useState } from "react";
import axios from "axios";

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

        const data = res.data;
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.warn("Unexpected API shape:", data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-32 text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-32 text-gray-500">
        No categories available
      </div>
    );
  }

  return (
    <div className="w-full container py-6">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className="w-[162.67px] h-[64px] object-contain mb-2"
            />
            <span className="text-sm font-medium text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

const categoryImages: Record<string, string> = {
  Fiction: "/image/fiction.png",
  "Non-Fiction": "/image/non-fiction.png",
  Finance: "/image/finance.png",
  Science: "/image/science.png",
  "Self-Help": "/image/self.png",
  Education: "/image/education.png",

  Business: "/image/finance.png", 
  "Sci-Fi": "/image/science.png",
  Technology: "/image/education.png",
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
        const cats: Category[] = res.data.data.categories || [];
        setCategories(cats);
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
      <div className="w-full flex justify-center py-6 text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full flex justify-center py-6 text-gray-500">
        No categories available.
      </div>
    );
  }

  return (
    <div className="w-full container py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const imageUrl =
            categoryImages[cat.name] || "/image/fallback.png";

          return (
            <div key={cat.id} className="flex flex-col items-center">
              <img
                src={imageUrl}
                alt={cat.name}
                className="w-[162px] h-[64px] object-contain mb-2"
                onError={(e) => {
                  // Stop error loop
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/image/fallback.png";
                }}
              />
              <span className="text-sm font-bold">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

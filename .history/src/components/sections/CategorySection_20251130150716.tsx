import { useEffect, useRef, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

// ====== ICON MAPPING (NORMALIZED) ======
const categoryImages: Record<string, string> = {
  fiction: "/image/fiction.png",
  nonfiction: "/image/non-fiction.png",
  finance: "/image/finance.png",
  science: "/image/science.png",
  selfhelp: "/image/self-help.png",
  education: "/image/education.png",

  business: "/image/finance.png",
  scifi: "/image/science.png",
  technology: "/image/education.png",
};

// Normalizer → hilangkan spasi & strip, lowercase
function normalizeName(name: string) {
  return name.toLowerCase().replace(/[\s-]/g, "");
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // cegah fetch double
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );

        setCategories(res.data.data.categories || []);
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
          const normalized = normalizeName(cat.name);
          const imageUrl = categoryImages[normalized] || "/image/fallback.png";

          return (
            <div key={cat.id} className="flex flex-col items-center">
              <img
                src={imageUrl}
                alt={cat.name}
                className="w-[162px] h-[64px] object-contain mb-2"
                onError={(e) => {
                  // mencegah infinite loop
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

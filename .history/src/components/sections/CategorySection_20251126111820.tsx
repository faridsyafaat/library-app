import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

const defaultCategories: Category[] = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Non Fiction" },
  { id: 3, name: "Self Improvement" },
  { id: 4, name: "Finance" },
  { id: 5, name: "Science" },
  { id: 6, name: "Education" },
];

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );

        // API bisa mengembalikan { categories: [...] } atau { data: { categories: [...] } }
        const cats: Category[] =
          res.data?.categories || res.data?.data?.categories || [];

        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        } else {
          setCategories(defaultCategories); // fallback ke default
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories(defaultCategories); // fallback ke default
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categories.slice(0, 6).map((cat, idx) => (
          <div
            key={cat.id}
            className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className="w-20 h-12 md:w-16 md:h-16 mb-2 object-contain"
            />
            <span className="text-sm md:text-base font-medium text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

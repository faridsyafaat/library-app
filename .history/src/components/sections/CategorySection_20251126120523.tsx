import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-12 text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center bg-white rounded-xl p-4 w-full max-w-[180px] h-[140px] shadow-md"
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
    </div>
  );
}

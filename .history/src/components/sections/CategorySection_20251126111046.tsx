import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

const icons: Record<string, string> = {
  Fiction: "/image/hero1.png",
  "Non Fiction": "/image/hero2.png",
  "Self Improvement": "/image/hero3.png",
  Finance: "/image/hero4.png",
  Science: "/image/hero5.png",
  Education: "/image/hero6.png",
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );

        if (res.data?.categories && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          console.warn("Unexpected API response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Jika belum ada kategori, tampil loading
  if (categories.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-32 text-gray-500">
        Loading categories...
      </div>
    );
  }

  // Urut sesuai urutan Figma
  const order = [
    "Fiction",
    "Non Fiction",
    "Self Improvement",
    "Finance",
    "Science",
    "Education",
  ];

  const sortedCategories = order
    .map((name) => categories.find((cat) => cat.name === name))
    .filter(Boolean) as Category[];

  return (
    <div className="w-full mt-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {sortedCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center justify-center p-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={icons[cat.name] ?? "/image/default.png"}
              alt={cat.name}
              className="w-12 h-12 object-contain mb-2"
            />
            <span className="text-sm text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

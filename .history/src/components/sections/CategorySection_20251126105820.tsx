import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

  // urut sesuai Figma
  const orderedNames = [
    "Fiction",
    "Non Fiction",
    "Self Improvement",
    "Finance",
    "Science",
    "Education",
  ];

  const icons: Record<string, string> = {
    "Fiction": "/image/hero1.png",
    "Non Fiction": "/image/hero2.png",
    "Self Improvement": "/image/hero3.png",
    "Finance": "/image/hero4.png",
    "Science": "/image/hero5.png",
    "Education": "/image/hero6.png",
  };

  const orderedCategories = orderedNames
    .map((name) => categories.find((cat) => cat.name === name))
    .filter((c): c is Category => c !== undefined);

  return (
    <div className="w-full container my-8">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {orderedCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
          >
            <img
              src={icons[cat.name]}
              alt={cat.name}
              className="w-12 h-12 object-contain mb-2"
            />
            <span className="text-sm font-medium text-gray-800">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function BookCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapping kategori ke icon manual sesuai urutan Figma
  const icons: Record<string, string> = {
    Fiction: "/image/hero1.png",
    "Non Fiction": "/image/hero2.png",
    "Self Improvement": "/image/hero3.png",
    Finance: "/image/hero4.png",
    Science: "/image/hero5.png",
    Education: "/image/hero6.png",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  // Pastikan urut sesuai Figma
  const orderedCategories = [
    "Fiction",
    "Non Fiction",
    "Self Improvement",
    "Finance",
    "Science",
    "Education",
  ].map((name) => categories.find((c) => c.name === name))
   .filter(Boolean) as Category[];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Jenis Buku</h2>
      <div className="grid grid-cols-6 gap-4">
        {orderedCategories.map((cat, idx) => (
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

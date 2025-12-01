import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  image:string;
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

  console.log(categories);

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
      <div className="grid grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fit,minmax(162.67px,1fr))] md:justify-start">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.id}`}
            className="flex flex-col items-center cursor-pointer bg-white rounded-xl shadow-md p-2 hover:shadow-lg hover:scale-105 transition-transform"
          >
            <img
  src={cat.image}
  alt={cat.name}
  className="w-[162.67px] h-[64px] object-contain mb-2"
/>

            <span className="text-sm font-bold text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

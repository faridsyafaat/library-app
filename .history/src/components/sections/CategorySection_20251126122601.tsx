import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function CategoryMarquee() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories"
        );
        setCategories(res.data.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full overflow-hidden py-6">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-2 min-w-[162.67px]"
          >
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className="w-[162.67px] h-[64px] object-contain mb-2"
            />
            <span className="text-sm font-bold text-center">{cat.name}</span>
          </div>
        ))}
        {/* Duplikasi untuk loop seamless */}
        {categories.map((cat, idx) => (
          <div
            key={"dup-" + cat.id}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-2 min-w-[162.67px]"
          >
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className="w-[162.67px] h-[64px] object-contain mb-2"
            />
            <span className="text-sm font-bold text-center">{cat.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

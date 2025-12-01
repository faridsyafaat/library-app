import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Category = {
  id: number;
  name: string;
};

const categoryImages: Record<string, string> = {
  fiction: "image/fiction.png",
  nonfiction: "image/non-fiction.png",
  finance: "image/finance.png",
  science: "image/science.png",
  selfhelp: "image/self-help.png",
  education: "image/education.png",

  business: "image/finance.png",
  scifi: "image/science.png",
  technology: "image/education.png",
};

const targetOrder = [
  "Fiction",
  "Non-Fiction",
  "Self-Improvement",
  "Finance",
  "Science",
  "Education",
];

const normalize = (name: string) => name.toLowerCase().replace(/[\s-]/g, "");

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  const navigate = useNavigate();

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

  const apiDict = categories.reduce((acc, cat) => {
    acc[cat.name] = cat;
    return acc;
  }, {} as Record<string, Category>);

  const finalCategories = targetOrder.map((name, idx) => {
    return apiDict[name] || { id: -idx, name };
  });

  return (
     <div className="w-full container py-6">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {finalCategories.map((cat) => {
          const key = normalize(cat.name);
          const imageUrl = categoryImages[key] || "/image/fallback.png";

          return (
              <motion.div
              key={cat.id}
               whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/category/${cat.id}`)}
            >
              <img
                src={imageUrl}
                alt={cat.name}
                className="w-[162px] h-[64px] object-contain mb-2"
                onError={(e) => {
                  if (!e.currentTarget.src.includes("fallback.png")) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/image/fallback.png";
                  }
                }}
              />

              <span className="text-sm font-bold">{cat.name}</span>
            </motion.div>
            );
        })}
      </div>
    </div>
   
  );
}

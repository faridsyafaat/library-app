import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/1'
        );
        setCategories(res.data.data.categories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className='w-full flex justify-center py-6 text-gray-500'>
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className='w-full flex justify-center py-6 text-gray-500'>
        No categories available.
      </div>
    );
  }

  return (
    <div className='w-full container py-6'>
      <div
        className="
          grid grid-cols-3 gap-4 justify-center
          md:grid-cols-[repeat(auto-fit,minmax(162.67px,1fr))]
          md:justify-start
        "
      >
        <AnimatePresence>
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="
                flex flex-col items-center cursor-pointer
                bg-white rounded-xl shadow-md p-2
                hover:shadow-lg hover:scale-105 transition-transform
              "
            >
              <img
                src={`/image/hero${idx + 1}.png`}
                alt={cat.name}
                className='w-[162.67px] h-[64px] object-contain mb-2'
              />
              <span className='text-sm font-bold text-center'>{cat.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

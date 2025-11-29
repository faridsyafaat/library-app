import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  firstBookId?: number; // optional: bisa assign buku pertama nanti
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const hasDataCategories = (
  v: unknown
): v is { data: { categories: unknown[] } } => {
  if (!isRecord(v)) return false;
  const data = v['data'];
  if (!isRecord(data)) return false;
  return Array.isArray(data['categories']);
};

const isCategory = (v: unknown): v is Category => {
  if (!isRecord(v)) return false;
  return (
    typeof v['id'] === 'number' &&
    typeof v['name'] === 'string' &&
    typeof v['createdAt'] === 'string' &&
    typeof v['updatedAt'] === 'string'
  );
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories'
        );

        const raw: unknown = res.data;

        if (!hasDataCategories(raw)) {
          console.warn('Unexpected API shape:', raw);
          setCategories([]);
          setLoading(false);
          return;
        }

        const cleaned: Category[] = raw.data.categories.filter(isCategory);

        // Tambahkan dummy firstBookId (bisa diambil dari API buku nanti)
        const cleanedWithBook = cleaned.map((cat, idx) => ({
          ...cat,
          firstBookId: 100 + idx, // contoh id buku
        }));

        setCategories(cleanedWithBook);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
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
        className={`
          grid grid-cols-3 gap-4 justify-center
          md:grid-cols-[repeat(auto-fit,minmax(162.67px,1fr))]
          md:justify-start
        `}
      >
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => {
              if (cat.firstBookId) navigate(`/books/${cat.firstBookId}`);
            }}
            className='
              flex flex-col items-center cursor-pointer
              bg-white rounded-xl shadow-md p-2
              hover:shadow-lg hover:scale-105 transition-transform
            '
          >
            <img
              src={`/image/hero${idx + 1}.png`}
              alt={cat.name}
              className='w-[162.67px] h-[64px] object-contain mb-2'
            />
            <span className='text-sm font-bold text-center'>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Button from '@/components/ui/Button';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author: { name: string };
}

async function fetchBooks(limit: number): Promise<Book[]> {
  const token = localStorage.getItem('token');

  const response = await axios.get(
    `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend?by=rating&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data?.data?.books ?? [];
}

export default function RecommendationAfter() {
  const [limit, setLimit] = useState(10);

  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery<Book[]>({
    queryKey: ['books', limit],
    queryFn: () => fetchBooks(limit),
    placeholderData: (prev) => prev,
  });

  return (
    <section className='w-full p-4 mt-10 container'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='text-4xl font-bold'>Recommendation</h2>
      </div>

      {isLoading && <p>Loading...</p>}

      {/* ⭐ Responsive Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-6'>
        {data?.map((book) => (
          <div
            key={book.id}
            className='
              bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer
              w-[220px] h-[382px]
              md:w-[224px] md:h-[468px]
            '
          >
            {/* Book Cover */}
            <div
              className='
              overflow-hidden rounded-t-lg
              w-[220px] h-[268px]
              md:w-[224px] md:h-[336px]
            '
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Book Info */}
            <div
              className='
              flex flex-col justify-start gap-2 px-3 py-2
              w-[220px] h-[112px]
              md:w-[224px] md:h-[132px]
            '
            >
              <p className='font-bold text-sm line-clamp-2'>{book.title}</p>
              <p className='text-xs text-gray-500 line-clamp-1'>
                {book.Author?.name}
              </p>

              <div className='flex items-center gap-1'>
                ⭐ <span className='text-sm font-medium'>{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className='flex justify-center mt-6'>
        <Button
          variant='default'
          disabled={isFetching}
          onClick={() => setLimit(limit + 10)}
          className='w-[140px]'
        >
          {isFetching ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </section>
  );
}

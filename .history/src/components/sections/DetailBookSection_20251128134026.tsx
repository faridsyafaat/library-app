import type { BookDetail } from '@/types/BookDetail';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBookById } from '@/store/bookDetailSlice';
import { addToCartAsync } from '@/features/cart/cartSlice'; 
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Share2 } from 'lucide-react';

export default function DetailBookSection() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
  if (!book?.id) return;
  dispatch(addToCartAsync({ bookId: book.id }));
};
  const navigate = useNavigate();

  const book = useAppSelector((state) => state.bookDetail.book) as BookDetail | null;
  const loading = useAppSelector((state) => state.bookDetail.loading);
  const error = useAppSelector((state) => state.bookDetail.error);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [id, dispatch]);

 const handleAddToCart = () => {
    if (!book) return;

    const bookId = typeof book.id === 'string' ? Number(book.id) : book.id;

    dispatch(addToCartAsync({ bookId }));
   
  };

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-500'>Error: {error}</div>;
  if (!book) return <div className='p-4'>Book not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='p-6 max-w-6xl mx-auto'
    >
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
        <Link to='/homeafter' className='hover:text-black hover:underline'>
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/category/${book.Category?.id ?? ''}`}
          className='hover:text-black hover:underline'
        >
          Category
        </Link>
        <span>/</span>
        <span className='font-semibold text-black'>{book.title}</span>
      </div>

      {/* Content */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='col-span-1 flex justify-center md:justify-start'>
          <img
            src={book.coverImage}
            alt={book.title}
            className='w-2/3 md:w-full h-auto object-cover rounded-xl shadow'
          />
        </div>

        <div className='col-span-2'>
          <div className='inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3'>
            {book.Category?.name ?? 'Category'}
          </div>

          <h1 className='text-4xl font-bold mb-1'>{book.title}</h1>

          <p
            className='text-lg text-gray-600 mb-3 cursor-pointer hover:underline'
            onClick={() => navigate(`/author/${book.Author?.id}`)}
          >
            {book.Author?.name || 'Unknown Author'}
          </p>

          <div className='flex items-center gap-2 mb-6'>
            <span className='text-yellow-500 text-xl'>★</span>
            <span className='font-semibold text-lg'>{book.rating}</span>
          </div>

          <div className='grid grid-cols-3 gap-6 mb-6'>
            <div>
              <p className='text-2xl font-semibold'>{book.totalCopies}</p>
              <p className='text-gray-500 text-sm'>Page</p>
            </div>
            <div>
              <p className='text-2xl font-semibold'>{book.reviewCount}</p>
              <p className='text-gray-500 text-sm'>Rating</p>
            </div>
            <div>
              <p className='text-2xl font-semibold'>{book.borrowCount}</p>
              <p className='text-gray-500 text-sm'>Reviews</p>
            </div>
          </div>

          <h2 className='text-xl font-semibold mb-2'>Description</h2>
          <p className='text-gray-700 leading-relaxed text-sm mb-6'>{book.description}</p>

          {/* Buttons */}
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              className='px-6 py-3 rounded-full'
              onClick={handleAddToCart} 
            >
              Add to Cart
            </Button>

            <Button className='px-6 py-3 rounded-full bg-blue-600 text-white'>
              Borrow Book
            </Button>

            <Button variant='outline' className='rounded-full p-3'>
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

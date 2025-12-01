import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Share2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";

interface Author {
  id?: number;
  name?: string;
}

interface Category {
  id?: number;
  name?: string;
}

interface BookDetail {
  id: number;
  title: string;
  coverImage?: string;
  description?: string;
  rating?: number;
  stock?: number;
  Author?: Author | null;
  Category?: Category | null;
}

interface DetailBookSectionProps {
  bookId: number;
}

export default function DetailBookSection({ bookId }: DetailBookSectionProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // ============================
  // FETCH BOOK DETAIL
  // ============================
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${bookId}`
        );

        const payload = res.data?.data ?? res.data;
        setBook({ ...payload, stock: payload.stock ?? 1 } as BookDetail);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError;
          const errorData = axiosErr.response?.data as { message?: string };
          setError(errorData?.message ?? "Failed to load book");
        } else {
          setError("Failed to load book");
        }
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  // ============================
  // ADD TO CART
  // ============================
  const handleAddToCart = async () => {
    if (!book) return;

    if (!token) {
      setAddError("You must be logged in to add to cart");
      return;
    }

    const payload = {
      bookId: Number(book.id),
      qty: 1,
    };

    setAdding(true);
    setAddError(null);

    dispatch({ type: "cart/increment" }); // Optimistic ui

    try {
      await axios.post(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart/items`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBook(prev => prev ? { ...prev, stock: (prev.stock ?? 1) - 1 } : prev);

      setShowToast(true);

      setTimeout(() => navigate("/my-cart"), 800);
    } catch (err: unknown) {
      dispatch({ type: "cart/decrement" });

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        const errorData = axiosErr.response?.data as { message?: string };
        setAddError(errorData?.message ?? "Failed to add to cart");
      } else {
        setAddError("Failed to add to cart");
      }
    } finally {
      setAdding(false);
    }
  };

  // ============================
  // UI STATES
  // ============================
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!book) return <div className="p-6">Book not found</div>;

  const addToCartLabel = adding ? "Adding..." : "Add to Cart";

  // ============================
  // RENDER
  // ============================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-6xl mx-auto relative"
    >
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Added to Cart!
        </motion.div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/homeafter" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/category/${book.Category?.id}`} className="hover:underline">
          Category
        </Link>
        <span>/</span>
        <span className="font-semibold">{book.title}</span>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cover Image */}
        <motion.div
          className="col-span-1 flex justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-2/3 md:w-full rounded-xl shadow"
          />
        </motion.div>

        {/* Book Info */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-1">{book.title}</h1>

          {/* Author Link */}
          <p className="text-lg text-gray-600 mb-3">
            {book.Author?.id ? (
              <Link
                to={`/author/${book.Author.id}`}
                className="text-blue-500 hover:underline"
              >
                {book.Author.name}
              </Link>
            ) : (
              book.Author?.name ?? "-"
            )}
          </p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating ?? "-"}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 text-sm mb-6">{book.description}</p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {addToCartLabel}
              </Button>
            </motion.div>

            <Button className="bg-blue-600 text-white">Borrow Book</Button>
            <Button variant="outline" className="p-3">
              <Share2 size={18} />
            </Button>
          </div>

          {addError && <p className="text-red-500 mt-2">{addError}</p>}
          {book.stock !== undefined && book.stock <= 0 && (
            <p className="text-red-500 mt-2">Out of Stock</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

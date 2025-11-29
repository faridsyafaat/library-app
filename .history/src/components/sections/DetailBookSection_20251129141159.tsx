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
        setBook(payload as BookDetail);
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

    if (book.stock && book.stock <= 0) {
      setAddError("Out of stock");
      return;
    }

    const payload = {
      bookId: Number(book.id),
      qty: 1,
    };

    if (!payload.bookId || payload.qty <= 0) {
      setAddError("Invalid book or quantity");
      return;
    }

    setAdding(true);
    setAddError(null);

    // ===== Optimistic UI =====
    dispatch({ type: "cart/increment" });

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

      // Update stok lokal setelah sukses
      setBook(prev => prev ? { ...prev, stock: (prev.stock ?? 1) - 1 } : prev);
    } catch (err: unknown) {
      // Rollback jika error
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

  const addToCartLabel = adding
    ? "Adding..."
    : (book.stock ?? 0) <= 0
    ? "Out of Stock"
    : "Add to Cart";

  // ============================
  // RENDER
  // ============================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/homeafter" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/category/${book.Category?.id}`} className="hover:underline">
          Category
        </Link>
        <span>/</span>
        <span className="font-semibold">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cover Image */}
        <div className="col-span-1 flex justify-center">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-2/3 md:w-full rounded-xl shadow"
          />
        </div>

        {/* Book Info */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-1">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-3">{book.Author?.name}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating ?? "-"}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 text-sm mb-6">{book.description}</p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleAddToCart}
              disabled={adding || (book.stock ?? 0) <= 0}
            >
              {addToCartLabel}
            </Button>
            <Button className="bg-blue-600 text-white">Borrow Book</Button>
            <Button variant="outline" className="p-3">
              <Share2 size={18} />
            </Button>
          </div>

          {addError && <p className="text-red-500 mt-2">{addError}</p>}
        </div>
      </div>
    </motion.div>
  );
}

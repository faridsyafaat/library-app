import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Share2 } from "lucide-react";

interface DetailBookSectionProps {
  bookId: number;
}

export default function DetailBookSection({ bookId }: DetailBookSectionProps) {
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/${bookId}`
        );
        setBook(res.data.data);
      } catch (err) {
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleAddToCart = async () => {
    if (!book) return;
    setAdding(true);
    setAddError(null);
    try {
      await axios.post(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart`,
        {
          bookId: book.id,
          quantity: 1,
        }
      );
      navigate("/mycart");
    } catch (err: any) {
      setAddError(err?.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!book) return <div className="p-6">Book not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/homeafter" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/category/${book.Category?.id}`} className="hover:underline">{book.Category?.name}</Link>
        <span>/</span>
        <span className="font-semibold">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex justify-center">
          <img src={book.coverImage} className="w-2/3 md:w-full rounded-xl shadow" />
        </div>

        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-1">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-3">{book.Author?.name}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 text-sm mb-6">{book.description}</p>

          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleAddToCart} disabled={adding}>
              {adding ? "Adding..." : "Add to Cart"}
            </Button>
            <Button className="bg-blue-600 text-white">Borrow Book</Button>
            <Button variant="outline" className="p-3"><Share2 size={18} /></Button>
          </div>

          {addError && <p className="text-red-500 mt-2">{addError}</p>}
        </div>
      </div>
    </motion.div>
  );
}

// === MyCart.tsx (Full API, no React Query) ===
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCart() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart");
      setCart(res.data.data);
    } catch (err) {
      console.log("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id: number, qty: number) => {
    await axios.put(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart/${id}`, { quantity: qty });
    fetchCart();
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart/${id}`);
    fetchCart();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-4">My Cart</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-4">
              <img src={item.book.coverImage} className="w-16 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-medium text-lg">{item.book.title}</h3>
                <p className="text-gray-500 text-sm">{item.book.Author?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1 border">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1 border">+</button>
              <button onClick={() => deleteItem(item.id)} className="text-red-500 ml-4">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow h-fit sticky top-24">
        <h3 className="text-lg font-semibold mb-3">Loan Summary</h3>
        <p className="text-sm text-gray-700">Total Items: {cart.length}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">Borrow Now</button>
      </div>
    </div>
  );
}

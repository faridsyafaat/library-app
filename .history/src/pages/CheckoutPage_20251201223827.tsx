import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

interface SelectedBook {
  id: number;
  book: {
    id: number;
    title: string;
    coverImage: string;
    category?: string; 
    author?: string;   
  };
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const { selectedItems } = (location.state as { selectedItems: SelectedBook[] }) || { selectedItems: [] };

  const [duration, setDuration] = useState<number>(7);
  const borrowDate = new Date();
  const returnDate = new Date(borrowDate.getTime() + duration * 24 * 60 * 60 * 1000);
  const [isProcessing, setIsProcessing] = useState(false);

  const [agreeReturn, setAgreeReturn] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const isConfirmDisabled = !agreeReturn || !acceptPolicy || isProcessing;

  if (!selectedItems || selectedItems.length === 0) {
    return <div className="p-6">No books selected. Please go back to cart.</div>;
  }

  const handleBorrow = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    setIsProcessing(true);

    try {
      for (const item of selectedItems) {
        const response = await fetch(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bookId: item.book.id, days: duration }),
          }
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Borrow failed");
        }
      }

      alert("Borrow Success!");
      navigate("/"); 
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(`Borrow Failed: ${err.message}`);
      } else {
        alert("Borrow Failed: Unknown error");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <NavbarAfter />
      <h1 className="container text-3xl font-bold mb-6 mt-8">Checkout</h1>
      <h2 className="container text-2xl font-bold mb-4">User Information</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* LEFT - User Info + Book List */}
        <div className="space-y-6">
          <section className="flex justify-between mb-6 h-[138px]">
            {/* Sisi kiri */}
            <div className="space-y-1">
              <p><b></b>Name</p>
              <p><b></b>Email</p>
              <p><b></b>Phone</p>
            </div>

            {/* Sisi kanan */}
            <div className="space-y-1 text-right">
              <p><b>John Doe</b></p>
              <p><b>johndoe@gmail.com</b></p>
              <p><b>081234567890</b></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Book List</h2>
            {selectedItems.map((item: SelectedBook) => (
              <div key={item.id} className="flex gap-4 items-start border p-3 rounded-lg">
                {/* Cover */}
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-14 h-20 object-cover rounded"
                />

                {/* Info 3 Baris */}
                <div className="flex flex-col justify-between h-20">
                  <p className="text-sm font-bold text-gray-500">{item.book.category || "Unknown"}</p>
                  <p className="font-medium text-base line-clamp-1">{item.book.title}</p>
                  <p className="text-sm text-gray-600">{item.book.author || "Unknown"}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT - Borrow Form */}
        <div className="border p-6 rounded-2xl shadow space-y-6">
          <h2 className="text-xl font-bold">Complete Your Borrow Request</h2>

          {/* Borrow Date */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Borrow Date</label>
            <div className="flex items-center justify-between border rounded-lg px-4 py-3 w-full bg-white shadow-sm cursor-pointer">
              <span>{borrowDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Borrow Duration Radio */}
          <div>
            <p className="font-medium mb-1">Borrow Duration</p>
            <label>
              <input type="radio" value={3} checked={duration === 3} onChange={() => setDuration(3)} /> 3 Days
            </label>
            <br />
            <label>
              <input type="radio" value={5} checked={duration === 5} onChange={() => setDuration(5)} /> 5 Days
            </label>
            <br />
            <label>
              <input type="radio" value={10} checked={duration === 10} onChange={() => setDuration(10)} /> 10 Days
            </label>
          </div>

          {/* Return Date */}
          <div className="mb-4">
            <p className="font-medium mb-1">Return Date</p>
            <p className="text-gray-500">
              Please return the book no later than{" "}
              <span className="text-red-600 font-semibold">
                {returnDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </p>
          </div>

          {/* Checkbox Agreement */}
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={agreeReturn} onChange={(e) => setAgreeReturn(e.target.checked)} className="checkbox-round" />
              <span>I agree to return the book(s) before the due date.</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={acceptPolicy} onChange={(e) => setAcceptPolicy(e.target.checked)} className="checkbox-round" />
              <span>I accept the library borrowing policy.</span>
            </label>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold disabled:opacity-50"
            onClick={handleBorrow}
            disabled={isConfirmDisabled}
          >
            {isProcessing ? "Processing..." : "Confirm & Borrow"}
          </button>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default CheckoutPage;

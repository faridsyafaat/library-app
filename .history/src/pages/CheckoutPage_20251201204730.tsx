import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import NavbarAfter from "@/components/layout/NavbarAfter";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || {};
  const token = useAppSelector((state) => state.auth.token);

  const [duration, setDuration] = useState<number>(7);
  const borrowDate = new Date();
  const returnDate = new Date(borrowDate.getTime() + duration * 24 * 60 * 60 * 1000);
  const [isProcessing, setIsProcessing] = useState(false);

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
      navigate("/"); // bisa diarahkan ke halaman lain setelah sukses
    } catch (err: any) {
      console.error(err);
      alert(`Borrow Failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <NavbarAfter />
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@gmail.com</p>
            <p>Phone: 081234567890</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Book List</h2>
            {selectedItems.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center border p-3 rounded-lg">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-14 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.book.title}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="border p-6 rounded-2xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Complete Your Borrow Request</h2>

          <div>
            <p className="font-medium mb-1">Borrow Duration</p>
            <label>
              <input type="radio" value={3} checked={duration===3} onChange={() => setDuration(3)} /> 3 Days
            </label><br />
            <label>
              <input type="radio" value={5} checked={duration===5} onChange={() => setDuration(5)} /> 5 Days
            </label><br />
            <label>
              <input type="radio" value={10} checked={duration===10} onChange={() => setDuration(10)} /> 10 Days
            </label>
          </div>

          <p>Return Date: <b>{returnDate.toDateString()}</b></p>

          <button
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold"
            onClick={handleBorrow}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm & Borrow"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

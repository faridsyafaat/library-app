import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";

const CheckoutPage = () => {
  const location = useLocation();
  const { selectedItems} = location.state || {};

  const [borrowDate] = useState(new Date());
  const [duration, setDuration] = useState<number>(7);
  const returnDate = new Date(borrowDate.getTime() + duration * 24 * 60 * 60 * 1000);

  return (
    <>
      <NavbarAfter />
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT - User Info + Book List */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@gmail.com</p>
            <p>Phone: 081234567890</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Book List</h2>
            {selectedItems?.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center border p-3 rounded-lg">
                <img src={item.cover} alt={item.title} className="w-14 h-20 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm">{item.author}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT - Borrow Form */}
        <div className="border p-6 rounded-2xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Complete Your Borrow Request</h2>
          
          {/* Borrow Duration Radio */}
          <div>
            <p className="font-medium mb-1">Borrow Duration</p>
            <label>
              <input type="radio" value={3} onChange={() => setDuration(3)} /> 3 Days
            </label><br />
            <label>
              <input type="radio" value={5} onChange={() => setDuration(5)} /> 5 Days
            </label><br />
            <label>
              <input type="radio" value={10} onChange={() => setDuration(10)} /> 10 Days
            </label>
          </div>

          <p>Return Date: <b>{returnDate.toDateString()}</b></p>

          <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold">
            Confirm & Borrow
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

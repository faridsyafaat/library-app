import NavbarAfter from "@/components/layout/NavbarAfter";
import { useAppSelector } from "@/store/hooks";

export default function MyCartPage() {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <>
      <NavbarAfter />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid gap-4">
            {items.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{book.title}</h2>
                  <p>Quantity: {book.quantity}</p>
                  <p>Price: ${book.price ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

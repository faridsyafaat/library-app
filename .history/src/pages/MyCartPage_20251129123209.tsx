import { useQuery } from "@tanstack/react-query";
import { getMyCart } from "@/features/cart/cartService";

export default function MyCart() {
  const { data: cart = [] } = useQuery({
    queryKey: ["my-cart"],
    queryFn: getMyCart,
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.book.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto mt-24 p-4">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-xl"
            >
              <img
                src={item.book.coverImage}
                className="w-24 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.book.title}</h2>
                <p className="text-sm text-gray-500">
                  {item.book.author}
                </p>
                <p className="mt-1">
                  Qty: <b>{item.quantity}</b>
                </p>
                <p className="font-semibold mt-1">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

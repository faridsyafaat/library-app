import { useAppSelector } from "@/store/hooks";

export default function MyCartPage() {
    const { items, loading } = useAppSelector((state) => state.cart);

  if (loading) {
    return <div className="p-6">Loading cart...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
        <p className="text-gray-600">Cart masih kosong.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded p-4 shadow-sm"
          >
            <img
              src={item.coverImage ?? "/placeholder-cover.png"}
              alt={item.title}
              className="w-20 h-28 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">
                {item.author ?? "Unknown author"}
              </p>
              <p className="text-sm mt-2">Qty: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="font-medium">Rp {item.price ?? 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

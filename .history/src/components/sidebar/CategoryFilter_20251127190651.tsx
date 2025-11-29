import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Business"},
  { id: 2, name: "fiction"},
  { id: 3, name: "Sci-Fi"},
  { id: 4, name: "Self-Help"},
  { id: 5, name: "Technology"},
 ];

export default function CategoryFilter() {
  const navigate = useNavigate();
  return (
   <div>
      <h3 className="font-medium mb-2">Category</h3>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => navigate(`/category/${c.id}`)}
          className="block w-full text-left p-2 hover:bg-gray-100 rounded"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
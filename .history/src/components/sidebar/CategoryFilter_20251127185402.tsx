import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Fiction"},
  { id: 2, name: "Non-fiction"},
  { id: 3, name: "Self-Improve"},
  { id: 4, name: "Finance"},
  { id: 5, name: "Science"},
  { id: 6, name: "Education"},
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
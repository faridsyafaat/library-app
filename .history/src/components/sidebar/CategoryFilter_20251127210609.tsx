import { useNavigate, useParams } from "react-router-dom";

const categories = [
  { id: 1, name: "Business" },
  { id: 2, name: "Fiction" },
  { id: 3, name: "Sci-Fi" },
  { id: 4, name: "Self-Help" },
  { id: 5, name: "Technology" },
];

export default function CategoryFilter() {
  const navigate = useNavigate();
  const { id } = useParams(); // id kategori yang sedang aktif (dari URL)

  return (
    <div className="space-y-1">
      {categories.map((c) => {
        const isSelected = Number(id) === c.id; 
        return (
          <label
            key={c.id}
            className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded"
            onClick={() => navigate(`/category/${c.id}`)}
          >
            <input
              type="radio"
              name="category"
              checked={isSelected}
              readOnly
              className="form-radio"
            />
            <span>{c.name}</span>
          </label>
        );
      })}
    </div>
  );
}

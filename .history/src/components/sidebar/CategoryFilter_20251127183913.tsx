const categories = [
  "Fiction",
  "Non-fiction",
  "Self-Improve",
  "Finance",
  "Science",
  "Education",
];

export default function CategoryFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-base">Category</h3>

      <div className="flex flex-col gap-2">
        {categories.map((cat, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

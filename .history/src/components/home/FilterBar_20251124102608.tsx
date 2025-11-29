type Props = {
  search: string;
  onSearch: (v: string) => void;
  categories: { id: string; name: string }[];
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
};

export default function FilterBar({
  search,
  onSearch,
  categories,
  activeCategory,
  onSelectCategory,
}: Props) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-3 items-center">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search book..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          onClick={() => onSearch("")}
        >
          Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto py-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-xl whitespace-nowrap ${
            !activeCategory ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              activeCategory === c.id ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

import CategoryFilter from "./CategoryFilter";
import RatingFilter from "./RatingFilter";

export default function FilterSidebar() {
  return (
    <aside className="w-64 bg-white rounded-xl shadow-sm h-fit container p-4">
      <h2 className="font-bold text-xl mb-2">FILTER</h2>
      
        <h3 className="text-x font-bold text-gray-700 mb-3 tracking-wide">
          Category
        </h3>
      <CategoryFilter />
      <div className="border-b my-4" />
      <RatingFilter />
    </aside>
  );
}

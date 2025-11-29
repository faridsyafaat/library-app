import CategoryFilter from "./CategoryFilter";
import RatingFilter from "./RatingFilter";

export default function FilterSidebar() {
  return (
    <aside className="min-w-[200px] bg-white rounded-xl shadow-sm p-6 h-fit border border-red-400">
      <h2 className="font-semibold text-lg mb-6">FILTER</h2>
      <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3 tracking-wide">
       Category
      </h3>


      <CategoryFilter />
      <div className="border-b my-4" />
      <RatingFilter />
    </aside>
  );
}

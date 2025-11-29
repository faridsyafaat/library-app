import CategoryFilter from "./CategoryFilter";
import RatingFilter from "./RatingFilter";

export default function FilterSidebar() {
  return (
    <aside className="w-64 bg-white rounded-xl shadow-sm p-6 h-fit container">
      <CategoryFilter />
      <div className="border-b my-4" />
      <RatingFilter />
    </aside>
  );
}

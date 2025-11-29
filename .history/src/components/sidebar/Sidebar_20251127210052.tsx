import CategoryFilter from "./CategoryFilter";
import RatingFilter from "./RatingFilter";

export default function FilterSidebar() {
  return (
    <aside className="w-64 bg-white rounded-xl shadow-sm h-fit container p-4">
      <CategoryFilter />
      <div className="border-b my-4" />
      <RatingFilter />
    </aside>
  );
}

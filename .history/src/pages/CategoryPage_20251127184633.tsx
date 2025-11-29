import NavbarAfter from "@/components/layout/NavbarAfter";
import FilterSidebar from "@/components/sidebar/FilterSidebar";

export default function CategoryPage() {
  return (
    <>
      <NavbarAfter />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10">Book List</h1>

        <div className="flex gap-10">
          <FilterSidebar />

          <div className="flex-1">
            {/* Book grid nanti di sini */}
          </div>
        </div>
      </div>
    </>
  );
}

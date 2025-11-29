import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { id } = useParams()
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Category ID: {id}</h1>
    </div>
  );
}

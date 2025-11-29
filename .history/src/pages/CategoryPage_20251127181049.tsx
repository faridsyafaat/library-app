import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Category ID: {id}</h1>
    </>
  );
}

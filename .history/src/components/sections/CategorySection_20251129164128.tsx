import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

function TestFetch() {
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/categories")
      .then(res => setCats(res.data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Test Categories</h1>
      <ul>
        {cats.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestFetch;

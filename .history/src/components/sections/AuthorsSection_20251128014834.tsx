import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../../api/authors";
import { motion } from "framer-motion";

// dummy Fallback
import { dummyAuthors } from "../../data/dummy";

// Import type ONLY (sesuai verbatimModuleSyntax)
import type { Author } from "../../api/authors";

export default function AuthorsSection() {
  const navigate = useNavigate();

  // Fetch authors via TanStack Query
  const { data, isLoading, isError } = useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  // Jika API error atau belum ready → pakai dummy
  const authors: Author[] = data ?? dummyAuthors;

  return (
    <div className="mt-10 container">
      <h2 className="text-3xl font-bold mb-5">Popular Authors</h2>

      {/* Loading state */}
      {isLoading && (
        <p className="text-gray-600 text-sm">Loading authors...</p>
      )}

      {/* Error state */}
      {isError && (
        <p className="text-red-500 text-sm mb-4">
          Failed to load authors, showing default data.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {authors.map((author) => (
          <motion.div
            key={author.id}
            onClick={() => navigate(`/authors/${author.id}`)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer overflow-hidden"
          >
            <img
              src={author.photo ?? "/image/author-default.png"}
              alt={author.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-3 text-center">
              <p className="font-semibold text-sm">{author.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

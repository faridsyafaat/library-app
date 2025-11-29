// src/components/sections/AuthorsSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// sesuaikan path jika kamu pakai alias @
import { getAuthorById } from "../../api/authors";
import { Author as AuthorType } from "../../api/authors"; // jika kamu export type Author
import { dummyAuthor } from "../../data/dummy";

type Props = {
  id: string | number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AuthorsSection({ id }: Props) {
  const navigate = useNavigate();

  // Ketik generic supaya TypeScript tahu tipe `data`
  const { data: author } = useQuery<AuthorType>({
    queryKey: ["author", id],
    // jika id bisa undefined pastikan tidak memanggil API — di contoh ini anggap ada id
    queryFn: () => getAuthorById(id),
    placeholderData: dummyAuthor, // tampilkan dummy dulu
  });

  // JANGAN akses `author` langsung — buat fallback yang pasti ada
  const authorData = author ?? dummyAuthor;

  return (
    <section className="container mt-8">
      <h2 className="text-3xl font-semibold mb-6">Popular Authors</h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={itemVariants}
          onClick={() => navigate(`/authors/${authorData.id}`)}
          className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer w-[224px] h-[468px] flex flex-col overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={authorData.photo}
            alt={authorData.name}
            className="rounded-t-xl w-full h-[250px] object-cover"
            loading="lazy"
          />

          <div className="p-3 flex-1 flex flex-col">
            <p className="font-semibold text-sm line-clamp-2">
              {authorData.name}
            </p>
            <p className="text-gray-500 text-xs">{authorData.totalBooks} books</p>

            <div className="flex items-center text-xs mt-auto gap-1">👤 Profile</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

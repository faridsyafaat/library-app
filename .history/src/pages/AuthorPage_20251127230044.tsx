import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorHeader from "../components/author/AuthorHeader";
import AuthorBooksSection from "../components/author/AuthorBookSection"; 
import NavbarAfter from "@/components/layout/NavbarAfter";  
import FooterSection from "@/components/layout/FooterSection";

interface Author {
  id: number;
  name: string;
  bio: string;
}

export default function AuthorPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/authors/${id}`);
        const data = await res.json();

        // jika response menyimpan array authors: gunakan authors[0]
        // contoh: { authors: [...] }
        const authorData = data.author ?? data.authors?.[0] ?? null;

        setAuthor(authorData);
      } catch (err) {
        console.error(err);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
    <NavbarAfter />
    <div className="container mx-auto p-6">
      <AuthorHeader
        name={author?.name || "Unknown Author"}
        bio={author?.bio || "Bio not available"}
        imageUrl="https://via.placeholder.com/150"
      />
      <AuthorBooksSection authorId={Number(id)} />
    </div>
    <FooterSection />
    </>
  );
}

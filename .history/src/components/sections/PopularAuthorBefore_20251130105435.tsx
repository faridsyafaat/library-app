import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const dummyAuthors = [
  { id: 1, name: "Andrea Hirata", books: 7, img: "/image/author.png" },
  { id: 2, name: "Paul Strathern", books: 5, img: "/image/author.png" },
  { id: 3, name: "Yuval Noah Harari", books: 8, img: "/image/author.png" },
  { id: 4, name: "Author Name", books: 5, img: "/image/author.png" },
];

export default function PopularAuthorBefore() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8">Popular Author</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyAuthors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <Card className="h-[113px] rounded-2xl shadow-sm hover:shadow-md transition">
                <CardContent className="p-4 h-full flex items-center gap-4">
                  <img
                    src={author.img}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg">{author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      📘 {author.books} books
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

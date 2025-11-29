import { Card, CardContent } from "@/components/ui/card";

const dummyAuthors = [
  { id: 1, name: "Andrea Hirata", books: 7, img: "/image/author.png" },
  { id: 2, name: "Paul Strathern", books: 5, img: "/image/author.png" },
  { id: 3, name: "Yuval Noah Harari", books: 8, img: "/image/author.png" },
  { id: 4, name: "Author Name", books: 5, img: "/image/author.png" },
];

export default function PopularAuthors() {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-6 mt-10 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Popular Authors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dummyAuthors.map((author) => (
          <Card
            key={author.id}
            className="h-[113px] rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-4 h-full flex items-center gap-4">
              
              {/* Foto Author */}
              <img
                src={author.img}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* Info Author */}
              <div>
                <p className="font-semibold text-lg">{author.name}</p>
                <p className="text-sm text-muted-foreground">
                  📘 {author.books} books
                </p>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";

const dummyAuthors = [
  { id: 1, name: "Author name", books: 5, img: "/image/author.png" },
  { id: 2, name: "Author name", books: 5, img: "/image/author.png" },
  { id: 3, name: "Author name", books: 5, img: "/image/author.png" },
  { id: 4, name: "Author name", books: 5, img: "/image/author.png" },
];

export default function PopularAuthors() {
  return (
    <section className="w-full mt-10 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Popular Authors</h2>

      {/* Cards */}
      <div className="flex gap-6 overflow-x-auto pb-3">
        {dummyAuthors.map((author) => (
          <Card
            key={author.id}
            className="min-w-[220px] rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              {/* Image */}
              <img
                src={author.img}
                className="w-20 h-20 rounded-full object-cover"
                alt={author.name}
              />

              {/* Name */}
              <p className="font-semibold">{author.name}</p>

              {/* Books Count */}
              <span className="text-sm text-muted-foreground">
                {author.books} Books
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

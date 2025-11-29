import Image from "next/image";

const authors = [
  {
    id: 1,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 2,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 3,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 4,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
];

export default function AuthorsSection() {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold mb-6">Popular Authors</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="shadow-md rounded-xl p-4 flex flex-col items-center"
          >
            <Image
              src={author.image}
              alt={author.name}
              width={70}
              height={70}
              className="rounded-full"
            />
            <p className="mt-3 font-medium text-sm">{author.name}</p>
            <p className="text-xs text-gray-500">{author.books}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

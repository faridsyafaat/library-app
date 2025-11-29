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
    <section className="container mt-16">
      <h2 className="text-3xl font-semibold mb-6">Popular Authors</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="shadow-md rounded-xl p-4 flex items-center gap-4 bg-[#CBCACA40]"
          >
            {/* FOTO AUTHOR */}
            <img
              src={author.image}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* TEKS */}
            <div>
              <p className="font-medium text-sm">{author.name}</p>

              {/* ICON BUKU + JUMLAH */}
              <div className="flex items-center gap-1 mt-1 text-gray-600">
                <img
                  src="/image/book.png"
                  alt="book icon"
                  className="w-[24px] h-[24px] object-contain"
                />
                <span className="text-xs">{author.books}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

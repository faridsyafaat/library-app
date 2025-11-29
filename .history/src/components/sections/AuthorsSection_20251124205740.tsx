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

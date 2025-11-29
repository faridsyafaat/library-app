// src/data/dummy.ts

export const dummyAuthors = [
  {
    id: 1,
    name: "Unknown Author",
    photo: "/image/author-default.png",
    totalBooks: 4,
  },
  {
    id: 2,
    name: "Famous Writer",
    photo: "/image/author-default.png",
    totalBooks: 4,
  },
  {
    id: 3,
    name: "Popular Author",
    photo: "/image/author-default.png",
    totalBooks: 4,
  },
  {
    id: 4,
    name: "Classic Author",
    photo: "/image/author-default.png",
    totalBooks: 4,
  },
];

// 4 buku sesuai desain figma
export const dummyBooks = [
  {
    id: 1,
    title: "The First Book",
    authorName: "Unknown Author",
    cover: "/image/book1.png",
    rating: 4.5,
  },
  {
    id: 2,
    title: "The Second Book",
    authorName: "Unknown Author",
    cover: "/image/book2.png",
    rating: 4.3,
  },
  {
    id: 3,
    title: "The Third Book",
    authorName: "Unknown Author",
    cover: "/image/book3.png",
    rating: 4.7,
  },
  {
    id: 4,
    title: "The Fourth Book",
    authorName: "Unknown Author",
    cover: "/image/book4.png",
    rating: 4.1,
  },
];

// default untuk halaman AuthorPage ketika data API kosong
export const dummyAuthor = dummyAuthors[0];

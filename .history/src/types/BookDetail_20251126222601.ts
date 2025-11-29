export interface ReviewUser {
  id: number;
  name: string;
}

export interface BookReview {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  User: ReviewUser;
}

export interface BookAuthor {
  id: number;
  name: string;
  bio: string;
}

export interface BookCategory {
  id: number;
  name: string;
}

export interface BookDetail {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  price: number;
  stock: number;
  isActive: boolean;
  rating: number;
  reviewCount: number;

  authorId: number;
  categoryId: number;

  availableCopies: number;
  borrowCount: number;
  totalCopies: number;

  Author: BookAuthor;
  Category: BookCategory;
  Review: BookReview[];
}

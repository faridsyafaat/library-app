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

  Author: {
    id: number;
    name: string;
    bio: string;
  };

  Category: {
    id: number;
    name: string;
  };

  Review: Array<{
    id: number;
    star: number;
    comment: string;
    userId: number;
    bookId: number;
    createdAt: string;
    User: {
      id: number;
      name: string;
    };
  }>;
}

<RelatedBooks
  categoryName={data.Category?.name}
  currentBookId={data.id}
/>


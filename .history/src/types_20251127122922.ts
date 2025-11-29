// src/types.ts
export interface CategoryType {
  id: number;
  name: string;
}

export interface BookType {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
  description?: string;
  Category?: CategoryType;
}

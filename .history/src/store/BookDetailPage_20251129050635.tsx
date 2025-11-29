type Props = {
  categoryName: string;
  currentBookId: string;
};

export default function BookDetailPage({ categoryName, currentBookId }: Props) {
  return (
    <div>
      <h1>Book Detail</h1>
      <p>Category: {categoryName}</p>
      <p>Book ID: {currentBookId}</p>
    </div>
  );
}

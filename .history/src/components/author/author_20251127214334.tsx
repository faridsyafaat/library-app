interface Props {
  author: {
    name: string;
    bio: string;
  };
  bookCount: number;
}

export default function AuthorHeader({ author, bookCount }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-4 items-center">
      {/* Placeholder Avatar */}
      <div className="w-14 h-14 bg-gray-300 rounded-full" />

      <div>
        <h3 className="text-lg font-semibold">{author.name}</h3>
        <p className="text-sm text-gray-600">{author.bio}</p>

        <p className="mt-1 text-sm font-medium">
          📚 {bookCount} books
        </p>
      </div>
    </div>
  );
}

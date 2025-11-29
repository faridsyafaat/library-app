interface Props {
  name: string;
  bio: string;
  imageUrl: string;
}

export default function AuthorHeader({ name, bio, imageUrl }: Props) {
  return (
    <div className="flex items-center gap-6 py-8">
      <img
        src={imageUrl}
        alt={name}
        className="w-28 h-28 rounded-full object-cover shadow-md"
      />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-600 text-sm mt-1">{bio}</p>
      </div>
    </div>
  );
}

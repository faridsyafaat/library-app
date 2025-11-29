type Props = {
  page: number;
  limit: number;
  total: number;
  onChange: (newPage: number) => void;
};

export default function Pagination({ page, limit, total, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        className="px-3 py-1 rounded-md border disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        className="px-3 py-1 rounded-md border disabled:opacity-50"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

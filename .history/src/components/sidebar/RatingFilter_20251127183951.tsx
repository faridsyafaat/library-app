const ratings = [5, 4, 3, 2, 1];

export default function RatingFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-base">Rating</h3>

      <div className="flex flex-col gap-2">
        {ratings.map((rate) => (
          <label key={rate} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="rating" className="w-4 h-4" />
            <span>⭐ {rate}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

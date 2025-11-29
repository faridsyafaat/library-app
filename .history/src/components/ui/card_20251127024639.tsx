export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-md ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`mb-3 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`font-semibold text-lg ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`${className}`} {...props} />;
}

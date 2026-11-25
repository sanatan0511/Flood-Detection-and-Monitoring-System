export default function Skeleton({ className = "" }) {
  const hasRounding = /\brounded(-\w+)?\b/.test(className);

  return (
    <div
      aria-hidden="true"
      className={[
        "skeleton-shimmer relative overflow-hidden",
        !hasRounding && "rounded-lg",
        "bg-gray-200 dark:bg-gray-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
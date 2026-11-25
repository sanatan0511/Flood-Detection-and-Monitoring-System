
import { useState } from "react";
import Skeleton from "./Skeleton";

export default function ImageWithSkeleton({
  src,
  alt = "",
  className = "",
  imageClassName = "",
  priority = false,
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);

  const loaded = loadedSrc === src;
  const failed = failedSrc === src;

  return (
    <div
      className={[
        "relative min-w-0 overflow-hidden rounded-xl",
        "bg-gray-100 dark:bg-gray-900",
        className,
      ].join(" ")}
      aria-busy={!loaded && !failed}
    >
      {!loaded && !failed && (
        <Skeleton className="absolute inset-0 z-10 rounded-none" />
      )}

      {failed ? (
        <div
          role="img"
          aria-label={alt || "Image unavailable"}
          className="flex h-full min-h-32 items-center justify-center text-sm text-gray-500"
        >
          Image unavailable
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          className={[
            "block h-full w-full object-cover",
            "transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            imageClassName,
          ].join(" ")}
        />
      )}
    </div>
  );
}

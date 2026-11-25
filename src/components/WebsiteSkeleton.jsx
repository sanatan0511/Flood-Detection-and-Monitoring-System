
import Skeleton from "./Skeleton";

export default function WebsiteSkeleton() {
  return (
    <main
      aria-label="Loading website content"
      aria-busy="true"
      className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5"
    >
      {/* Header */}
      <header className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800 sm:flex-nowrap">
        <Skeleton className="h-5 w-24 shrink-0" />

        <Skeleton className="h-10 min-w-0 flex-1 rounded-lg" />

        <Skeleton className="h-9 w-24 shrink-0" />
      </header>

      {/* Headlines */}
      <section
        aria-label="Loading headlines"
        className="mt-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800"
      >
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="hidden h-4 w-32 sm:block" />
          <Skeleton className="hidden h-4 w-24 md:block" />
        </div>
      </section>

      {/* Top row: Image 1 (60%) and Image 2 (40%) */}
      <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
        <Skeleton className="aspect-[1.8/1] min-w-0 md:col-span-3 md:aspect-[1.65/1]" />
        <Skeleton className="aspect-[1.8/1] min-w-0 md:col-span-2 md:aspect-[1.65/1]" />
      </section>

      {/* Bottom row: Image 4 (60%) and Image 3 (40%) */}
      <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
        <Skeleton className="aspect-[1.8/1] min-w-0 md:col-span-3 md:aspect-[1.65/1]" />
        <Skeleton className="aspect-[1.8/1] min-w-0 md:col-span-2 md:aspect-[1.65/1]" />
      </section>
    </main>
  );
}

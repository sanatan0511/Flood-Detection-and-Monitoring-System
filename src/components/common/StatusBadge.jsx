export default function StatusBadge({ status, size = "md", className = "" }) {
  const norm = (status || "").toLowerCase();

  const styles = {
    normal: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    safe: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    alert: "bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    warning: "bg-orange-50 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
    danger: "bg-rose-600 text-white border-rose-700 dark:bg-rose-600 dark:text-white dark:border-rose-500",
    submitted: "bg-sky-50 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
    "under review": "bg-indigo-50 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    verified: "bg-teal-50 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    resolved: "bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
  }[norm] || "bg-neutral-100 text-neutral-800 border-neutral-300";

  const dotColors = {
    normal: "bg-emerald-600",
    safe: "bg-emerald-600",
    alert: "bg-amber-600",
    warning: "bg-orange-600",
    danger: "bg-white animate-pulse",
    submitted: "bg-sky-600",
    "under review": "bg-indigo-600",
    verified: "bg-teal-600",
    resolved: "bg-neutral-400",
  }[norm] || "bg-neutral-400";

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-[11px] px-2.5 py-1 gap-1.5 font-bold",
    lg: "text-xs px-3 py-1.5 gap-2 font-bold",
  }[size] || "text-[11px] px-2.5 py-1 gap-1.5 font-bold";

  return (
    <span
      className={`inline-flex items-center uppercase font-mono tracking-wider border ${styles} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors}`} />
      <span>{status}</span>
    </span>
  );
}

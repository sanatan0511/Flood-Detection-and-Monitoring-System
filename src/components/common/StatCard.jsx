import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  trend = "up", // up, down, neutral
  icon: Icon,
  badgeText = "DEMO DATA",
}) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 transition-all hover:border-black dark:hover:border-neutral-600">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              {title}
            </span>
            {badgeText && (
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
                {badgeText}
              </span>
            )}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black dark:text-white tracking-tighter uppercase">
            {value}
          </div>
        </div>

        {Icon && (
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-neutral-500 text-[11px] font-medium truncate max-w-[70%]">
              {subtitle}
            </span>
          )}
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 font-mono font-bold text-[11px] ${
                trend === "up"
                  ? "text-rose-600 dark:text-rose-400"
                  : trend === "down"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-neutral-500"
              }`}
            >
              {trend === "up" && <ArrowUpRight className="w-3.5 h-3.5" />}
              {trend === "down" && <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend === "neutral" && <Minus className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

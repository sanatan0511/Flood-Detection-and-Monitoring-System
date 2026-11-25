import { useState } from "react";
import { TELEMETRY_TRENDS_7DAYS } from "../../data/mockData";
import { CloudRain } from "lucide-react";

export default function RainfallBarChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxVal = 100;
  const chartHeight = 180;
  const chartWidth = 360;
  const padding = { top: 20, right: 15, bottom: 30, left: 35 };

  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const barWidth = 24;

  return (
    <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
              DOPPLER RADAR
            </span>
            <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
              7-DAY CATCHMENT RAINFALL
            </h3>
          </div>
          <CloudRain className="w-5 h-5 text-black dark:text-white" />
        </div>
        <p className="text-xs text-neutral-500 font-mono">
          DAILY PRECIPITATION ACCUMULATION (MM)
        </p>
      </div>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {[0, 25, 50, 75, 100].map((val) => {
            const y = padding.top + innerHeight - (val / maxVal) * innerHeight;
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="2 2"
                  className="dark:stroke-neutral-800"
                />
                <text
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#9CA3AF"
                  className="font-mono font-bold"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {TELEMETRY_TRENDS_7DAYS.map((d, i) => {
            const barHeight = (d.rainfallMm / maxVal) * innerHeight;
            const x =
              padding.left +
              (i / (TELEMETRY_TRENDS_7DAYS.length - 1)) * (innerWidth - barWidth);
            const y = padding.top + innerHeight - barHeight;
            const isHovered = hoveredIndex === i;
            const isHigh = d.rainfallMm >= 60;

            return (
              <g
                key={d.day}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHigh ? "#E11D48" : isHovered ? "#2563EB" : "currentColor"}
                  className="text-black dark:text-white transition-all duration-200"
                  opacity={isHovered ? 1 : 0.9}
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6B7280"
                  className="font-mono font-bold uppercase"
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredIndex !== null && (
          <div className="absolute top-0 right-4 bg-black text-white text-xs font-mono px-3 py-1.5 border border-neutral-700 pointer-events-none">
            <span className="font-bold">
              {TELEMETRY_TRENDS_7DAYS[hoveredIndex].day}:{" "}
            </span>
            <span className="font-bold text-rose-400">
              {TELEMETRY_TRENDS_7DAYS[hoveredIndex].rainfallMm} MM
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-black/10 dark:border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-rose-600" />
          <span>HEAVY SURGE (&gt;60MM)</span>
        </span>
        <span className="font-bold text-black dark:text-white">
          PEAK: 85 MM (THU)
        </span>
      </div>
    </div>
  );
}

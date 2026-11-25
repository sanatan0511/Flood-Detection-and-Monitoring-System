import { useState } from "react";
import { TELEMETRY_TRENDS_7DAYS } from "../../data/mockData";

export default function TelemetryLineChart() {
  const [activeRiver, setActiveRiver] = useState("ganga");
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const riversConfig = {
    ganga: {
      name: "Ganga (Rishikesh)",
      dataKey: "gangaLevel",
      unit: "m",
      warningLevel: 339.5,
      dangerLevel: 340.5,
      min: 336.5,
      max: 341.5,
      color: "#000000",
    },
    beas: {
      name: "Beas (Pandoh Dam)",
      dataKey: "beasLevel",
      unit: "m",
      warningLevel: 894.0,
      dangerLevel: 896.0,
      min: 888.0,
      max: 897.0,
      color: "#1677C8",
    },
    brahmaputra: {
      name: "Brahmaputra (Guwahati)",
      dataKey: "brahmaputraLevel",
      unit: "m",
      warningLevel: 49.68,
      dangerLevel: 50.5,
      min: 47.5,
      max: 51.5,
      color: "#E11D48",
    },
  };

  const currentConfig = riversConfig[activeRiver];
  const chartHeight = 220;
  const chartWidth = 580;
  const padding = { top: 25, right: 30, bottom: 35, left: 55 };

  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const getY = (val) => {
    const range = currentConfig.max - currentConfig.min;
    const norm = (val - currentConfig.min) / range;
    return padding.top + innerHeight - norm * innerHeight;
  };

  const getX = (idx) => {
    return padding.left + (idx / (TELEMETRY_TRENDS_7DAYS.length - 1)) * innerWidth;
  };

  const points = TELEMETRY_TRENDS_7DAYS.map((d, i) => ({
    x: getX(i),
    y: getY(d[currentConfig.dataKey]),
    val: d[currentConfig.dataKey],
    day: d.day,
  }));

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    padding.top + innerHeight
  } L ${points[0].x} ${padding.top + innerHeight} Z`;

  const warningY = getY(currentConfig.warningLevel);
  const dangerY = getY(currentConfig.dangerLevel);

  return (
    <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
            CWC TELEMETRY LOG
          </span>
          <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
            RIVER WATER LEVEL HYDROGRAPH (7-DAY)
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-black p-1 border border-black/10 dark:border-neutral-800 font-mono text-[11px] font-bold uppercase">
          {Object.entries(riversConfig).map(([key]) => (
            <button
              key={key}
              onClick={() => setActiveRiver(key)}
              className={`px-3 py-1 transition-all ${
                activeRiver === key
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto min-w-[500px]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id={`chart-grad-${activeRiver}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.25" className="dark:stop-color-white" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding.top + innerHeight * pct;
            const val = (currentConfig.max - pct * (currentConfig.max - currentConfig.min)).toFixed(1);
            return (
              <g key={i}>
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
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9CA3AF"
                  className="font-mono font-bold"
                >
                  {val}m
                </text>
              </g>
            );
          })}

          {warningY >= padding.top && warningY <= padding.top + innerHeight && (
            <g>
              <line
                x1={padding.left}
                y1={warningY}
                x2={chartWidth - padding.right}
                y2={warningY}
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x={chartWidth - padding.right}
                y={warningY - 4}
                textAnchor="end"
                fontSize="9"
                fill="#F59E0B"
                fontWeight="bold"
                className="font-mono uppercase"
              >
                WARN ({currentConfig.warningLevel}m)
              </text>
            </g>
          )}

          {dangerY >= padding.top && dangerY <= padding.top + innerHeight && (
            <g>
              <line
                x1={padding.left}
                y1={dangerY}
                x2={chartWidth - padding.right}
                y2={dangerY}
                stroke="#E11D48"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x={chartWidth - padding.right}
                y={dangerY - 4}
                textAnchor="end"
                fontSize="9"
                fill="#E11D48"
                fontWeight="bold"
                className="font-mono uppercase"
              >
                DANGER ({currentConfig.dangerLevel}m)
              </text>
            </g>
          )}

          <path d={areaD} fill={`url(#chart-grad-${activeRiver})`} />

          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-black dark:text-white"
          />

          {points.map((pt, i) => (
            <g key={i}>
              <line
                x1={pt.x}
                y1={padding.top}
                x2={pt.x}
                y2={padding.top + innerHeight}
                stroke={hoveredIdx === i ? "currentColor" : "transparent"}
                strokeWidth="1"
                strokeDasharray="2 2"
                className="text-black dark:text-white"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === i ? 6 : 4}
                fill={hoveredIdx === i ? "#E11D48" : "currentColor"}
                stroke="white"
                strokeWidth="1.5"
                className="cursor-pointer text-black dark:text-white"
                onMouseEnter={() => setHoveredIdx(i)}
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
              />
              <text
                x={pt.x}
                y={chartHeight - 12}
                textAnchor="middle"
                fontSize="11"
                fill="#6B7280"
                className="font-mono font-bold uppercase"
              >
                {pt.day}
              </text>
            </g>
          ))}
        </svg>

        {hoveredIdx !== null && (
          <div
            className="absolute top-3 bg-black text-white text-xs font-mono p-3 border border-neutral-700 pointer-events-none z-20 shadow-2xl"
            style={{
              left: `${(points[hoveredIdx].x / chartWidth) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-[10px] text-neutral-400 uppercase">
              {points[hoveredIdx].day} TELEMETRY
            </div>
            <div className="text-sm font-black text-white mt-0.5">
              {points[hoveredIdx].val} {currentConfig.unit}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              {points[hoveredIdx].val >= currentConfig.dangerLevel
                ? "⚠️ ABOVE DANGER MARK"
                : points[hoveredIdx].val >= currentConfig.warningLevel
                ? "⚡ ABOVE WARNING MARK"
                : "✅ SAFE FLOW"}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-amber-500" />
            <span>WARN ({currentConfig.warningLevel}m)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-rose-600" />
            <span>DANGER ({currentConfig.dangerLevel}m)</span>
          </div>
        </div>
        <span>UPDATED HOURLY // CWC TELEMETRY</span>
      </div>
    </div>
  );
}

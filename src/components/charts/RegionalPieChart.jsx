import { REGIONAL_INCIDENT_DISTRIBUTION } from "../../data/mockData";
import { PieChart as PieIcon } from "lucide-react";

export default function RegionalPieChart() {
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
              INCIDENT GEOGRAPHY
            </span>
            <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
              REGIONAL REPORT SHARE
            </h3>
          </div>
          <PieIcon className="w-5 h-5 text-black dark:text-white" />
        </div>
        <p className="text-xs text-neutral-500 font-mono">
          DISTRIBUTION OF VERIFIED OBSERVATIONS
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {REGIONAL_INCIDENT_DISTRIBUTION.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += item.percentage;

              return (
                <circle
                  key={item.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-black dark:text-white font-mono">
              51
            </span>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest font-bold">
              DOSSIERS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 w-full max-w-[200px] font-mono text-[11px]">
          {REGIONAL_INCIDENT_DISTRIBUTION.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2 h-2 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-neutral-700 dark:text-neutral-300 truncate uppercase">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-black dark:text-white">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-black/10 dark:border-neutral-800 text-[10px] font-mono text-neutral-400 text-center uppercase">
        HIGHER EXPOSURE OBSERVED IN FLASH CATCHMENTS
      </div>
    </div>
  );
}

import LeafletMap from "../components/map/LeafletMap";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function MapView() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F5F8FB] dark:bg-[#0B1727] overflow-hidden">
      
      {/* Map Sub-Header Bar */}
      <div className="bg-white dark:bg-[#102A43] border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-sm text-[#102A43] dark:text-white">
              Himalayan Basin GIS Interactive Map
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-[#1677C8] dark:bg-sky-950 dark:text-sky-300">
              Multi-Layer Telemetry
            </span>
          </div>
        </div>

        {/* Legend / Info Note */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="hidden md:inline-flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#1677C8]" />
            Illustrative Capstone Telemetry & Hydro-Gauge Points
          </span>
          <Link
            to="/report"
            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors"
          >
            + Report at this Point
          </Link>
        </div>
      </div>

      {/* Full-Height Leaflet Map Container */}
      <div className="flex-1 relative w-full h-full">
        <LeafletMap className="w-full h-full rounded-none border-none" />
      </div>

    </div>
  );
}

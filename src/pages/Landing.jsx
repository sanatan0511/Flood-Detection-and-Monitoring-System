import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Activity, 
  MapPin, 
  AlertTriangle, 
  Radio, 
  CloudRain, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  PhoneCall, 
  Compass,
  Waves
} from "lucide-react";
import { RIVER_MONITORING_STATIONS } from "../data/mockData";
import StatusBadge from "../components/common/StatusBadge";

export default function Landing() {
  const sampleStations = RIVER_MONITORING_STATIONS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors">
      
      {/* 1. HERO SECTION (Full-Screen Editorial Aesthetic matching Dripprack) */}
      <section className="relative w-full h-[calc(100vh-84px)] min-h-[620px] flex flex-col justify-end overflow-hidden bg-black text-white pb-10 sm:pb-14">
        
        {/* Full-bleed atmospheric dark photographic background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Atmospheric dark Himalayan mountain river gorge"
            className="w-full h-full object-cover object-center opacity-50 filter contrast-125 saturate-50 scale-[1.02] transform transition-transform duration-1000"
          />
          {/* Deep vignette gradient for high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Hero Content positioned in lower third */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <div className="max-w-3xl space-y-5">
            
            {/* Pill tag: • REAL-TIME HYDRO-TELEMETRY */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>REAL-TIME HYDRO-TELEMETRY // HIMALAYAN BASIN // LIVE 2026</span>
            </div>

            {/* Single-Line Monumental Heading (DRIPRACK style) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-sm">
              FLOODWATCH<span className="text-rose-500">®</span>
            </h1>

            {/* High-contrast subtext */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
              Advanced mountain hydrological monitoring, river water gauge telemetry, and community disaster incident reporting across vulnerable Himalayan catchments.
            </p>

            {/* Dual High-Contrast Buttons (Matching Image 1) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs font-bold uppercase tracking-widest">
              {/* Button 1: Solid White with black text */}
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors shadow-xl"
              >
                <span>EXPLORE MONITORING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Button 2: Crisp Outlined Ghost Button */}
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black/50 hover:bg-white hover:text-black text-white border border-neutral-600 transition-all backdrop-blur-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>REPORT AN INCIDENT</span>
              </Link>
            </div>

          </div>

          {/* Bottom subtle metadata bar & scroll prompt */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>CWC VERIFIED GAUGES ONLINE</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight - 84, behavior: 'smooth' })}>
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. RUNNING SECONDARY TICKER TAPE (Between hero and categories) */}
      <div className="bg-black text-white text-[11px] font-mono tracking-wider uppercase py-2.5 overflow-hidden border-y border-neutral-800">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span className="text-amber-400">✦</span>
          <span>NATIONWIDE HYDRO-SENSORS</span>
          <span className="text-amber-400">✦</span>
          <span>INSTANT FIELD REPORTS // SDRF &amp; LOCAL DDMA</span>
          <span className="text-amber-400">✦</span>
          <span>SATELLITE RADAR SYNCHRONIZED // DEVPRAYAG &amp; KULLU</span>
          <span className="text-amber-400">✦</span>
          <span>CWC VERIFIED RIVER GAUGES</span>
          <span className="text-amber-400">✦</span>
          <span>HIGH-ALTITUDE GLOF LAKE REMOTE SENSING</span>
          <span className="text-amber-400">✦</span>
          <span className="text-rose-400 font-bold">EMERGENCY SOS: 112</span>
          <span className="text-amber-400">✦</span>
          <span>NATIONWIDE HYDRO-SENSORS</span>
          <span className="text-amber-400">✦</span>
          <span>INSTANT FIELD REPORTS // SDRF &amp; LOCAL DDMA</span>
          <span className="text-amber-400">✦</span>
          <span>SATELLITE RADAR SYNCHRONIZED // DEVPRAYAG &amp; KULLU</span>
        </div>
      </div>

      {/* 3. MONITORING BY BASIN (Directly styled after Image 2: "SHOP BY CATEGORY") */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with tracking tag & right-side view all link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
              EXPLORE THE BASINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
              MONITORING BY BASIN
            </h2>
          </div>

          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:opacity-60 transition-opacity self-start sm:self-auto"
          >
            <span>VIEW FULL GIS MAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetrical 3-Card Collage Grid (Directly matching Image 2's layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* LEFT LARGE TALL CARD (60% width = col-span-7) */}
          <div className="md:col-span-7 relative group overflow-hidden bg-neutral-900 min-h-[380px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
              alt="Upper Ganga & Alaknanda Basin"
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

            {/* Top Tag: e.g. "18 PIECES" -> "24 STATIONS" */}
            <div className="relative z-10 flex justify-end">
              <span className="bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-200 text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                24 HYDRO-STATIONS
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                UTTARAKHAND // SECTOR 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                UPPER GANGA &amp; ALAKNANDA
              </h3>
              <p className="text-xs text-neutral-300 max-w-md line-clamp-2">
                Steep mountain catchments connecting Rishikesh, Devprayag, and Joshimath with automated ultrasonic water level gauges.
              </p>
              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
                >
                  <span>INSPECT BASIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 2 STACKED CARDS (40% width = col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            
            {/* Top Right Card: BEAS & SUTLEJ (matching "HOODIES" card in Image 2) */}
            <div className="relative group overflow-hidden bg-neutral-900 min-h-[235px] flex-1 flex flex-col justify-between p-6">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
                alt="Beas River Basin"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

              <div className="relative z-10 flex justify-end">
                <span className="bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-200 text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  18 GAUGES
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  HIMACHAL PRADESH // SECTOR 02
                </span>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">
                  BEAS &amp; SUTLEJ BASIN
                </h3>
                <div className="pt-1">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
                  >
                    <span>INSPECT BASIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Right Card: TEESTA & GLOF (matching "SHIRTS" card in Image 2) */}
            <div className="relative group overflow-hidden bg-neutral-900 min-h-[235px] flex-1 flex flex-col justify-between p-6">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Teesta Basin & Glacial Lakes"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

              <div className="relative z-10 flex justify-end">
                <span className="bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-200 text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  12 GLACIAL LAKES
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  SIKKIM &amp; ASSAM // SECTOR 03
                </span>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">
                  TEESTA &amp; GLOF SITES
                </h3>
                <div className="pt-1">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
                  >
                    <span>INSPECT BASIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ACTIVE FIELD RESPONSE & MISSION (Directly styled after Image 3: "COLLABS") */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
              FIELD INCIDENT NETWORK &amp; COLLABORATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
              ACTIVE RESPONSE NETWORK
            </h2>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:opacity-60 transition-opacity self-start sm:self-auto"
          >
            <span>EXPLORE ACTIVE REPORTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wide Split Banner (Matching Image 3: "DRIPRACK × TOKYO UNDERGROUND") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-black text-white overflow-hidden border border-neutral-800">
          
          {/* Left Visual Half (col-span-6): High-contrast neon-accented image */}
          <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80"
              alt="River flood sensor telemetry"
              className="w-full h-full object-cover filter contrast-125 saturate-150"
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Neon / High-contrast Tag: e.g. "LIMITED DROP // 190 PIECES" style */}
            <div className="absolute top-4 left-4">
              <span className="bg-rose-600 text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>ALERT: RIVERBANK EROSION // PANDOH SECTOR</span>
              </span>
            </div>
          </div>

          {/* Right Text Half (col-span-6): Metadata, bold title, and CTA */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            
            {/* Metadata Bar */}
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-4 border-b border-neutral-800">
              <span>CYCLE: 2026 // MONSOON</span>
              <span>COORDS: 30.1459° N, 78.5989° E</span>
            </div>

            {/* Bold Collaboration Title */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                FLOODWATCH × DISASTER RESPONSE NETWORK
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-lg">
                Connecting automated CWC basin water gauge telemetry with decentralized crowd-sourced community observations. When sudden mountain rain triggers cloudbursts, field observers provide real-time geotagged proof to emergency coordinators.
              </p>
            </div>

            {/* Button */}
            <div className="pt-2">
              <Link
                to="/report"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <span>SUBMIT VERIFIED FIELD REPORT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* 5. LIVE TELEMETRY STATIONS PREVIEW */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
              AUTOMATIC GAUGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
              LIVE SENSOR STATIONS
            </h2>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:opacity-60 transition-opacity"
          >
            <span>VIEW ALL 9 STATIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleStations.map((station) => (
            <div
              key={station.id}
              className="border border-black/10 dark:border-neutral-800 p-5 bg-neutral-50/50 dark:bg-neutral-900/40 flex flex-col justify-between hover:border-black dark:hover:border-neutral-500 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-neutral-400 uppercase">
                  <span>{station.id}</span>
                  <StatusBadge status={station.status} size="sm" />
                </div>

                <h4 className="font-bold text-sm uppercase tracking-tight text-black dark:text-white">
                  {station.name}
                </h4>
                <span className="text-[11px] text-neutral-500 block mt-0.5">
                  River: {station.river} ({station.state})
                </span>

                <div className="mt-6 pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-neutral-400 font-sans text-[11px]">Water Elevation:</span>
                    <span className="font-bold text-base text-black dark:text-white">{station.currentLevel} m</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Danger Mark:</span>
                    <span>{station.dangerLevel} m</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Trend:</span>
                    <span className="font-semibold text-black dark:text-white">{station.trend}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-400">{station.lastUpdated}</span>
                <Link to="/map" className="font-bold text-black dark:text-white hover:underline uppercase">
                  LOCATE →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. PREPAREDNESS & SURVIVAL KIT HIGHLIGHT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="bg-neutral-100 dark:bg-neutral-900 p-8 sm:p-12 border border-black/10 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono font-bold tracking-widest text-rose-600 uppercase block">
              CIVIL DEFENSE &amp; SURVIVAL
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">
              72-HOUR MOUNTAIN EMERGENCY GO-KIT
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When mountain river catchments swell during flash storms, bridge approaches can wash out in under 30 minutes. Access the interactive disaster checklist, evacuation route principles, and verified emergency helplines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 text-xs font-bold uppercase tracking-wider">
            <Link
              to="/resources"
              className="px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-85 text-center transition-opacity"
            >
              ACCESS CHECKLIST →
            </Link>
            <Link
              to="/resources#contacts"
              className="px-6 py-3.5 border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 text-center transition-colors"
            >
              VERIFIED HELPLINES
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC CAPSTONE DISCLAIMER BAR */}
      <section className="py-12 bg-neutral-50 dark:bg-black border-t border-black/10 dark:border-white/10 text-xs text-neutral-500">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            FINAL YEAR ACADEMIC CAPSTONE PROJECT // ARCHITECTURE &amp; UI SPECIFICATION
          </span>
          <p className="leading-relaxed">
            FloodWatch is developed exclusively as an engineering capstone exploring modern GIS cartography, real-time telemetry UX, and community reporting. <strong>This platform does not replace official governmental emergency evacuation alerts.</strong> For official disaster directives, always follow the National Disaster Management Authority (NDMA), Central Water Commission (CWC), State Disaster Management Authorities (SDMA), or dial <strong>112</strong>.
          </p>
        </div>
      </section>

    </div>
  );
}

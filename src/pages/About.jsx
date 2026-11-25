export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
            ACADEMIC CAPSTONE PORTFOLIO // 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
            ABOUT FLOODWATCH®
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 font-sans mt-2 max-w-2xl leading-relaxed">
            Human-centered disaster telemetry, cartographic risk visualization, and rapid community incident reporting across fragile Himalayan river basins.
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
              01 // PROBLEM STATEMENT
            </span>
          </div>

          <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
            THE HIMALAYAN FLASH FLOOD &amp; GLOF CHALLENGE
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            The Indian Himalayan Region (IHR) is home to critical transboundary river basins including the Ganga, Brahmaputra, and Indus networks. Due to extreme topographic gradients, climate change-induced cloudbursts, and melting glaciers with growing moraine lakes, Himalayan river valleys experience catastrophic flash floods and Glacial Lake Outburst Floods (GLOFs).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
            <div className="p-4 bg-white dark:bg-black border border-black/10 dark:border-neutral-800 space-y-1">
              <span className="font-bold text-black dark:text-white uppercase block">
                EXTREME VELOCITY
              </span>
              <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
                Mountain runoff reaches peak deluge levels in 15–45 minutes, rendering conventional downstream alerts insufficient.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-black border border-black/10 dark:border-neutral-800 space-y-1">
              <span className="font-bold text-black dark:text-white uppercase block">
                ISOLATION GAP
              </span>
              <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
                Landslides regularly sever cellular and road corridors, leaving remote valleys without real-time situational data.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-black border border-black/10 dark:border-neutral-800 space-y-1">
              <span className="font-bold text-black dark:text-white uppercase block">
                COMMUNITY BRIDGE
              </span>
              <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
                Valuable eyewitness observations of bank scour and tributary surges lack a streamlined public reporting bridge.
              </p>
            </div>
          </div>
        </div>

        {/* Objectives & Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-8 border border-black/10 dark:border-neutral-800 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
              02 // OBJECTIVES
            </span>
            <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
              CORE CAPSTONE OBJECTIVES
            </h3>
            <ul className="space-y-3 text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans">Develop a GIS cartographic interface showing river gauges, rainfall anomalies, and GLOF risk points.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans">Build mobile-friendly incident reporting with geotagging and photo/video verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans">Disseminate verified 72-hour preparedness guidelines and verified emergency helplines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans">Archive historical Himalayan disasters (Kedarnath, Chamoli, South Lhonak) for academic review.</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-8 border border-black/10 dark:border-neutral-800 space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
              03 // AUDIENCE
            </span>
            <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
              INTENDED PLATFORM USERS
            </h3>
            <ul className="space-y-3 text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans"><strong>Communities &amp; Pilgrims:</strong> Access high-ground safety guidelines and observe water gauges before traveling mountain routes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans"><strong>Field Volunteers &amp; Observers:</strong> Report localized erosion, debris slumps, and road blockages with photographic evidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black dark:text-white">✦</span>
                <span className="font-sans"><strong>Academic Researchers:</strong> Download historical datasets and review multi-basin hydrological trends.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Limitations & Disclaimer */}
        <div className="p-6 bg-black text-white border border-neutral-800 space-y-2 font-mono text-xs">
          <span className="text-amber-400 font-bold block uppercase tracking-widest text-[10px]">
            LEGAL &amp; ACADEMIC DISCLAIMER
          </span>
          <p className="text-neutral-400 leading-relaxed font-sans text-xs">
            FloodWatch is developed exclusively as an engineering prototype for academic evaluation. It does not replace governmental disaster warning sirens, police evacuation orders, or official civil defense directives.
          </p>
        </div>

      </div>
    </div>
  );
}

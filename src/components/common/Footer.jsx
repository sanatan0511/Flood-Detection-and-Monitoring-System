import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-neutral-800 transition-colors">
      
      {/* Top brand & newsletter / update banner */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              HIMALAYAN HYDROLOGICAL OBSERVATORY // 2026
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              FLOODWATCH ARCHITECTURE
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              LIVE TELEMETRY
            </Link>
            <Link
              to="/report"
              className="px-5 py-2.5 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-900 transition-colors"
            >
              REPORT INCIDENT
            </Link>
          </div>
        </div>
      </div>

      {/* Main Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          
          {/* Column 1: Monitoring */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-300 uppercase tracking-widest text-[11px] pb-1 border-b border-neutral-800">
              MONITORING
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">LIVE GAUGES</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">GIS MULTI-LAYER MAP</Link>
              </li>
              <li>
                <Link to="/historical" className="hover:text-white transition-colors">HISTORICAL DELUGES</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">WEATHER RADAR</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Basins */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-300 uppercase tracking-widest text-[11px] pb-1 border-b border-neutral-800">
              BASINS
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">UPPER GANGA</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">BEAS &amp; SUTLEJ</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">BRAHMAPUTRA VALLEY</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">TEESTA &amp; GLOF</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Incident Desk */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-300 uppercase tracking-widest text-[11px] pb-1 border-b border-neutral-800">
              INCIDENT DESK
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/report" className="hover:text-white text-rose-400 font-bold transition-colors">LODGE FIELD REPORT</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">VERIFIED DOSSIERS</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">OBSERVER PROFILE</Link>
              </li>
              <li>
                <Link to="/resources#contacts" className="hover:text-white transition-colors">AGENCY HELPLINES</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Preparedness */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-300 uppercase tracking-widest text-[11px] pb-1 border-b border-neutral-800">
              SAFETY
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">72H SURVIVAL KIT</Link>
              </li>
              <li>
                <Link to="/resources#before" className="hover:text-white transition-colors">BEFORE DELUGE</Link>
              </li>
              <li>
                <Link to="/resources#during" className="hover:text-white transition-colors">DURING DELUGE</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">CAPSTONE RESEARCH</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="mt-12 p-4 border border-neutral-800 bg-neutral-950 text-[11px] text-neutral-400 leading-relaxed space-y-1 font-mono">
          <span className="text-amber-400 font-bold block">ACADEMIC CAPSTONE DISCLAIMER:</span>
          <p>
            FloodWatch is developed for academic research purposes. Hydrological gauges and telemetry are simulated. This platform is NOT an official governmental emergency warning system. For emergencies, consult NDMA / CWC or dial <strong>112</strong> immediately.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-3">
          <span>© 2026 FLOODWATCH® // HIMALAYAN BASIN OBSERVATORY</span>
          <span>ALL RIGHTS RESERVED // CAPSTONE ENGINEERING</span>
        </div>
      </div>

    </footer>
  );
}

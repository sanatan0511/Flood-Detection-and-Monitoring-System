import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Search, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  PhoneCall, 
  Activity, 
  Radio, 
  MapPin, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const handleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0A0A0A] border-b border-black/10 dark:border-white/10 transition-colors">
      
      {/* TOP MARQUEE TICKER TAPE */}
      <div className="bg-black text-white text-[11px] font-mono tracking-wider uppercase py-1.5 overflow-hidden border-b border-neutral-800 select-none">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span>⚡ HIMALAYAN BASIN HYDROLOGICAL OBSERVATORY</span>
          <span className="text-amber-400">✦</span>
          <span>REAL-TIME GAUGES ACTIVE // 2026 CYCLE</span>
          <span className="text-amber-400">✦</span>
          <span>HIGH-ALTITUDE GLOF SATELLITE WATCH // CHUNGTHANG & SOUTH LHONAK</span>
          <span className="text-amber-400">✦</span>
          <span className="text-rose-400 font-bold">EMERGENCY HELPLINE: 112 // 24/7 SDRF DISPATCH</span>
          <span className="text-amber-400">✦</span>
          <span>CWC & IMD RADAR SYNCHRONIZED</span>
          <span className="text-amber-400">✦</span>
          <span>COMMUNITY INCIDENT DESK OPERATIONAL</span>
          <span className="text-amber-400">✦</span>
          <span>⚡ HIMALAYAN BASIN HYDROLOGICAL OBSERVATORY</span>
          <span className="text-amber-400">✦</span>
          <span>REAL-TIME GAUGES ACTIVE // 2026 CYCLE</span>
          <span className="text-amber-400">✦</span>
          <span>HIGH-ALTITUDE GLOF SATELLITE WATCH // CHUNGTHANG & SOUTH LHONAK</span>
          <span className="text-amber-400">✦</span>
          <span className="text-rose-400 font-bold">EMERGENCY HELPLINE: 112 // 24/7 SDRF DISPATCH</span>
          <span className="text-amber-400">✦</span>
          <span>CWC & IMD RADAR SYNCHRONIZED</span>
        </div>
      </div>

      {/* MAIN NAV ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14 sm:h-16">
          
          {/* LEFT: Category Navigation (Dripprack Style with carets) */}
          <nav className="hidden lg:flex items-center gap-5 text-[11px] font-bold tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
            
            {/* Monitoring Dropdown */}
            <div className="relative" onMouseLeave={closeDropdowns}>
              <button
                onClick={() => handleDropdown("monitoring")}
                className="flex items-center gap-1 hover:opacity-60 transition-opacity py-2"
              >
                <span>MONITORING</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {activeDropdown === "monitoring" && (
                <div className="absolute top-full left-0 w-56 bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 p-3 shadow-xl rounded-none animate-in fade-in slide-in-from-top-1 text-xs space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="font-bold text-black dark:text-white">Live Dashboard</div>
                    <div className="text-[10px] text-neutral-500">Hydro-telemetry & radar</div>
                  </Link>
                  <Link
                    to="/historical"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="font-bold text-black dark:text-white">Historical Deluges</div>
                    <div className="text-[10px] text-neutral-500">2013-2026 flood records</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Basins Dropdown */}
            <div className="relative" onMouseLeave={closeDropdowns}>
              <button
                onClick={() => handleDropdown("basins")}
                className="flex items-center gap-1 hover:opacity-60 transition-opacity py-2"
              >
                <span>BASINS</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {activeDropdown === "basins" && (
                <div className="absolute top-full left-0 w-64 bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 p-3 shadow-xl rounded-none animate-in fade-in slide-in-from-top-1 text-xs space-y-1.5">
                  <Link
                    to="/dashboard"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold"
                  >
                    Upper Ganga & Alaknanda (UK)
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold"
                  >
                    Beas & Sutlej Basin (HP)
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold"
                  >
                    Brahmaputra Valley (Assam)
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeDropdowns}
                    className="block p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold"
                  >
                    Teesta & Glacial Lakes (Sikkim)
                  </Link>
                </div>
              )}
            </div>

            {/* Direct GIS Map Link */}
            <Link
              to="/map"
              className="hover:opacity-60 transition-opacity py-2"
            >
              GIS MAP
            </Link>

            {/* Safety & Preparedness */}
            <Link
              to="/resources"
              className="hover:opacity-60 transition-opacity py-2"
            >
              SAFETY
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className="hover:opacity-60 transition-opacity py-2"
            >
              ABOUT
            </Link>
          </nav>

          {/* CENTER: Exact Center Brand Mark (Matching dripprack's centered logo style) */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <Link
              to="/"
              className="flex items-center gap-1 group py-1"
            >
              <span className="font-black text-2xl sm:text-3xl tracking-tighter text-black dark:text-white uppercase">
                FLOODWATCH<sup className="text-xs font-mono font-bold tracking-normal ml-0.5 text-rose-600">®</sup>
              </span>
            </Link>
          </div>

          {/* RIGHT: Utility Controls (Report, Search, Account, SOS) */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-bold tracking-wider uppercase text-neutral-800 dark:text-neutral-200">
            
            {/* Quick Search trigger */}
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-1.5 hover:opacity-60 transition-opacity"
            >
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <span>SEARCH</span>
            </Link>

            {/* Highlighted Report Incident Button */}
            <Link
              to="/report"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:border-rose-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>REPORT</span>
            </Link>

            {/* Telemetry Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 font-mono text-[10px] text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 border border-neutral-200 dark:border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-700" />}
            </button>

            {/* Account / Observer Profile */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="hover:opacity-60 transition-opacity flex items-center gap-1"
              >
                <span>ACCOUNT</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hover:opacity-60 transition-opacity"
              >
                ACCOUNT
              </Link>
            )}

            {/* SOS Emergency Helpline */}
            <Link
              to="/resources#contacts"
              className="flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black px-2.5 sm:px-3 py-1.5 font-extrabold tracking-wider hover:opacity-85 transition-opacity"
            >
              <PhoneCall className="w-3 h-3 text-rose-500" />
              <span className="hidden sm:inline">SOS: 112</span>
              <span className="sm:hidden">112</span>
            </Link>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 lg:hidden text-black dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] px-5 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center"
            >
              <span>MONITORING OVERVIEW</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
            <Link
              to="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center"
            >
              <span>FULL-SCREEN GIS MAP</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 text-rose-600 flex justify-between items-center"
            >
              <span>REPORT AN INCIDENT</span>
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            </Link>
            <Link
              to="/historical"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center"
            >
              <span>HISTORICAL ARCHIVES</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center"
            >
              <span>SAFETY &amp; SURVIVAL KIT</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center"
            >
              <span>ABOUT CAPSTONE</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-center text-xs font-bold uppercase tracking-wider"
            >
              {isAuthenticated ? "My Observer Account" : "Sign In to Console"}
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}

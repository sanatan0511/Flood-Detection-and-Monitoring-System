import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  RIVER_MONITORING_STATIONS, 
  HIMALAYAN_REGIONS, 
  RAINFALL_STATIONS 
} from "../data/mockData";
import { useIncidents } from "../context/IncidentContext";
import { useAuth } from "../context/AuthContext";
import { 
  Map, 
  AlertTriangle, 
  Radio, 
  Search, 
  Bell, 
  CloudRain, 
  Waves, 
  Compass, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import StatCard from "../components/common/StatCard";
import StatusBadge from "../components/common/StatusBadge";
import TelemetryLineChart from "../components/charts/TelemetryLineChart";
import RainfallBarChart from "../components/charts/RainfallBarChart";
import RegionalPieChart from "../components/charts/RegionalPieChart";

export default function Dashboard() {
  const { incidents } = useIncidents();
  const { user } = useAuth();

  // Selected Region filter
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // Filtered incidents based on search and region
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        searchQuery === "" ||
        inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" ||
        inc.status.toLowerCase() === statusFilter.toLowerCase();

      const matchRegion =
        selectedRegion === "all" ||
        (selectedRegion === "uttarakhand" && inc.state === "Uttarakhand") ||
        (selectedRegion === "himachal" && inc.state === "Himachal Pradesh") ||
        (selectedRegion === "assam" && inc.state === "Assam") ||
        (selectedRegion === "sikkim" && inc.state === "Sikkim") ||
        (selectedRegion === "jk-ladakh" && (inc.state.includes("Kashmir") || inc.state.includes("Ladakh")));

      return matchSearch && matchStatus && matchRegion;
    });
  }, [incidents, searchQuery, statusFilter, selectedRegion]);

  // Filtered stations based on selected region
  const filteredStations = useMemo(() => {
    if (selectedRegion === "all") return RIVER_MONITORING_STATIONS;
    if (selectedRegion === "uttarakhand")
      return RIVER_MONITORING_STATIONS.filter((s) => s.state === "Uttarakhand");
    if (selectedRegion === "himachal")
      return RIVER_MONITORING_STATIONS.filter((s) => s.state === "Himachal Pradesh");
    if (selectedRegion === "assam")
      return RIVER_MONITORING_STATIONS.filter((s) => s.state === "Assam");
    if (selectedRegion === "sikkim")
      return RIVER_MONITORING_STATIONS.filter((s) => s.state === "Sikkim");
    if (selectedRegion === "jk-ladakh")
      return RIVER_MONITORING_STATIONS.filter((s) => s.state.includes("Kashmir"));
    return RIVER_MONITORING_STATIONS;
  }, [selectedRegion]);

  const notifications = [
    { id: 1, text: "Devprayag Confluence: Water elevation +0.35m in past 3h (Rising)", time: "12m ago" },
    { id: 2, text: "New Community Report: Road embankment erosion near Pandoh (HP)", time: "45m ago" },
    { id: 3, text: "Radar Alert: High rainfall surge (92.4mm) recorded at Dharamsala", time: "2h ago" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors">
      
      {/* TOP DASHBOARD CONTROL BAR */}
      <section className="bg-neutral-50 dark:bg-[#111111] border-b border-black/10 dark:border-neutral-800 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                CENTRAL HYDROMETRIC OBSERVATORY
              </span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black uppercase">
                LIVE TELEMETRY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white mt-0.5">
              FLOOD MONITORING OVERVIEW
            </h1>
          </div>

          {/* Region Selector & Notification Menu */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Region Selector */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-black px-3 py-2 border border-black/15 dark:border-neutral-700">
              <Compass className="w-3.5 h-3.5 text-black dark:text-white" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold uppercase text-black dark:text-white outline-none cursor-pointer pr-1"
                aria-label="Filter by Himalayan Region"
              >
                {HIMALAYAN_REGIONS.map((reg) => (
                  <option key={reg.id} value={reg.id} className="text-black dark:bg-[#111111]">
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Action: Report Incident */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>REPORT INCIDENT</span>
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="relative p-2.5 bg-white dark:bg-black border border-black/15 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-3.5 h-3.5 text-black dark:text-white" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500" />
              </button>

              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111111] border border-black/20 dark:border-neutral-700 p-4 z-40 shadow-2xl animate-in fade-in slide-in-from-top-1 text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 font-mono font-bold uppercase text-[10px] text-neutral-400">
                    <span>TELEMETRY PINGS</span>
                    <span>3 UNREAD</span>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                      <p className="text-black dark:text-white leading-snug font-medium">{n.text}</p>
                      <span className="text-[10px] font-mono text-neutral-400 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* STATS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="REPORTED INCIDENTS"
            value={incidents.length}
            subtitle="Verified & under-review submissions"
            change="+3 NEW TODAY"
            trend="up"
            icon={AlertTriangle}
            badgeText="FIELD DESK"
          />

          <StatCard
            title="REGIONS MONITORED"
            value="5 BASINS"
            subtitle="Ganga, Beas, Brahmaputra, Teesta, Jhelum"
            change="100% COVERAGE"
            trend="neutral"
            icon={Map}
            badgeText="GIS ACTIVE"
          />

          <StatCard
            title="COMMUNITY REPORTS"
            value="18 ACTIVE"
            subtitle="Field volunteers & local observers"
            change="+12% THIS WEEK"
            trend="up"
            icon={Radio}
            badgeText="VERIFIED"
          />

          <StatCard
            title="HYDRO-STATIONS"
            value={`${RIVER_MONITORING_STATIONS.length} GAUGES`}
            subtitle="Continuous water gauge telemetry"
            change="2 NEAR WARNING"
            trend="down"
            icon={Waves}
            badgeText="CWC SYNC"
          />
        </section>

        {/* WEATHER & SENSOR ENVIRONMENT SUMMARY */}
        <section className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-black/10 dark:border-neutral-800">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
                PRECIPITATION OBSERVATIONS
              </span>
              <h2 className="font-black text-lg uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-black dark:text-white" />
                CATCHMENT RAINFALL &amp; RADAR ANOMALIES
              </h2>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              REFRESH INTERVAL: 15 MINS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {RAINFALL_STATIONS.map((rf) => (
              <div
                key={rf.id}
                className="p-4 bg-neutral-50 dark:bg-neutral-900/60 border border-black/10 dark:border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-neutral-400">{rf.id}</span>
                    <StatusBadge status={rf.status} size="sm" />
                  </div>
                  <h4 className="font-bold text-xs uppercase text-black dark:text-white truncate">
                    {rf.station}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">{rf.state}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between font-mono">
                  <span className="text-xl font-black text-black dark:text-white">
                    {rf.past24h} mm
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                    {rf.anomaly}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHARTS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TelemetryLineChart />
          </div>
          <div className="lg:col-span-5">
            <RainfallBarChart />
          </div>
        </section>

        {/* REGIONAL MONITORING HYDRO-STATIONS TABLE & PIE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
                  HYDROLOGICAL NETWORK
                </span>
                <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
                  HIMALAYAN HYDRO-STATION TELEMETRY GRID
                </h3>
              </div>

              <Link
                to="/map"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white hover:opacity-60 transition-opacity"
              >
                <span>OPEN GIS MAP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-black/10 dark:border-neutral-800 text-[10px] uppercase tracking-widest text-neutral-400 font-bold bg-neutral-50 dark:bg-neutral-900">
                    <th className="py-3 px-3">STATION</th>
                    <th className="py-3 px-3">RIVER / BASIN</th>
                    <th className="py-3 px-3">LEVEL</th>
                    <th className="py-3 px-3">WARN / DANGER</th>
                    <th className="py-3 px-3">TREND</th>
                    <th className="py-3 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-neutral-800">
                  {filteredStations.map((station) => (
                    <tr key={station.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-black dark:text-white">
                        <div>{station.name}</div>
                        <span className="text-[10px] text-neutral-400 font-normal">{station.state}</span>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-600 dark:text-neutral-300">
                        {station.river}
                      </td>
                      <td className="py-3.5 px-3 font-black text-sm text-black dark:text-white">
                        {station.currentLevel} m
                      </td>
                      <td className="py-3.5 px-3 text-neutral-500 text-[11px]">
                        {station.warningLevel}m / {station.dangerLevel}m
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`font-bold ${station.trend === "Rising" ? "text-rose-600" : "text-emerald-600"}`}>
                          {station.trend}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <StatusBadge status={station.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4">
            <RegionalPieChart />
          </div>

        </section>

        {/* RECENT INCIDENTS TABLE */}
        <section className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5">
                CROWD-SOURCED &amp; OBSERVER DESK
              </span>
              <h3 className="font-black text-lg uppercase tracking-tight text-black dark:text-white">
                RECENT FIELD INCIDENT REPORTS ({filteredIncidents.length})
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="SEARCH INCIDENT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-black/15 dark:border-neutral-700 bg-neutral-50 dark:bg-black text-xs font-mono uppercase text-black dark:text-white outline-none w-48 sm:w-56"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1.5 px-3 border border-black/15 dark:border-neutral-700 bg-neutral-50 dark:bg-black text-xs font-mono font-bold uppercase text-black dark:text-white outline-none cursor-pointer"
                aria-label="Filter by verification status"
              >
                <option value="all">ALL STATUSES</option>
                <option value="verified">VERIFIED</option>
                <option value="under review">UNDER REVIEW</option>
                <option value="submitted">SUBMITTED</option>
                <option value="resolved">RESOLVED</option>
              </select>

              <Link
                to="/report"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase hover:opacity-85 transition-opacity"
              >
                <span>+ NEW REPORT</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-black/10 dark:border-neutral-800 text-[10px] uppercase tracking-widest text-neutral-400 font-bold bg-neutral-50 dark:bg-neutral-900">
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">TITLE &amp; DESCRIPTION</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3">LOCATION</th>
                  <th className="py-3 px-3">REPORTED</th>
                  <th className="py-3 px-3">VERIFICATION</th>
                  <th className="py-3 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-neutral-800">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-neutral-400 text-xs font-mono">
                      NO MATCHING INCIDENT DOSSIERS LOCATED.
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-black dark:text-white">
                        {incident.id}
                      </td>
                      <td className="py-3.5 px-3 max-w-xs font-sans">
                        <div className="font-bold text-black dark:text-white truncate">
                          {incident.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 truncate">
                          {incident.description}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-600 dark:text-neutral-300">
                        {incident.category}
                      </td>
                      <td className="py-3.5 px-3 font-sans">
                        <div className="text-black dark:text-white font-medium">{incident.location}</div>
                        <div className="text-[10px] text-neutral-400">{incident.state}</div>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-500 whitespace-nowrap">
                        {incident.timeAgo}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <StatusBadge status={incident.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <Link
                          to={`/incident/${incident.id}`}
                          className="font-bold text-black dark:text-white hover:underline uppercase inline-flex items-center gap-1"
                        >
                          <span>DOSSIER</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </section>

      </main>

    </div>
  );
}

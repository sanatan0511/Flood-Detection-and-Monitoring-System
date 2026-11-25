import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { 
  RIVER_MONITORING_STATIONS, 
  GLACIAL_LAKE_WATCH, 
  RAINFALL_STATIONS 
} from "../../data/mockData";
import { useIncidents } from "../../context/IncidentContext";
import { 
  Layers, 
  Compass, 
  Filter, 
  X,
  ExternalLink
} from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { Link } from "react-router-dom";

export default function LeafletMap({ 
  initialSelectedId = null,
  showFiltersSidebar = true,
  className = "h-[700px] w-full" 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const { incidents } = useIncidents();

  // Active Map Layer: 'standard' | 'terrain' | 'satellite'
  const [activeTileLayer, setActiveTileLayer] = useState("terrain");

  // Filters state
  const [filters, setFilters] = useState({
    stations: true,
    incidents: true,
    glacialLakes: true,
    rainfall: true,
  });

  // Selected item state for detail panel
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Tile layer definitions
  const tileLayers = {
    standard: {
      name: "Standard OSM",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}.png",
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 19,
    },
    terrain: {
      name: "Terrain / Topo",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: 'Map data: &copy; OpenStreetMap, SRTM | Map style: &copy; OpenTopoMap',
      maxZoom: 17,
    },
    satellite: {
      name: "Satellite Imagery",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      maxZoom: 18,
    },
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on central Himalayan arc (covering Uttarakhand, Himachal, Sikkim, Assam)
    const map = L.map(mapContainerRef.current, {
      center: [29.8, 83.5],
      zoom: 6,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add Zoom Control to bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Initial tile layer
    const currentTile = tileLayers[activeTileLayer];
    const baseLayer = L.tileLayer(currentTile.url, {
      attribution: currentTile.attribution,
      maxZoom: currentTile.maxZoom,
    }).addTo(map);

    map.baseLayer = baseLayer;

    // Group for markers
    const markerGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markerGroup;

    return () => {
      map.remove();
    };
  }, []);

  // Update Tile Layer when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !map.baseLayer) return;

    map.removeLayer(map.baseLayer);
    const newTile = tileLayers[activeTileLayer];
    map.baseLayer = L.tileLayer(newTile.url, {
      attribution: newTile.attribution,
      maxZoom: newTile.maxZoom,
    }).addTo(map);
  }, [activeTileLayer]);

  // Custom marker creators using inline SVG icons
  const createMarkerIcon = (type, status = "normal") => {
    const colorMap = {
      danger: "#EF4444",
      warning: "#F59E0B",
      alert: "#F59E0B",
      normal: "#10B981",
      submitted: "#1677C8",
      verified: "#19A7A1",
    };
    const bg = colorMap[status.toLowerCase()] || "#1677C8";

    let iconSvg = "";
    if (type === "station") {
      iconSvg = `<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="white"/>`;
    } else if (type === "lake") {
      iconSvg = `<path d="m8 3 4 8 5-5 5 15H2L8 3z" fill="white"/>`;
    } else if (type === "rain") {
      iconSvg = `<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M8 19v2m4-2v2m4-2v2" stroke="white" stroke-width="2" stroke-linecap="round"/>`;
    } else {
      // incident
      iconSvg = `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill="white"/><line x1="12" y1="9" x2="12" y2="13" stroke="#102A43" stroke-width="2"/><circle cx="12" cy="17" r="1" fill="#102A43"/>`;
    }

    const html = `
      <div style="
        background-color: ${bg};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
      " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${iconSvg}
        </svg>
      </div>
    `;

    return L.divIcon({
      html,
      className: "custom-leaflet-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });
  };

  // Update Markers based on Filters
  useEffect(() => {
    if (!markersLayerRef.current) return;
    const group = markersLayerRef.current;
    group.clearLayers();

    // 1. River Stations
    if (filters.stations) {
      RIVER_MONITORING_STATIONS.forEach((station) => {
        const marker = L.marker(station.coordinates, {
          icon: createMarkerIcon("station", station.status),
        });

        marker.on("click", () => {
          setSelectedItem({ type: "station", data: station });
        });

        marker.bindTooltip(
          `<strong>${station.name}</strong><br/>River: ${station.river} (${station.status})`,
          { direction: "top", offset: [0, -16] }
        );

        group.addLayer(marker);
      });
    }

    // 2. Incident Reports
    if (filters.incidents) {
      incidents.forEach((inc) => {
        if (!inc.coordinates || inc.coordinates.length < 2) return;
        const marker = L.marker(inc.coordinates, {
          icon: createMarkerIcon("incident", inc.severity === "High" ? "danger" : "alert"),
        });

        marker.on("click", () => {
          setSelectedItem({ type: "incident", data: inc });
        });

        marker.bindTooltip(
          `<strong>[Report] ${inc.title}</strong><br/>Category: ${inc.category}`,
          { direction: "top", offset: [0, -16] }
        );

        group.addLayer(marker);
      });
    }

    // 3. Glacial Lake Watch
    if (filters.glacialLakes) {
      GLACIAL_LAKE_WATCH.forEach((lake) => {
        const marker = L.marker(lake.coordinates, {
          icon: createMarkerIcon("lake", "warning"),
        });

        marker.on("click", () => {
          setSelectedItem({ type: "lake", data: lake });
        });

        marker.bindTooltip(
          `<strong>GLOF Watch: ${lake.name}</strong><br/>Area: ${lake.surfaceArea}`,
          { direction: "top", offset: [0, -16] }
        );

        group.addLayer(marker);
      });
    }

    // 4. Rainfall Telemetry
    if (filters.rainfall) {
      RAINFALL_STATIONS.forEach((rf) => {
        const marker = L.marker(rf.coordinates, {
          icon: createMarkerIcon("rain", rf.status),
        });

        marker.on("click", () => {
          setSelectedItem({ type: "rainfall", data: rf });
        });

        marker.bindTooltip(
          `<strong>Rainfall: ${rf.station}</strong><br/>24h: ${rf.past24h} mm (${rf.anomaly})`,
          { direction: "top", offset: [0, -16] }
        );

        group.addLayer(marker);
      });
    }
  }, [filters, incidents]);

  // Center on Himalayas action
  const resetMapCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([29.8, 83.5], 6, { duration: 1.2 });
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm ${className}`}>
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Layer Selector Pill */}
        <div className="flex items-center gap-1 bg-white/95 dark:bg-[#102A43]/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
          <Layers className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
          {Object.entries(tileLayers).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveTileLayer(key)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTileLayer === key
                  ? "bg-[#1677C8] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Recenter Button */}
        <button
          onClick={resetMapCenter}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/95 dark:bg-[#102A43]/95 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-50 transition-colors"
          title="Reset View to Himalayas"
        >
          <Compass className="w-4 h-4 text-[#19A7A1]" />
          <span className="hidden sm:inline">Himalayan Arc</span>
        </button>

        {/* Filter Toggle Mobile/Desktop */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/95 dark:bg-[#102A43]/95 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-4 h-4 text-[#1677C8]" />
          <span>Filters</span>
        </button>
      </div>

      {/* Floating Left Filter Drawer */}
      {sidebarOpen && (
        <div className="absolute top-18 left-4 z-20 w-64 bg-white/95 dark:bg-[#102A43]/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl transition-all">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              GIS Map Overlays
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Stations Filter */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px]">
                  💧
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">River Hydro-Stations</span>
              </div>
              <input
                type="checkbox"
                checked={filters.stations}
                onChange={(e) => setFilters({ ...filters, stations: e.target.checked })}
                className="w-4 h-4 accent-[#1677C8] rounded"
              />
            </label>

            {/* Incidents Filter */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[9px]">
                  ⚠️
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">Incident Reports</span>
              </div>
              <input
                type="checkbox"
                checked={filters.incidents}
                onChange={(e) => setFilters({ ...filters, incidents: e.target.checked })}
                className="w-4 h-4 accent-[#1677C8] rounded"
              />
            </label>

            {/* Glacial Lakes Filter */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px]">
                  🏔️
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">Glacial Lake (GLOF)</span>
              </div>
              <input
                type="checkbox"
                checked={filters.glacialLakes}
                onChange={(e) => setFilters({ ...filters, glacialLakes: e.target.checked })}
                className="w-4 h-4 accent-[#1677C8] rounded"
              />
            </label>

            {/* Rainfall Filter */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#19A7A1] flex items-center justify-center text-white text-[9px]">
                  🌧️
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">Rainfall Radar Telemetry</span>
              </div>
              <input
                type="checkbox"
                checked={filters.rainfall}
                onChange={(e) => setFilters({ ...filters, rainfall: e.target.checked })}
                className="w-4 h-4 accent-[#1677C8] rounded"
              />
            </label>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
            Click any marker to inspect telemetry & water elevations.
          </div>
        </div>
      )}

      {/* Floating Right Selected Location Details Drawer */}
      {selectedItem && (
        <div className="absolute top-4 right-4 bottom-4 z-20 w-80 sm:w-96 bg-white/98 dark:bg-[#102A43]/98 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-y-auto transition-all animate-in fade-in slide-in-from-right-2">
          <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {selectedItem.type === "station"
                  ? "Hydrological Station"
                  : selectedItem.type === "lake"
                  ? "Glacial Lake (GLOF Watch)"
                  : selectedItem.type === "rain"
                  ? "Precipitation Telemetry"
                  : "Community Incident"}
              </span>
              <h3 className="font-bold text-base text-[#102A43] dark:text-white leading-tight mt-0.5">
                {selectedItem.data.name || selectedItem.data.title || selectedItem.data.station}
              </h3>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Station Details */}
          {selectedItem.type === "station" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Operating Status:</span>
                <StatusBadge status={selectedItem.data.status} />
              </div>

              {/* Water Level Gauge Bar */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-slate-500 text-[11px] font-semibold">Current Water Level</span>
                  <span className="text-lg font-extrabold text-[#1677C8] dark:text-[#19A7A1]">
                    {selectedItem.data.currentLevel} m
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full ${
                      selectedItem.data.currentLevel >= selectedItem.data.dangerLevel
                        ? "bg-rose-500"
                        : selectedItem.data.currentLevel >= selectedItem.data.warningLevel
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (selectedItem.data.currentLevel / selectedItem.data.dangerLevel) * 95
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Warn: {selectedItem.data.warningLevel}m</span>
                  <span>Danger: {selectedItem.data.dangerLevel}m</span>
                  <span>HFL: {selectedItem.data.hfl}m</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">River / Basin:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {selectedItem.data.river} ({selectedItem.data.basin})
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Est. Discharge:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {selectedItem.data.flowRate}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Water Trend:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {selectedItem.data.trend}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Last Update:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {selectedItem.data.lastUpdated}
                  </span>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#102A43] dark:bg-[#1677C8] text-white font-semibold text-xs shadow-sm hover:opacity-95 transition-opacity"
              >
                <span>View Full Telemetry Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Incident Details */}
          {selectedItem.type === "incident" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <StatusBadge status={selectedItem.data.status} />
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                {selectedItem.data.description}
              </p>

              {selectedItem.data.images && selectedItem.data.images.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Field Evidence Photos:
                  </span>
                  <img
                    src={selectedItem.data.images[0]}
                    alt="Field evidence"
                    className="w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              )}

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reported:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.timeAgo}</span>
                </div>
              </div>

              <Link
                to={`/incident/${selectedItem.data.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1677C8] text-white font-semibold text-xs shadow-sm hover:bg-[#102A43] transition-colors"
              >
                <span>Inspect Full Incident Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Glacial Lake Details */}
          {selectedItem.type === "lake" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Risk Assessment:</span>
                <StatusBadge status={selectedItem.data.riskCategory} />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 p-3 rounded-xl text-amber-800 dark:text-amber-200">
                <span className="font-semibold block text-[11px] mb-0.5">Moraine Condition:</span>
                <p className="text-[11px] leading-relaxed">{selectedItem.data.moraineStability}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Surface Area:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.surfaceArea}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Elevation:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.elevation}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Estimated Volume:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.waterVolumeEst}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Monitoring Method:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedItem.data.monitoringType}</span>
                </div>
              </div>
            </div>
          )}

          {/* Rainfall Details */}
          {selectedItem.type === "rainfall" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Precipitation Category:</span>
                <StatusBadge status={selectedItem.data.status} />
              </div>

              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-sky-800 dark:text-sky-300 font-semibold block">
                    Past 24-Hour Accumulation
                  </span>
                  <span className="text-2xl font-black text-[#1677C8]">
                    {selectedItem.data.past24h} mm
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Departure from Normal</span>
                  <span className="text-xs font-bold text-rose-600 font-mono">
                    {selectedItem.data.anomaly}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

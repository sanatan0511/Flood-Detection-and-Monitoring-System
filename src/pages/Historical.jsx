import { useState, useMemo } from "react";
import { HISTORICAL_FLOOD_RECORDS } from "../data/mockData";
import { useToast } from "../context/ToastContext";
import { Download, Search, ArrowRight } from "lucide-react";

export default function Historical() {
  const { addToast } = useToast();

  const [selectedBasin, setSelectedBasin] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const basins = [
    { id: "all", name: "ALL RIVER BASINS" },
    { id: "teesta", name: "TEESTA BASIN (SIKKIM)" },
    { id: "beas", name: "BEAS & SUTLEJ (HIMACHAL)" },
    { id: "alaknanda", name: "ALAKNANDA & RISHIGANGA (UTTARAKHAND)" },
    { id: "brahmaputra", name: "BRAHMAPUTRA BASIN (ASSAM)" },
    { id: "mandakini", name: "MANDAKINI & BHAGIRATHI (UTTARAKHAND)" },
  ];

  const years = ["all", "2023", "2021", "2020", "2013"];

  const filteredRecords = useMemo(() => {
    return HISTORICAL_FLOOD_RECORDS.filter((rec) => {
      const matchSearch =
        searchQuery === "" ||
        rec.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.statesAffected.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchYear =
        selectedYear === "all" || rec.year.toString() === selectedYear;

      const matchBasin =
        selectedBasin === "all" ||
        rec.riverBasin.toLowerCase().includes(selectedBasin.toLowerCase());

      return matchSearch && matchYear && matchBasin;
    });
  }, [searchQuery, selectedYear, selectedBasin]);

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Year",
      "Event Name",
      "River Basin",
      "States Affected",
      "Peak Date",
      "Peak Gauge / Velocity",
      "Recorded Rainfall",
      "Damage Severity",
      "Official Reference",
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.id}"`,
      r.year,
      `"${r.event.replace(/"/g, '""')}"`,
      `"${r.riverBasin}"`,
      `"${r.statesAffected}"`,
      `"${r.peakDate}"`,
      `"${r.peakGauge}"`,
      `"${r.recordedRainfall}"`,
      `"${r.damageSeverity}"`,
      `"${r.officialReportRef}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FloodWatch_Historical_Archives_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: "Archive Exported",
      message: `Downloaded CSV with ${filteredRecords.length} historical records.`,
      type: "success",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
              HISTORICAL DATA RETRIEVAL // ARCHIVES
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
              HISTORICAL DELUGE ARCHIVES
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-1 max-w-2xl leading-relaxed">
              Catastrophic Himalayan flash floods, glacial moraine failures (GLOFs), and cloudburst discharge benchmarks (2013–2026).
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-3 bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-85 transition-opacity self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT ARCHIVE (CSV)</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-4 border border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="SEARCH ARCHIVES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black uppercase text-xs outline-none w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedBasin}
              onChange={(e) => setSelectedBasin(e.target.value)}
              className="py-2 px-3 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black font-bold uppercase text-xs outline-none cursor-pointer"
            >
              {basins.map((b) => (
                <option key={b.id} value={b.id} className="dark:bg-[#111111]">{b.name}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="py-2 px-3 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black font-bold uppercase text-xs outline-none cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y} className="dark:bg-[#111111]">
                  {y === "all" ? "ALL YEARS" : `YEAR ${y}`}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[11px] font-bold text-neutral-400 uppercase">
            {filteredRecords.length} EVENTS COMPILED
          </span>
        </div>

        {/* Records */}
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white dark:bg-[#111111] p-6 sm:p-8 border border-black/10 dark:border-neutral-800 hover:border-black dark:hover:border-neutral-500 transition-colors space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-lg font-black bg-black text-white dark:bg-white dark:text-black px-2.5 py-0.5">
                    {record.year}
                  </span>
                  <span className="text-xs font-bold uppercase text-neutral-500">
                    {record.riverBasin}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-rose-600 text-white">
                  {record.damageSeverity}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                  {record.event}
                </h3>
                <p className="text-[11px] font-mono text-neutral-400 mt-1 uppercase">
                  AFFECTED: {record.statesAffected} // PEAK DATE: {record.peakDate}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed bg-neutral-50 dark:bg-neutral-900/50 p-4 border border-black/5 dark:border-neutral-800">
                {record.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">PEAK WATER GAUGE / FLOW</span>
                  <span className="font-bold text-black dark:text-white mt-1 block">{record.peakGauge}</span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">PRECIPITATION DYNAMICS</span>
                  <span className="font-bold text-black dark:text-white mt-1 block">{record.recordedRainfall}</span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">OFFICIAL CITATION REF</span>
                  <span className="font-bold text-black dark:text-white mt-1 block truncate">{record.officialReportRef}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useIncidents } from "../context/IncidentContext";
import { useToast } from "../context/ToastContext";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Share2, 
  Download, 
  Maximize2, 
  X
} from "lucide-react";
import StatusBadge from "../components/common/StatusBadge";

export default function IncidentDetails() {
  const { id } = useParams();
  const { getIncidentById } = useIncidents();
  const { addToast } = useToast();

  const [expandedImage, setExpandedImage] = useState(null);

  const incident = getIncidentById(id);

  if (!incident) {
    return (
      <div className="min-h-screen bg-white dark:bg-black py-20 px-4 text-center font-mono">
        <div className="max-w-md mx-auto p-8 border border-neutral-300 dark:border-neutral-800 space-y-4">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-black uppercase text-black dark:text-white">
            INCIDENT DOSSIER NOT FOUND
          </h2>
          <p className="text-xs text-neutral-500">
            No incident matching ID <code className="font-bold">{id}</code> was located in database.
          </p>
          <Link
            to="/dashboard"
            className="inline-block py-2.5 px-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase"
          >
            RETURN TO DASHBOARD
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: "Link Copied",
      message: `Incident report link copied to clipboard.`,
      type: "success",
    });
  };

  const handleDownloadDemo = () => {
    addToast({
      title: "PDF Dossier Generated",
      message: `Simulated export of ${incident.id} summary report.`,
      type: "info",
    });
  };

  const timelineSteps = [
    { title: "INCIDENT LOGGED", date: incident.reportedAt ? new Date(incident.reportedAt).toLocaleDateString() : "Nov 17, 2026", done: true },
    { title: "TELEMETRY CORRELATION", desc: "Correlated with nearby IMD rain gauges and CWC hydro-stations", done: true },
    { title: "FIELD VERIFICATION", desc: incident.verificationNotes || "Awaiting SDRF / local field team assessment", done: incident.status === "Verified" || incident.status === "Resolved" },
    { title: "MITIGATION & RESOLUTION", desc: incident.status === "Resolved" ? "Roadway cleared, rip-rap secured" : "In progress with local administration", done: incident.status === "Resolved" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8 font-mono">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO DASHBOARD</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black/15 dark:border-neutral-700 font-bold uppercase text-[11px] hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE</span>
            </button>
            <button
              onClick={handleDownloadDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-[11px] hover:opacity-85 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT DOSSIER (PDF)</span>
            </button>
          </div>
        </div>

        {/* Header Incident Card */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-base bg-black text-white dark:bg-white dark:text-black px-3 py-1">
                {incident.id}
              </span>
              <span className="text-xs font-bold text-neutral-500 uppercase">
                {incident.category}
              </span>
            </div>

            <StatusBadge status={incident.status} size="lg" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
            {incident.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] text-neutral-500 pt-3 border-t border-black/10 dark:border-neutral-800">
            <div>
              LOCATION: <span className="text-black dark:text-white font-bold">{incident.location} ({incident.state})</span>
            </div>
            <div>
              REPORTED: <span className="text-black dark:text-white font-bold">{incident.timeAgo}</span>
            </div>
            <div>
              OBSERVER: <span className="text-black dark:text-white font-bold">{incident.reporterName || "Local Community Observer"}</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 space-y-3 font-sans">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
                EYEWITNESS OBSERVATION &amp; SITUATION REPORT
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {incident.description}
              </p>

              {incident.verificationNotes && (
                <div className="mt-4 p-4 bg-neutral-100 dark:bg-black border border-black/10 dark:border-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                  <span className="font-bold block uppercase mb-1">
                    FIELD VERIFICATION REMARKS:
                  </span>
                  <p className="font-sans leading-relaxed text-xs">{incident.verificationNotes}</p>
                </div>
              )}
            </div>

            {incident.images && incident.images.length > 0 && (
              <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
                  ATTACHED PHOTOGRAPHIC EVIDENCE ({incident.images.length})
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {incident.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setExpandedImage(imgUrl)}
                      className="relative h-44 border border-black/10 dark:border-neutral-800 overflow-hidden cursor-pointer group"
                    >
                      <img src={imgUrl} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                VERIFICATION TIMELINE
              </span>

              <div className="space-y-4 text-xs font-mono">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="border-l-2 border-black dark:border-white pl-4 py-1 space-y-0.5">
                    <div className="font-bold text-black dark:text-white uppercase">
                      {step.title}
                    </div>
                    {step.date && <div className="text-[10px] text-neutral-400">{step.date}</div>}
                    {step.desc && <div className="text-[11px] font-sans text-neutral-500">{step.desc}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#111111] p-6 border border-black/10 dark:border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                GEOGRAPHICAL POSITION
              </span>

              <div className="p-3 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">COORDINATES:</span>
                  <span className="font-bold text-black dark:text-white">
                    {incident.coordinates ? `${incident.coordinates[0]}° N, ${incident.coordinates[1]}° E` : "30.1459° N, 78.5989° E"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">DISTRICT:</span>
                  <span className="font-bold text-black dark:text-white">{incident.district || "Upper Basin"}</span>
                </div>
              </div>

              <Link
                to="/map"
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase text-center block hover:opacity-85 transition-opacity"
              >
                LOCATE ON GIS MAP →
              </Link>
            </div>

          </div>

        </div>

      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-3 right-3 p-2 bg-white text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={expandedImage} alt="Expanded evidence" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

    </div>
  );
}

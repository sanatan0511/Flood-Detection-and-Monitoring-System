import { AlertTriangle, ExternalLink, X } from "lucide-react";
import { useState } from "react";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 px-4 py-2 text-xs transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="leading-snug">
            <strong className="font-semibold">Academic Capstone Research Platform:</strong> FloodWatch provides experimental hydrological observations & community reports for research and awareness. It is not an official emergency warning service. Always follow advisories from NDMA, CWC, and local District Disaster Authorities.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://ndma.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300 hover:underline"
          >
            Official NDMA Portal <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-500/20 rounded-md transition-colors"
            aria-label="Dismiss disclaimer banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

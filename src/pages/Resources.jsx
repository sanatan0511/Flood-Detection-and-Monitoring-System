import { useState } from "react";
import { 
  SAFETY_GUIDELINES, 
  EMERGENCY_CONTACTS 
} from "../data/mockData";
import { 
  CheckSquare, 
  Square, 
  PhoneCall, 
  ExternalLink, 
  Backpack, 
  ArrowRight
} from "lucide-react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("before");
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: "c1", category: "WATER & FOOD", text: "Store at least 3 liters of potable drinking water per person per day (3-day minimum supply)." },
    { id: "c2", category: "WATER & FOOD", text: "Ready-to-eat dry rations (roasted grams, energy bars, dry fruits) that require zero cooking or clean water." },
    { id: "c3", category: "MEDICAL", text: "Comprehensive first-aid kit, waterproof band-aids, antiseptic lotion, and ORS rehydration sachets." },
    { id: "c4", category: "MEDICAL", text: "At least 14 days of personal chronic prescription medications stored in a hermetically sealed bag." },
    { id: "c5", category: "LIGHTING & POWER", text: "High-lumen waterproof LED flashlight with two sets of spare alkaline batteries." },
    { id: "c6", category: "LIGHTING & POWER", text: "Fully charged high-capacity portable power bank (10,000–20,000 mAh) and charging cords." },
    { id: "c7", category: "SIGNALING", text: "High-decibel emergency whistle (can be heard over the roar of rushing river water, unlike human shouting)." },
    { id: "c8", category: "DOCUMENTS", text: "Laminated photocopies of Government identity cards (Aadhaar, Passport), insurance policies, and emergency cash." },
  ];

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
            CIVIL DEFENSE &amp; EVACUATION // 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
            FLOOD PREPAREDNESS, SAFETY &amp; SURVIVAL
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-1 max-w-2xl leading-relaxed">
            Essential actionable protocols for mountain river basins, high-altitude cloudburst exposure, and 72-hour survival essentials.
          </p>
        </div>

        {/* Section 1: Phased Action Guide */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                01 // PROTOCOL
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                PHASED EMERGENCY ACTION GUIDE
              </h2>
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-black p-1 border border-black/15 dark:border-neutral-700 font-mono text-xs font-bold uppercase">
              <button
                onClick={() => setActiveTab("before")}
                className={`px-3 py-1.5 transition-all ${
                  activeTab === "before"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                BEFORE
              </button>
              <button
                onClick={() => setActiveTab("during")}
                className={`px-3 py-1.5 transition-all ${
                  activeTab === "during"
                    ? "bg-rose-600 text-white"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                DURING
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-3 py-1.5 transition-all ${
                  activeTab === "after"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                AFTER
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAFETY_GUIDELINES[activeTab].map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-black border border-black/10 dark:border-neutral-800 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-xs uppercase text-black dark:text-white tracking-wide">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive 72-Hour Evacuation Go-Kit */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                02 // EQUIPMENT CHECKLIST
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                INTERACTIVE 72-HOUR SURVIVAL GO-KIT
              </h2>
            </div>

            <div className="font-mono text-xs text-right">
              <span className="font-bold uppercase block text-[11px]">
                {completedCount} / {checklist.length} PACKED ({progressPercent}%)
              </span>
              <div className="w-40 bg-neutral-200 dark:bg-neutral-800 h-1.5 mt-1">
                <div className="bg-black dark:bg-white h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {checklist.map((item) => {
              const isChecked = Boolean(checkedItems[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? "bg-neutral-200 dark:bg-neutral-900 border-black dark:border-white"
                      : "bg-white dark:bg-black border-black/10 dark:border-neutral-800 hover:border-black"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase block mb-0.5">
                      {item.category}
                    </span>
                    <p className={`text-xs font-sans leading-relaxed ${isChecked ? "line-through opacity-70" : ""}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Verified Official Helplines */}
        <div id="contacts" className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-6">
          <div className="border-b border-black/10 dark:border-neutral-800 pb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
              03 // EMERGENCY DIRECTORY
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
              VERIFIED OFFICIAL DISASTER HELPLINES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {EMERGENCY_CONTACTS.map((c, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-black border border-black/10 dark:border-neutral-800 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm uppercase text-black dark:text-white">
                    {c.agency}
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-black text-white dark:bg-white dark:text-black uppercase">
                    GOVT
                  </span>
                </div>
                <p className="text-neutral-500 font-sans text-xs">{c.role}</p>

                <div className="pt-3 flex items-center justify-between border-t border-black/10 dark:border-neutral-800">
                  <span className="font-black text-base text-rose-600 dark:text-rose-400">
                    {c.helpline}
                  </span>
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase hover:underline"
                  >
                    PORTAL <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

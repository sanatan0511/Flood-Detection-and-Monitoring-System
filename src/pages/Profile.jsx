import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useIncidents } from "../context/IncidentContext";
import { useToast } from "../context/ToastContext";
import { 
  User, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Plus,
  ArrowRight
} from "lucide-react";
import StatusBadge from "../components/common/StatusBadge";

export default function Profile() {
  const { user, logout } = useAuth();
  const { incidents } = useIncidents();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [notificationsOn, setNotificationsOn] = useState(true);

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-black py-20 px-4 text-center font-mono">
        <div className="max-w-md mx-auto p-8 border border-neutral-300 dark:border-neutral-800 space-y-4 bg-white dark:bg-[#111111]">
          <User className="w-10 h-10 text-neutral-400 mx-auto" />
          <h2 className="text-xl font-black uppercase text-black dark:text-white">
            OBSERVER AUTH REQUIRED
          </h2>
          <p className="text-xs text-neutral-500">
            Sign in to access your profile credentials and saved basins.
          </p>
          <Link
            to="/login"
            className="inline-block py-2.5 px-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase"
          >
            SIGN IN NOW →
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    addToast({
      title: "Signed Out",
      message: "You have signed out of your observer session.",
      type: "info",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8 font-mono transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 object-cover border-2 border-black dark:border-white shadow-md"
              />

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                    {user.name}
                  </h1>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black uppercase">
                    VERIFIED OBSERVER
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-sans mt-0.5">
                  {user.role}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-neutral-400 mt-2">
                  <span>{user.email}</span>
                  <span>//</span>
                  <span>{user.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-black/20 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold uppercase transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOG OUT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-black/10 dark:border-neutral-800 text-xs">
            <div className="p-3 bg-white dark:bg-black border border-black/10 dark:border-neutral-800">
              <span className="text-neutral-400 text-[10px] block font-bold uppercase">AFFILIATION</span>
              <span className="font-bold text-black dark:text-white">{user.organization}</span>
            </div>
            <div className="p-3 bg-white dark:bg-black border border-black/10 dark:border-neutral-800">
              <span className="text-neutral-400 text-[10px] block font-bold uppercase">REGISTERED</span>
              <span className="font-bold text-black dark:text-white">{user.joinedDate}</span>
            </div>
            <div className="p-3 bg-white dark:bg-black border border-black/10 dark:border-neutral-800">
              <span className="text-neutral-400 text-[10px] block font-bold uppercase">OBSERVER ID</span>
              <span className="font-bold text-black dark:text-white">{user.id}</span>
            </div>
          </div>
        </div>

        {/* Saved Catchment Basins */}
        <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 border border-black/10 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
              SAVED CATCHMENT BASINS
            </span>
            <Link
              to="/dashboard"
              className="text-xs font-bold uppercase underline hover:opacity-70"
            >
              MANAGE IN DASHBOARD →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {user.savedRegions?.map((basin) => (
              <span
                key={basin}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold uppercase"
              >
                {basin}
              </span>
            ))}
          </div>
        </div>

        {/* My Field Incident Submissions */}
        <div className="bg-white dark:bg-[#111111] p-6 sm:p-8 border border-black/10 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
              MY FIELD SUBMISSIONS
            </span>
            <Link
              to="/report"
              className="text-xs font-bold uppercase underline text-rose-600 hover:opacity-70"
            >
              + SUBMIT NEW REPORT
            </Link>
          </div>

          <div className="divide-y divide-black/5 dark:divide-neutral-800 text-xs">
            {incidents.slice(0, 3).map((inc) => (
              <div key={inc.id} className="py-3.5 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black dark:text-white">{inc.id}</span>
                    <span className="font-sans font-bold text-black dark:text-white">{inc.title}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">{inc.location} // {inc.timeAgo}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={inc.status} size="sm" />
                  <Link
                    to={`/incident/${inc.id}`}
                    className="font-bold uppercase text-[11px] underline"
                  >
                    DOSSIER →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

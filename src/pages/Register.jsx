import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { User, Mail, Lock, MapPin } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Community Observer & Volunteer",
    organization: "",
    location: "Uttarakhand",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    addToast({
      title: "Account Registered",
      message: `Welcome to the FloodWatch observer network, ${formData.name}!`,
      type: "success",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black flex items-center justify-center py-16 px-4 font-mono">
      <div className="max-w-md w-full bg-white dark:bg-[#111111] p-8 sm:p-12 border border-black/15 dark:border-neutral-800 space-y-6">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            OBSERVER REGISTRATION // 2026
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">
            JOIN NETWORK
          </h1>
          <p className="text-xs text-neutral-500 font-sans">
            Submit verified mountain flood observations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              FULL NAME *
            </label>
            <input
              type="text"
              required
              placeholder="E.G. PRIYANSHU NEGI"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black uppercase text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              required
              placeholder="NAME@DOMAIN.COM"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black uppercase text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              PRIMARY ROLE
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2.5 border border-black/15 dark:border-neutral-700 uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none cursor-pointer"
            >
              <option value="Community Observer & Volunteer">COMMUNITY OBSERVER &amp; VOLUNTEER</option>
              <option value="Research Hydrologist">RESEARCH HYDROLOGIST / STUDENT</option>
              <option value="Civil Defense Volunteer">CIVIL DEFENSE / SDRF VOLUNTEER</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              PRIMARY MONITORED REGION
            </label>
            <input
              type="text"
              placeholder="E.G. CHAMOLI, UTTARAKHAND OR KULLU, HP"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black uppercase text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              PASSWORD *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-85 transition-opacity mt-2"
          >
            CREATE OBSERVER ACCOUNT →
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-neutral-400 border-t border-black/10 dark:border-neutral-800">
          Already registered?{" "}
          <Link to="/login" className="font-bold text-black dark:text-white underline uppercase">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("ashish.bhardwaj@research.himalaya.edu");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      addToast({
        title: "Session Authenticated",
        message: "Signed in as Research Hydrologist & Field Observer.",
        type: "success",
      });
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black flex items-center justify-center py-16 px-4 font-mono">
      <div className="max-w-md w-full bg-white dark:bg-[#111111] p-8 sm:p-12 border border-black/15 dark:border-neutral-800 space-y-6">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            OBSERVER CONSOLE // 2026
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">
            FLOODWATCH®
          </h1>
          <p className="text-xs text-neutral-500 font-sans">
            Sign in to access field telemetry &amp; reporting credentials
          </p>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400">
          <strong>DEMO ACCESS:</strong> Pre-filled with authorized research credentials. Click proceed below.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[10px] text-neutral-500 mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold uppercase text-[10px] text-neutral-500">
                PASSWORD
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] font-bold uppercase text-neutral-400 hover:text-black dark:hover:text-white"
              >
                FORGOT?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 border border-black/15 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-85 transition-opacity flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN TO DASHBOARD →"}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-neutral-400 border-t border-black/10 dark:border-neutral-800">
          Need volunteer access?{" "}
          <Link to="/register" className="font-bold text-black dark:text-white underline uppercase">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

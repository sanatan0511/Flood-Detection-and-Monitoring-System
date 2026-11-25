import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { Waves, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    addToast({
      title: "Reset Link Dispatched",
      message: `Password reset instructions sent to ${email}`,
      type: "success",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB] dark:bg-[#0B1727] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-[#102A43] rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#1677C8] p-0.5 mx-auto shadow-md">
            <div className="w-full h-full bg-[#102A43] rounded-[14px] flex items-center justify-center">
              <Waves className="w-6 h-6 text-[#19A7A1]" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-[#102A43] dark:text-white tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your observer email to receive a recovery token
          </p>
        </div>

        {sent ? (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              Recovery Link Sent
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Please check your inbox at <strong className="font-mono">{email}</strong> for instructions.
            </p>
            <Link
              to="/login"
              className="inline-block pt-2 text-xs font-bold text-[#1677C8] dark:text-sky-300 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white outline-none focus:border-[#1677C8]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1677C8] hover:bg-[#102A43] text-white font-bold text-xs shadow-md transition-all"
            >
              Send Password Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
          <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-[#1677C8] dark:text-[#19A7A1] hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

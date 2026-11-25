import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { IncidentProvider } from "./context/IncidentContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import ReportIncident from "./pages/ReportIncident";
import IncidentDetails from "./pages/IncidentDetails";
import Historical from "./pages/Historical";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <IncidentProvider>
          <ToastProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col bg-[#F5F8FB] dark:bg-[#0B1727] text-slate-800 dark:text-slate-100 transition-colors selection:bg-[#1677C8]/20 selection:text-[#1677C8]">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/map" element={<MapView />} />
                    <Route path="/report" element={<ReportIncident />} />
                    <Route path="/incident/:id" element={<IncidentDetails />} />
                    <Route path="/historical" element={<Historical />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* Fallback to Landing */}
                    <Route path="*" element={<Landing />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </IncidentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

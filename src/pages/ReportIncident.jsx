import { useState } from "react";
import { Link } from "react-router-dom";
import { useIncidents } from "../context/IncidentContext";
import { useToast } from "../context/ToastContext";
import { 
  AlertTriangle, 
  Upload, 
  Video, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Loader2 
} from "lucide-react";

export default function ReportIncident() {
  const { addIncident } = useIncidents();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category: "Flooding",
    state: "Uttarakhand",
    district: "",
    location: "",
    coordinates: "",
    date: new Date().toISOString().split("T")[0],
    time: "14:30",
    description: "",
    severity: "Medium",
    reporterName: "",
    reporterContact: "",
    consent: true,
  });

  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submittedIncident, setSubmittedIncident] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLocating, setIsLocating] = useState(false);

  const categories = [
    "Flooding",
    "Heavy Rainfall",
    "River Overflow",
    "Landslide",
    "Glacial Lake / Glacier-related Observation",
    "Other",
  ];

  const states = [
    "Uttarakhand",
    "Himachal Pradesh",
    "Assam",
    "Sikkim",
    "Jammu & Kashmir",
    "Ladakh",
    "West Bengal (Hills)",
    "Other Himalayan Foothill",
  ];

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      addToast({
        title: "Geolocation Unsupported",
        message: "Your browser does not support automatic GPS positioning.",
        type: "warning",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        setFormData((prev) => ({
          ...prev,
          coordinates: `${lat}, ${lng}`,
        }));
        setIsLocating(false);
        addToast({
          title: "GPS Acquired",
          message: `Coordinates recorded: ${lat}, ${lng}`,
          type: "success",
        });
      },
      (_err) => {
        setIsLocating(false);
        setFormData((prev) => ({
          ...prev,
          coordinates: "30.1459, 78.5989",
        }));
        addToast({
          title: "Location Simulation",
          message: "Applied simulated Himalayan Devprayag coordinate.",
          type: "info",
        });
      },
      { timeout: 8000 }
    );
  };

  const handlePhotoSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const newPreviews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotoFiles((prev) => [...prev, ...newPreviews].slice(0, 5));
  };

  const removePhoto = (index) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoSelect = (files) => {
    const file = files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile({
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Incident title is required";
    if (!formData.location.trim()) errs.location = "Specific location or landmark is required";
    if (!formData.district.trim()) errs.district = "District name is required";
    if (!formData.description.trim() || formData.description.length < 20) {
      errs.description = "Please provide at least 20 characters describing the event";
    }
    if (!formData.reporterName.trim()) errs.reporterName = "Your name is required";
    if (!formData.reporterContact.trim()) errs.reporterContact = "Contact phone or email is required";
    if (!formData.consent) errs.consent = "You must agree to information veracity confirmation";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast({
        title: "Validation Error",
        message: "Please complete all highlighted mandatory fields.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      let parsedCoords = [30.1459, 78.5989];
      if (formData.coordinates) {
        const parts = formData.coordinates.split(",").map((p) => parseFloat(p.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          parsedCoords = parts;
        }
      }

      const created = addIncident({
        title: formData.title,
        category: formData.category,
        state: formData.state,
        district: formData.district,
        location: `${formData.location}, ${formData.district}`,
        coordinates: parsedCoords,
        description: formData.description,
        severity: formData.severity,
        reporterName: formData.reporterName,
        reporterContact: formData.reporterContact,
        images: photoFiles.length > 0
          ? photoFiles.map((p) => p.url)
          : [
              "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80",
            ],
        videoUrl: videoFile ? videoFile.name : null,
      });

      setIsSubmitting(false);
      setSubmittedIncident(created);

      addToast({
        title: "Report Lodged",
        message: `Assigned ID ${created.id}. Forwarded to regional observers.`,
        type: "success",
      });
    }, 1400);
  };

  if (submittedIncident) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-black py-16 px-4 flex items-center justify-center font-mono">
        <div className="max-w-xl w-full bg-white dark:bg-[#111111] p-8 sm:p-12 border border-black/15 dark:border-neutral-800 space-y-6 text-center">
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
              FIELD DOSSIER TRANSMITTED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
              REPORT REGISTERED
            </h2>
            <p className="text-xs text-neutral-500 font-sans mt-2">
              Your field observation has been queued for verification by regional hydrologists and disaster monitoring coordinators.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 dark:bg-black border border-black/10 dark:border-neutral-800 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">ASSIGNED ID:</span>
              <span className="font-bold text-base text-black dark:text-white">{submittedIncident.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">CATEGORY:</span>
              <span className="font-bold text-black dark:text-white">{submittedIncident.category}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">LOCATION:</span>
              <span className="font-bold text-black dark:text-white">{submittedIncident.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">STATUS:</span>
              <span className="text-rose-600 font-bold uppercase">SUBMITTED (INSPECTING)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to={`/incident/${submittedIncident.id}`}
              className="flex-1 py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-85 transition-opacity"
            >
              INSPECT DOSSIER →
            </Link>
            <Link
              to="/dashboard"
              className="py-3 px-4 border border-black/20 dark:border-white/20 text-black dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
            RAPID FIELD DISPATCH // 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
            REPORT A FLOOD OR RIVER HAZARD
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-1 max-w-2xl leading-relaxed">
            Report high water marks, road embankments washed away, sudden river discoloration, or landslide debris slumps.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 dark:bg-[#111111] p-6 sm:p-10 border border-black/10 dark:border-neutral-800 space-y-8"
        >
          {/* Section 1 */}
          <div className="space-y-4 font-mono text-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block pb-2 border-b border-black/10 dark:border-neutral-800">
              01 // EVENT DETAILS
            </span>

            <div>
              <label className="block font-bold uppercase text-[11px] mb-1">
                INCIDENT TITLE *
              </label>
              <input
                type="text"
                placeholder="E.G. MANDAKINI RIVERBANK EROSION NEAR KUND BRIDGE"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full p-3 border uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none focus:border-black dark:focus:border-white ${
                  errors.title ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                }`}
              />
              {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  CATEGORY *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-black/15 dark:border-neutral-700 font-mono text-xs uppercase bg-white dark:bg-black text-black dark:text-white outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="dark:bg-[#111111]">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  OBSERVED SEVERITY
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full p-3 border border-black/15 dark:border-neutral-700 font-mono text-xs uppercase bg-white dark:bg-black text-black dark:text-white outline-none cursor-pointer"
                >
                  <option value="Low">LOW // NUISANCE WATER LOGGING</option>
                  <option value="Medium">MEDIUM // PARTIAL ROAD BLOCK / EROSION</option>
                  <option value="High">HIGH // INUNDATION &amp; EVACUATION NEEDED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 font-mono text-xs pt-4 border-t border-black/10 dark:border-neutral-800">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block pb-2 border-b border-black/10 dark:border-neutral-800">
              02 // GEOGRAPHY &amp; GPS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  STATE / TERRITORY *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-3 border border-black/15 dark:border-neutral-700 font-mono text-xs uppercase bg-white dark:bg-black text-black dark:text-white outline-none cursor-pointer"
                >
                  {states.map((s) => (
                    <option key={s} value={s} className="dark:bg-[#111111]">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  DISTRICT *
                </label>
                <input
                  type="text"
                  placeholder="E.G. RUDRAPRAYAG, MANDI, MAJULI"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className={`w-full p-3 border uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none ${
                    errors.district ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                  }`}
                />
                {errors.district && <p className="text-[10px] text-rose-500 mt-1">{errors.district}</p>}
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-[11px] mb-1">
                SPECIFIC LANDMARK OR HIGHWAY MARKER *
              </label>
              <input
                type="text"
                placeholder="E.G. NEAR KUND SUSPENSION BRIDGE, KM MARKER 142 ON NH-58"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full p-3 border uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none ${
                  errors.location ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                }`}
              />
              {errors.location && <p className="text-[10px] text-rose-500 mt-1">{errors.location}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold uppercase text-[11px]">
                  GPS COORDINATES (OPTIONAL)
                </label>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="text-[10px] font-bold uppercase underline hover:opacity-70 flex items-center gap-1"
                >
                  {isLocating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Compass className="w-3 h-3" />}
                  <span>{isLocating ? "ACQUIRING..." : "USE DEVICE GPS"}</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="LATITUDE, LONGITUDE (E.G. 30.1459, 78.5989)"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="w-full p-3 border border-black/15 dark:border-neutral-700 font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none"
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 font-mono text-xs pt-4 border-t border-black/10 dark:border-neutral-800">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block pb-2 border-b border-black/10 dark:border-neutral-800">
              03 // EYEWITNESS OBSERVATION
            </span>

            <div>
              <textarea
                rows={4}
                placeholder="Describe current river velocity, visible water level rise, bridge clearance, soil slumping, structural threat..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full p-3 border font-sans text-xs bg-white dark:bg-black text-black dark:text-white outline-none leading-relaxed ${
                  errors.description ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                }`}
              />
              {errors.description && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.description}</p>}
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 font-mono text-xs pt-4 border-t border-black/10 dark:border-neutral-800">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block pb-2 border-b border-black/10 dark:border-neutral-800">
              04 // FIELD PHOTOS &amp; VIDEO
            </span>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files) handlePhotoSelect(e.dataTransfer.files);
              }}
              className={`border border-dashed p-8 text-center transition-all ${
                dragActive
                  ? "border-black bg-neutral-200 dark:bg-neutral-800"
                  : "border-black/20 dark:border-neutral-700 bg-white dark:bg-black"
              }`}
            >
              <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-[11px] font-bold uppercase">
                DRAG &amp; DROP PHOTOS HERE, OR BROWSE
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handlePhotoSelect(e.target.files)}
                className="hidden"
                id="photo-upload-input"
              />
              <label
                htmlFor="photo-upload-input"
                className="mt-3 inline-block px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                SELECT PHOTOS
              </label>

              {photoFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  {photoFiles.map((photo, idx) => (
                    <div key={idx} className="relative h-20 border border-neutral-300 dark:border-neutral-700">
                      <img src={photo.url} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 p-0.5 bg-black text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 font-mono text-xs pt-4 border-t border-black/10 dark:border-neutral-800">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block pb-2 border-b border-black/10 dark:border-neutral-800">
              05 // OBSERVER CONTACT
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  placeholder="E.G. VIKRAM SINGH"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className={`w-full p-3 border uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none ${
                    errors.reporterName ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[11px] mb-1">
                  PHONE OR EMAIL *
                </label>
                <input
                  type="text"
                  placeholder="+91 XXXXX XXXXX OR EMAIL"
                  value={formData.reporterContact}
                  onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                  className={`w-full p-3 border uppercase font-mono text-xs bg-white dark:bg-black text-black dark:text-white outline-none ${
                    errors.reporterContact ? "border-rose-500" : "border-black/15 dark:border-neutral-700"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-4 h-4 mt-0.5 accent-black rounded-none cursor-pointer"
              />
              <label htmlFor="consent-checkbox" className="text-[11px] text-neutral-500 cursor-pointer uppercase">
                I certify this observation is accurate. False emergency alerts waste disaster response resources.
              </label>
            </div>
          </div>

          {isSubmitting && (
            <div className="font-mono text-xs">
              <div className="flex justify-between mb-1 text-[11px]">
                <span>DISPATCHING DOSSIER...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5">
                <div className="bg-black dark:bg-white h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <span className="text-[10px] text-neutral-400 uppercase">
              LOCAL STORAGE PERSISTENCE // DEMO REPOSITORY
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-85 transition-opacity"
            >
              {isSubmitting ? "TRANSMITTING..." : "SUBMIT INCIDENT REPORT →"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

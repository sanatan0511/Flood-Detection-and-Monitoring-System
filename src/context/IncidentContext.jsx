import { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_INCIDENT_REPORTS } from "../data/mockData";

const IncidentContext = createContext();

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem("floodwatch_incidents");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_INCIDENT_REPORTS;
      }
    }
    return INITIAL_INCIDENT_REPORTS;
  });

  useEffect(() => {
    localStorage.setItem("floodwatch_incidents", JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (newReport) => {
    const incidentObj = {
      id: "INC-2026-HIM-" + Math.floor(105 + Math.random() * 890),
      reportedAt: new Date().toISOString(),
      timeAgo: "Just now",
      status: "Submitted",
      severity: newReport.severity || "Medium",
      verificationNotes: "Pending review by local monitoring station coordinator.",
      ...newReport,
    };

    setIncidents((prev) => [incidentObj, ...prev]);
    return incidentObj;
  };

  const getIncidentById = (id) => {
    return incidents.find((inc) => inc.id === id);
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        addIncident,
        getIncidentById,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  const ctx = useContext(IncidentContext);
  if (!ctx) throw new Error("useIncidents must be used within IncidentProvider");
  return ctx;
}

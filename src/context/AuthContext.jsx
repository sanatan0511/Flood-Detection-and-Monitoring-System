import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEMO_USER = {
  id: "USR-7821",
  name: "Dr. Ashish Bhardwaj",
  email: "ashish.bhardwaj@research.himalaya.edu",
  role: "Research Hydrologist & Field Observer",
  organization: "Himalayan Basin Geomorphology Lab",
  location: "Dehradun, Uttarakhand",
  savedRegions: ["Upper Ganga", "Beas Basin", "Teesta Basin"],
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  verifiedBadge: true,
  joinedDate: "January 2025",
  notificationsEnabled: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("floodwatch_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USER;
      }
    }
    return DEMO_USER; // Default logged in for smooth exploration of dashboard & profile
  });

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));

  useEffect(() => {
    if (user) {
      localStorage.setItem("floodwatch_user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("floodwatch_user");
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password) => {
    const loggedUser = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
      name: email.split("@")[0].replace(".", " ") || DEMO_USER.name,
    };
    setUser(loggedUser);
    return true;
  };

  const register = (data) => {
    const newUser = {
      ...DEMO_USER,
      id: "USR-" + Math.floor(1000 + Math.random() * 9000),
      name: data.name || "Community Observer",
      email: data.email,
      role: data.role || "Community Observer",
      organization: data.organization || "Independent Volunteer",
      location: data.location || "Uttarakhand, India",
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

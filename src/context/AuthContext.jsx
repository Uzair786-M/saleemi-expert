import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../services/httpClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // always null until verified
  const [loading, setLoading] = useState(true); // true until backend responds

  // On every app start — verify session with backend
  // Only set admin if backend confirms the cookie is valid
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get("/auth/me");
        const user = res.data?.user;
        if (user) {
          setAdmin(user);
          localStorage.setItem("se_admin", JSON.stringify(user));
        } else {
          setAdmin(null);
          localStorage.removeItem("se_admin");
        }
      } catch {
        // Cookie invalid or expired — clear everything
        setAdmin(null);
        localStorage.removeItem("se_admin");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const user = res.data?.user;
    if (!user) throw new Error("Login failed.");
    setAdmin(user);
    localStorage.setItem("se_admin", JSON.stringify(user));
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setAdmin(null);
    localStorage.removeItem("se_admin");
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!admin) return false;
      if (admin.role === "superadmin") return true;
      return admin.permissions?.includes(permission) ?? false;
    },
    [admin],
  );

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: !!admin,
        isSuperAdmin: admin?.role === "superadmin",
        hasPermission,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { loginAdmin, logoutAdmin, getAdminMe } from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("se_admin") || "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Verify token on app start
  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("se_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getAdminMe();
        const user = res?.user;
        if (user) {
          setAdmin(user);
          localStorage.setItem("se_admin", JSON.stringify(user));
        } else {
          setAdmin(null);
          localStorage.removeItem("se_token");
          localStorage.removeItem("se_admin");
        }
      } catch {
        // Token invalid — clear
        setAdmin(null);
        localStorage.removeItem("se_token");
        localStorage.removeItem("se_admin");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await loginAdmin(email.trim(), password);
    const user = res?.user;
    const token = res?.token;
    if (!user || !token) throw new Error("Login failed.");
    if (user.role !== "admin") throw new Error("Access denied.");
    // Save token to localStorage — sent via Authorization header on every request
    localStorage.setItem("se_token", token);
    localStorage.setItem("se_admin", JSON.stringify(user));
    setAdmin(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch {
      /* ignore */
    }
    setAdmin(null);
    localStorage.removeItem("se_token");
    localStorage.removeItem("se_admin");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: !!admin,
        isAdmin: admin?.role === "admin",
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

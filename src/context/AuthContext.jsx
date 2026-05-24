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

  useEffect(() => {
    const verify = async () => {
      try {
        // getAdminMe returns { success, user } — the full response body
        const res = await getAdminMe();
        const user = res?.user;
        if (user) {
          setAdmin(user);
          localStorage.setItem("se_admin", JSON.stringify(user));
        } else {
          setAdmin(null);
          localStorage.removeItem("se_admin");
        }
      } catch {
        // 401 or network error — keep whatever is in localStorage
        // so admin panel doesn't flash logout on slow networks
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email, password) => {
    // loginAdmin returns { success, user } — the full response body
    const res = await loginAdmin(email.trim(), password);
    const user = res?.user;
    if (!user) throw new Error("Login failed. No user returned.");
    if (user.role !== "admin") throw new Error("Access denied.");
    setAdmin(user);
    localStorage.setItem("se_admin", JSON.stringify(user));
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch {
      /* ignore */
    }
    setAdmin(null);
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

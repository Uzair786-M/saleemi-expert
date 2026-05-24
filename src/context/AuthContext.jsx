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

  // On app start — verify session with backend via cookie
  useEffect(() => {
    const verify = async () => {
      try {
        // Cookie sent automatically — backend verifies it
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
        // No valid cookie — clear admin
        setAdmin(null);
        localStorage.removeItem("se_admin");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email, password) => {
    // Backend sets HttpOnly cookie in response
    // We just need the user object from the response body
    const res = await loginAdmin(email.trim(), password);
    const user = res?.user;
    if (!user) throw new Error("Login failed. Please try again.");
    if (user.role !== "admin") throw new Error("Access denied.");
    // Save user info for display only (not for auth — cookie handles auth)
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

import axios from "axios";

// In production: VITE_API_URL=/api (relative — same domain via Vercel proxy)
// In development: VITE_API_URL=http://localhost:5000/api
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // sends cookie on every request
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Error interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("se_admin");
      if (
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.includes("/admin/login")
      ) {
        window.location.href = "/admin/login";
      }
    }
    const msg =
      err.response?.data?.message ||
      (err.code === "ECONNABORTED"
        ? "Request timed out."
        : !err.response
          ? "Cannot reach server. Is backend running?"
          : err.response.status >= 500
            ? "Server error. Try again later."
            : "Something went wrong.");
    const e = new Error(msg);
    e.status = err.response?.status;
    throw e;
  },
);

export default api;

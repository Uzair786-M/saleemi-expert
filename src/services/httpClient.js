import axios from "axios";

// Development: http://localhost:5000/api
// Production:  /api  (proxied via vercel.json to backend)
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // sends HttpOnly cookie on every request
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// NO request interceptor — no Bearer token — cookie handles auth

// Error interceptor only
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
          ? "Cannot reach server. Is backend running on port 5000?"
          : err.response.status >= 500
            ? "Server error. Try again later."
            : "Something went wrong.");
    const e = new Error(msg);
    e.status = err.response?.status;
    throw e;
  },
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Never redirect when calling auth/login endpoint
    const url = err.config?.url || "";
    if (err.response?.status === 401 && !url.includes("/auth/login")) {
      if (
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.includes("/admin/login")
      ) {
        localStorage.removeItem("se_admin");
        window.location.href = "/admin/login";
        return;
      }
    }
    const msg =
      err.response?.data?.message ||
      (!err.response
        ? "Cannot reach server. Is backend running?"
        : err.response.status === 401
          ? "Invalid email or password."
          : "Something went wrong.");
    const e = new Error(msg);
    e.status = err.response?.status;
    throw e;
  },
);

export default api;

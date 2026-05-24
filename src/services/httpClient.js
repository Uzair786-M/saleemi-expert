import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// DO NOT transform response here — just throw readable errors
api.interceptors.response.use(
  (response) => response, // return raw axios response, let api.js extract what it needs

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("se_admin");
      if (
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.includes("/admin/login")
      ) {
        window.location.href = "/admin/login";
      }
    }
    const msg =
      error.response?.data?.message ||
      (error.code === "ECONNABORTED"
        ? "Request timed out."
        : !error.response
          ? "Cannot connect to server. Is the backend running?"
          : error.response.status === 403
            ? "Permission denied."
            : error.response.status === 404
              ? "Not found."
              : error.response.status === 429
                ? "Too many requests. Please slow down."
                : error.response.status >= 500
                  ? "Server error. Please try again later."
                  : "Something went wrong.");
    const err = new Error(msg);
    err.status = error.response?.status;
    throw err;
  },
);

export default api;

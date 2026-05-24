import api from "./httpClient.js";

// ─────────────────────────────────────────────────────────────
// Backend always returns: { success: true, data: <record> }
// Axios gives us:         response.data = { success, data }
// So response.data.data  = the actual record we want
// ─────────────────────────────────────────────────────────────

// ── Auth ──────────────────────────────────────────────────────
export const loginAdmin = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);
export const logoutAdmin = () => api.post("/auth/logout").then((r) => r.data);
export const getAdminMe = () => api.get("/auth/me").then((r) => r.data);
export const updateEmail = (email) =>
  api.put("/auth/update-email", { email }).then((r) => r.data);
export const changePassword = (cur, nw) =>
  api
    .put("/auth/change-password", { currentPassword: cur, newPassword: nw })
    .then((r) => r.data);

// ── Services ──────────────────────────────────────────────────
export const fetchServices = () =>
  api.get("/services").then((r) => r.data.data || []);
export const createService = (body) =>
  api.post("/services", body).then((r) => r.data.data);
export const updateService = (id, body) =>
  api.put(`/services/${id}`, body).then((r) => r.data.data);
export const deleteService = (id) =>
  api.delete(`/services/${id}`).then((r) => r.data);

// ── Portfolio ─────────────────────────────────────────────────
export const fetchPortfolioItems = (cat) => {
  const q = cat && cat !== "All" ? `?category=${encodeURIComponent(cat)}` : "";
  return api.get(`/portfolio${q}`).then((r) => r.data.data || []);
};
export const fetchPortfolioItem = (id) =>
  api.get(`/portfolio/${id}`).then((r) => r.data.data);
export const createPortfolioItem = (body) =>
  api.post("/portfolio", body).then((r) => r.data.data);
export const updatePortfolioItem = (id, body) =>
  api.put(`/portfolio/${id}`, body).then((r) => r.data.data);
export const deletePortfolioItem = (id) =>
  api.delete(`/portfolio/${id}`).then((r) => r.data);

// ── Testimonials ──────────────────────────────────────────────
export const fetchTestimonials = () =>
  api.get("/testimonials").then((r) => r.data.data || []);
export const createTestimonial = (body) =>
  api.post("/testimonials", body).then((r) => r.data.data);
export const updateTestimonial = (id, body) =>
  api.put(`/testimonials/${id}`, body).then((r) => r.data.data);
export const deleteTestimonial = (id) =>
  api.delete(`/testimonials/${id}`).then((r) => r.data);

// ── Contact ───────────────────────────────────────────────────
export const submitContactForm = (body) =>
  api.post("/contact", body).then((r) => r.data);
export const fetchMessages = (status) =>
  api.get(`/contact?status=${status || "all"}`).then((r) => r.data);
export const updateMessageStatus = (id, st) =>
  api.put(`/contact/${id}/status`, { status: st }).then((r) => r.data);
export const replyToMessage = (id, text) =>
  api.post(`/contact/${id}/reply`, { replyText: text }).then((r) => r.data);
export const deleteMessage = (id) =>
  api.delete(`/contact/${id}`).then((r) => r.data);

// ── About ─────────────────────────────────────────────────────
// Backend: GET /api/about → { success: true, data: aboutDoc }
// We want: aboutDoc
export const fetchAbout = () => api.get("/about").then((r) => r.data.data);
export const updateAbout = (body) =>
  api.put("/about", body).then((r) => r.data.data);

// ── Pricing ───────────────────────────────────────────────────
export const fetchPricing = () =>
  api.get("/pricing").then((r) => r.data.data || []);
export const createPricing = (body) =>
  api.post("/pricing", body).then((r) => r.data.data);
export const updatePricing = (id, body) =>
  api.put(`/pricing/${id}`, body).then((r) => r.data.data);
export const deletePricing = (id) =>
  api.delete(`/pricing/${id}`).then((r) => r.data);

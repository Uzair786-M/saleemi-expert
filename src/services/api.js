import api from "./httpClient.js";

// ─────────────────────────────────────────────────────────────
// RESPONSE SHAPE FROM BACKEND:
//   axios response:  { data: { success: true, data: <record> }, status, ... }
//   r.data       =  { success: true, data: <record> }
//   r.data.data  =  <record>  ← this is what we want
// ─────────────────────────────────────────────────────────────

// ── Auth ──────────────────────────────────────────────────────
export const loginAdmin = (email, pw) =>
  api.post("/auth/login", { email, password: pw }).then((r) => r.data);
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
  api.get("/services").then((r) => r.data.data ?? []);
export const createService = (b) =>
  api.post("/services", b).then((r) => r.data.data);
export const updateService = (id, b) =>
  api.put(`/services/${id}`, b).then((r) => r.data.data);
export const deleteService = (id) =>
  api.delete(`/services/${id}`).then((r) => r.data);

// ── Portfolio ─────────────────────────────────────────────────
export const fetchPortfolioItems = (cat) =>
  api
    .get(
      `/portfolio${cat && cat !== "All" ? `?category=${encodeURIComponent(cat)}` : ""}`,
    )
    .then((r) => r.data.data ?? []);
export const fetchPortfolioItem = (id) =>
  api.get(`/portfolio/${id}`).then((r) => r.data.data);
export const createPortfolioItem = (b) =>
  api.post("/portfolio", b).then((r) => r.data.data);
export const updatePortfolioItem = (id, b) =>
  api.put(`/portfolio/${id}`, b).then((r) => r.data.data);
export const deletePortfolioItem = (id) =>
  api.delete(`/portfolio/${id}`).then((r) => r.data);

// ── Testimonials ──────────────────────────────────────────────
export const fetchTestimonials = () =>
  api.get("/testimonials").then((r) => r.data.data ?? []);
export const createTestimonial = (b) =>
  api.post("/testimonials", b).then((r) => r.data.data);
export const updateTestimonial = (id, b) =>
  api.put(`/testimonials/${id}`, b).then((r) => r.data.data);
export const deleteTestimonial = (id) =>
  api.delete(`/testimonials/${id}`).then((r) => r.data);

// ── Contact ───────────────────────────────────────────────────
export const submitContactForm = (b) =>
  api.post("/contact", b).then((r) => r.data);
export const fetchMessages = (st) =>
  api.get(`/contact?status=${st || "all"}`).then((r) => r.data);
export const updateMessageStatus = (id, s) =>
  api.put(`/contact/${id}/status`, { status: s }).then((r) => r.data);
export const replyToMessage = (id, t) =>
  api.post(`/contact/${id}/reply`, { replyText: t }).then((r) => r.data);
export const deleteMessage = (id) =>
  api.delete(`/contact/${id}`).then((r) => r.data);

// ── About ─────────────────────────────────────────────────────
// GET /api/about → { success:true, data: aboutDoc }
// r.data       → { success:true, data: aboutDoc }
// r.data.data  → aboutDoc  (has socialLinks, skills, etc.)
export const fetchAbout = () => api.get("/about").then((r) => r.data.data);
export const updateAbout = (b) => api.put("/about", b).then((r) => r.data.data);
export const getFaqs = () => api.get("/about/faqs").then((r) => r.data.data);
export const saveFaqsApi = (faqs) =>
  api.put("/about/faqs", { faqs }).then((r) => r.data);

// ── Pricing ───────────────────────────────────────────────────
export const fetchPricing = () =>
  api.get("/pricing").then((r) => r.data.data ?? []);
export const createPricing = (b) =>
  api.post("/pricing", b).then((r) => r.data.data);
export const updatePricing = (id, b) =>
  api.put(`/pricing/${id}`, b).then((r) => r.data.data);
export const deletePricing = (id) =>
  api.delete(`/pricing/${id}`).then((r) => r.data);

// ── Emails (Mailbox) ──────────────────────────────────────────
export const sendEmail = (body) =>
  api.post("/emails/send", body).then((r) => r.data);
export const fetchSentEmails = (params) =>
  api.get("/emails", { params }).then((r) => r.data);
export const deleteEmail = (id) =>
  api.delete(`/emails/${id}`).then((r) => r.data);
export const clearEmails = (status) =>
  api.delete(`/emails?status=${status || "all"}`).then((r) => r.data);

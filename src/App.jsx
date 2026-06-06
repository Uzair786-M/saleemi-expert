import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SiteDataProvider } from "./context/SiteDataContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { WithPermission } from "./components/admin/WithPermission";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Public pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PortfolioDetailPage } from "./pages/PortfolioDetailPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LeaveReviewPage } from "./pages/LeaveReviewPage";

// Admin pages
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { MessagesPage } from "./pages/admin/MessagesPage";
import { MailboxPage } from "./pages/admin/MailboxPage";
import { TestimonialsAdminPage } from "./pages/admin/TestimonialsAdminPage";
import { ReviewsAdminPage } from "./pages/admin/ReviewsAdminPage";
import { PortfolioAdminPage } from "./pages/admin/PortfolioAdminPage";
import { ServicesAdminPage } from "./pages/admin/ServicesAdminPage";
import { AboutAdminPage } from "./pages/admin/AboutAdminPage";
import { StatsAdminPage } from "./pages/admin/StatsAdminPage";
import { PricingAdminPage } from "./pages/admin/PricingAdminPage";
import { EmailSettingsPage } from "./pages/admin/EmailSettingsPage";
import { SettingsPage } from "./pages/admin/SettingsPage";
import { TeamPage } from "./pages/admin/TeamPage";

// ── Layout wrappers ────────────────────────────────────────────
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <WhatsAppButton />
    <Footer />
  </>
);

// Wraps admin pages: requires login + checks permission
const AdminPage = ({ permission, children }) => (
  <ProtectedRoute>
    <AdminLayout>
      <WithPermission permission={permission}>{children}</WithPermission>
    </AdminLayout>
  </ProtectedRoute>
);

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* ── Public pages ── */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <ServicesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PublicLayout>
                  <PortfolioPage />
                </PublicLayout>
              }
            />
            <Route
              path="/portfolio/:id"
              element={
                <PublicLayout>
                  <PortfolioDetailPage />
                </PublicLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <PublicLayout>
                  <PricingPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route path="/leave-review" element={<LeaveReviewPage />} />

            {/* ── Admin pages — each has its permission key ── */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminPage permission="dashboard">
                  {" "}
                  <DashboardPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <AdminPage permission="messages">
                  {" "}
                  <MessagesPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/mailbox"
              element={
                <AdminPage permission="mailbox">
                  {" "}
                  <MailboxPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <AdminPage permission="reviews">
                  {" "}
                  <ReviewsAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <AdminPage permission="testimonials">
                  {" "}
                  <TestimonialsAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/portfolio"
              element={
                <AdminPage permission="portfolio">
                  {" "}
                  <PortfolioAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/services"
              element={
                <AdminPage permission="services">
                  {" "}
                  <ServicesAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/about"
              element={
                <AdminPage permission="about">
                  {" "}
                  <AboutAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/stats"
              element={
                <AdminPage permission="stats">
                  {" "}
                  <StatsAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <AdminPage permission="pricing">
                  {" "}
                  <PricingAdminPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/email-settings"
              element={
                <AdminPage permission="email_settings">
                  {" "}
                  <EmailSettingsPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminPage permission="settings">
                  {" "}
                  <SettingsPage />{" "}
                </AdminPage>
              }
            />
            <Route
              path="/admin/team"
              element={
                <AdminPage permission="team">
                  {" "}
                  <TeamPage />{" "}
                </AdminPage>
              }
            />

            {/* ── 404 ── */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <NotFoundPage />
                </PublicLayout>
              }
            />
          </Routes>
        </Router>
      </SiteDataProvider>
    </AuthProvider>
  );
}

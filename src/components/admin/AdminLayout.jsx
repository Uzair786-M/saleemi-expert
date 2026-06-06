import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// permission key matches ALL_PERMISSIONS in Admin.model.js
const navItems = [
  { label: "Dashboard", to: "/admin", icon: "📊", permission: "dashboard" },
  {
    label: "Messages",
    to: "/admin/messages",
    icon: "✉️",
    permission: "messages",
  },
  { label: "Mailbox", to: "/admin/mailbox", icon: "📬", permission: "mailbox" },
  { label: "Reviews", to: "/admin/reviews", icon: "⭐", permission: "reviews" },
  {
    label: "Testimonials",
    to: "/admin/testimonials",
    icon: "💬",
    permission: "testimonials",
  },
  {
    label: "Portfolio",
    to: "/admin/portfolio",
    icon: "🗂️",
    permission: "portfolio",
  },
  {
    label: "Services",
    to: "/admin/services",
    icon: "⚡",
    permission: "services",
  },
  { label: "About Me", to: "/admin/about", icon: "👤", permission: "about" },
  { label: "Hero Stats", to: "/admin/stats", icon: "📈", permission: "stats" },
  { label: "Pricing", to: "/admin/pricing", icon: "💰", permission: "pricing" },
  {
    label: "Email Settings",
    to: "/admin/email-settings",
    icon: "📧",
    permission: "email_settings",
  },
  { label: "Team", to: "/admin/team", icon: "👥", permission: "team" },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: "⚙️",
    permission: "settings",
  },
];

const SIDEBAR_W = 260;

export const AdminLayout = ({ children }) => {
  const { admin, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only show nav items the current user has permission for
  const visibleNav = navItems.filter((item) => hasPermission(item.permission));

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "11px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.9rem",
    transition: "all 0.2s",
    backgroundColor: isActive ? "rgba(34,211,238,0.12)" : "transparent",
    color: isActive ? "#22d3ee" : "#9ca3af",
    borderLeft: isActive ? "3px solid #22d3ee" : "3px solid transparent",
  });

  // ── Sidebar content ──────────────────────────────────────
  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}
          >
            Saleemi<span style={{ color: "#22d3ee" }}>Admin</span>
          </span>
        </Link>
        <p style={{ color: "#6b7280", fontSize: "0.7rem", marginTop: "3px" }}>
          Control Panel
        </p>
      </div>

      {/* Nav links */}
      <nav
        style={{
          flex: 1,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}
      >
        {visibleNav.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            style={navLinkStyle}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              if (!e.currentTarget.getAttribute("aria-current")) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.getAttribute("aria-current")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }
            }}
          >
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Admin info + Logout — always visible at bottom */}
      <div
        style={{
          padding: "12px 10px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
          backgroundColor: "#070b1d",
        }}
      >
        {/* Admin info */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.04)",
            marginBottom: "8px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.85rem",
              marginBottom: "2px",
            }}
          >
            {admin?.name || "Admin"}
          </p>
          <p style={{ color: "#6b7280", fontSize: "0.72rem" }}>
            {admin?.email || ""}
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "10px",
            backgroundColor: "rgba(239,68,68,0.1)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.25)",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.875rem",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.22)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#050816",
      }}
    >
      {/* ── Desktop sidebar ─────────────────────────────── */}
      {!isMobile && (
        <aside
          style={{
            width: `${SIDEBAR_W}px`,
            minHeight: "100vh",
            flexShrink: 0,
            backgroundColor: "#070b1d",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sidebarContent}
        </aside>
      )}

      {/* ── Mobile sidebar overlay ───────────────────────── */}
      {isMobile && menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 39,
            }}
          />
          {/* Drawer */}
          <aside
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${SIDEBAR_W}px`,
              backgroundColor: "#070b1d",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {sidebarContent}
          </aside>
        </>
      )}

      {/* ── Main content ─────────────────────────────────── */}
      <div
        style={{
          marginLeft: isMobile ? 0 : `${SIDEBAR_W}px`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            padding: "14px clamp(1rem, 2.5vw, 2.5rem)",
            backgroundColor: "rgba(5,8,22,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Mobile hamburger */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((p) => !p)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: "20px",
                      height: "2px",
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </button>
            )}
            <div>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Welcome,{" "}
                <span style={{ color: "#22d3ee" }}>
                  {admin?.name?.split(" ")[0] || "Admin"}
                </span>
              </h1>
              <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: 0 }}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              to="/"
              target="_blank"
              style={{
                color: "#9ca3af",
                textDecoration: "none",
                fontSize: "0.8rem",
                padding: "7px 14px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#22d3ee";
                e.currentTarget.style.borderColor = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              🌐 View Site
            </Link>

            {/* Logout in topbar too for easy access */}
            <button
              onClick={handleLogout}
              style={{
                color: "#ef4444",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "8px",
                padding: "7px 14px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.8rem",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.22)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)")
              }
            >
              🚪 Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "clamp(1rem, 2.5vw, 2.5rem)" }}>
          {children}
        </main>
      </div>
    </div>
  );
};



import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";

const StatCard = ({ icon, label, value, color, to }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <div style={{
      padding: "1.75rem", borderRadius: "16px",
      backgroundColor: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", gap: "1.25rem",
      transition: "border-color 0.2s, transform 0.2s", cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: "56px", height: "56px", borderRadius: "14px", backgroundColor: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500, marginBottom: "4px" }}>{label}</p>
        <h3 style={{ color: "#ffffff", fontSize: "1.875rem", fontWeight: 900 }}>{value}</h3>
      </div>
    </div>
  </Link>
);

const QuickLink = ({ to, icon, label, desc }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <div style={{
      padding: "1.5rem", borderRadius: "14px",
      backgroundColor: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{icon}</span>
      <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "4px" }}>{label}</h4>
      <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{desc}</p>
    </div>
  </Link>
);

export const DashboardPage = () => {
  const { services, portfolio, testimonials } = useSiteData();



  const stats = [
    { icon: "⚡", label: "Total Services",     value: services?.length ?? "—",     color: "#06b6d4", to: "/admin/services"     },
    { icon: "🗂️", label: "Portfolio Projects", value: portfolio?.length ?? "—",    color: "#8b5cf6", to: "/admin/portfolio"    },
    { icon: "⭐", label: "Testimonials",       value: testimonials?.length ?? "—", color: "#f59e0b", to: "/admin/testimonials" },
    { icon: "✉️", label: "New Messages",       value: "3",                          color: "#10b981", to: "/admin/messages"    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 900, marginBottom: "6px" }}>Dashboard</h2>
        <p style={{ color: "#6b7280" }}>Overview of your website content and activity.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "2.5rem" }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Quick Actions</h3>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <QuickLink to="/admin/messages"     icon="✉️" label="View Messages"      desc="Check contact form submissions" />
          <QuickLink to="/admin/testimonials" icon="⭐" label="Add Testimonial"    desc="Publish a new client review"    />
          <QuickLink to="/admin/portfolio"    icon="🗂️" label="Add Project"        desc="Showcase a new project"         />
          <QuickLink to="/admin/services"     icon="⚡" label="Edit Services"      desc="Update your service offerings"  />
        </div>
      </div>

      {/* Recent Testimonials preview */}
      {testimonials && testimonials.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 700 }}>Recent Testimonials</h3>
            <Link to="/admin/testimonials" style={{ color: "#22d3ee", fontSize: "0.875rem", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {testimonials.slice(0, 3).map(t => (
              <div key={t.id} style={{ padding: "1rem 1.25rem", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</p>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "2px" }}>{t.review.slice(0, 60)}...</p>
                </div>
                <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= t.rating ? "#f59e0b" : "#374151", fontSize: "0.875rem" }}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

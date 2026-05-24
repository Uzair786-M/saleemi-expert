import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 1.5rem", backgroundColor: "#050816" }}>
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      <h1 style={{ fontSize: "10rem", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>404</h1>
      <p style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.75rem", fontWeight: 900, color: "#22d3ee" }}>404</p>
    </div>
    <h2 style={{ color: "#ffffff", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem" }}>Page Not Found</h2>
    <p style={{ color: "#9ca3af", marginBottom: "2.5rem", maxWidth: "28rem" }}>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to="/" style={{
      padding: "16px 32px", fontWeight: 700, backgroundColor: "#06b6d4",
      color: "#ffffff", borderRadius: "0.75rem", textDecoration: "none", transition: "background-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
    >
      ← Back to Home
    </Link>
  </div>
);

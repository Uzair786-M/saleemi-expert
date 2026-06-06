import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

// Wraps any admin page — shows access denied if user lacks permission
export const WithPermission = ({ permission, children }) => {
  const { hasPermission, admin } = useAuth();

  if (!hasPermission(permission)) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🔒</div>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "1.75rem",
            fontWeight: 900,
            marginBottom: "0.75rem",
          }}
        >
          Access Restricted
        </h2>
        <p
          style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "0.5rem" }}
        >
          You don't have permission to access this page.
        </p>
        <p
          style={{
            color: "#4b5563",
            fontSize: "0.875rem",
            marginBottom: "2rem",
          }}
        >
          Contact <span style={{ color: "#22d3ee" }}>Haroon Saleem</span> (Super
          Admin) to request access.
        </p>
        <Link
          to="/admin"
          style={{
            padding: "10px 24px",
            backgroundColor: "#06b6d4",
            color: "#fff",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return children;
};

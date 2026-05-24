import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { login, isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If already logged in as admin — redirect away from login page
  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [loading, isAuthenticated, isAdmin]);

  // Show spinner while auth is being checked
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#050816",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            border: "3px solid rgba(34,211,238,0.15)",
            borderTop: "3px solid #22d3ee",
            borderRadius: "9999px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050816",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          backgroundColor: "rgba(6,182,212,0.08)",
          borderRadius: "9999px",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "2.5rem",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff" }}
            >
              Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
            </div>
          </Link>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "4px" }}>
            Admin Panel
          </p>
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.5rem",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "1.4rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
              🔐 Sign In
            </h1>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.85rem",
                fontWeight: 500,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@saleemiexpert.com"
              autoComplete="email"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#22d3ee")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.12)")
              }
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.85rem",
                fontWeight: 500,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{ ...inputStyle, paddingRight: "52px" }}
                onFocus={(e) => (e.target.style.borderColor = "#22d3ee")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "10px",
                color: "#f87171",
                fontSize: "0.875rem",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "4px",
              backgroundColor: submitting ? "#0e7490" : "#06b6d4",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: submitting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!submitting)
                e.currentTarget.style.backgroundColor = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              if (!submitting)
                e.currentTarget.style.backgroundColor = submitting
                  ? "#0e7490"
                  : "#06b6d4";
            }}
          >
            {submitting ? (
              <>
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "9999px",
                    animation: "spin 0.8s linear infinite",
                    display: "inline-block",
                  }}
                />
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        {/* Back */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            to="/"
            style={{
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22d3ee")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            ← Back to Website
          </Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

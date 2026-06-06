import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }
    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email.trim().toLowerCase(), password);
      // login() sets admin in context — redirect to admin panel
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: "100%",
    padding: "13px 16px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "300px",
          background: "rgba(6,182,212,0.08)",
          borderRadius: "9999px",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "1.75rem",
              fontWeight: 900,
              marginBottom: "4px",
            }}
          >
            Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Admin Panel</p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "1.75rem",
            }}
          >
            🔐 Sign In
          </h2>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.82rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="admin@saleemiexpert.com"
              style={inp}
              onFocus={(e) => (e.target.style.borderColor = "#22d3ee")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.12)")
              }
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.82rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                style={{ ...inp, paddingRight: "48px" }}
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
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1rem",
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
                padding: "10px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "8px",
                color: "#f87171",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#0e7490" : "#06b6d4",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = "#06b6d4";
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "9999px",
                    animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }}
                />{" "}
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <a
            href="/"
            style={{
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            ← Back to Website
          </a>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

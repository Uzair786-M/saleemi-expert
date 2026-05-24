import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateEmail, changePassword } from "../../services/api.js";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const focusOn = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const focusOff = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
const cardStyle = {
  padding: "clamp(1.25rem, 2vw, 2rem)",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "2rem",
};

// ── Defined OUTSIDE to prevent focus-loss bug ─────────────────
const PwInput = ({ value, onChange, placeholder, show, onToggle }) => (
  <div style={{ position: "relative" }}>
    <input
      type={show ? "text" : "password"}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={{ ...inputStyle, paddingRight: "48px" }}
      onFocus={focusOn}
      onBlur={focusOff}
    />
    <button
      type="button"
      onClick={onToggle}
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
      {show ? "🙈" : "👁️"}
    </button>
  </div>
);

export const SettingsPage = () => {
  const { admin } = useAuth();

  // ── Email ──────────────────────────────────────────────────
  const [email, setEmail] = useState(admin?.email || "");
  const [emailMsg, setEmailMsg] = useState({ text: "", ok: true });
  const [emailSaving, setEmailSaving] = useState(false);

  const saveEmail = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailMsg({ text: "Enter a valid email address.", ok: false });
      return;
    }
    setEmailSaving(true);
    setEmailMsg({ text: "", ok: true });
    try {
      await updateEmail(email.trim());
      const stored = JSON.parse(localStorage.getItem("se_admin") || "{}");
      localStorage.setItem(
        "se_admin",
        JSON.stringify({ ...stored, email: email.trim() }),
      );
      setEmailMsg({ text: "✓ Email updated successfully!", ok: true });
    } catch (err) {
      setEmailMsg({ text: err.message, ok: false });
    } finally {
      setEmailSaving(false);
    }
  };

  // ── Password ───────────────────────────────────────────────
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [pwMsg, setPwMsg] = useState({ text: "", ok: true });
  const [pwSaving, setPwSaving] = useState(false);

  const savePw = async () => {
    setPwMsg({ text: "", ok: true });
    if (!current || !newPw || !confirm) {
      setPwMsg({ text: "All fields are required.", ok: false });
      return;
    }
    if (newPw.length < 6) {
      setPwMsg({
        text: "New password must be at least 6 characters.",
        ok: false,
      });
      return;
    }
    if (newPw !== confirm) {
      setPwMsg({ text: "Passwords do not match.", ok: false });
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(current, newPw);
      setCurrent("");
      setNewPw("");
      setConfirm("");
      setPwMsg({ text: "✓ Password changed successfully!", ok: true });
    } catch (err) {
      setPwMsg({ text: err.message, ok: false });
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          Settings
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Manage your admin login credentials.
        </p>
      </div>

      {/* Current user */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          backgroundColor: "rgba(34,211,238,0.05)",
          border: "1px solid rgba(34,211,238,0.15)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            backgroundColor: "rgba(34,211,238,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <div>
          <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
            {admin?.name}
          </p>
          <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
            Logged in as:{" "}
            <span style={{ color: "#22d3ee" }}>{admin?.email}</span>
          </p>
        </div>
      </div>

      {/* ── Change Email ── */}
      <div style={cardStyle}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "6px",
          }}
        >
          📧 Change Login Email
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            marginBottom: "1.25rem",
          }}
        >
          Changes the email you use to log into the admin panel.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <input
            type="email"
            value={email}
            placeholder="new@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailMsg({ text: "", ok: true });
            }}
            style={{ ...inputStyle, maxWidth: "360px", flex: 1 }}
            onFocus={focusOn}
            onBlur={focusOff}
          />
          <button
            onClick={saveEmail}
            disabled={emailSaving}
            style={{
              padding: "12px 28px",
              backgroundColor: emailSaving ? "#0e7490" : "#06b6d4",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: emailSaving ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              transition: "background-color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!emailSaving)
                e.currentTarget.style.backgroundColor = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              if (!emailSaving)
                e.currentTarget.style.backgroundColor = "#06b6d4";
            }}
          >
            {emailSaving ? "Saving..." : "Update Email"}
          </button>
        </div>
        {emailMsg.text && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "0.8rem",
              color: emailMsg.ok ? "#10b981" : "#f87171",
            }}
          >
            {emailMsg.text}
          </p>
        )}
      </div>

      {/* ── Change Password ── */}
      <div style={cardStyle}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "6px",
          }}
        >
          🔑 Change Password
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            marginBottom: "1.25rem",
          }}
        >
          Use a strong password with at least 6 characters.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "420px",
          }}
        >
          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Current Password
            </label>
            <PwInput
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter current password"
              show={showCur}
              onToggle={() => setShowCur((p) => !p)}
            />
          </div>
          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              New Password
            </label>
            <PwInput
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="Enter new password (min 6 chars)"
              show={showNew}
              onToggle={() => setShowNew((p) => !p)}
            />
          </div>
          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Confirm New Password
            </label>
            <PwInput
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              show={showCon}
              onToggle={() => setShowCon((p) => !p)}
            />
          </div>
        </div>
        {pwMsg.text && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "0.8rem",
              color: pwMsg.ok ? "#10b981" : "#f87171",
            }}
          >
            {pwMsg.text}
          </p>
        )}
        <button
          onClick={savePw}
          disabled={pwSaving}
          style={{
            marginTop: "1.25rem",
            padding: "12px 28px",
            backgroundColor: pwSaving ? "#0e7490" : "#06b6d4",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: pwSaving ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!pwSaving) e.currentTarget.style.backgroundColor = "#22d3ee";
          }}
          onMouseLeave={(e) => {
            if (!pwSaving) e.currentTarget.style.backgroundColor = "#06b6d4";
          }}
        >
          {pwSaving ? "Changing..." : "Change Password"}
        </button>
      </div>

      {/* ── Emergency reset ── */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "14px",
          backgroundColor: "rgba(245,158,11,0.07)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        <h4
          style={{
            color: "#f59e0b",
            fontWeight: 700,
            fontSize: "0.95rem",
            marginBottom: "0.75rem",
          }}
        >
          💡 Locked out? Emergency reset
        </h4>
        <p
          style={{
            color: "#9ca3af",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            marginBottom: "0.5rem",
          }}
        >
          Edit your backend{" "}
          <code
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            .env
          </code>{" "}
          file:
        </p>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "12px 16px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.8rem",
            color: "#22d3ee",
            lineHeight: 1.8,
          }}
        >
          ADMIN_EMAIL=new@email.com
          <br />
          ADMIN_PASSWORD=newpassword
        </div>
        <p
          style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "0.75rem" }}
        >
          Then run{" "}
          <code
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "2px 6px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            npm run seed
          </code>{" "}
          to reset the admin account
        </p>
      </div>
    </div>
  );
};

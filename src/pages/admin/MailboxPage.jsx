import { useState, useEffect, useCallback } from "react";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const inputStyle = {
  width: "100%",
  padding: "11px 16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

const TEMPLATES = [
  {
    name: "Project Complete",
    subject: "Your Project is Complete! 🎉",
    body: `Hi [Client Name],\n\nYour project is now complete and ready for review!\n\nDeliverables:\n• [List deliverables]\n\nPlease review and let me know if you need any adjustments.\n\nBest regards,\nSaleemiExpert`,
  },
  {
    name: "Follow Up",
    subject: "Following Up on Your Project",
    body: `Hi [Client Name],\n\nI wanted to check if you're happy with the work delivered.\n\nIf you need anything, feel free to reach out. I'd also appreciate a review at:\nsaleemiexpert.com/leave-review\n\nBest regards,\nSaleemiExpert`,
  },
  {
    name: "New Offer",
    subject: "Special Offer Just for You! 🎁",
    body: `Hi [Client Name],\n\nI have an exclusive offer for valued clients:\n\n[Describe your offer]\n\nValid until [Date]. Reply or WhatsApp me to get started!\n\nBest regards,\nSaleemiExpert`,
  },
  {
    name: "Thank You",
    subject: "Thank You for Your Business! 🙏",
    body: `Hi [Client Name],\n\nThank you for choosing SaleemiExpert! It was a pleasure working with you.\n\nFor future projects, I'm always here. Leave a review at:\nsaleemiexpert.com/leave-review\n\nBest regards,\nSaleemiExpert`,
  },
];

// ── API helper ────────────────────────────────────────────────
const apiCall = async (path, options = {}) => {
  const token = localStorage.getItem("se_token");
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed.");
  return data;
};

export const MailboxPage = () => {
  const [tab, setTab] = useState("compose"); // "compose" | "history"

  // ── Compose state ─────────────────────────────────────────
  const [toInput, setToInput] = useState("");
  const [toList, setToList] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // { ok, message }

  // ── History state ─────────────────────────────────────────
  const [history, setHistory] = useState([]);
  const [hLoading, setHLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [viewEmail, setViewEmail] = useState(null); // full email modal

  // ── Load sent email history ───────────────────────────────
  const loadHistory = useCallback(async () => {
    setHLoading(true);
    try {
      const data = await apiCall("/contact/sent-emails");
      setHistory(data.data || []);
      setIsFiltered(data.isFiltered || false);
    } catch (err) {
      console.error(err.message);
    } finally {
      setHLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "history") loadHistory();
  }, [tab, loadHistory]);

  // ── Recipients ────────────────────────────────────────────
  const addRecipient = () => {
    const email = toInput.trim().toLowerCase();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    if (!toList.includes(email)) setToList((p) => [...p, email]);
    setToInput("");
  };
  const removeRecipient = (e) => setToList((p) => p.filter((x) => x !== e));
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient();
    }
  };
  const applyTemplate = (t) => {
    setSubject(t.subject);
    setBody(t.body);
  };

  // ── Send ──────────────────────────────────────────────────
  const handleSend = async () => {
    const finalList = [...toList];
    if (toInput.trim() && /\S+@\S+\.\S+/.test(toInput.trim()))
      finalList.push(toInput.trim().toLowerCase());
    if (!finalList.length) {
      setResult({ ok: false, message: "Add at least one recipient." });
      return;
    }
    if (!subject.trim()) {
      setResult({ ok: false, message: "Subject is required." });
      return;
    }
    if (!body.trim()) {
      setResult({ ok: false, message: "Message is required." });
      return;
    }

    setSending(true);
    setResult(null);
    try {
      const data = await apiCall("/contact/send-email", {
        method: "POST",
        body: JSON.stringify({
          recipients: finalList,
          subject: subject.trim(),
          body: body.trim(),
        }),
      });
      setResult({
        ok: true,
        message: `✅ Email sent to ${finalList.length} recipient${finalList.length > 1 ? "s" : ""}!`,
        record: data.record,
      });
      setToList([]);
      setToInput("");
      setSubject("");
      setBody("");
    } catch (err) {
      setResult({ ok: false, message: `❌ ${err.message}` });
    } finally {
      setSending(false);
    }
  };

  // ── Delete history record ─────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setDeleting(id);
    try {
      await apiCall(`/contact/sent-emails/${id}`, { method: "DELETE" });
      setHistory((p) => p.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const StatusBadge = ({ status }) => (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: "9999px",
        fontSize: "0.72rem",
        fontWeight: 700,
        backgroundColor:
          status === "sent" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
        color: status === "sent" ? "#10b981" : "#f87171",
        border: `1px solid ${status === "sent" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
      }}
    >
      {status === "sent" ? "✓ Sent" : "✕ Failed"}
    </span>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          📬 Mailbox
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Send emails to clients and track delivery status.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
        {[
          { key: "compose", label: "✏️ Compose" },
          { key: "history", label: "📋 Sent History" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "9px 22px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundColor: tab === t.key ? "#06b6d4" : "transparent",
              color: tab === t.key ? "#ffffff" : "#9ca3af",
              border:
                tab === t.key
                  ? "1px solid #06b6d4"
                  : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Compose Tab ── */}
      {tab === "compose" && (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr 280px",
            alignItems: "start",
          }}
        >
          {/* Form */}
          <div
            style={{
              padding: "1.75rem",
              borderRadius: "16px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* To */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                To{" "}
                <span style={{ color: "#6b7280", fontWeight: 400 }}>
                  (press Enter or comma for multiple)
                </span>
              </label>
              {toList.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "8px",
                  }}
                >
                  {toList.map((email) => (
                    <span
                      key={email}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(34,211,238,0.1)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        color: "#22d3ee",
                        fontSize: "0.8rem",
                      }}
                    >
                      {email}
                      <button
                        onClick={() => removeRecipient(email)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#22d3ee",
                          cursor: "pointer",
                          padding: 0,
                          fontSize: "1rem",
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  value={toInput}
                  onChange={(e) => setToInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="client@email.com"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={focus}
                  onBlur={blur}
                />
                <button
                  onClick={addRecipient}
                  style={{
                    padding: "11px 16px",
                    backgroundColor: "rgba(34,211,238,0.1)",
                    color: "#22d3ee",
                    border: "1px solid rgba(34,211,238,0.25)",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  Add +
                </button>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>

            {/* Body */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Message
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email here..."
                rows={12}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "280px",
                  lineHeight: 1.7,
                  fontFamily: "inherit",
                }}
                onFocus={focus}
                onBlur={blur}
              />
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.75rem",
                  marginTop: "4px",
                }}
              >
                {body.length} characters
              </p>
            </div>

            {/* Result */}
            {result && (
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  backgroundColor: result.ok
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(239,68,68,0.08)",
                  border: `1px solid ${result.ok ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}
              >
                <p
                  style={{
                    color: result.ok ? "#10b981" : "#f87171",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    marginBottom: result.record ? "6px" : 0,
                  }}
                >
                  {result.message}
                </p>
                {result.record && (
                  <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                    Recorded in database · ID:{" "}
                    <code style={{ color: "#9ca3af" }}>
                      {result.record._id?.slice(-8)}
                    </code>{" "}
                    ·
                    <button
                      onClick={() => setTab("history")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#22d3ee",
                        cursor: "pointer",
                        fontSize: "0.78rem",
                        marginLeft: "4px",
                        textDecoration: "underline",
                      }}
                    >
                      View History →
                    </button>
                  </p>
                )}
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={sending}
              style={{
                padding: "13px",
                backgroundColor: sending ? "#0e7490" : "#06b6d4",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: sending ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!sending) e.currentTarget.style.backgroundColor = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                if (!sending) e.currentTarget.style.backgroundColor = "#06b6d4";
              }}
            >
              {sending ? (
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
                  />{" "}
                  Sending...
                </>
              ) : (
                "Send Email →"
              )}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

          {/* Templates */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                📋 Templates
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.78rem",
                  marginBottom: "1rem",
                }}
              >
                Click to auto-fill subject and message.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {TEMPLATES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => applyTemplate(t)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#d1d5db",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(34,211,238,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(34,211,238,0.25)";
                      e.currentTarget.style.color = "#22d3ee";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "#d1d5db";
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "14px",
                backgroundColor: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <h4
                style={{
                  color: "#f59e0b",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: "0.75rem",
                }}
              >
                💡 Tips
              </h4>
              {[
                "Press Enter to add multiple recipients",
                "Replace [Client Name] with real name",
                "Every send is recorded in Sent History",
                "Uses SMTP from Email Settings",
              ].map((tip) => (
                <p
                  key={tip}
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.78rem",
                    marginBottom: "4px",
                  }}
                >
                  → {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── History Tab ── */}
      {tab === "history" && (
        <div>
          {/* Filtered notice for non-superadmin */}
          {isFiltered && (
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(34,211,238,0.06)",
                border: "1px solid rgba(34,211,238,0.15)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>🔒</span>
              <p style={{ color: "#9ca3af", fontSize: "0.82rem" }}>
                You are viewing{" "}
                <strong style={{ color: "#22d3ee" }}>
                  your sent emails only
                </strong>
                . Super admin can see all emails from all team members.
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              {history.length} email{history.length !== 1 ? "s" : ""} sent ·{" "}
              {history.filter((e) => e.status === "sent").length} successful ·{" "}
              {history.filter((e) => e.status === "failed").length} failed
            </p>
            <button
              onClick={loadHistory}
              disabled={hLoading}
              style={{
                padding: "7px 16px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              {hLoading ? "Loading..." : "↻ Refresh"}
            </button>
          </div>

          {hLoading ? (
            <div
              style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  border: "3px solid rgba(34,211,238,0.15)",
                  borderTop: "3px solid #22d3ee",
                  borderRadius: "9999px",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              Loading history...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : history.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: "16px",
              }}
            >
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                No emails sent yet. Go to Compose tab to send your first email.
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {history.map((email) => (
                <div
                  key={email._id}
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: `1px solid ${email.status === "sent" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        <StatusBadge status={email.status} />
                        <p
                          style={{
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {email.subject}
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.8rem",
                          marginBottom: "4px",
                        }}
                      >
                        To:{" "}
                        <span style={{ color: "#22d3ee" }}>
                          {email.recipients?.join(", ")}
                        </span>
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        {new Date(email.createdAt).toLocaleString()} · Sent by:{" "}
                        {email.sentBy || "Admin"}
                      </p>
                      {email.status === "failed" && email.error && (
                        <p
                          style={{
                            color: "#f87171",
                            fontSize: "0.78rem",
                            marginTop: "6px",
                            backgroundColor: "rgba(239,68,68,0.08)",
                            padding: "6px 10px",
                            borderRadius: "6px",
                          }}
                        >
                          Error: {email.error}
                        </p>
                      )}
                      {/* Body preview */}
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.78rem",
                          marginTop: "8px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "500px",
                        }}
                      >
                        {email.body?.slice(0, 100)}
                        {email.body?.length > 100 ? "..." : ""}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={() => setViewEmail(email)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          backgroundColor: "rgba(34,211,238,0.08)",
                          color: "#22d3ee",
                          border: "1px solid rgba(34,211,238,0.2)",
                        }}
                      >
                        👁 Full Email
                      </button>
                      <button
                        onClick={() => handleDelete(email._id)}
                        disabled={deleting === email._id}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          backgroundColor: "rgba(239,68,68,0.08)",
                          color: "#f87171",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        {deleting === email._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Full Email Modal ── */}
      {viewEmail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setViewEmail(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "18px",
              backgroundColor: "#0d1224",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem" }}
              >
                📧 Full Email
              </h3>
              <button
                onClick={() => setViewEmail(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                <StatusBadge status={viewEmail.status} />
                <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                  {new Date(viewEmail.createdAt).toLocaleString()}
                </span>
              </div>
              {[
                ["To", viewEmail.recipients?.join(", ")],
                ["Subject", viewEmail.subject],
                ["Sent by", viewEmail.sentBy || "Admin"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{ display: "flex", gap: "12px", marginBottom: "10px" }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      minWidth: "60px",
                    }}
                  >
                    {label}:
                  </span>
                  <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                    {value}
                  </span>
                </div>
              ))}
              {viewEmail.status === "failed" && viewEmail.error && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                    fontSize: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  ❌ Error: {viewEmail.error}
                </div>
              )}
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1.25rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Message
                </p>
                <p
                  style={{
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {viewEmail.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

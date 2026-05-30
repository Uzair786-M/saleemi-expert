import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s" };
const focus = e => e.currentTarget.style.borderColor = "#22d3ee";
const blur  = e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";

const TEMPLATES = [
  {
    name: "Project Completion",
    subject: "Your Project is Complete! 🎉",
    body: `Hi [Client Name],

I'm excited to let you know that your project is now complete and ready for review!

Here's a summary of what was delivered:
• [List key deliverables here]

Please review everything and let me know if you'd like any adjustments. It was a pleasure working with you!

Best regards,
SaleemiExpert`,
  },
  {
    name: "Follow Up",
    subject: "Following Up on Your Project",
    body: `Hi [Client Name],

I wanted to follow up and check if you're happy with the work delivered.

If you have any questions or need further assistance, please don't hesitate to reach out.

Also, if you're satisfied with the results, I'd really appreciate a review at:
saleemiexpert.com/leave-review

Best regards,
SaleemiExpert`,
  },
  {
    name: "New Offer",
    subject: "Special Offer Just for You! 🎁",
    body: `Hi [Client Name],

I hope you're doing well! I wanted to reach out with an exclusive offer for our valued clients.

[Describe your offer here]

This offer is valid until [Date]. Feel free to reply or contact me on WhatsApp to get started.

Best regards,
SaleemiExpert`,
  },
  {
    name: "Thank You",
    subject: "Thank You for Your Business! 🙏",
    body: `Hi [Client Name],

I just wanted to say thank you for choosing SaleemiExpert for your project. It was truly a pleasure working with you!

If you ever need help with future projects, I'm just a message away.

I'd love to hear your feedback:
saleemiexpert.com/leave-review

Best regards,
SaleemiExpert`,
  },
];

export const MailboxPage = () => {
  const [toInput,  setToInput]  = useState("");
  const [toList,   setToList]   = useState([]);
  const [subject,  setSubject]  = useState("");
  const [body,     setBody]     = useState("");
  const [sending,  setSending]  = useState(false);
  const [result,   setResult]   = useState(null);

  const addRecipient = () => {
    const email = toInput.trim().toLowerCase();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    if (toList.includes(email)) { setToInput(""); return; }
    setToList(prev => [...prev, email]);
    setToInput("");
  };

  const removeRecipient = (email) => setToList(prev => prev.filter(e => e !== email));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addRecipient(); }
  };

  const applyTemplate = (t) => { setSubject(t.subject); setBody(t.body); };

  const handleSend = async () => {
    // Add any typed email that wasn't added yet
    const finalList = [...toList];
    if (toInput.trim() && /\S+@\S+\.\S+/.test(toInput.trim())) {
      finalList.push(toInput.trim().toLowerCase());
    }

    if (finalList.length === 0) { setResult({ ok: false, message: "Please add at least one recipient email." }); return; }
    if (!subject.trim())        { setResult({ ok: false, message: "Subject is required." }); return; }
    if (!body.trim())           { setResult({ ok: false, message: "Message body is required." }); return; }

    setSending(true); setResult(null);
    try {
      const token = localStorage.getItem("se_token");
      const res = await fetch(`${BASE_URL}/contact/send-email`, {
        method:      "POST",
        credentials: "include",
        headers: {
          "Content-Type":  "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ recipients: finalList, subject: subject.trim(), body: body.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send.");
      setResult({ ok: true, message: `✓ Email sent to ${finalList.length} recipient${finalList.length > 1 ? "s" : ""}!` });
      setToList([]); setToInput(""); setSubject(""); setBody("");
    } catch (err) {
      setResult({ ok: false, message: err.message || "Failed to send. Check Email Settings." });
    } finally { setSending(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>📬 Compose Email</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Send emails directly to clients from your admin panel.</p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr 280px", alignItems: "start" }}>

        {/* ── Compose Form ── */}
        <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* To */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>
              To <span style={{ color: "#6b7280", fontWeight: 400 }}>(press Enter to add multiple)</span>
            </label>
            {toList.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                {toList.map(email => (
                  <span key={email} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "9999px", backgroundColor: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee", fontSize: "0.8rem" }}>
                    {email}
                    <button onClick={() => removeRecipient(email)} style={{ background: "none", border: "none", color: "#22d3ee", cursor: "pointer", padding: 0, fontSize: "1rem", lineHeight: 1 }}>×</button>
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="email" value={toInput} onChange={e => setToInput(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="client@email.com"
                style={{ ...inputStyle, flex: 1 }} onFocus={focus} onBlur={blur}
              />
              <button onClick={addRecipient}
                style={{ padding: "11px 16px", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.25)", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", whiteSpace: "nowrap" }}
              >Add +</button>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              placeholder="Email subject..." style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>

          {/* Body */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>Message</label>
            <textarea value={body} onChange={e => setBody(e.target.value)}
              placeholder="Write your email here..." rows={12}
              style={{ ...inputStyle, resize: "vertical", minHeight: "280px", lineHeight: 1.7, fontFamily: "inherit" }}
              onFocus={focus} onBlur={blur}
            />
            <p style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "4px" }}>{body.length} characters</p>
          </div>

          {/* Result */}
          {result && (
            <div style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: result.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${result.ok ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`, color: result.ok ? "#10b981" : "#f87171", fontSize: "0.875rem" }}>
              {result.message}
            </div>
          )}

          {/* Send */}
          <button onClick={handleSend} disabled={sending}
            style={{ padding: "13px", backgroundColor: sending ? "#0e7490" : "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", cursor: sending ? "not-allowed" : "pointer", transition: "background-color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = "#22d3ee"; }}
            onMouseLeave={e => { if (!sending) e.currentTarget.style.backgroundColor = "#06b6d4"; }}
          >
            {sending
              ? <><span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "9999px", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Sending...</>
              : "Send Email →"
            }
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* ── Templates ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>📋 Templates</h3>
            <p style={{ color: "#6b7280", fontSize: "0.78rem", marginBottom: "1rem" }}>Click to auto-fill subject and message.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {TEMPLATES.map(t => (
                <button key={t.name} onClick={() => applyTemplate(t)}
                  style={{ padding: "10px 14px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#d1d5db", cursor: "pointer", textAlign: "left", fontSize: "0.85rem", fontWeight: 500, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(34,211,238,0.08)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)"; e.currentTarget.style.color = "#22d3ee"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#d1d5db"; }}
                >{t.name}</button>
              ))}
            </div>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "14px", backgroundColor: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <h4 style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.75rem" }}>💡 Tips</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
              {["Press Enter to add multiple recipients", "Replace [Client Name] with real name", "Uses SMTP from Email Settings", "Make sure Email Settings is configured"].map(tip => (
                <li key={tip} style={{ color: "#9ca3af", fontSize: "0.78rem", display: "flex", gap: "6px" }}>
                  <span style={{ color: "#f59e0b", flexShrink: 0 }}>→</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

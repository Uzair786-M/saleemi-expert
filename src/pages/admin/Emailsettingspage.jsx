import { useState, useEffect } from "react";
import { useSiteData } from "../../context/SiteDataContext";

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
const labelStyle = {
  color: "#9ca3af",
  fontSize: "0.8rem",
  fontWeight: 500,
  display: "block",
  marginBottom: "6px",
};
const cardStyle = {
  padding: "clamp(1.25rem, 2vw, 2rem)",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "2rem",
};
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

const SERVICES = [
  {
    value: "gmail",
    label: "Gmail",
    hint: "Use Gmail App Password (not your real password)",
  },
  {
    value: "outlook",
    label: "Outlook / Hotmail",
    hint: "Use your Outlook email and password",
  },
  { value: "yahoo", label: "Yahoo Mail", hint: "Use Yahoo App Password" },
  {
    value: "sendgrid",
    label: "SendGrid",
    hint: "Enter your SendGrid API key as the password",
  },
  {
    value: "mailgun",
    label: "Mailgun SMTP",
    hint: "Enter your Mailgun SMTP credentials",
  },
  {
    value: "custom",
    label: "Custom SMTP (cPanel, Hostinger, etc.)",
    hint: "Enter your host, port, and credentials manually",
  },
];

const SaveBtn = ({ onClick, saving, saved, label = "Save Changes" }) => (
  <button
    onClick={onClick}
    disabled={saving}
    style={{
      padding: "10px 28px",
      backgroundColor: saved ? "#10b981" : saving ? "#0e7490" : "#06b6d4",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontWeight: 700,
      cursor: saving ? "not-allowed" : "pointer",
      fontSize: "0.875rem",
      transition: "all 0.3s",
    }}
    onMouseEnter={(e) => {
      if (!saving && !saved) e.currentTarget.style.backgroundColor = "#22d3ee";
    }}
    onMouseLeave={(e) => {
      if (!saving && !saved) e.currentTarget.style.backgroundColor = "#06b6d4";
    }}
  >
    {saved ? "✓ Saved!" : saving ? "Saving..." : label}
  </button>
);

export const EmailSettingsPage = () => {
  const { owner, updateOwner } = useSiteData();

  // ── Notification Emails ───────────────────────────────────
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState("");

  // ── SMTP Config ───────────────────────────────────────────
  const [smtp, setSmtp] = useState({
    service: "gmail",
    host: "",
    port: "",
    secure: false,
    user: "",
  });
  const [smtpSaving, setSmtpSaving] = useState(false);
  const [smtpSaved, setSmtpSaved] = useState(false);
  const [smtpError, setSmtpError] = useState("");
  const [testSending, setTestSending] = useState(false);
  const [testMsg, setTestMsg] = useState({ text: "", ok: true });

  // Sync from owner
  useEffect(() => {
    if (owner?.notifyEmails) setEmails(owner.notifyEmails);
    if (owner?.smtpConfig)
      setSmtp({
        service: "gmail",
        host: "",
        port: "",
        secure: false,
        user: "",
        ...owner.smtpConfig,
      });
  }, [owner?._id]);

  const selectedService =
    SERVICES.find((s) => s.value === smtp.service) || SERVICES[0];

  // ── Add notification email ────────────────────────────────
  const addEmail = async () => {
    if (!newEmail.trim() || !/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (emails.find((e) => e.email === newEmail.trim())) {
      setEmailError("This email is already in the list.");
      return;
    }
    setEmailError("");
    const updated = [
      ...emails,
      {
        email: newEmail.trim().toLowerCase(),
        label: newLabel.trim() || "Email",
      },
    ];
    await saveEmails(updated);
    setNewEmail("");
    setNewLabel("");
  };

  const removeEmail = async (idx) => {
    if (!window.confirm("Remove this email from notifications?")) return;
    const updated = emails.filter((_, i) => i !== idx);
    await saveEmails(updated);
  };

  const saveEmails = async (list) => {
    setEmailSaving(true);
    try {
      await updateOwner({ ...owner, notifyEmails: list });
      setEmails(list);
      setEmailSaved(true);
      setTimeout(() => setEmailSaved(false), 2500);
    } catch (err) {
      setEmailError(err.message || "Failed to save.");
    } finally {
      setEmailSaving(false);
    }
  };

  // ── Save SMTP config ──────────────────────────────────────
  const saveSmtp = async () => {
    setSmtpError("");
    if (!smtp.user) {
      setSmtpError("Sender email is required.");
      return;
    }
    if (smtp.service === "custom" && !smtp.host) {
      setSmtpError("SMTP host is required for custom service.");
      return;
    }
    setSmtpSaving(true);
    try {
      const config = { service: smtp.service, user: smtp.user };
      if (smtp.service === "custom") {
        config.host = smtp.host;
        config.port = Number(smtp.port) || 587;
        config.secure = smtp.secure;
      }
      await updateOwner({ ...owner, smtpConfig: config });
      setSmtpSaved(true);
      setTimeout(() => setSmtpSaved(false), 2500);
    } catch (err) {
      setSmtpError(err.message || "Failed to save.");
    } finally {
      setSmtpSaving(false);
    }
  };

  // ── Test email ────────────────────────────────────────────
  const sendTestEmail = async () => {
    setTestSending(true);
    setTestMsg({ text: "", ok: true });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact/test-email`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTestMsg({
        text: `✓ Test email sent to: ${data.recipients?.join(", ")}`,
        ok: true,
      });
    } catch (err) {
      setTestMsg({
        text: err.message || "Test failed. Check your .env EMAIL_PASS.",
        ok: false,
      });
    } finally {
      setTestSending(false);
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
          Email Settings
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Configure who receives contact form emails and which email service to
          use.
        </p>
      </div>

      {/* ── How it works ── */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          backgroundColor: "rgba(34,211,238,0.05)",
          border: "1px solid rgba(34,211,238,0.15)",
          marginBottom: "2rem",
        }}
      >
        <h4
          style={{
            color: "#22d3ee",
            fontWeight: 700,
            fontSize: "0.9rem",
            marginBottom: "6px",
          }}
        >
          ℹ️ How it works
        </h4>
        <p
          style={{
            color: "#9ca3af",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          When a client submits the contact form,{" "}
          <strong style={{ color: "#fff" }}>
            all notification emails below receive the message at the same time
          </strong>
          . The email password/API key is kept secure in your server's{" "}
          <code
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            .env
          </code>{" "}
          file — never stored in the database.
        </p>
      </div>

      {/* ── Notification Recipients ── */}
      <div style={cardStyle}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "4px",
          }}
        >
          📬 Notification Recipients
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            marginBottom: "1.5rem",
          }}
        >
          All emails here receive contact form submissions simultaneously.
        </p>

        {/* Current list */}
        {emails.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "1.5rem",
            }}
          >
            {emails.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(34,211,238,0.05)",
                  border: "1px solid rgba(34,211,238,0.15)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(34,211,238,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  📧
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: "#22d3ee",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      marginBottom: "2px",
                    }}
                  >
                    {item.email}
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                    {item.label}
                  </p>
                </div>
                <button
                  onClick={() => removeEmail(i)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                    flexShrink: 0,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {emails.length === 0 && (
          <div
            style={{
              padding: "1.5rem",
              textAlign: "center",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              No notification emails configured yet. Add one below.
            </p>
          </div>
        )}

        {/* Add new */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "12px",
            border: "1px solid rgba(34,211,238,0.2)",
            backgroundColor: "rgba(34,211,238,0.03)",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              fontSize: "0.82rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            ➕ Add Recipient
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "2fr 1fr",
              marginBottom: "10px",
            }}
          >
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="info@saleemiexpert.com or partner@gmail.com"
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div>
              <label style={labelStyle}>Label (optional)</label>
              <input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Business, Partner..."
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
          </div>
          {emailError && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.8rem",
                marginBottom: "10px",
              }}
            >
              ⚠️ {emailError}
            </p>
          )}
          <SaveBtn
            onClick={addEmail}
            saving={emailSaving}
            saved={emailSaved}
            label="Add Email"
          />
        </div>
      </div>

      {/* ── SMTP / Email Service ── */}
      <div style={cardStyle}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "4px",
          }}
        >
          ⚙️ Email Service (SMTP)
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            marginBottom: "1.5rem",
          }}
        >
          Choose which service sends the emails. Password stays in your{" "}
          <code style={{ color: "#9ca3af" }}>.env</code> file.
        </p>

        {/* Service selector */}
        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            marginBottom: "1.5rem",
          }}
        >
          {SERVICES.map((svc) => (
            <div
              key={svc.value}
              onClick={() => setSmtp((p) => ({ ...p, service: svc.value }))}
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                border:
                  smtp.service === svc.value
                    ? "1px solid #22d3ee"
                    : "1px solid rgba(255,255,255,0.08)",
                backgroundColor:
                  smtp.service === svc.value
                    ? "rgba(34,211,238,0.1)"
                    : "rgba(255,255,255,0.03)",
              }}
            >
              <p
                style={{
                  color: smtp.service === svc.value ? "#22d3ee" : "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  marginBottom: "2px",
                }}
              >
                {svc.label}
              </p>
            </div>
          ))}
        </div>

        {/* Hint for selected service */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            backgroundColor: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(245,158,11,0.2)",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "#f59e0b", fontSize: "0.82rem", margin: 0 }}>
            💡 {selectedService.hint}
          </p>
        </div>

        {/* Sender email */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Sender Email Address</label>
          <input
            value={smtp.user}
            onChange={(e) => setSmtp((p) => ({ ...p, user: e.target.value }))}
            placeholder={
              smtp.service === "sendgrid"
                ? "your_verified@email.com"
                : "your@email.com"
            }
            style={inputStyle}
            onFocus={focus}
            onBlur={blur}
          />
          <p
            style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "5px" }}
          >
            This is who the email appears to be <em>from</em>. Must match your
            email service account.
          </p>
        </div>

        {/* Custom SMTP fields */}
        {smtp.service === "custom" && (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "2fr 1fr",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>SMTP Host</label>
              <input
                value={smtp.host}
                onChange={(e) =>
                  setSmtp((p) => ({ ...p, host: e.target.value }))
                }
                placeholder="mail.yourdomain.com or smtp.hostinger.com"
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div>
              <label style={labelStyle}>Port</label>
              <input
                type="number"
                value={smtp.port}
                onChange={(e) =>
                  setSmtp((p) => ({ ...p, port: e.target.value }))
                }
                placeholder="587"
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingTop: "1.5rem",
              }}
            >
              <div
                onClick={() => setSmtp((p) => ({ ...p, secure: !p.secure }))}
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "9999px",
                  backgroundColor: smtp.secure
                    ? "#06b6d4"
                    : "rgba(255,255,255,0.1)",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: smtp.secure ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "9999px",
                    backgroundColor: "#ffffff",
                    transition: "left 0.3s",
                  }}
                />
              </div>
              <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                SSL/TLS (port 465)
              </span>
            </div>
          </div>
        )}

        {/* Password reminder */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.8rem",
              margin: "0 0 4px",
              fontWeight: 600,
            }}
          >
            🔒 Password/API Key stays in .env
          </p>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.75rem",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            For security, the password is never stored in the database. Make
            sure your backend{" "}
            <code
              style={{
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.08)",
                padding: "1px 5px",
                borderRadius: "3px",
              }}
            >
              .env
            </code>{" "}
            has:
          </p>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#22d3ee",
              marginTop: "8px",
              lineHeight: 1.8,
            }}
          >
            {smtp.service === "sendgrid" && (
              <>
                EMAIL_USER=apikey
                <br />
              </>
            )}
            EMAIL_PASS=
            {smtp.service === "sendgrid"
              ? "SG.your_api_key_here"
              : smtp.service === "gmail"
                ? "your_16_char_app_password"
                : "your_email_password"}
          </div>
        </div>

        {smtpError && (
          <p
            style={{
              color: "#f87171",
              fontSize: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            ⚠️ {smtpError}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <SaveBtn onClick={saveSmtp} saving={smtpSaving} saved={smtpSaved} />

          {/* Test email button */}
          <button
            onClick={sendTestEmail}
            disabled={testSending}
            style={{
              padding: "10px 24px",
              backgroundColor: "transparent",
              color: "#9ca3af",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: testSending ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#22d3ee";
              e.currentTarget.style.color = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            {testSending ? "Sending..." : "📨 Send Test Email"}
          </button>
        </div>

        {testMsg.text && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "0.82rem",
              color: testMsg.ok ? "#10b981" : "#f87171",
            }}
          >
            {testMsg.text}
          </p>
        )}
      </div>

      {/* ── Quick Setup Guides ── */}
      <div style={cardStyle}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.25rem",
          }}
        >
          📖 Quick Setup Guides
        </h3>
        {[
          {
            title: "Gmail App Password",
            steps: [
              "Go to myaccount.google.com → Security",
              "Turn on 2-Step Verification",
              "Go to App passwords → Generate",
              "Copy the 16-character password",
              "Paste it as EMAIL_PASS in your .env",
            ],
          },
          {
            title: "info@yourdomain.com (cPanel / Hostinger / Namecheap)",
            steps: [
              "Go to your hosting control panel → Email Accounts",
              "Create info@saleemiexpert.com",
              "Find SMTP settings (host: mail.yourdomain.com, port: 587)",
              "Use that email and password in .env",
              "Select 'Custom SMTP' above and enter the host",
            ],
          },
          {
            title: "SendGrid (best for bulk, high deliverability)",
            steps: [
              "Sign up at sendgrid.com (free 100 emails/day)",
              "Go to Settings → API Keys → Create",
              "Set EMAIL_PASS=SG.your_api_key in .env",
              "Select SendGrid above",
            ],
          },
        ].map((guide) => (
          <div
            key={guide.title}
            style={{
              marginBottom: "1.25rem",
              padding: "1rem 1.25rem",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
              }}
            >
              {guide.title}
            </p>
            <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
              {guide.steps.map((step, i) => (
                <li
                  key={i}
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    lineHeight: 1.7,
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

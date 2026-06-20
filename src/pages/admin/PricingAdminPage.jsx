import { useState, useEffect } from "react";
import { useSiteData } from "../../context/SiteDataContext";

const inputStyle = {
  width: "100%",
  padding: "11px 16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.9rem",
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
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
const empty = {
  name: "",
  price: "$",
  duration: "",
  desc: "",
  popular: false,
  color: "#06b6d4",
  features: "",
  notIncluded: "",
};

export const PricingAdminPage = () => {
  const { pricing, pricingOps, owner, updateOwner, faqs } = useSiteData();
  const [tab, setTab] = useState("packages"); // "packages" | "faqs"

  // ── Package state ─────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // ── FAQ state ─────────────────────────────────────────────
  const [faqItems, setFaqItems] = useState([]);
  const [faqSaving, setFaqSaving] = useState(false);
  const [faqSaved, setFaqSaved] = useState(false);
  const [faqError, setFaqError] = useState("");

  useEffect(() => {
    setFaqItems(faqs?.length > 0 ? faqs.map((f) => ({ ...f })) : []);
  }, [faqs?.length]);

  const handleChange = (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [e.target.name]: val }));
  };

  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name || "",
      price: pkg.price || "$",
      duration: pkg.duration || "",
      desc: pkg.desc || "",
      popular: pkg.popular || false,
      color: pkg.color || "#06b6d4",
      features: (pkg.features || []).join("\n"),
      notIncluded: (pkg.notIncluded || []).join("\n"),
    });
    setEditing(pkg._id);
    setShowForm(true);
    setError("");
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      setError("Name and price are required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        price: form.price,
        duration: form.duration,
        desc: form.desc,
        popular: form.popular,
        color: form.color,
        features: form.features
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        notIncluded: form.notIncluded
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (editing) {
        await pricingOps.update(editing, payload);
      } else {
        await pricingOps.add(payload);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setForm(empty);
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    try {
      await pricingOps.remove(id);
    } catch (err) {
      alert(err.message);
    }
  };

  const togglePopular = async (pkg) => {
    try {
      await pricingOps.update(pkg._id, { ...pkg, popular: !pkg.popular });
    } catch (err) {
      alert(err.message);
    }
  };

  // ── FAQ handlers ──────────────────────────────────────────
  const addFaq = () => setFaqItems((p) => [...p, { question: "", answer: "" }]);

  const updateFaq = (i, field, val) => {
    setFaqItems((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)),
    );
    setFaqSaved(false);
  };

  const removeFaq = (i) =>
    setFaqItems((prev) => prev.filter((_, idx) => idx !== i));

  const moveFaq = (i, dir) => {
    setFaqItems((prev) => {
      const n = [...prev];
      const j = i + dir;
      if (j < 0 || j >= n.length) return n;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  };

  const saveFaqs = async () => {
    const valid = faqItems.filter((f) => f.question.trim() && f.answer.trim());
    if (valid.length === 0) {
      setFaqError("Add at least one FAQ with question and answer.");
      return;
    }
    setFaqSaving(true);
    setFaqError("");
    try {
      await updateOwner({ ...owner, faqs: valid });
      setFaqSaved(true);
      setTimeout(() => setFaqSaved(false), 2500);
    } catch (err) {
      setFaqError(err.message || "Failed to save FAQs.");
    } finally {
      setFaqSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 900,
              marginBottom: "4px",
            }}
          >
            Pricing Management
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Manage pricing packages and FAQ section.
          </p>
        </div>
        {tab === "packages" && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setForm(empty);
            }}
            style={{
              padding: "10px 24px",
              backgroundColor: "#06b6d4",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            + Add Package
          </button>
        )}
        {tab === "faqs" && (
          <button
            onClick={addFaq}
            style={{
              padding: "10px 24px",
              backgroundColor: "#06b6d4",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            + Add FAQ
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.75rem" }}>
        {[
          { key: "packages", label: "💰 Pricing Packages" },
          { key: "faqs", label: "❓ FAQ Section" },
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
              color: tab === t.key ? "#fff" : "#9ca3af",
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

      {/* ── PACKAGES TAB ── */}
      {tab === "packages" && (
        <div>
          {saved && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "10px",
                color: "#10b981",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
              }}
            >
              ✓ Package saved successfully!
            </div>
          )}

          {showForm && (
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "16px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(34,211,238,0.25)",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                {editing ? "Edit Package" : "Add New Package"}
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  marginBottom: "1rem",
                }}
              >
                {[
                  ["name", "Package Name *"],
                  ["price", "Price (e.g. $149)"],
                  ["duration", "Delivery Time"],
                  ["desc", "Short Description"],
                ].map(([field, lbl]) => (
                  <div key={field}>
                    <label style={labelStyle}>{lbl}</label>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Accent Color</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="color"
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                      }}
                    />
                    <input
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      style={{ ...inputStyle, flex: 1 }}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>
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
                    onClick={() =>
                      setForm((p) => ({ ...p, popular: !p.popular }))
                    }
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "9999px",
                      backgroundColor: form.popular
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
                        left: form.popular ? "22px" : "2px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "9999px",
                        backgroundColor: "#fff",
                        transition: "left 0.3s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: form.popular ? "#22d3ee" : "#9ca3af",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "1fr 1fr",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Features Included (one per line)
                  </label>
                  <textarea
                    name="features"
                    rows="6"
                    value={form.features}
                    onChange={handleChange}
                    placeholder={
                      "Up to 1,000 products\nCSV management\n3 revisions"
                    }
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Not Included (one per line)</label>
                  <textarea
                    name="notIncluded"
                    rows="6"
                    value={form.notIncluded}
                    onChange={handleChange}
                    placeholder={"Custom scripts\nPriority support"}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>
              {error && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  ⚠️ {error}
                </p>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: "10px 28px",
                    backgroundColor: saving ? "#0e7490" : "#06b6d4",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    cursor: saving ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!saving)
                      e.currentTarget.style.backgroundColor = "#22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    if (!saving)
                      e.currentTarget.style.backgroundColor = saving
                        ? "#0e7490"
                        : "#06b6d4";
                  }}
                >
                  {saving
                    ? "Saving..."
                    : editing
                      ? "Update Package"
                      : "Save Package"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setForm(empty);
                    setEditing(null);
                    setError("");
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "transparent",
                    color: "#9ca3af",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {pricing.map((pkg) => (
              <div
                key={pkg._id}
                style={{
                  padding: "1.5rem",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: `1px solid ${pkg.popular ? pkg.color : "rgba(255,255,255,0.08)"}`,
                  position: "relative",
                }}
              >
                {pkg.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "3px 14px",
                      borderRadius: "9999px",
                      backgroundColor: pkg.color,
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⭐ Most Popular
                  </span>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                      }}
                    >
                      {pkg.name}
                    </h4>
                    <p
                      style={{
                        color: pkg.color,
                        fontSize: "1.5rem",
                        fontWeight: 900,
                      }}
                    >
                      {pkg.price}
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                      {pkg.duration} · {pkg.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => handleEdit(pkg)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "7px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        backgroundColor: "rgba(34,211,238,0.1)",
                        color: "#22d3ee",
                        border: "1px solid rgba(34,211,238,0.2)",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "7px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        backgroundColor: "rgba(239,68,68,0.1)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.2)",
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => togglePopular(pkg)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "7px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        backgroundColor: pkg.popular
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(255,255,255,0.05)",
                        color: pkg.popular ? "#f59e0b" : "#9ca3af",
                        border: `1px solid ${pkg.popular ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      {pkg.popular ? "★ Popular" : "☆ Set Popular"}
                    </button>
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {(pkg.features || []).slice(0, 4).map((f) => (
                    <li
                      key={f}
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.78rem",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: "#22d3ee" }}>✓</span>
                      {f}
                    </li>
                  ))}
                  {(pkg.features || []).length > 4 && (
                    <li style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      +{pkg.features.length - 4} more
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FAQS TAB ── */}
      {tab === "faqs" && (
        <div>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              backgroundColor: "rgba(34,211,238,0.05)",
              border: "1px solid rgba(34,211,238,0.15)",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "#9ca3af", fontSize: "0.82rem" }}>
              💡 These FAQs appear at the bottom of the Pricing page. Add common
              questions your clients ask.
            </p>
          </div>

          {faqSaved && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "10px",
                color: "#10b981",
                marginBottom: "1.25rem",
                fontSize: "0.875rem",
              }}
            >
              ✓ FAQs saved successfully!
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "1.5rem",
            }}
          >
            {faqItems.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                }}
              >
                <p style={{ color: "#6b7280" }}>
                  No FAQs yet. Click "+ Add FAQ" to get started.
                </p>
              </div>
            )}
            {faqItems.map((faq, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      color: "#22d3ee",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    FAQ #{i + 1}
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => moveFaq(i, -1)}
                      disabled={i === 0}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: i === 0 ? "default" : "pointer",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: i === 0 ? "#374151" : "#9ca3af",
                      }}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveFaq(i, 1)}
                      disabled={i === faqItems.length - 1}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor:
                          i === faqItems.length - 1 ? "default" : "pointer",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color:
                          i === faqItems.length - 1 ? "#374151" : "#9ca3af",
                      }}
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => removeFaq(i)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        backgroundColor: "rgba(239,68,68,0.08)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.2)",
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Question</label>
                    <input
                      value={faq.question}
                      onChange={(e) => updateFaq(i, "question", e.target.value)}
                      placeholder="e.g. Are these prices fixed?"
                      style={inputStyle}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Answer</label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      placeholder="Write a clear, helpful answer..."
                      rows={3}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        lineHeight: 1.6,
                      }}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {faqError && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.8rem",
                marginBottom: "1rem",
              }}
            >
              ⚠️ {faqError}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={saveFaqs}
              disabled={faqSaving}
              style={{
                padding: "11px 32px",
                backgroundColor: faqSaved
                  ? "#10b981"
                  : faqSaving
                    ? "#0e7490"
                    : "#06b6d4",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                cursor: faqSaving ? "not-allowed" : "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!faqSaving && !faqSaved)
                  e.currentTarget.style.backgroundColor = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                if (!faqSaving && !faqSaved)
                  e.currentTarget.style.backgroundColor = "#06b6d4";
              }}
            >
              {faqSaved ? "✓ Saved!" : faqSaving ? "Saving..." : "Save FAQs"}
            </button>
            <button
              onClick={addFaq}
              style={{
                padding: "11px 24px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Add Another FAQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

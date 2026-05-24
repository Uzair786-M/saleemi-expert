import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/httpClient.js";

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  backgroundColor: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)");
const label = {
  color: "#9ca3af",
  fontSize: "0.85rem",
  fontWeight: 500,
  display: "block",
  marginBottom: "7px",
};

const StarRating = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: "8px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          transition: "transform 0.15s",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span
          style={{
            color: star <= value ? "#f59e0b" : "rgba(255,255,255,0.2)",
            filter:
              star <= value
                ? "drop-shadow(0 0 6px rgba(245,158,11,0.5))"
                : "none",
          }}
        >
          ★
        </span>
      </button>
    ))}
  </div>
);

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent!",
};

export const LeaveReviewPage = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    project: "",
    review: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.review.trim()) {
      setError("Please write your review.");
      return;
    }
    if (form.review.trim().length < 20) {
      setError("Review must be at least 20 characters.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await api.post("/testimonials/submit", form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────
  if (submitted)
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#050816",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          {/* Animated checkmark */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16,185,129,0.15)",
              border: "2px solid rgba(16,185,129,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              fontSize: "3rem",
            }}
          >
            ✓
          </div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 900,
              marginBottom: "1rem",
            }}
          >
            Thank You! 🎉
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              lineHeight: 1.7,
              marginBottom: "0.75rem",
            }}
          >
            Your review has been submitted successfully and is{" "}
            <strong style={{ color: "#22d3ee" }}>pending approval</strong>.
          </p>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "2.5rem",
            }}
          >
            It will appear on the website once reviewed. This usually takes less
            than 24 hours.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                padding: "12px 28px",
                backgroundColor: "#06b6d4",
                color: "#ffffff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#22d3ee")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#06b6d4")
              }
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  title: "",
                  email: "",
                  project: "",
                  review: "",
                  rating: 5,
                });
              }}
              style={{
                padding: "12px 28px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050816",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          backgroundColor: "rgba(6,182,212,0.06)",
          borderRadius: "9999px",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "0 clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                color: "#22d3ee",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                marginBottom: "1rem",
              }}
            >
              Share Your Experience
            </p>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Leave a <span style={{ color: "#22d3ee" }}>Review</span>
            </h1>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                lineHeight: 1.7,
              }}
            >
              Worked with me? I'd love to hear your feedback. Your review helps
              other clients make informed decisions.
            </p>
          </div>

          {/* Form card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              padding: "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              {/* Star rating */}
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <label
                  style={{
                    ...label,
                    textAlign: "center",
                    display: "block",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                  }}
                >
                  How would you rate your experience?
                </label>
                <StarRating
                  value={form.rating}
                  onChange={(val) => setForm((p) => ({ ...p, rating: val }))}
                />
                <p
                  style={{
                    color: "#f59e0b",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginTop: "8px",
                    minHeight: "20px",
                  }}
                >
                  {ratingLabels[form.rating]}
                </p>
              </div>

              {/* Name + Title */}
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "1fr 1fr",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label style={label}>Your Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
                <div>
                  <label style={label}>Your Title / Role</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Store Owner, USA"
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>

              {/* Email + Project */}
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "1fr 1fr",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label style={label}>Email (optional)</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.73rem",
                      marginTop: "4px",
                    }}
                  >
                    Not shown publicly
                  </p>
                </div>
                <div>
                  <label style={label}>Project / Service</label>
                  <input
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    placeholder="Shopify Product Upload"
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>

              {/* Review text */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={label}>
                  Your Review *{" "}
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  >
                    ({Math.max(0, 20 - form.review.length)} chars minimum)
                  </span>
                </label>
                <textarea
                  name="review"
                  rows="5"
                  value={form.review}
                  onChange={handleChange}
                  placeholder="Tell others about your experience working with SaleemiExpert. What did you hire for? What was the quality like? Would you recommend?"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "130px",
                    lineHeight: 1.6,
                  }}
                  onFocus={focus}
                  onBlur={blur}
                />
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
                    marginBottom: "1.25rem",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: submitting ? "#0e7490" : "#06b6d4",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  if (!submitting)
                    e.currentTarget.style.backgroundColor = "#22d3ee";
                }}
                onMouseLeave={(e) => {
                  if (!submitting)
                    e.currentTarget.style.backgroundColor = "#06b6d4";
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
                    Submitting...
                  </>
                ) : (
                  "Submit Review ⭐"
                )}
              </button>

              <p
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "0.8rem",
                  marginTop: "1rem",
                }}
              >
                Reviews are reviewed before publishing · Your email is never
                shown publicly
              </p>
            </form>
          </div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

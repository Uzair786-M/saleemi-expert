import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { getFaqs } from "../services/api.js";

const DEFAULT_FAQS = [
  {
    question: "Are these prices fixed?",
    answer:
      "These are starting prices. Final cost depends on the scope of work. I'll give you an exact quote after reviewing your project details.",
  },
  {
    question: "How do I pay?",
    answer:
      "I accept PayPal, bank transfer, and other methods. 50% upfront, 50% on delivery for larger projects.",
  },
  {
    question: "What if I need revisions?",
    answer:
      "Each package includes a set number of revisions. I want you 100% satisfied, so I'm always flexible.",
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Absolutely. You can start with Basic and upgrade at any time.",
  },
  {
    question: "How do we communicate?",
    answer:
      "Primarily via email and WhatsApp. I respond within a few hours during business hours.",
  },
];

const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };
const section = (bg) => ({
  width: "100%",
  padding: "6rem 0",
  backgroundColor: bg || "#050816",
});

const PricingCard = ({ pkg }) => (
  <div
    style={{
      position: "relative",
      padding: "clamp(1.75rem, 2.5vw, 3rem)",
      borderRadius: "1.5rem",
      backgroundColor: pkg.popular
        ? "rgba(6,182,212,0.06)"
        : "rgba(255,255,255,0.04)",
      border: `2px solid ${pkg.popular ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = `0 20px 60px ${pkg.color}30`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* Popular badge */}
    {pkg.popular && (
      <div
        style={{
          position: "absolute",
          top: "-14px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "4px 20px",
          borderRadius: "9999px",
          backgroundColor: "#06b6d4",
          color: "#ffffff",
          fontSize: "0.75rem",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        ⭐ Most Popular
      </div>
    )}

    {/* Header */}
    <div style={{ marginBottom: "1.5rem" }}>
      <h3
        style={{
          color: "#ffffff",
          fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)",
          fontWeight: 900,
          marginBottom: "4px",
        }}
      >
        {pkg.name}
      </h3>
      <p style={{ color: "#9ca3af", fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>
        {pkg.desc}
      </p>
    </div>

    {/* Price */}
    <div
      style={{
        marginBottom: "1.75rem",
        paddingBottom: "1.75rem",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{ color: "#9ca3af", fontSize: "1.25rem" }}>
          Starting at
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
          marginTop: "4px",
        }}
      >
        <span
          style={{
            color: pkg.popular ? "#22d3ee" : "#ffffff",
            fontSize: "clamp(2.5rem, 4vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {pkg.price}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "8px",
        }}
      >
        <span style={{ color: "#22d3ee", fontSize: "1rem" }}>⏱</span>
        <span
          style={{ color: "#9ca3af", fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
        >
          Delivery: {pkg.duration}
        </span>
      </div>
    </div>

    {/* Features included */}
    <div style={{ flex: 1, marginBottom: "1.75rem" }}>
      <p
        style={{
          color: "#9ca3af",
          fontSize: "0.8rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "0.75rem",
        }}
      >
        What's included
      </p>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {pkg.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              color: "#d1d5db",
              fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
            }}
          >
            <span
              style={{
                color: "#22d3ee",
                fontWeight: 700,
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Not included */}
      {pkg.notIncluded && pkg.notIncluded.length > 0 && (
        <>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "1rem 0 0.75rem",
            }}
          >
            Not included
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {pkg.notIncluded.map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#6b7280",
                  fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                }}
              >
                <span style={{ flexShrink: 0 }}>✕</span>
                {f}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>

    {/* CTA */}
    <Link
      to={`/contact?package=${pkg.name}`}
      style={{
        display: "block",
        textAlign: "center",
        padding: "clamp(12px, 1.2vw, 18px) 24px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
        transition: "all 0.2s",
        backgroundColor: pkg.popular ? "#06b6d4" : "transparent",
        color: pkg.popular ? "#ffffff" : "#22d3ee",
        border: pkg.popular
          ? "2px solid #06b6d4"
          : "2px solid rgba(34,211,238,0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#22d3ee";
        e.currentTarget.style.borderColor = "#22d3ee";
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        if (pkg.popular) {
          e.currentTarget.style.backgroundColor = "#06b6d4";
          e.currentTarget.style.borderColor = "#06b6d4";
          e.currentTarget.style.color = "#ffffff";
        } else {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
          e.currentTarget.style.color = "#22d3ee";
        }
      }}
    >
      Get Started →
    </Link>
  </div>
);

export const PricingPage = () => {
  const { pricing: PRICING_PACKAGES } = useSiteData();
  const [displayFaqs, setDisplayFaqs] = useState(DEFAULT_FAQS);

  useEffect(() => {
    getFaqs()
      .then((data) => {
        if (data?.length > 0) setDisplayFaqs(data);
      })
      .catch(() => {}); // keep DEFAULT_FAQS on error
  }, []);
  return (
    <div style={{ paddingTop: "6rem" }}>
      {/* Header */}
      <section style={{ ...section("#070b1d"), padding: "5rem 0 6rem" }}>
        <div style={{ ...inner, textAlign: "center" }}>
          <p
            style={{
              color: "#22d3ee",
              textTransform: "uppercase",
              letterSpacing: "4px",
              fontSize: "clamp(0.75rem, 1vw, 1rem)",
              marginBottom: "1rem",
            }}
          >
            Transparent Pricing
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.5rem, 4vw, 5.5rem)",
              fontWeight: 900,
              marginBottom: "1.25rem",
            }}
          >
            Simple, Clear <span style={{ color: "#22d3ee" }}>Pricing</span>
          </h1>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(1rem, 1.3vw, 1.35rem)",
              maxWidth: "40rem",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No hidden fees. No surprises. Pick the package that fits your
            project and let's get started.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section style={section()}>
        <div style={inner}>
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(clamp(280px, 28vw, 420px), 1fr))",
              alignItems: "start",
            }}
          >
            {PRICING_PACKAGES.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Custom note */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              borderRadius: "1.25rem",
              backgroundColor: "rgba(34,211,238,0.05)",
              border: "1px solid rgba(34,211,238,0.15)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                marginBottom: "6px",
              }}
            >
              🤝 Need something custom?
            </p>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                marginBottom: "1.25rem",
              }}
            >
              Every project is different. Reach out and I'll give you a tailored
              quote within 24 hours.
            </p>
            <Link
              to="/contact"
              style={{
                display: "inline-block",
                padding: "clamp(10px, 1vw, 14px) clamp(24px, 2.5vw, 40px)",
                backgroundColor: "#06b6d4",
                color: "#ffffff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#22d3ee")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#06b6d4")
              }
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={section("#070b1d")}>
        <div style={inner}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#22d3ee",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontSize: "clamp(0.75rem, 1vw, 1rem)",
                marginBottom: "0.75rem",
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 3.5vw, 4rem)",
                fontWeight: 900,
              }}
            >
              Pricing Questions
            </h2>
          </div>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {displayFaqs.map(({ question, q, answer, a }, i) => (
              <details
                key={i}
                style={{
                  padding: "1.5rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {question || q} <span style={{ color: "#22d3ee" }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: "1rem",
                    color: "#9ca3af",
                    lineHeight: 1.7,
                    fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)",
                  }}
                >
                  {answer || a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section style={{ ...section(), textAlign: "center" }}>
        <div style={inner}>
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              marginBottom: "4rem",
            }}
          >
            {[
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Safe and transparent transactions every time.",
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                desc: "I respect your deadlines. Always.",
              },
              {
                icon: "🔄",
                title: "Free Revisions",
                desc: "Until you're 100% satisfied with the result.",
              },
              {
                icon: "🤝",
                title: "24/7 Support",
                desc: "I'm here whenever you need me.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "2rem",
                  borderRadius: "1.25rem",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#22d3ee")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                  {icon}
                </div>
                <h4
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "clamp(0.8rem, 1vw, 1rem)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              fontWeight: 900,
              marginBottom: "1rem",
            }}
          >
            Ready to <span style={{ color: "#22d3ee" }}>Get Started?</span>
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(1rem, 1.3vw, 1.3rem)",
              marginBottom: "2.5rem",
            }}
          >
            Choose a package above or contact me for a custom quote.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              padding: "clamp(14px, 1.4vw, 20px) clamp(40px, 4vw, 70px)",
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            Contact Me Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

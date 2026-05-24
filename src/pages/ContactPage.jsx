import { ContactForm } from "../components/ContactForm";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { SectionHeader } from "../components/SectionHeader";
import { useSiteData } from "../context/SiteDataContext";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on the scope. A simple website can be done in 3–5 days, while complex e-commerce or automation projects may take 1–3 weeks.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes! I offer revisions based on the agreed scope and work closely with clients to ensure the final result meets expectations.",
  },
  {
    q: "What platforms do you work with?",
    a: "I specialize in Shopify, WooCommerce, WordPress, and custom web applications built with modern frameworks like React.",
  },
  {
    q: "Can you handle large product catalogs?",
    a: "Absolutely. I've successfully managed and uploaded 5,000+ product listings with complex variants, images, and metadata.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes, I offer 24/7 support for ongoing maintenance, updates, and troubleshooting after project delivery.",
  },
];

const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };

export const ContactPage = () => {
  // ← all contact info comes from database via context
  const { testimonials, owner } = useSiteData();

  const whatsappNumber = (owner.whatsapp || "").replace(/\D/g, "");

  // Build contact info dynamically from database
  const contactItems = [
    owner.email && {
      icon: "📧",
      label: "Email",
      value: owner.email,
      href: `mailto:${owner.email}`,
    },
    owner.whatsapp && {
      icon: "💬",
      label: "WhatsApp",
      value: owner.whatsapp,
      href: `https://wa.me/${whatsappNumber}`,
    },
    owner.location && {
      icon: "📍",
      label: "Location",
      value: owner.location,
      href: null,
    },
    { icon: "⏰", label: "Response", value: "Within 24 hours", href: null },
  ].filter(Boolean);

  return (
    <div style={{ paddingTop: "6rem" }}>
      {/* Header */}
      <section
        style={{ width: "100%", padding: "5rem 0", backgroundColor: "#070b1d" }}
      >
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
            Get in Touch
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.5rem, 4vw, 6rem)",
              fontWeight: 900,
              marginBottom: "1.5rem",
            }}
          >
            Let's Work <span style={{ color: "#22d3ee" }}>Together</span>
          </h1>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(1rem, 1.3vw, 1.4rem)",
              lineHeight: 1.7,
            }}
          >
            Send your project details and let's make it happen.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section
        style={{ width: "100%", padding: "6rem 0", backgroundColor: "#050816" }}
      >
        <div style={inner}>
          <div
            style={{
              display: "grid",
              gap: "4rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              alignItems: "start",
            }}
          >
            {/* Left — Info from database */}
            <div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.75rem, 2.5vw, 3.5rem)",
                  fontWeight: 900,
                  marginBottom: "1rem",
                }}
              >
                Send a <span style={{ color: "#22d3ee" }}>Message</span>
              </h2>
              <p
                style={{
                  color: "#9ca3af",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                  fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
                }}
              >
                Fill out the form and I'll get back to you within 24 hours.
              </p>

              {/* Contact info cards — built from database */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  marginBottom: "2.5rem",
                }}
              >
                {contactItems.map(({ icon, label, value, href }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      padding: "clamp(1rem, 1.5vw, 1.75rem)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "1rem",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(40px, 3.5vw, 60px)",
                        height: "clamp(40px, 3.5vw, 60px)",
                        borderRadius: "0.75rem",
                        backgroundColor: "rgba(6,182,212,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#9ca3af",
                          fontSize: "clamp(0.75rem, 1vw, 1rem)",
                        }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#ffffff",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#22d3ee")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "#ffffff")
                          }
                        >
                          {value}
                        </a>
                      ) : (
                        <p
                          style={{
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
                          }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "clamp(10px, 1vw, 16px) clamp(16px, 1.5vw, 24px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(34,211,238,0.3)",
                  backgroundColor: "rgba(34,211,238,0.05)",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "9999px",
                    backgroundColor: "#4ade80",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: "#d1d5db",
                    fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
                  }}
                >
                  Usually responds within{" "}
                  <span style={{ color: "#22d3ee", fontWeight: 600 }}>
                    24 hours
                  </span>
                </span>
              </div>
            </div>

            {/* Right — Form */}
            <div
              style={{
                padding: "clamp(1.5rem, 2vw, 2.5rem)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ width: "100%", padding: "6rem 0", backgroundColor: "#070b1d" }}
      >
        <div style={inner}>
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Answers to the most common questions about working with me."
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                style={{
                  padding: "clamp(1.25rem, 1.5vw, 2rem)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "1rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    listStyle: "none",
                  }}
                >
                  {q}{" "}
                  <span
                    style={{
                      color: "#22d3ee",
                      fontSize: "1.25rem",
                      marginLeft: "1rem",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: "1rem",
                    color: "#9ca3af",
                    lineHeight: 1.7,
                    fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{ width: "100%", padding: "6rem 0", backgroundColor: "#050816" }}
      >
        <div style={inner}>
          <SectionHeader eyebrow="Testimonials" title="Client Reviews" />
          <TestimonialsGrid testimonials={testimonials || []} />
        </div>
      </section>
    </div>
  );
};

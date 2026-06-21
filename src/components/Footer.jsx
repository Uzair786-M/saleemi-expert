import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { SocialIcon } from "./SocialIcon";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => {
  const { owner, socialLinks, services } = useSiteData();
  const whatsappNumber = (owner.whatsapp || "").replace(/\D/g, "");

  // Auto-sync footer service links with actual services from database
  const displayServices =
    services?.length > 0
      ? services.map((s) => ({
          label: s.title || s.name || s.label,
          url: "/services",
        }))
      : [
          { label: "Shopify Product Upload", url: "/services" },
          { label: "WooCommerce CSV Import", url: "/services" },
          { label: "Bulk Automation", url: "/services" },
          { label: "Web Development", url: "/services" },
        ];

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#070b1d",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{ width: "100%", padding: "4rem clamp(1.5rem, 5vw, 6rem) 2rem" }}
      >
        <div
          style={{
            display: "grid",
            gap: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ textAlign: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
              </span>
            </Link>
            <p
              style={{
                color: "#6b7280",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                lineHeight: 1.7,
                marginTop: "0.75rem",
              }}
            >
              {owner.tagline ||
                "E-commerce Expert | CSV & Bulk Product Automation | Web Developer"}
            </p>

            {/* Social icon buttons */}
            {socialLinks.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "1.25rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {socialLinks.map((link, i) => (
                  <a
                    key={link._id || i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    style={{
                      minWidth: "36px",
                      height: "36px",
                      padding: "0 10px",
                      borderRadius: "8px",
                      backgroundColor: `${link.color}18`,
                      border: `1px solid ${link.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${link.color}35`;
                      e.currentTarget.style.borderColor = link.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${link.color}18`;
                      e.currentTarget.style.borderColor = `${link.color}40`;
                    }}
                  >
                    <SocialIcon
                      label={link.label}
                      icon={link.icon}
                      color={link.color}
                      size={16}
                    />
                  </a>
                ))}
              </div>
            )}

            {/* Availability badge */}
            {owner.available && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  marginTop: "1rem",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "9999px",
                    backgroundColor: "#10b981",
                  }}
                />
                <span
                  style={{
                    color: "#10b981",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  Available for Work
                </span>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      color: "#6b7280",
                      textDecoration: "none",
                      fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#22d3ee")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6b7280")
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {displayServices.map((s, i) => (
                <li key={i}>
                  <Link
                    to={s.url || "/services"}
                    style={{
                      color: "#6b7280",
                      textDecoration: "none",
                      fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#22d3ee")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6b7280")
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Get In Touch
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {owner.email && (
                <a
                  href={`mailto:${owner.email}`}
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22d3ee")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  📧 {owner.email}
                </a>
              )}
              {owner.whatsapp && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#25d366")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  💬 WhatsApp ({owner.whatsapp})
                </a>
              )}
              {owner.location && (
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  📍 {owner.location}
                </p>
              )}
              {socialLinks.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    justifyContent: "center",
                  }}
                >
                  {socialLinks.map((link, i) => (
                    <a
                      key={link._id || i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "5px 12px",
                        borderRadius: "9999px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        backgroundColor: `${link.color}18`,
                        color: link.color,
                        border: `1px solid ${link.color}40`,
                        transition: "all 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = `${link.color}30`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = `${link.color}18`)
                      }
                    >
                      <SocialIcon
                        label={link.label}
                        icon={link.icon}
                        color={link.color}
                        size={13}
                      />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "#374151",
              fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
            }}
          >
            © {new Date().getFullYear()} SaleemiExpert. All rights reserved.
          </p>
          <p
            style={{
              color: "#374151",
              fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
            }}
          >
            🇵🇰 Based in Pakistan · Serving clients worldwide
          </p>
          <Link
            to="/admin"
            title="Admin"
            style={{
              color: "#374151",
              textDecoration: "none",
              fontSize: "0.7rem",
              fontWeight: 500,
              padding: "4px 8px",
              borderRadius: "6px",
              transition: "all 0.3s",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#22d3ee";
              e.currentTarget.style.backgroundColor = "rgba(34,211,238,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ⚙ Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

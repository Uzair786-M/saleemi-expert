import { Link } from "react-router-dom";

export const ServiceCard = ({ service, showLink = false }) => (
  <div
    style={{
      padding: "clamp(1.5rem, 2vw, 2.5rem)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(255,255,255,0.05)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s, border-color 0.3s",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.borderColor = "#22d3ee";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    }}
  >
    <div
      style={{
        width: "clamp(48px, 4vw, 72px)",
        height: "clamp(48px, 4vw, 72px)",
        borderRadius: "1rem",
        backgroundColor: "rgba(6,182,212,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(1.25rem, 2vw, 2rem)",
        marginBottom: "1.5rem",
      }}
    >
      {service.icon}
    </div>
    <h3
      style={{
        color: "#ffffff",
        fontSize: "clamp(1.1rem, 1.5vw, 1.75rem)",
        fontWeight: 700,
        marginBottom: "1rem",
      }}
    >
      {service.title}
    </h3>
    <p
      style={{
        color: "#9ca3af",
        lineHeight: 1.7,
        flex: 1,
        fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
      }}
    >
      {service.shortDesc}
    </p>
    {showLink && (
      <Link
        to="/services"
        style={{
          marginTop: "1.5rem",
          color: "#22d3ee",
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-block",
          transition: "transform 0.2s",
          fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateX(4px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateX(0)")
        }
      >
        Learn More →
      </Link>
    )}
  </div>
);

export const ServicesGrid = ({ services, showLink = false }) => (
  <div
    style={{
      display: "grid",
      gap: "clamp(1rem, 2vw, 2rem)",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(clamp(200px, 20vw, 280px), 1fr))",
    }}
  >
    {services.map((service) => (
      <ServiceCard key={service._id} service={service} showLink={showLink} />
    ))}
  </div>
);

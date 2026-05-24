import { Link } from "react-router-dom";

export const PortfolioCard = ({ item }) => (
  <Link to={`/portfolio/${item.id}`} style={{ textDecoration: "none" }}>
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "clamp(1.25rem, 2vw, 2rem)",
        overflow: "hidden",
        borderRadius: "1.5rem",
        border: "1px solid rgba(255,255,255,0.1)",
        height: "clamp(16rem, 20vw, 26rem)",
        background:
          "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(99,102,241,0.1))",
        transition: "transform 0.3s, border-color 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            color: "#22d3ee",
            fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          {item.category}
        </span>
        <h3
          style={{
            color: "#ffffff",
            fontSize: "clamp(1rem, 1.4vw, 1.6rem)",
            fontWeight: 700,
            marginBottom: "0.4rem",
          }}
        >
          {item.title}
        </h3>
        {item.result && (
          <p
            style={{
              color: "#22d3ee",
              fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
              marginBottom: "0.75rem",
            }}
          >
            ✓ {item.result}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)",
                padding: "2px 10px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#d1d5db",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p
          style={{
            color: "#22d3ee",
            fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
            marginTop: "0.75rem",
            fontWeight: 600,
          }}
        >
          View Case Study →
        </p>
      </div>
    </div>
  </Link>
);

export const PortfolioGrid = ({ items }) => (
  <div
    style={{
      display: "grid",
      gap: "clamp(1rem, 2vw, 2rem)",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(clamp(240px, 25vw, 380px), 1fr))",
    }}
  >
    {items.map((item) => (
      <PortfolioCard key={item._id} item={item} />
    ))}
  </div>
);

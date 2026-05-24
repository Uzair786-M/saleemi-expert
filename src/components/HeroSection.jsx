import { Link } from "react-router-dom";
import { STATS, HERO_CARDS } from "../data/constants";

export const HeroSection = () => {
  return (
    <section style={{ width: "100%", padding: "9rem 0 6rem", backgroundColor: "#050816" }}>
      <div style={{
        width: "100%",
        padding: "0 clamp(1.5rem, 5vw, 6rem)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        alignItems: "center",
        gap: "3rem",
      }}>
        {/* Left */}
        <div>
          <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "4px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "1rem" }}>
            Professional Digital Services
          </p>

          <h1 style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 4vw, 6rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Professional Digital
            <span style={{ display: "block", color: "#22d3ee" }}>Solutions & Services</span>
          </h1>

          <p style={{ color: "#d1d5db", fontSize: "clamp(1rem, 1.5vw, 1.5rem)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Helping businesses grow with professional web solutions, digital
            services, responsive websites, ecommerce support and modern online
            experiences.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link to="/contact" style={{
              padding: "clamp(12px, 1.2vw, 20px) clamp(24px, 2.5vw, 48px)",
              fontWeight: 600, borderRadius: "0.75rem",
              backgroundColor: "#06b6d4", color: "#ffffff",
              textDecoration: "none", transition: "background-color 0.2s",
              fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)",
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
            >Get Started</Link>

            <Link to="/portfolio" style={{
              padding: "clamp(12px, 1.2vw, 20px) clamp(24px, 2.5vw, 48px)",
              fontWeight: 600, borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff",
              textDecoration: "none", backgroundColor: "transparent",
              transition: "border-color 0.2s, color 0.2s",
              fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}
            >View Portfolio</Link>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "3.5rem" }}>
            {STATS.map(stat => (
              <div key={stat.label}>
                <h2 style={{ color: "#22d3ee", fontSize: "clamp(1.5rem, 2.5vw, 3rem)", fontWeight: 700 }}>{stat.value}</h2>
                <p style={{ color: "#9ca3af", fontSize: "clamp(0.75rem, 1vw, 1.1rem)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <div style={{
            position: "absolute", width: "40%", height: "40%",
            borderRadius: "9999px", backgroundColor: "rgba(6,182,212,0.15)",
            filter: "blur(80px)", zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "520px",
            padding: "clamp(1.5rem, 2vw, 3rem)",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {HERO_CARDS.map(card => (
                <div key={card.label} style={{
                  padding: "clamp(1rem, 1.5vw, 1.75rem)",
                  borderRadius: "1rem",
                  backgroundColor: "#0d1224",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <p style={{ color: "#9ca3af", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.5rem" }}>{card.label}</p>
                  <h3 style={{ color: "#ffffff", fontSize: "clamp(1rem, 1.3vw, 1.5rem)", fontWeight: 700 }}>{card.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

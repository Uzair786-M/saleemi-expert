import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Link } from "react-router-dom";
import { PortfolioGrid } from "../components/PortfolioGrid";
import { AnimatedCounter } from "../components/AnimatedCounter";

const CATEGORIES = ["All", "E-commerce", "Automation", "Web Development"];
const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };

export const PortfolioPage = () => {
  const { portfolio, stats } = useSiteData();
  const loading = false;
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? (portfolio ?? [])
      : (portfolio ?? []).filter((item) => item.category === activeCategory);

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
            My Work
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.5rem, 4vw, 6rem)",
              fontWeight: 900,
              marginBottom: "1.5rem",
            }}
          >
            Recent <span style={{ color: "#22d3ee" }}>Projects</span>
          </h1>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(1rem, 1.3vw, 1.4rem)",
              lineHeight: 1.7,
            }}
          >
            A showcase of projects spanning e-commerce, automation, and web
            development.
          </p>
        </div>
      </section>

      {/* Portfolio */}
      <section
        style={{ width: "100%", padding: "6rem 0", backgroundColor: "#050816" }}
      >
        <div style={inner}>
          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "3.5rem",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "clamp(8px, 0.8vw, 14px) clamp(16px, 2vw, 32px)",
                  borderRadius: "9999px",
                  fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor:
                    activeCategory === cat ? "#06b6d4" : "transparent",
                  color: activeCategory === cat ? "#ffffff" : "#9ca3af",
                  border:
                    activeCategory === cat
                      ? "1px solid #06b6d4"
                      : "1px solid rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "#22d3ee";
                    e.currentTarget.style.color = "#22d3ee";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "#9ca3af";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "18rem",
                    borderRadius: "1.5rem",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <PortfolioGrid items={filtered} />
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "5rem 0",
              }}
            >
              No projects found in this category.
            </p>
          )}
        </div>
      </section>

      {/* Stats — from database */}
      <section
        style={{ width: "100%", padding: "5rem 0", backgroundColor: "#070b1d" }}
      >
        <div style={inner}>
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              textAlign: "center",
            }}
          >
            {(stats?.length > 0
              ? stats
              : [
                  { value: 100, suffix: "+", label: "Projects Completed" },
                  { value: 50, suffix: "+", label: "Happy Clients" },
                  { value: 5, suffix: "+", label: "Years Experience" },
                  { value: 99, suffix: "%", label: "Client Satisfaction" },
                ]
            ).map((stat, i) => (
              <div key={i}>
                <h3
                  style={{
                    color: "#22d3ee",
                    fontSize: "clamp(2rem, 3.5vw, 5rem)",
                    fontWeight: 900,
                    marginBottom: "0.5rem",
                  }}
                >
                  <AnimatedCounter
                    target={Number(stat.value) || 0}
                    suffix={stat.suffix || "+"}
                    duration={1800}
                  />
                </h3>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "clamp(0.875rem, 1.1vw, 1.3rem)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          width: "100%",
          padding: "6rem 0",
          backgroundColor: "#050816",
          textAlign: "center",
        }}
      >
        <div style={inner}>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 5rem)",
              fontWeight: 900,
              marginBottom: "1.5rem",
            }}
          >
            Have a Project in <span style={{ color: "#22d3ee" }}>Mind?</span>
          </h2>
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "2.5rem",
              fontSize: "clamp(1rem, 1.3vw, 1.4rem)",
            }}
          >
            Let's discuss and bring your vision to life.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              padding: "clamp(12px, 1.2vw, 20px) clamp(32px, 3vw, 60px)",
              fontWeight: 700,
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "background-color 0.2s",
              fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </div>
  );
};

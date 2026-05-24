import { useParams, Link, useNavigate } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";

const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };

export const PortfolioDetailPage = () => {
  const { id }   = useParams();
  const { portfolio: PORTFOLIO_ITEMS } = useSiteData();
  const navigate = useNavigate();
  const item     = PORTFOLIO_ITEMS.find(p => p.id === Number(id));

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#050816", textAlign: "center", padding: "2rem", paddingTop: "8rem" }}>
        <h1 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>Project Not Found</h1>
        <Link to="/portfolio" style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 600 }}>← Back to Portfolio</Link>
      </div>
    );
  }

  // Prev / Next navigation
  const currentIndex = PORTFOLIO_ITEMS.findIndex(p => p.id === item.id);
  const prev = PORTFOLIO_ITEMS[currentIndex - 1];
  const next = PORTFOLIO_ITEMS[currentIndex + 1];

  return (
    <div style={{ paddingTop: "6rem", backgroundColor: "#050816" }}>

      {/* Back button */}
      <div style={{ ...inner, paddingTop: "2rem", paddingBottom: "1rem" }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "color 0.2s", padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
          onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
        >← Back to Portfolio</button>
      </div>

      {/* Hero */}
      <section style={{ width: "100%", padding: "3rem 0 4rem" }}>
        <div style={inner}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
                {item.category}
              </span>
              <h1 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 4.5rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.5rem" }}>{item.title}</h1>
              <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", lineHeight: 1.8, marginBottom: "2rem" }}>{item.description}</p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{ padding: "6px 16px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.07)", color: "#d1d5db", fontSize: "clamp(0.8rem, 1vw, 1rem)", border: "1px solid rgba(255,255,255,0.1)" }}>{tag}</span>
                ))}
              </div>

              <Link to="/contact" style={{ display: "inline-block", padding: "clamp(12px, 1.2vw, 18px) clamp(28px, 3vw, 48px)", backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "background-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
              >Start Similar Project →</Link>
            </div>

            {/* Project image / placeholder */}
            <div style={{
              height:          "clamp(250px, 25vw, 400px)",
              borderRadius:    "1.5rem",
              background:      "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.15))",
              border:          "1px solid rgba(255,255,255,0.1)",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              fontSize:        "5rem",
            }}>
              {item.category === "E-commerce" ? "🛒" : item.category === "Automation" ? "⚡" : "🌐"}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ width: "100%", padding: "4rem 0", backgroundColor: "#070b1d" }}>
        <div style={inner}>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {[
              { label: "Category",  value: item.category },
              { label: "Duration",  value: item.duration || "Custom" },
              { label: "Result",    value: item.result   || "Delivered on time" },
              { label: "Status",    value: "Completed ✓" },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "1.5rem", borderRadius: "1.25rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <p style={{ color: "#9ca3af", fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{label}</p>
                <p style={{ color: "#22d3ee", fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)", fontWeight: 700 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What was done */}
      <section style={{ width: "100%", padding: "5rem 0" }}>
        <div style={inner}>
          <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {[
              { icon: "🎯", title: "The Challenge",  text: `The client needed ${item.title.toLowerCase()} handled professionally, accurately and fast — with zero margin for error.` },
              { icon: "💡", title: "My Approach",    text: "I analyzed the full scope of work first, planned a structured workflow, then executed step by step with regular client check-ins to ensure everything was on track." },
              { icon: "✅", title: "The Result",     text: item.result ? `${item.result}. The client was extremely satisfied with the quality and turnaround time.` : "Delivered on time, within budget, and to the exact specifications provided by the client." },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ padding: "clamp(1.5rem, 2vw, 2.5rem)", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ color: "#ffffff", fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section style={{ width: "100%", padding: "3rem 0 5rem", backgroundColor: "#070b1d" }}>
        <div style={inner}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            {prev ? (
              <Link to={`/portfolio/${prev.id}`} style={{ padding: "1.25rem 2rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", backgroundColor: "rgba(255,255,255,0.04)", transition: "border-color 0.2s", maxWidth: "45%" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              >
                <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "4px" }}>← Previous</p>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)" }}>{prev.title}</p>
              </Link>
            ) : <div />}

            {next && (
              <Link to={`/portfolio/${next.id}`} style={{ padding: "1.25rem 2rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", backgroundColor: "rgba(255,255,255,0.04)", transition: "border-color 0.2s", textAlign: "right", maxWidth: "45%" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              >
                <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "4px" }}>Next →</p>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)" }}>{next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

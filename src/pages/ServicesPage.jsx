import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { SectionHeader } from "../components/SectionHeader";



const steps = [
  { step: "01", title: "Discovery", desc: "We discuss your goals, requirements, and project scope in detail." },
  { step: "02", title: "Planning", desc: "A clear roadmap, timeline, and deliverables are defined." },
  { step: "03", title: "Execution", desc: "Your project is built with precision, quality, and attention to detail." },
  { step: "04", title: "Delivery", desc: "Final deliverables, revisions, and ongoing support as needed." },
];

const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };

export const ServicesPage = () => {
  const { services } = useSiteData();
  const loading = false;

  return (
    <div style={{ paddingTop: "6rem" }}>
      {/* Header */}
      <section style={{ width: "100%", padding: "5rem 0", backgroundColor: "#070b1d" }}>
        <div style={{ ...inner, textAlign: "center" }}>
          <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "4px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "1rem" }}>What I Offer</p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 4vw, 6rem)", fontWeight: 900, marginBottom: "1.5rem" }}>
            My <span style={{ color: "#22d3ee" }}>Services</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 1.3vw, 1.4rem)", lineHeight: 1.7 }}>
            From web development to digital solutions — professional services tailored to help your business grow online.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ width: "100%", padding: "6rem 0", backgroundColor: "#050816" }}>
        <div style={inner}>
          {loading ? (
            <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {[1,2,3,4].map(i => <div key={i} style={{ height: "18rem", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)" }} />)}
            </div>
          ) : (
            <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 2rem)", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(260px, 25vw, 500px), 1fr))" }}>
              {(services ?? []).map(service => (
                <div key={service.id}
                  style={{ padding: "clamp(1.5rem, 2vw, 2.5rem)", borderRadius: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#22d3ee"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{ width: "clamp(48px, 4vw, 72px)", height: "clamp(48px, 4vw, 72px)", borderRadius: "1rem", backgroundColor: "rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.25rem, 2vw, 2rem)", flexShrink: 0 }}>
                      {service.icon}
                    </div>
                    <h3 style={{ color: "#ffffff", fontSize: "clamp(1.1rem, 1.5vw, 1.75rem)", fontWeight: 700 }}>{service.title}</h3>
                  </div>
                  <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)" }}>{service.fullDesc}</p>
                  {service.features && (
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {service.features.map(f => (
                        <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#d1d5db", fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)" }}>
                          <span style={{ color: "#22d3ee", flexShrink: 0 }}>✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section style={{ width: "100%", padding: "6rem 0", backgroundColor: "#070b1d" }}>
        <div style={inner}>
          <SectionHeader eyebrow="How It Works" title="My Work Process" subtitle="A streamlined process designed to deliver results efficiently." />
          <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 2rem)", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 20vw, 340px), 1fr))" }}>
            {steps.map(({ step, title, desc }) => (
              <div key={step} style={{ padding: "clamp(1.5rem, 2vw, 2.5rem)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)", position: "relative" }}>
                <span style={{ position: "absolute", top: "1rem", right: "1.5rem", fontSize: "clamp(2.5rem, 4vw, 5rem)", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>{step}</span>
                <div style={{ width: "clamp(36px, 3vw, 52px)", height: "clamp(36px, 3vw, 52px)", borderRadius: "9999px", backgroundColor: "#06b6d4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "1.25rem", color: "#ffffff" }}>{step}</div>
                <h3 style={{ color: "#ffffff", fontSize: "clamp(1.1rem, 1.4vw, 1.6rem)", fontWeight: 700, marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ width: "100%", padding: "6rem 0", backgroundColor: "#050816", textAlign: "center" }}>
        <div style={inner}>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 5rem)", fontWeight: 900, marginBottom: "1.5rem" }}>
            Ready to Get <span style={{ color: "#22d3ee" }}>Started?</span>
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: "2.5rem", fontSize: "clamp(1rem, 1.3vw, 1.4rem)" }}>Let's discuss your project and create something amazing together.</p>
          <Link to="/contact" style={{ display: "inline-block", padding: "clamp(12px, 1.2vw, 20px) clamp(32px, 3vw, 60px)", fontWeight: 700, backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "0.75rem", textDecoration: "none", transition: "background-color 0.2s", fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
          >Start a Project →</Link>
        </div>
      </section>
    </div>
  );
};

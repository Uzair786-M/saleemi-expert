import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { SectionHeader } from "../components/SectionHeader";
import { ServicesGrid } from "../components/ServicesGrid";
import { PortfolioCard } from "../components/PortfolioGrid";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { ContactForm } from "../components/ContactForm";
import { useSiteData } from "../context/SiteDataContext";

const S = {
  section: (bg) => ({
    width: "100%",
    padding: "6rem 0",
    backgroundColor: bg || "#050816",
  }),
  inner: { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" },
  ctaBtn: {
    display: "inline-block",
    marginTop: "3rem",
    padding: "clamp(12px, 1.2vw, 18px) clamp(24px, 2.5vw, 44px)",
    fontWeight: 600,
    borderRadius: "0.75rem",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#ffffff",
    textDecoration: "none",
    backgroundColor: "transparent",
    fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
    transition: "border-color 0.2s, color 0.2s",
  },
};

export const HomePage = () => {
  const { services, portfolio, testimonials } = useSiteData();

  return (
    <>
      <HeroSection />

      {/* Services */}
      <section style={S.section()}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Services" title="What I Offer" />
          <ServicesGrid services={services} showLink />
          <div style={{ textAlign: "center" }}>
            <Link
              to="/services"
              style={S.ctaBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22d3ee";
                e.currentTarget.style.color = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section style={S.section("#070b1d")}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Portfolio" title="Recent Projects" />
          <div
            style={{
              display: "grid",
              gap: "clamp(1rem, 2vw, 2rem)",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(clamp(240px, 22vw, 380px), 1fr))",
            }}
          >
            {portfolio.slice(0, 4).map((item) => (
              <PortfolioCard key={item._id} item={item} />
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link
              to="/portfolio"
              style={S.ctaBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22d3ee";
                e.currentTarget.style.color = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={S.section()}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Testimonials" title="Client Reviews" />
          <TestimonialsGrid testimonials={testimonials.slice(0, 3)} />
        </div>
      </section>

      {/* Contact */}
      <section style={S.section("#070b1d")}>
        <div style={{ width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
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
              Contact
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 3.5vw, 4.5rem)",
                fontWeight: 900,
                marginBottom: "1rem",
              }}
            >
              Let's Work Together
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
              }}
            >
              Need a modern website, digital solution or professional online
              presence?
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

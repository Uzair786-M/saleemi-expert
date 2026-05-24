export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: "4rem" }}>
    <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.75rem" }}>
      {eyebrow}
    </p>
    <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 5rem)", fontWeight: 900, marginBottom: "1rem" }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ color: "#9ca3af", fontSize: "clamp(0.9rem, 1.3vw, 1.4rem)", maxWidth: "60rem", margin: "0 auto", lineHeight: 1.7 }}>
        {subtitle}
      </p>
    )}
  </div>
);

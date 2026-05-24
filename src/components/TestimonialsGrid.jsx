const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "4px", marginBottom: "1.25rem" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
          color: star <= rating ? "#facc15" : "#374151",
        }}
      >
        ★
      </span>
    ))}
  </div>
);

export const TestimonialCard = ({ item }) => (
  <div
    style={{
      padding: "clamp(1.5rem, 2vw, 2.5rem)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(255,255,255,0.05)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <StarRating rating={item.rating} />
    <p
      style={{
        color: "#d1d5db",
        lineHeight: 1.7,
        flex: 1,
        marginBottom: "1.5rem",
        fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
      }}
    >
      "{item.review}"
    </p>
    <div>
      <h4
        style={{
          color: "#ffffff",
          fontSize: "clamp(1rem, 1.3vw, 1.4rem)",
          fontWeight: 700,
        }}
      >
        {item.name}
      </h4>
      <p style={{ color: "#9ca3af", fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}>
        {item.title ?? "Verified Client"}
      </p>
    </div>
  </div>
);

export const TestimonialsGrid = ({ testimonials }) => (
  <div
    style={{
      display: "grid",
      gap: "clamp(1rem, 2vw, 2rem)",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(clamp(260px, 25vw, 420px), 1fr))",
    }}
  >
    {testimonials.map((item) => (
      <TestimonialCard key={item._id} item={item} />
    ))}
  </div>
);

import { useContactForm } from "../hooks/useData";
import { submitContactForm } from "../services/api";

const inputStyle = {
  width: "100%",
  padding: "clamp(12px, 1.2vw, 20px) clamp(16px, 1.5vw, 24px)",
  border: "1px solid rgba(255,255,255,0.1)",
  outline: "none",
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: "1rem",
  color: "#ffffff",
  fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
  transition: "border-color 0.2s",
};

const StyledInput = ({ type = "text", name, placeholder, value, onChange }) => (
  <input
    type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
    style={inputStyle}
    onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"}
    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
  />
);

export const ContactForm = () => {
  const { formData, handleChange, handleSubmit, status, errorMsg } = useContactForm(submitContactForm);

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <StyledInput name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
        <StyledInput type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
      </div>
      <StyledInput name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
      <textarea
        name="message" rows="6" placeholder="Your Message"
        value={formData.message} onChange={handleChange}
        style={{ ...inputStyle, resize: "none" }}
        onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"}
        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
      />
      {status === "error" && <p style={{ color: "#f87171", fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>{errorMsg}</p>}
      {status === "success" && <p style={{ color: "#4ade80", fontSize: "clamp(0.8rem, 1vw, 1rem)", fontWeight: 600 }}>✅ Your message has been sent! We'll get back to you shortly.</p>}
      <button
        type="submit" disabled={status === "loading"}
        style={{
          padding: "clamp(12px, 1.2vw, 20px) clamp(24px, 2.5vw, 48px)",
          fontWeight: 700, borderRadius: "1rem", border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          backgroundColor: status === "loading" ? "#0e7490" : "#06b6d4",
          color: "#ffffff", fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
          transition: "background-color 0.2s", width: "fit-content",
        }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#22d3ee"; }}
        onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#06b6d4"; }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};

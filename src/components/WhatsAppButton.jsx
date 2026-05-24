import { useSiteData } from "../context/SiteDataContext";

export const WhatsAppButton = () => {
  // ← reads live whatsapp number from database via context
  const { owner } = useSiteData();

  const rawNumber = (owner.whatsapp || "").replace(/\D/g, "");

  // Don't render if no whatsapp number set
  if (!rawNumber) return null;

  const message = encodeURIComponent(
    "Hi SaleemiExpert! I visited your website and I'd like to discuss a project.",
  );
  const href = `https://wa.me/${rawNumber}?text=${message}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 999,
          width: "clamp(52px, 4vw, 64px)",
          height: "clamp(52px, 4vw, 64px)",
          borderRadius: "9999px",
          backgroundColor: "#25d366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
          transition: "transform 0.2s, box-shadow 0.2s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.12)";
          e.currentTarget.style.boxShadow = "0 8px 36px rgba(37,211,102,0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.45)";
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.75-1.813A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.5a10.44 10.44 0 01-5.387-1.5l-.387-.23-4.6 1.076 1.1-4.47-.252-.4A10.44 10.44 0 015.5 15C5.5 9.21 10.21 4.5 16 4.5S26.5 9.21 26.5 15 21.79 25.5 16 25.5zm5.77-7.57c-.316-.158-1.87-.92-2.16-1.026-.29-.105-.5-.158-.71.158-.21.316-.814.999-1 1.209-.184.21-.368.237-.684.08-.316-.158-1.334-.49-2.541-1.563-.94-.836-1.574-1.868-1.758-2.183-.184-.316-.02-.487.138-.644.142-.14.316-.368.474-.553.158-.184.21-.316.316-.527.105-.21.053-.395-.027-.553-.079-.158-.71-1.71-.973-2.34-.256-.614-.516-.531-.71-.54l-.605-.01c-.21 0-.553.079-.843.395-.29.316-1.105 1.08-1.105 2.633 0 1.553 1.13 3.053 1.288 3.263.158.21 2.225 3.394 5.388 4.758.753.325 1.34.519 1.797.664.755.24 1.443.206 1.987.125.606-.09 1.87-.764 2.134-1.502.263-.737.263-1.37.184-1.502-.079-.132-.29-.21-.605-.368z" />
        </svg>
      </a>

      {/* Pulse ring */}
      <span
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 998,
          width: "clamp(52px, 4vw, 64px)",
          height: "clamp(52px, 4vw, 64px)",
          borderRadius: "9999px",
          backgroundColor: "rgba(37,211,102,0.3)",
          animation: "wa-ping 2.2s ease-out infinite",
          pointerEvents: "none",
        }}
      />

      <style>{`@keyframes wa-ping { 0% { transform: scale(1); opacity: 0.75; } 100% { transform: scale(2); opacity: 0; } }`}</style>
    </>
  );
};

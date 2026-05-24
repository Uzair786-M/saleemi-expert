import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const ToastContext = createContext(null);

// Toast types config
const TYPES = {
  success: {
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.3)",
    color: "#10b981",
    icon: "✓",
  },
  error: {
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.3)",
    color: "#f87171",
    icon: "✕",
  },
  warning: {
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
    color: "#f59e0b",
    icon: "⚠",
  },
  info: {
    bg: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.3)",
    color: "#22d3ee",
    icon: "ℹ",
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const toast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      duration,
    );
    return id;
  }, []);

  // Convenience methods
  toast.success = (msg, dur) => toast(msg, "success", dur);
  toast.error = (msg, dur) => toast(msg, "error", dur || 6000);
  toast.warning = (msg, dur) => toast(msg, "warning", dur);
  toast.info = (msg, dur) => toast(msg, "info", dur);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          bottom: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
          width: "min(420px, 90vw)",
        }}
      >
        {toasts.map((t) => {
          const style = TYPES[t.type] || TYPES.info;
          return (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "14px 16px",
                backgroundColor: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                pointerEvents: "all",
                animation: "toastIn 0.25s ease",
              }}
            >
              <span
                style={{
                  color: style.color,
                  fontSize: "1rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                {style.icon}
              </span>
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  flex: 1,
                  margin: 0,
                }}
              >
                {t.message}
              </p>
              <button
                onClick={() => dismiss(t.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1rem",
                  padding: "0 0 0 4px",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
};

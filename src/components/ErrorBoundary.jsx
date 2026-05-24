import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>💥</div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "0.5rem",
              lineHeight: 1.6,
            }}
          >
            An unexpected error occurred. This has been noted and will be fixed.
          </p>
          {process.env.NODE_ENV === "development" && (
            <pre
              style={{
                backgroundColor: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "8px",
                padding: "1rem",
                fontSize: "0.75rem",
                color: "#f87171",
                textAlign: "left",
                overflowX: "auto",
                margin: "1rem 0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.error?.message}
            </pre>
          )}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                padding: "10px 24px",
                backgroundColor: "#06b6d4",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "10px 24px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

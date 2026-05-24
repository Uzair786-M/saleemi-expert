import { useState, useEffect } from "react";
import api from "../../services/httpClient.js";

const Stars = ({ rating }) => (
  <span>
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        style={{
          color: s <= rating ? "#f59e0b" : "rgba(255,255,255,0.15)",
          fontSize: "0.9rem",
        }}
      >
        ★
      </span>
    ))}
  </span>
);

export const ReviewsAdminPage = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [tab, setTab] = useState("pending"); // "pending" | "approved"
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null); // id currently being acted on

  const loadAll = async () => {
    setLoading(true);
    try {
      const [pRes, aRes] = await Promise.all([
        api.get("/testimonials/pending"),
        api.get("/testimonials"),
      ]);
      setPending(pRes.data.data || []);
      // approved = all testimonials that are approved and from public source
      setApproved(
        (aRes.data.data || []).filter(
          (t) => t.source === "public" && t.status === "approved",
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const approve = async (id) => {
    setActionId(id);
    try {
      await api.put(`/testimonials/${id}/approve`);
      const item = pending.find((p) => p._id === id);
      setPending((prev) => prev.filter((p) => p._id !== id));
      if (item)
        setApproved((prev) => [
          { ...item, status: "approved", isActive: true },
          ...prev,
        ]);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Reject and hide this review?")) return;
    setActionId(id);
    try {
      await api.put(`/testimonials/${id}/reject`);
      setPending((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setActionId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Permanently delete this review?")) return;
    setActionId(id);
    try {
      await api.delete(`/testimonials/${id}`);
      setApproved((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setActionId(null);
    }
  };

  const ReviewCard = ({ item, isPending }) => (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "14px",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: `1px solid ${isPending ? "rgba(245,158,11,0.25)" : "rgba(16,185,129,0.2)"}`,
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "0.75rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "9999px",
                backgroundColor: isPending
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(16,185,129,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isPending ? "#f59e0b" : "#10b981",
                fontWeight: 700,
                fontSize: "0.9rem",
                flexShrink: 0,
              }}
            >
              {item.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                {item.name}
              </p>
              <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                {item.title || "Client"}
              </p>
            </div>
          </div>
          <Stars rating={item.rating} />
          {item.project && (
            <p
              style={{
                color: "#22d3ee",
                fontSize: "0.75rem",
                marginTop: "4px",
              }}
            >
              Project: {item.project}
            </p>
          )}
          {item.email && (
            <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
              Email: {item.email}
            </p>
          )}
        </div>

        {/* Status badge */}
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "0.72rem",
            fontWeight: 700,
            backgroundColor: isPending
              ? "rgba(245,158,11,0.12)"
              : "rgba(16,185,129,0.12)",
            color: isPending ? "#f59e0b" : "#10b981",
            flexShrink: 0,
          }}
        >
          {isPending ? "⏳ Pending" : "✓ Approved"}
        </span>
      </div>

      <p
        style={{
          color: "#d1d5db",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          marginBottom: "1rem",
          fontStyle: "italic",
        }}
      >
        "{item.review}"
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p style={{ color: "#4b5563", fontSize: "0.72rem" }}>
          Submitted:{" "}
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px" }}>
          {isPending && (
            <>
              <button
                onClick={() => approve(item._id)}
                disabled={actionId === item._id}
                style={{
                  padding: "7px 18px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(16,185,129,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(16,185,129,0.15)")
                }
              >
                {actionId === item._id ? "..." : "✓ Approve"}
              </button>
              <button
                onClick={() => reject(item._id)}
                disabled={actionId === item._id}
                style={{
                  padding: "7px 18px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(239,68,68,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(239,68,68,0.1)")
                }
              >
                ✕ Reject
              </button>
            </>
          )}
          {!isPending && (
            <button
              onClick={() => remove(item._id)}
              disabled={actionId === item._id}
              style={{
                padding: "7px 18px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: "rgba(239,68,68,0.1)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 900,
              marginBottom: "4px",
            }}
          >
            Client Reviews
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Review and approve submissions from the public review form.
          </p>
        </div>
        {/* Share link */}
        <div
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            backgroundColor: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.2)",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.72rem",
              marginBottom: "4px",
            }}
          >
            Share this link with clients:
          </p>
          <code
            style={{ color: "#22d3ee", fontSize: "0.8rem", fontWeight: 600 }}
          >
            {window.location.origin}/leave-review
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/leave-review`,
              );
            }}
            style={{
              marginLeft: "10px",
              padding: "3px 10px",
              backgroundColor: "rgba(34,211,238,0.15)",
              color: "#22d3ee",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.72rem",
              fontWeight: 600,
            }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
        {[
          {
            key: "pending",
            label: `⏳ Pending Approval`,
            count: pending.length,
          },
          { key: "approved", label: `✓ Approved`, count: approved.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "9px 20px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundColor: tab === key ? "#06b6d4" : "transparent",
              color: tab === key ? "#ffffff" : "#9ca3af",
              border:
                tab === key
                  ? "1px solid #06b6d4"
                  : "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {label}
            {count > 0 && (
              <span
                style={{
                  backgroundColor:
                    key === "pending"
                      ? "rgba(245,158,11,0.25)"
                      : "rgba(16,185,129,0.2)",
                  color: key === "pending" ? "#f59e0b" : "#10b981",
                  borderRadius: "9999px",
                  padding: "1px 8px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid rgba(34,211,238,0.15)",
              borderTop: "3px solid #22d3ee",
              borderRadius: "9999px",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          Loading reviews...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : tab === "pending" ? (
        pending.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: "16px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <p
              style={{
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              All caught up!
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              No reviews waiting for approval.
            </p>
          </div>
        ) : (
          pending.map((item) => (
            <ReviewCard key={item._id} item={item} isPending={true} />
          ))
        )
      ) : approved.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            No approved public reviews yet.
          </p>
        </div>
      ) : (
        approved.map((item) => (
          <ReviewCard key={item._id} item={item} isPending={false} />
        ))
      )}
    </div>
  );
};

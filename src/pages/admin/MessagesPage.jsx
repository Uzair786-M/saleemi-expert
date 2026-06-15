import { useState, useEffect } from "react";
import {
  fetchMessages,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
} from "../../services/api.js";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/httpClient.js";

const statusColor = { unread: "#22d3ee", read: "#6b7280", replied: "#10b981" };
const statusBg = {
  unread: "rgba(34,211,238,0.1)",
  read: "rgba(107,114,128,0.1)",
  replied: "rgba(16,185,129,0.1)",
};

export const MessagesPage = () => {
  const { isSuperAdmin } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [team, setTeam] = useState([]);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [filter]);

  // Update page title with unread count
  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Messages — SaleemiExpert`;
    } else {
      document.title = "Messages — SaleemiExpert";
    }
    return () => {
      document.title = "SaleemiExpert Admin";
    };
  }, [unreadCount]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages(filter);
      setMessages(data.data || []);
      setUnreadCount(data.unreadCount || 0);
      setIsFiltered(data.isFiltered || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSuperAdmin) return;
    api
      .get("/team")
      .then((r) => setTeam(r.data?.data || []))
      .catch(() => {});
  }, [isSuperAdmin]);

  const handleSelect = async (msg) => {
    setSelected(msg);
    setReply("");
    if (msg.status === "unread") {
      try {
        await updateMessageStatus(msg._id, "read");
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, status: "read" } : m)),
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleMarkAs = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m)),
      );
      if (selected?._id === id) setSelected((s) => ({ ...s, status }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = async () => {
    if (!reply.trim() || !selected) return;
    setSending(true);
    try {
      await replyToMessage(selected._id, reply);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === selected._id ? { ...m, status: "replied", reply } : m,
        ),
      );
      setSelected((s) => ({ ...s, status: "replied", reply }));
      setReply("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (msgId, memberId, memberName, memberSmtpEmail) => {
    setAssigning(true);
    try {
      const res = await api.put(`/contact/${msgId}/assign`, {
        assignedTo: memberId || null,
        assignedToName: memberName || null,
        assignedToEmail: memberSmtpEmail || null,
      });
      const updated = res.data?.data;
      setMessages((prev) => prev.map((m) => (m._id === msgId ? updated : m)));
      if (selected?._id === msgId) setSelected(updated);
    } catch (err) {
      alert(err.message);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
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
            Messages
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "unread", "read", "replied"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 16px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                backgroundColor: filter === f ? "#06b6d4" : "transparent",
                color: filter === f ? "#fff" : "#9ca3af",
                border:
                  filter === f
                    ? "1px solid #06b6d4"
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered notice */}
      {isFiltered && (
        <div
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            backgroundColor: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.15)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>🔒</span>
          <p style={{ color: "#9ca3af", fontSize: "0.82rem" }}>
            You are viewing{" "}
            <strong style={{ color: "#22d3ee" }}>
              messages assigned to you only
            </strong>
            . Ask super admin to assign messages to you.
          </p>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
          Loading messages...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
            gap: "1.5rem",
          }}
        >
          {/* Messages list */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                }}
              >
                <p style={{ color: "#6b7280" }}>No messages found.</p>
                {isFiltered && (
                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: "0.8rem",
                      marginTop: "8px",
                    }}
                  >
                    No messages are assigned to you yet.
                  </p>
                )}
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => handleSelect(msg)}
                style={{
                  padding: "1.25rem",
                  borderRadius: "14px",
                  cursor: "pointer",
                  backgroundColor:
                    selected?._id === msg._id
                      ? "rgba(34,211,238,0.08)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    "1px solid " +
                    (selected?._id === msg._id
                      ? "#22d3ee"
                      : "rgba(255,255,255,0.08)"),
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (selected?._id !== msg._id)
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  if (selected?._id !== msg._id)
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(34,211,238,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#22d3ee",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        flexShrink: 0,
                      }}
                    >
                      {msg.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#ffffff",
                          fontWeight: msg.status === "unread" ? 700 : 500,
                          fontSize: "0.9rem",
                        }}
                      >
                        {msg.name}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexShrink: 0,
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: statusColor[msg.status],
                        backgroundColor: statusBg[msg.status],
                        textTransform: "capitalize",
                      }}
                    >
                      {msg.status}
                    </span>
                    {msg.assignedToName && isSuperAdmin && (
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "9999px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: "#a78bfa",
                          backgroundColor: "rgba(167,139,250,0.1)",
                        }}
                      >
                        {"👤 " + msg.assignedToName}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    color: "#d1d5db",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    marginBottom: "4px",
                  }}
                >
                  {msg.subject}
                </p>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {msg.message}
                </p>
                <p
                  style={{
                    color: "#4b5563",
                    fontSize: "0.75rem",
                    marginTop: "6px",
                  }}
                >
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Message detail */}
          {selected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                padding: "1.5rem",
                borderRadius: "16px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                height: "fit-content",
                position: "sticky",
                top: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {selected.subject}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                    fontSize: "1.25rem",
                  }}
                >
                  ×
                </button>
              </div>
              <div>
                <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                  From:{" "}
                  <span style={{ color: "#ffffff" }}>{selected.name}</span>
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                  Email:{" "}
                  <span style={{ color: "#22d3ee" }}>{selected.email}</span>
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                  Date:{" "}
                  <span style={{ color: "#9ca3af" }}>
                    {new Date(selected.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              {/* Original message */}
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    marginBottom: "8px",
                  }}
                >
                  📩 Original Message
                </p>
                <p style={{ color: "#d1d5db", lineHeight: 1.7 }}>
                  {selected.message}
                </p>
              </div>

              {/* Conversation thread */}
              {selected.replies?.length > 0 && (
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.75rem",
                      marginBottom: "8px",
                    }}
                  >
                    💬 Conversation Thread
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {selected.replies.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          backgroundColor:
                            r.direction === "outgoing"
                              ? "rgba(34,211,238,0.06)"
                              : "rgba(255,255,255,0.04)",
                          border: `1px solid ${r.direction === "outgoing" ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.08)"}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                          }}
                        >
                          <span
                            style={{
                              color:
                                r.direction === "outgoing"
                                  ? "#22d3ee"
                                  : "#9ca3af",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {r.direction === "outgoing"
                              ? `↗ ${r.sentBy} (${r.sentByEmail})`
                              : `↙ ${selected.name}`}
                          </span>
                          <span
                            style={{ color: "#4b5563", fontSize: "0.72rem" }}
                          >
                            {new Date(r.sentAt).toLocaleString()}
                          </span>
                        </div>
                        <p
                          style={{
                            color: "#d1d5db",
                            fontSize: "0.875rem",
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sender info */}
              {selected.assignedToEmail && (
                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(34,211,238,0.06)",
                    border: "1px solid rgba(34,211,238,0.12)",
                    fontSize: "0.78rem",
                    color: "#9ca3af",
                  }}
                >
                  📧 Client replies will go to:{" "}
                  <strong style={{ color: "#22d3ee" }}>
                    {selected.assignedToEmail}
                  </strong>
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleMarkAs(selected._id, "read")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "rgba(107,114,128,0.15)",
                    color: "#9ca3af",
                    border: "1px solid rgba(107,114,128,0.2)",
                  }}
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => handleDelete(selected._id)}
                  style={{
                    padding: "8px 16px",
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

                {/* Assign dropdown - superadmin only */}
                {isSuperAdmin && team.length > 0 && (
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      {selected.assignedToName
                        ? "👤 " + selected.assignedToName
                        : "Unassigned"}
                    </span>
                    <select
                      value={selected.assignedTo || ""}
                      onChange={(e) => {
                        const member = team.find(
                          (m) => m._id === e.target.value,
                        );
                        handleAssign(
                          selected._id,
                          e.target.value || null,
                          member ? member.name : null,
                          member ? member.smtpEmail || member.email : null,
                        );
                      }}
                      disabled={assigning}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        borderRadius: "8px",
                        color: "#22d3ee",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <option value="" style={{ backgroundColor: "#1f2937" }}>
                        Assign to...
                      </option>
                      <option
                        value="unassign"
                        style={{ backgroundColor: "#1f2937" }}
                      >
                        Unassign
                      </option>
                      {team.map((m) => (
                        <option
                          key={m._id}
                          value={m._id}
                          style={{ backgroundColor: "#1f2937" }}
                        >
                          {m.name + " (" + m.role + ")"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Reply */}
              <div>
                <label
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Reply
                </label>
                <textarea
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    resize: "none",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#22d3ee")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)")
                  }
                />
                <button
                  onClick={handleReply}
                  disabled={sending}
                  style={{
                    marginTop: "10px",
                    padding: "10px 24px",
                    backgroundColor: sending ? "#0e7490" : "#06b6d4",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    cursor: sending ? "not-allowed" : "pointer",
                    fontSize: "0.875rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!sending)
                      e.currentTarget.style.backgroundColor = "#22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    if (!sending)
                      e.currentTarget.style.backgroundColor = "#06b6d4";
                  }}
                >
                  {sending ? "Sending..." : "Send Reply ✉️"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

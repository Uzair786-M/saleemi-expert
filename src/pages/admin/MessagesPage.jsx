// import { useState } from "react";

// // Static mock data — replace with: const { data } = useFetch(() => fetch('/api/messages').then(r => r.json()));
// const MOCK_MESSAGES = [
//   { id: 1, name: "John Smith",   email: "john@example.com",  subject: "Website Development",  message: "Hi, I need a Shopify store built from scratch. Can you help?",      date: "2026-05-10", status: "unread"  },
//   { id: 2, name: "Sarah Wilson", email: "sarah@example.com", subject: "CSV Product Upload",    message: "I have 3000 products that need to be uploaded to WooCommerce.",     date: "2026-05-09", status: "read"    },
//   { id: 3, name: "David Lee",    email: "david@example.com", subject: "Bulk Automation",       message: "Looking for someone to automate my product listings across Amazon.", date: "2026-05-08", status: "replied" },
//   { id: 4, name: "Emma Johnson", email: "emma@example.com",  subject: "Custom Theme Design",   message: "We need a custom Shopify theme that matches our brand guidelines.",   date: "2026-05-07", status: "unread"  },
//   { id: 5, name: "Ahmed Hassan", email: "ahmed@example.com", subject: "Product Photography",   message: "Do you also handle product photography for ecommerce listings?",     date: "2026-05-06", status: "read"    },
// ];

// const statusColor = { unread: "#22d3ee", read: "#6b7280", replied: "#10b981" };
// const statusBg    = { unread: "rgba(34,211,238,0.1)", read: "rgba(107,114,128,0.1)", replied: "rgba(16,185,129,0.1)" };

// export const MessagesPage = () => {
//   const [messages, setMessages] = useState(MOCK_MESSAGES);
//   const [selected, setSelected] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [reply, setReply] = useState("");

//   const filtered = filter === "all" ? messages : messages.filter(m => m.status === filter);

//   const markAs = (id, status) => {
//     setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
//     if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
//   };

//   const handleSelect = (msg) => {
//     setSelected(msg);
//     if (msg.status === "unread") markAs(msg.id, "read");
//   };

//   const handleReply = () => {
//     if (!reply.trim()) return;
//     // TODO: POST /api/messages/:id/reply
//     markAs(selected.id, "replied");
//     setReply("");
//     alert("Reply sent! (Connect your email backend to send real replies)");
//   };

//   const handleDelete = (id) => {
//     // TODO: DELETE /api/messages/:id
//     setMessages(prev => prev.filter(m => m.id !== id));
//     if (selected?.id === id) setSelected(null);
//   };

//   const unreadCount = messages.filter(m => m.status === "unread").length;

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
//         <div>
//           <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Messages</h2>
//           <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{unreadCount} unread message{unreadCount !== 1 ? "s" : ""}</p>
//         </div>
//         {/* Filters */}
//         <div style={{ display: "flex", gap: "8px" }}>
//           {["all", "unread", "read", "replied"].map(f => (
//             <button key={f} onClick={() => setFilter(f)} style={{
//               padding: "7px 16px", borderRadius: "8px", fontSize: "0.8rem",
//               fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
//               backgroundColor: filter === f ? "#06b6d4" : "transparent",
//               color: filter === f ? "#ffffff" : "#9ca3af",
//               border: filter === f ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
//             }}>{f}</button>
//           ))}
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
//         {/* Message list */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//           {filtered.length === 0 && <p style={{ color: "#6b7280", textAlign: "center", padding: "3rem 0" }}>No messages found.</p>}
//           {filtered.map(msg => (
//             <div key={msg.id} onClick={() => handleSelect(msg)} style={{
//               padding: "1.25rem", borderRadius: "14px", cursor: "pointer",
//               backgroundColor: selected?.id === msg.id ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.04)",
//               border: `1px solid ${selected?.id === msg.id ? "#22d3ee" : "rgba(255,255,255,0.08)"}`,
//               transition: "all 0.2s",
//             }}
//               onMouseEnter={e => { if (selected?.id !== msg.id) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
//               onMouseLeave={e => { if (selected?.id !== msg.id) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
//             >
//               <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "6px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <div style={{ width: "36px", height: "36px", borderRadius: "9999px", backgroundColor: "rgba(34,211,238,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22d3ee", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>
//                     {msg.name[0]}
//                   </div>
//                   <div>
//                     <p style={{ color: "#ffffff", fontWeight: msg.status === "unread" ? 700 : 500, fontSize: "0.9rem" }}>{msg.name}</p>
//                     <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{msg.email}</p>
//                   </div>
//                 </div>
//                 <span style={{ padding: "3px 10px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, color: statusColor[msg.status], backgroundColor: statusBg[msg.status], flexShrink: 0, textTransform: "capitalize" }}>
//                   {msg.status}
//                 </span>
//               </div>
//               <p style={{ color: "#d1d5db", fontWeight: 600, fontSize: "0.875rem", marginBottom: "4px" }}>{msg.subject}</p>
//               <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{msg.message.slice(0, 70)}...</p>
//               <p style={{ color: "#374151", fontSize: "0.75rem", marginTop: "6px" }}>{msg.date}</p>
//             </div>
//           ))}
//         </div>

//         {/* Message detail */}
//         {selected && (
//           <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "1.25rem", height: "fit-content" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//               <div>
//                 <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>{selected.subject}</h3>
//                 <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>From: {selected.name} ({selected.email})</p>
//                 <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>Date: {selected.date}</p>
//               </div>
//               <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.25rem" }}>✕</button>
//             </div>
//             <div style={{ padding: "1.25rem", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
//               <p style={{ color: "#d1d5db", lineHeight: 1.7 }}>{selected.message}</p>
//             </div>
//             {/* Actions */}
//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//               <button onClick={() => markAs(selected.id, "read")} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(107,114,128,0.15)", color: "#9ca3af", border: "1px solid rgba(107,114,128,0.2)", transition: "all 0.2s" }}>Mark as Read</button>
//               <button onClick={() => handleDelete(selected.id)} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", transition: "all 0.2s" }}>Delete</button>
//             </div>
//             {/* Reply box */}
//             <div>
//               <label style={{ color: "#9ca3af", fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "8px" }}>Reply</label>
//               <textarea rows="4" value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply..." style={{ width: "100%", padding: "12px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.875rem", resize: "none", outline: "none" }}
//                 onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"}
//                 onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
//               />
//               <button onClick={handleReply} style={{ marginTop: "10px", padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", transition: "background-color 0.2s" }}
//                 onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
//                 onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
//               >Send Reply ✉️</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import {
  fetchMessages,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
} from "../../services/api.js";

const statusColor = { unread: "#22d3ee", read: "#6b7280", replied: "#10b981" };
const statusBg = {
  unread: "rgba(34,211,238,0.1)",
  read: "rgba(107,114,128,0.1)",
  replied: "rgba(16,185,129,0.1)",
};

export const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load messages from backend
  useEffect(() => {
    loadMessages();
  }, [filter]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages(filter);
      setMessages(data.data || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (msg) => {
    setSelected(msg);
    setReply("");
    if (msg.status === "unread") {
      try {
        await updateMessageStatus(msg._id, "read");
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, status: "read" } : m)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleMarkAs = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m)),
      );
      if (selected?._id === id) setSelected((prev) => ({ ...prev, status }));
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
          m._id === selected._id ? { ...m, status: "replied" } : m,
        ),
      );
      setSelected((prev) => ({ ...prev, status: "replied" }));
      setReply("");
      alert("Reply sent successfully!");
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
                transition: "all 0.2s",
                textTransform: "capitalize",
                backgroundColor: filter === f ? "#06b6d4" : "transparent",
                color: filter === f ? "#ffffff" : "#9ca3af",
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
          {/* List */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {messages.length === 0 && (
              <p
                style={{
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "3rem 0",
                }}
              >
                No messages found.
              </p>
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
                  border: `1px solid ${selected?._id === msg._id ? "#22d3ee" : "rgba(255,255,255,0.08)"}`,
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
                      gap: "8px",
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
                      {msg.name[0]}
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
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: statusColor[msg.status],
                      backgroundColor: statusBg[msg.status],
                      flexShrink: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    {msg.status}
                  </span>
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
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {msg.message?.slice(0, 70)}...
                </p>
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.75rem",
                    marginTop: "6px",
                  }}
                >
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "16px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                height: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {selected.subject}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                    From: {selected.name} ({selected.email})
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                    Date: {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
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
                  ✕
                </button>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ color: "#d1d5db", lineHeight: 1.7 }}>
                  {selected.message}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                  rows="4"
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
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    cursor: sending ? "not-allowed" : "pointer",
                    fontSize: "0.875rem",
                    transition: "background-color 0.2s",
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

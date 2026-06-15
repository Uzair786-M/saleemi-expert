import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ALL_PERMISSIONS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "messages", label: "Messages", icon: "✉️" },
  { key: "mailbox", label: "Mailbox", icon: "📬" },
  { key: "reviews", label: "Reviews", icon: "⭐" },
  { key: "testimonials", label: "Testimonials", icon: "💬" },
  { key: "portfolio", label: "Portfolio", icon: "🗂️" },
  { key: "services", label: "Services", icon: "⚡" },
  { key: "about", label: "About Me", icon: "👤" },
  { key: "stats", label: "Hero Stats", icon: "📈" },
  { key: "pricing", label: "Pricing", icon: "💰" },
  { key: "email_settings", label: "Email Settings", icon: "📧" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.875rem",
  outline: "none",
};

const apiCall = async (path, options = {}) => {
  const token = localStorage.getItem("se_token");
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed.");
  return data;
};

const ROLE_COLORS = {
  superadmin: "#f59e0b",
  admin: "#22d3ee",
  member: "#a78bfa",
};
const ROLE_LABELS = {
  superadmin: "Super Admin",
  admin: "Admin",
  member: "Member",
};

export const TeamPage = () => {
  const { admin: currentUser, isSuperAdmin } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetPw, setResetPw] = useState({
    id: null,
    value: "",
    saving: false,
    show: false,
  });

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    permissions: ["dashboard", "messages"],
    smtpEmail: "",
    smtpName: "",
  });

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiCall("/team");
      setMembers(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleAdd = async () => {
    setError("");
    setSaving(true);
    try {
      const data = await apiCall("/team", {
        method: "POST",
        body: JSON.stringify(newMember),
      });
      setMembers((prev) => [...prev, data.data]);
      setShowAdd(false);
      setNewMember({
        name: "",
        email: "",
        password: "",
        role: "member",
        permissions: ["dashboard", "messages"],
        smtpEmail: "",
        smtpName: "",
      });
      setSuccess(data.message);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    setError("");
    setSaving(true);
    try {
      const data = await apiCall(`/team/${editing._id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editing.name,
          role: editing.role,
          permissions: editing.permissions,
          isActive: editing.isActive,
          smtpEmail: editing.smtpEmail,
          smtpName: editing.smtpName,
          smtpPassEnvKey: editing.smtpPassEnvKey,
        }),
      });
      setMembers((prev) =>
        prev.map((m) => (m._id === editing._id ? data.data : m)),
      );
      setEditing(null);
      setSuccess("Member updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from your team?`)) return;
    try {
      await apiCall(`/team/${id}`, { method: "DELETE" });
      setMembers((prev) => prev.filter((m) => m._id !== id));
      if (editing?._id === id) setEditing(null);
      setSuccess("Member removed.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetPw.value || resetPw.value.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setResetPw((p) => ({ ...p, saving: true }));
    setError("");
    try {
      await apiCall(`/team/${resetPw.id}/reset-password`, {
        method: "PUT",
        body: JSON.stringify({ newPassword: resetPw.value }),
      });
      setResetPw({ id: null, value: "", saving: false, show: false });
      setSuccess("Password reset successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      setResetPw((p) => ({ ...p, saving: false }));
    }
  };

  const togglePermission = (perms, perm) =>
    perms.includes(perm) ? perms.filter((p) => p !== perm) : [...perms, perm];

  const PermissionGrid = ({ permissions, onChange }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      {ALL_PERMISSIONS.map((p) => {
        const active = permissions.includes(p.key);
        return (
          <div
            key={p.key}
            onClick={() => onChange(p.key)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              border: `1px solid ${active ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.08)"}`,
              backgroundColor: active
                ? "rgba(34,211,238,0.08)"
                : "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "4px",
                border: `2px solid ${active ? "#22d3ee" : "rgba(255,255,255,0.2)"}`,
                backgroundColor: active ? "#22d3ee" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {active && (
                <span
                  style={{ color: "#000", fontSize: "10px", fontWeight: 900 }}
                >
                  ✓
                </span>
              )}
            </span>
            <span
              style={{
                color: active ? "#22d3ee" : "#9ca3af",
                fontSize: "0.8rem",
                fontWeight: active ? 600 : 400,
              }}
            >
              {p.icon} {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  if (!isSuperAdmin) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
        <h3 style={{ color: "#ffffff", marginBottom: "8px" }}>
          Super Admin Only
        </h3>
        <p style={{ color: "#6b7280" }}>
          Only the super admin can manage team members.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
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
            👥 Team Management
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Add team members and control exactly what each person can access.
          </p>
        </div>
        <button
          onClick={() => {
            setShowAdd(true);
            setError("");
          }}
          style={{
            padding: "10px 22px",
            backgroundColor: "#06b6d4",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          + Add Member
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#f87171",
            marginBottom: "1.25rem",
            fontSize: "0.875rem",
          }}
        >
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            backgroundColor: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#10b981",
            marginBottom: "1.25rem",
            fontSize: "0.875rem",
          }}
        >
          ✓ {success}
        </div>
      )}

      {/* Current user */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          backgroundColor: "rgba(245,158,11,0.07)",
          border: "1px solid rgba(245,158,11,0.2)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            backgroundColor: "rgba(245,158,11,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
          }}
        >
          👑
        </div>
        <div>
          <p style={{ color: "#ffffff", fontWeight: 700 }}>
            {currentUser?.name}{" "}
            <span
              style={{
                color: "#f59e0b",
                fontSize: "0.75rem",
                fontWeight: 600,
                marginLeft: "6px",
              }}
            >
              SUPER ADMIN
            </span>
          </p>
          <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>
            {currentUser?.email} · Full access to everything
          </p>
        </div>
      </div>

      {/* Add member form */}
      {showAdd && (
        <div
          style={{
            padding: "1.5rem",
            borderRadius: "16px",
            backgroundColor: "rgba(34,211,238,0.04)",
            border: "1px solid rgba(34,211,238,0.2)",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{
              color: "#22d3ee",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            ➕ Add New Member
          </h3>

          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "1fr 1fr",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Full Name *
              </label>
              <input
                value={newMember.name}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="John Smith"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Login Email *
              </label>
              <input
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="john@example.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Password *
              </label>
              <input
                type="password"
                value={newMember.password}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, password: e.target.value }))
                }
                placeholder="Min 6 characters"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Role
              </label>
              <select
                value={newMember.role}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, role: e.target.value }))
                }
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="member" style={{ backgroundColor: "#1f2937" }}>
                  Member (limited access)
                </option>
                <option value="admin" style={{ backgroundColor: "#1f2937" }}>
                  Admin (trusted access)
                </option>
              </select>
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                📧 Sending Email Address
              </label>
              <input
                type="email"
                value={newMember.smtpEmail}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, smtpEmail: e.target.value }))
                }
                placeholder="asifmadni@saleemiexpert.com"
                style={inputStyle}
              />
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: "3px",
                }}
              >
                Emails sent by this member come from this address
              </p>
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                📛 Sender Display Name
              </label>
              <input
                value={newMember.smtpName}
                onChange={(e) =>
                  setNewMember((p) => ({ ...p, smtpName: e.target.value }))
                }
                placeholder="Asif Madni - SaleemiExpert"
                style={inputStyle}
              />
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: "3px",
                }}
              >
                Name shown to email recipients
              </p>
            </div>
          </div>

          <div>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.78rem",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Permissions — select what this member can access:
            </label>
            <PermissionGrid
              permissions={newMember.permissions}
              onChange={(perm) =>
                setNewMember((prev) => ({
                  ...prev,
                  permissions: togglePermission(prev.permissions, perm),
                }))
              }
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "1.25rem" }}>
            <button
              onClick={handleAdd}
              disabled={saving}
              style={{
                padding: "10px 24px",
                backgroundColor: saving ? "#0e7490" : "#06b6d4",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {saving ? "Adding..." : "Add Member"}
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setError("");
              }}
              style={{
                padding: "10px 24px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Team list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          Loading team...
        </div>
      ) : members.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: "14px",
          }}
        >
          <p style={{ color: "#6b7280" }}>
            No team members yet. Add someone to get started.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {members.map((member) => (
            <div
              key={member._id}
              style={{
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Member header */}
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "9999px",
                      backgroundColor: `${ROLE_COLORS[member.role]}20`,
                      border: `2px solid ${ROLE_COLORS[member.role]}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ROLE_COLORS[member.role],
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {member.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <p style={{ color: "#ffffff", fontWeight: 700 }}>
                        {member.name}
                      </p>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          backgroundColor: `${ROLE_COLORS[member.role]}15`,
                          color: ROLE_COLORS[member.role],
                          border: `1px solid ${ROLE_COLORS[member.role]}30`,
                        }}
                      >
                        {ROLE_LABELS[member.role]}
                      </span>
                      {!member.isActive && (
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            backgroundColor: "rgba(239,68,68,0.1)",
                            color: "#f87171",
                          }}
                        >
                          Inactive
                        </span>
                      )}
                    </div>
                    <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                      {member.email} · {member.permissions?.length || 0}{" "}
                      permissions
                      {member.smtpEmail ? ` · 📧 ${member.smtpEmail}` : ""}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() =>
                      setEditing(
                        editing?._id === member._id ? null : { ...member },
                      )
                    }
                    style={{
                      padding: "7px 16px",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor:
                        editing?._id === member._id
                          ? "rgba(34,211,238,0.15)"
                          : "transparent",
                      color:
                        editing?._id === member._id ? "#22d3ee" : "#9ca3af",
                      border: `1px solid ${editing?._id === member._id ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {editing?._id === member._id ? "✕ Close" : "✏️ Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(member._id, member.name)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor: "rgba(239,68,68,0.08)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Edit panel */}
              {editing?._id === member._id && (
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Name
                      </label>
                      <input
                        value={editing.name}
                        onChange={(e) =>
                          setEditing((p) => ({ ...p, name: e.target.value }))
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Role
                      </label>
                      <select
                        value={editing.role}
                        onChange={(e) =>
                          setEditing((p) => ({ ...p, role: e.target.value }))
                        }
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option
                          value="member"
                          style={{ backgroundColor: "#1f2937" }}
                        >
                          Member
                        </option>
                        <option
                          value="admin"
                          style={{ backgroundColor: "#1f2937" }}
                        >
                          Admin
                        </option>
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        paddingBottom: "2px",
                      }}
                    >
                      <div
                        onClick={() =>
                          setEditing((p) => ({ ...p, isActive: !p.isActive }))
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "24px",
                            borderRadius: "9999px",
                            backgroundColor: editing.isActive
                              ? "#06b6d4"
                              : "rgba(255,255,255,0.1)",
                            position: "relative",
                            transition: "background-color 0.3s",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "2px",
                              left: editing.isActive ? "22px" : "2px",
                              width: "20px",
                              height: "20px",
                              borderRadius: "9999px",
                              backgroundColor: "#ffffff",
                              transition: "left 0.3s",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            color: editing.isActive ? "#22d3ee" : "#6b7280",
                            fontSize: "0.85rem",
                          }}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SMTP fields */}
                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "1fr 1fr",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        📧 Sending Email Address
                      </label>
                      <input
                        type="email"
                        value={editing.smtpEmail || ""}
                        onChange={(e) =>
                          setEditing((p) => ({
                            ...p,
                            smtpEmail: e.target.value,
                          }))
                        }
                        placeholder="asifmadni@saleemiexpert.com"
                        style={inputStyle}
                      />
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.7rem",
                          marginTop: "3px",
                        }}
                      >
                        Emails sent by this member come from this address
                      </p>
                    </div>
                    <div>
                      <label
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        📛 Sender Display Name
                      </label>
                      <input
                        value={editing.smtpName || ""}
                        onChange={(e) =>
                          setEditing((p) => ({
                            ...p,
                            smtpName: e.target.value,
                          }))
                        }
                        placeholder="Asif Madni - SaleemiExpert"
                        style={inputStyle}
                      />
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.7rem",
                          marginTop: "3px",
                        }}
                      >
                        Name shown to email recipients
                      </p>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        🔑 SMTP Password Env Key
                      </label>
                      <input
                        value={editing.smtpPassEnvKey || ""}
                        onChange={(e) =>
                          setEditing((p) => ({
                            ...p,
                            smtpPassEnvKey: e.target.value,
                          }))
                        }
                        placeholder="EMAIL_PASS_ASIF"
                        style={inputStyle}
                      />
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.7rem",
                          marginTop: "3px",
                        }}
                      >
                        Add{" "}
                        <code style={{ color: "#22d3ee" }}>
                          {editing.smtpPassEnvKey || "EMAIL_PASS_ASIF"}
                        </code>{" "}
                        to Vercel env vars with this member's Zoho app password.
                        Leave empty to use the global EMAIL_PASS.
                      </p>
                    </div>
                  </div>

                  <label
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.78rem",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    Permissions:
                  </label>
                  <PermissionGrid
                    permissions={editing.permissions}
                    onChange={(perm) =>
                      setEditing((prev) => ({
                        ...prev,
                        permissions: togglePermission(prev.permissions, perm),
                      }))
                    }
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "1.25rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={handleUpdate}
                      disabled={saving}
                      style={{
                        padding: "10px 24px",
                        backgroundColor: saving ? "#0e7490" : "#06b6d4",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() =>
                        setResetPw((p) => ({
                          ...p,
                          id: editing._id,
                          show: !p.show,
                        }))
                      }
                      style={{
                        padding: "10px 24px",
                        backgroundColor: "rgba(245,158,11,0.1)",
                        color: "#f59e0b",
                        border: "1px solid rgba(245,158,11,0.25)",
                        borderRadius: "10px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      🔑 Reset Password
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      style={{
                        padding: "10px 24px",
                        backgroundColor: "transparent",
                        color: "#9ca3af",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Reset password panel */}
                  {resetPw.show && resetPw.id === editing._id && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "1.25rem",
                        borderRadius: "12px",
                        backgroundColor: "rgba(245,158,11,0.07)",
                        border: "1px solid rgba(245,158,11,0.2)",
                      }}
                    >
                      <p
                        style={{
                          color: "#f59e0b",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          marginBottom: "10px",
                        }}
                      >
                        🔑 Set New Password for {editing.name}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          type="text"
                          value={resetPw.value}
                          onChange={(e) =>
                            setResetPw((p) => ({ ...p, value: e.target.value }))
                          }
                          placeholder="Enter new password (min 6 chars)"
                          style={{
                            flex: 1,
                            minWidth: "200px",
                            padding: "10px 14px",
                            backgroundColor: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(245,158,11,0.3)",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "0.875rem",
                            outline: "none",
                          }}
                        />
                        <button
                          onClick={handleResetPassword}
                          disabled={resetPw.saving}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#f59e0b",
                            color: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {resetPw.saving ? "Saving..." : "Set Password"}
                        </button>
                        <button
                          onClick={() =>
                            setResetPw({
                              id: null,
                              value: "",
                              saving: false,
                              show: false,
                            })
                          }
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "transparent",
                            color: "#9ca3af",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

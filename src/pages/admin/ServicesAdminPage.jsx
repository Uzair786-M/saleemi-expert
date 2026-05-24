// import { useState } from "react";
// import { useSiteData } from "../../context/SiteDataContext";

// const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" };
// const focus = e => e.currentTarget.style.borderColor = "#22d3ee";
// const blur  = e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
// const empty = { icon: "⚡", title: "", shortDesc: "", fullDesc: "", features: "" };

// export const ServicesAdminPage = () => {
//   const { services, servicesOps } = useSiteData();
//   const [form,     setForm]     = useState(empty);
//   const [editing,  setEditing]  = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [error,    setError]    = useState("");
//   const [saved,    setSaved]    = useState(false);

//   const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSave = () => {
//     if (!form.title.trim() || !form.shortDesc.trim()) { setError("Title and short description are required."); return; }
//     setError("");
//     const features = form.features.split("\n").map(f => f.trim()).filter(Boolean);
//     if (editing !== null) {
//       servicesOps.update(editing, { ...form, features });
//     } else {
//       servicesOps.add({ ...form, features });
//     }
//     setSaved(true); setTimeout(() => setSaved(false), 2500);
//     setForm(empty); setEditing(null); setShowForm(false);
//   };

//   const handleEdit = (item) => {
//     setForm({ icon: item.icon, title: item.title, shortDesc: item.shortDesc, fullDesc: item.fullDesc || "", features: (item.features || []).join("\n") });
//     setEditing(item.id); setShowForm(true); setError("");
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     servicesOps.remove(id);
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
//         <div>
//           <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Services</h2>
//           <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{services.length} services — changes reflect on site instantly.</p>
//         </div>
//         <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} style={{ padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}
//           onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
//           onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
//         >+ Add Service</button>
//       </div>

//       {saved && <div style={{ padding: "12px 16px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "10px", color: "#10b981", marginBottom: "1.5rem", fontSize: "0.875rem" }}>✓ Services updated successfully!</div>}

//       {showForm && (
//         <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,211,238,0.25)", marginBottom: "2rem" }}>
//           <h3 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.25rem" }}>{editing ? "Edit" : "Add"} Service</h3>
//           <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1rem" }}>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Icon (emoji)</label><input name="icon" value={form.icon} onChange={handleChange} style={{ ...inputStyle, fontSize: "1.5rem" }} onFocus={focus} onBlur={blur} /></div>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Service Title *</label><input name="title" value={form.title} onChange={handleChange} style={inputStyle} onFocus={focus} onBlur={blur} /></div>
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Short Description * (shown on cards)</label><input name="shortDesc" value={form.shortDesc} onChange={handleChange} style={inputStyle} onFocus={focus} onBlur={blur} /></div>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Full Description (Services page)</label><textarea name="fullDesc" rows="3" value={form.fullDesc} onChange={handleChange} style={{ ...inputStyle, resize: "none" }} onFocus={focus} onBlur={blur} /></div>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Features (one per line)</label><textarea name="features" rows="5" value={form.features} onChange={handleChange} placeholder={"Feature one\nFeature two\nFeature three"} style={{ ...inputStyle, resize: "none" }} onFocus={focus} onBlur={blur} /></div>
//           </div>
//           {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
//           <div style={{ display: "flex", gap: "10px" }}>
//             <button onClick={handleSave} style={{ padding: "10px 28px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}>{editing ? "Update" : "Save"}</button>
//             <button onClick={() => { setShowForm(false); setForm(empty); setEditing(null); setError(""); }} style={{ padding: "10px 20px", backgroundColor: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
//           </div>
//         </div>
//       )}

//       <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
//         {services.map(item => (
//           <div key={item.id} style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
//               <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
//               <h4 style={{ color: "#ffffff", fontWeight: 700 }}>{item.title}</h4>
//             </div>
//             <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.shortDesc}</p>
//             {item.features && item.features.length > 0 && (
//               <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "1rem" }}>
//                 {item.features.slice(0, 3).map(f => <li key={f} style={{ color: "#6b7280", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#22d3ee" }}>✓</span>{f}</li>)}
//                 {item.features.length > 3 && <li style={{ color: "#6b7280", fontSize: "0.75rem" }}>+{item.features.length - 3} more</li>}
//               </ul>
//             )}
//             <div style={{ display: "flex", gap: "8px" }}>
//               <button onClick={() => handleEdit(item)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.2)" }}>Edit</button>
//               <button onClick={() => handleDelete(item.id)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";

const inputStyle = {
  width: "100%",
  padding: "11px 16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
const empty = {
  icon: "⚡",
  title: "",
  shortDesc: "",
  fullDesc: "",
  features: "",
};

export const ServicesAdminPage = () => {
  const { services, servicesOps } = useSiteData();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.shortDesc.trim()) {
      setError("Title and short description are required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const features = form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
      if (editing) {
        await servicesOps.update(editing, { ...form, features });
      } else {
        await servicesOps.add({ ...form, features });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setForm(empty);
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      icon: item.icon,
      title: item.title,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc || "",
      features: (item.features || []).join("\n"),
    });
    setEditing(item._id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await servicesOps.remove(id);
    } catch (err) {
      alert(err.message);
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
            Services
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            {services.length} services — changes save to database.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(empty);
          }}
          style={{
            padding: "10px 24px",
            backgroundColor: "#06b6d4",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#22d3ee")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#06b6d4")
          }
        >
          + Add Service
        </button>
      </div>

      {saved && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "10px",
            color: "#10b981",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
          }}
        >
          ✓ Saved to database!
        </div>
      )}

      {showForm && (
        <div
          style={{
            padding: "1.75rem",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(34,211,238,0.25)",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              color: "#ffffff",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            {editing ? "Edit" : "Add"} Service
          </h3>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Icon (emoji)
              </label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                style={{ ...inputStyle, fontSize: "1.5rem" }}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Service Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Short Description *
              </label>
              <input
                name="shortDesc"
                value={form.shortDesc}
                onChange={handleChange}
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Full Description
              </label>
              <textarea
                name="fullDesc"
                rows="3"
                value={form.fullDesc}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Features (one per line)
              </label>
              <textarea
                name="features"
                rows="5"
                value={form.features}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
          </div>
          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.8rem",
                marginBottom: "1rem",
              }}
            >
              ⚠️ {error}
            </p>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "10px 28px",
                backgroundColor: saving ? "#0e7490" : "#06b6d4",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#06b6d4";
              }}
            >
              {saving ? "Saving..." : editing ? "Update" : "Save"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(empty);
                setEditing(null);
                setError("");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {services.map((item) => (
          <div
            key={item._id}
            style={{
              padding: "1.5rem",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
              <h4 style={{ color: "#ffffff", fontWeight: 700 }}>
                {item.title}
              </h4>
            </div>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              {item.shortDesc}
            </p>
            {item.features?.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  marginBottom: "1rem",
                }}
              >
                {item.features.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    style={{
                      color: "#6b7280",
                      fontSize: "0.75rem",
                      display: "flex",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#22d3ee" }}>✓</span>
                    {f}
                  </li>
                ))}
                {item.features.length > 3 && (
                  <li style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                    +{item.features.length - 3} more
                  </li>
                )}
              </ul>
            )}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleEdit(item)}
                style={{
                  padding: "7px 18px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

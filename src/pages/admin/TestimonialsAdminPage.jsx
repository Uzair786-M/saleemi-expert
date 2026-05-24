// import { useState } from "react";
// import { useSiteData } from "../../context/SiteDataContext";

// const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" };
// const focus = e => e.currentTarget.style.borderColor = "#22d3ee";
// const blur  = e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
// const empty = { name: "", title: "", review: "", rating: 5 };

// export const TestimonialsAdminPage = () => {
//   const { testimonials, testimonialsOps } = useSiteData();
//   const [form,     setForm]     = useState(empty);
//   const [editing,  setEditing]  = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [error,    setError]    = useState("");
//   const [saved,    setSaved]    = useState(false);

//   const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSave = () => {
//     if (!form.name.trim() || !form.review.trim()) { setError("Name and review are required."); return; }
//     setError("");
//     if (editing !== null) {
//       testimonialsOps.update(editing, { ...form, rating: Number(form.rating) });
//     } else {
//       testimonialsOps.add({ ...form, rating: Number(form.rating) });
//     }
//     setSaved(true); setTimeout(() => setSaved(false), 2500);
//     setForm(empty); setEditing(null); setShowForm(false);
//   };

//   const handleEdit = (item) => {
//     setForm({ name: item.name, title: item.title || "", review: item.review, rating: item.rating });
//     setEditing(item.id); setShowForm(true); setError("");
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
//         <div>
//           <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Testimonials</h2>
//           <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{testimonials.length} reviews — changes reflect on site instantly.</p>
//         </div>
//         <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} style={{ padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}
//           onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
//           onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
//         >+ Add Review</button>
//       </div>

//       {saved && <div style={{ padding: "12px 16px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "10px", color: "#10b981", marginBottom: "1.5rem", fontSize: "0.875rem" }}>✓ Testimonials updated successfully!</div>}

//       {showForm && (
//         <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,211,238,0.25)", marginBottom: "2rem" }}>
//           <h3 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.25rem" }}>{editing ? "Edit" : "Add"} Review</h3>
//           <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1rem" }}>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Client Name *</label><input name="name" value={form.name} onChange={handleChange} style={inputStyle} onFocus={focus} onBlur={blur} /></div>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Title / Location</label><input name="title" value={form.title} onChange={handleChange} placeholder="Store Owner, USA" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
//             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Rating</label><select name="rating" value={form.rating} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>{[5,4,3,2,1].map(r => <option key={r} value={r} style={{ backgroundColor: "#0d1224" }}>{"★".repeat(r)} ({r}/5)</option>)}</select></div>
//           </div>
//           <div style={{ marginBottom: "1rem" }}><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Review *</label><textarea name="review" rows="4" value={form.review} onChange={handleChange} style={{ ...inputStyle, resize: "none" }} onFocus={focus} onBlur={blur} /></div>
//           {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
//           <div style={{ display: "flex", gap: "10px" }}>
//             <button onClick={handleSave} style={{ padding: "10px 28px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}>{editing ? "Update" : "Save"}</button>
//             <button onClick={() => { setShowForm(false); setForm(empty); setEditing(null); setError(""); }} style={{ padding: "10px 20px", backgroundColor: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
//           </div>
//         </div>
//       )}

//       <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
//         {testimonials.map(item => (
//           <div key={item.id} style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
//               <div><p style={{ color: "#ffffff", fontWeight: 700 }}>{item.name}</p><p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{item.title || "Verified Client"}</p></div>
//               <div style={{ display: "flex", gap: "2px" }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= item.rating ? "#f59e0b" : "#374151" }}>★</span>)}</div>
//             </div>
//             <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>"{item.review}"</p>
//             <div style={{ display: "flex", gap: "8px" }}>
//               <button onClick={() => handleEdit(item)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.2)" }}>Edit</button>
//               <button onClick={() => testimonialsOps.remove(item.id)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Delete</button>
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
const empty = { name: "", title: "", review: "", rating: 5 };

export const TestimonialsAdminPage = () => {
  const { testimonials, testimonialsOps } = useSiteData();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null); // _id
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.review.trim()) {
      setError("Name and review are required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const payload = { ...form, rating: Number(form.rating) };
      if (editing) {
        await testimonialsOps.update(editing, payload);
      } else {
        await testimonialsOps.add(payload);
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
      name: item.name,
      title: item.title || "",
      review: item.review,
      rating: item.rating,
    });
    setEditing(item._id); // ← _id
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await testimonialsOps.remove(id);
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
            Testimonials
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            {testimonials.length} reviews — changes save to database.
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
          + Add Review
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
            {editing ? "Edit" : "Add"} Review
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
                Client Name *
              </label>
              <input
                name="name"
                value={form.name}
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
                Title / Location
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Store Owner, USA"
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
                Rating
              </label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option
                    key={r}
                    value={r}
                    style={{ backgroundColor: "#0d1224" }}
                  >
                    {"★".repeat(r)} ({r}/5)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Review *
            </label>
            <textarea
              name="review"
              rows="4"
              value={form.review}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={focus}
              onBlur={blur}
            />
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
        {testimonials.map((item) => (
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
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              <div>
                <p style={{ color: "#ffffff", fontWeight: 700 }}>{item.name}</p>
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {item.title || "Verified Client"}
                </p>
              </div>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    style={{ color: s <= item.rating ? "#f59e0b" : "#374151" }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              "{item.review}"
            </p>
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

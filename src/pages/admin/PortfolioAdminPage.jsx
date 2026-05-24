// // import { useState } from "react";
// // import { useSiteData } from "../../context/SiteDataContext";

// // const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" };
// // const focus = e => e.currentTarget.style.borderColor = "#22d3ee";
// // const blur  = e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
// // const empty = { title: "", category: "E-commerce", description: "", tags: "", result: "", duration: "" };
// // const CATS  = ["E-commerce", "Automation", "Web Development"];

// // export const PortfolioAdminPage = () => {
// //   const { portfolio, portfolioOps } = useSiteData();
// //   const [form,     setForm]     = useState(empty);
// //   const [editing,  setEditing]  = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [filter,   setFilter]   = useState("All");
// //   const [error,    setError]    = useState("");
// //   const [saved,    setSaved]    = useState(false);

// //   const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

// //   const handleSave = () => {
// //     if (!form.title.trim() || !form.description.trim()) { setError("Title and description are required."); return; }
// //     setError("");
// //     const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
// //     if (editing !== null) {
// //       portfolioOps.update(editing, { ...form, tags });
// //     } else {
// //       portfolioOps.add({ ...form, tags, color: "from-cyan-500/30 to-blue-500/10" });
// //     }
// //     setSaved(true); setTimeout(() => setSaved(false), 2500);
// //     setForm(empty); setEditing(null); setShowForm(false);
// //   };

// //   const handleEdit = (item) => {
// //     setForm({ title: item.title, category: item.category, description: item.description, tags: item.tags.join(", "), result: item.result || "", duration: item.duration || "" });
// //     setEditing(item.id); setShowForm(true); setError("");
// //   };

// //   const filtered = filter === "All" ? portfolio : portfolio.filter(i => i.category === filter);

// //   return (
// //     <div>
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
// //         <div>
// //           <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Portfolio</h2>
// //           <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{portfolio.length} projects — changes reflect on site instantly.</p>
// //         </div>
// //         <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} style={{ padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}
// //           onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
// //           onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
// //         >+ Add Project</button>
// //       </div>

// //       {saved && <div style={{ padding: "12px 16px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "10px", color: "#10b981", marginBottom: "1.5rem", fontSize: "0.875rem" }}>✓ Portfolio updated successfully!</div>}

// //       {showForm && (
// //         <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,211,238,0.25)", marginBottom: "2rem" }}>
// //           <h3 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.25rem" }}>{editing ? "Edit" : "Add"} Project</h3>
// //           <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1rem" }}>
// //             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Project Title *</label><input name="title" value={form.title} onChange={handleChange} style={inputStyle} onFocus={focus} onBlur={blur} /></div>
// //             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Category</label><select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>{CATS.map(c => <option key={c} value={c} style={{ backgroundColor: "#0d1224" }}>{c}</option>)}</select></div>
// //             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Tags (comma separated)</label><input name="tags" value={form.tags} onChange={handleChange} placeholder="Shopify, CSV, Automation" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
// //             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Result / Achievement</label><input name="result" value={form.result} onChange={handleChange} placeholder="Saved client 120+ hours" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
// //             <div><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Duration</label><input name="duration" value={form.duration} onChange={handleChange} placeholder="5 days" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
// //           </div>
// //           <div style={{ marginBottom: "1rem" }}><label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Description *</label><textarea name="description" rows="4" value={form.description} onChange={handleChange} style={{ ...inputStyle, resize: "none" }} onFocus={focus} onBlur={blur} /></div>
// //           {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
// //           <div style={{ display: "flex", gap: "10px" }}>
// //             <button onClick={handleSave} style={{ padding: "10px 28px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}>{editing ? "Update" : "Save"}</button>
// //             <button onClick={() => { setShowForm(false); setForm(empty); setEditing(null); setError(""); }} style={{ padding: "10px 20px", backgroundColor: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Filter */}
// //       <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
// //         {["All", ...CATS].map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: filter === f ? "#06b6d4" : "transparent", color: filter === f ? "#ffffff" : "#9ca3af", border: filter === f ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>{f}</button>)}
// //       </div>

// //       <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
// //         {filtered.map(item => (
// //           <div key={item.id} style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
// //               <span style={{ padding: "3px 12px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, color: "#22d3ee", backgroundColor: "rgba(34,211,238,0.1)" }}>{item.category}</span>
// //             </div>
// //             <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.4rem" }}>{item.title}</h4>
// //             {item.result && <p style={{ color: "#22d3ee", fontSize: "0.78rem", marginBottom: "0.5rem" }}>✓ {item.result}</p>}
// //             <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.description?.slice(0, 100)}...</p>
// //             <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>{item.tags.map(tag => <span key={tag} style={{ padding: "2px 10px", borderRadius: "9999px", fontSize: "0.7rem", backgroundColor: "rgba(255,255,255,0.08)", color: "#9ca3af" }}>{tag}</span>)}</div>
// //             <div style={{ display: "flex", gap: "8px" }}>
// //               <button onClick={() => handleEdit(item)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.2)" }}>Edit</button>
// //               <button onClick={() => portfolioOps.remove(item.id)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Delete</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// import { useState, useEffect } from "react";
// import { useSiteData } from "../../context/SiteDataContext";

// const inputStyle = {
//   width: "100%",
//   padding: "11px 16px",
//   backgroundColor: "rgba(255,255,255,0.05)",
//   border: "1px solid rgba(255,255,255,0.1)",
//   borderRadius: "10px",
//   color: "#ffffff",
//   fontSize: "0.9rem",
//   outline: "none",
//   transition: "border-color 0.2s",
// };
// const labelStyle = {
//   color: "#9ca3af",
//   fontSize: "0.8rem",
//   fontWeight: 500,
//   display: "block",
//   marginBottom: "6px",
// };
// const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
// const blur = (e) =>
//   (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
// const empty = {
//   name: "",
//   price: "$",
//   duration: "",
//   desc: "",
//   popular: false,
//   color: "#06b6d4",
//   features: "",
//   notIncluded: "",
// };

// export const PricingAdminPage = () => {
//   const { pricing, pricingOps } = useSiteData();

//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState(empty);
//   const [editing, setEditing] = useState(null); // stores _id of item being edited
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const val =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setForm((p) => ({ ...p, [e.target.name]: val }));
//   };

//   // ── Edit — populate form with selected package ────────────
//   const handleEdit = (pkg) => {
//     setForm({
//       name: pkg.name || "",
//       price: pkg.price || "$",
//       duration: pkg.duration || "",
//       desc: pkg.desc || "",
//       popular: pkg.popular || false,
//       color: pkg.color || "#06b6d4",
//       features: (pkg.features || []).join("\n"),
//       notIncluded: (pkg.notIncluded || []).join("\n"),
//     });
//     setEditing(pkg._id); // ← use _id (MongoDB)
//     setShowForm(true);
//     setError("");
//   };

//   // ── Save — create or update in database ──────────────────
//   const handleSave = async () => {
//     if (!form.name.trim() || !form.price.trim()) {
//       setError("Name and price are required.");
//       return;
//     }
//     setError("");
//     setSaving(true);
//     try {
//       const payload = {
//         name: form.name,
//         price: form.price,
//         duration: form.duration,
//         desc: form.desc,
//         popular: form.popular,
//         color: form.color,
//         features: form.features
//           .split("\n")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         notIncluded: form.notIncluded
//           .split("\n")
//           .map((s) => s.trim())
//           .filter(Boolean),
//       };

//       if (editing) {
//         // Update existing package in database
//         await pricingOps.update(editing, payload);
//       } else {
//         // Create new package in database
//         await pricingOps.add(payload);
//       }

//       setSaved(true);
//       setTimeout(() => setSaved(false), 2500);
//       setForm(empty);
//       setEditing(null);
//       setShowForm(false);
//     } catch (err) {
//       setError(err.message || "Failed to save. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Delete from database ──────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this package?")) return;
//     try {
//       await pricingOps.remove(id); // ← _id passed here
//     } catch (err) {
//       alert(err.message || "Failed to delete.");
//     }
//   };

//   // ── Toggle popular — updates only that package in database ─
//   const togglePopular = async (pkg) => {
//     try {
//       await pricingOps.update(pkg._id, { ...pkg, popular: !pkg.popular });
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setForm(empty);
//     setEditing(null);
//     setError("");
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "2rem",
//           flexWrap: "wrap",
//           gap: "1rem",
//         }}
//       >
//         <div>
//           <h2
//             style={{
//               color: "#ffffff",
//               fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
//               fontWeight: 900,
//               marginBottom: "4px",
//             }}
//           >
//             Pricing Packages
//           </h2>
//           <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
//             {pricing.length} packages — changes save to database instantly.
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditing(null);
//             setForm(empty);
//           }}
//           style={{
//             padding: "10px 24px",
//             backgroundColor: "#06b6d4",
//             color: "#ffffff",
//             border: "none",
//             borderRadius: "10px",
//             fontWeight: 700,
//             cursor: "pointer",
//             fontSize: "0.875rem",
//             transition: "background-color 0.2s",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = "#22d3ee")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "#06b6d4")
//           }
//         >
//           + Add Package
//         </button>
//       </div>

//       {/* Success banner */}
//       {saved && (
//         <div
//           style={{
//             padding: "12px 16px",
//             backgroundColor: "rgba(16,185,129,0.1)",
//             border: "1px solid rgba(16,185,129,0.25)",
//             borderRadius: "10px",
//             color: "#10b981",
//             marginBottom: "1.5rem",
//             fontSize: "0.875rem",
//           }}
//         >
//           ✓ Package saved to database successfully!
//         </div>
//       )}

//       {/* Add / Edit Form */}
//       {showForm && (
//         <div
//           style={{
//             padding: "1.75rem",
//             borderRadius: "16px",
//             backgroundColor: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(34,211,238,0.25)",
//             marginBottom: "2rem",
//           }}
//         >
//           <h3
//             style={{
//               color: "#ffffff",
//               fontWeight: 700,
//               marginBottom: "1.5rem",
//             }}
//           >
//             {editing ? "Edit Package" : "Add New Package"}
//           </h3>

//           {/* Basic fields */}
//           <div
//             style={{
//               display: "grid",
//               gap: "1rem",
//               gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//               marginBottom: "1rem",
//             }}
//           >
//             {[
//               ["name", "Package Name *"],
//               ["price", "Price (e.g. $149)"],
//               ["duration", "Delivery Time"],
//               ["desc", "Short Description"],
//             ].map(([field, lbl]) => (
//               <div key={field}>
//                 <label style={labelStyle}>{lbl}</label>
//                 <input
//                   name={field}
//                   value={form[field]}
//                   onChange={handleChange}
//                   style={inputStyle}
//                   onFocus={focus}
//                   onBlur={blur}
//                 />
//               </div>
//             ))}

//             {/* Color picker */}
//             <div>
//               <label style={labelStyle}>Accent Color</label>
//               <div
//                 style={{ display: "flex", gap: "8px", alignItems: "center" }}
//               >
//                 <input
//                   type="color"
//                   name="color"
//                   value={form.color}
//                   onChange={handleChange}
//                   style={{
//                     width: "44px",
//                     height: "44px",
//                     borderRadius: "8px",
//                     border: "none",
//                     cursor: "pointer",
//                     backgroundColor: "transparent",
//                   }}
//                 />
//                 <input
//                   name="color"
//                   value={form.color}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, flex: 1 }}
//                   onFocus={focus}
//                   onBlur={blur}
//                 />
//               </div>
//             </div>

//             {/* Popular toggle */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 paddingTop: "1.5rem",
//               }}
//             >
//               <div
//                 onClick={() => setForm((p) => ({ ...p, popular: !p.popular }))}
//                 style={{
//                   width: "44px",
//                   height: "24px",
//                   borderRadius: "9999px",
//                   backgroundColor: form.popular
//                     ? "#06b6d4"
//                     : "rgba(255,255,255,0.1)",
//                   position: "relative",
//                   cursor: "pointer",
//                   transition: "background-color 0.3s",
//                   flexShrink: 0,
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "2px",
//                     left: form.popular ? "22px" : "2px",
//                     width: "20px",
//                     height: "20px",
//                     borderRadius: "9999px",
//                     backgroundColor: "#ffffff",
//                     transition: "left 0.3s",
//                   }}
//                 />
//               </div>
//               <span
//                 style={{
//                   color: form.popular ? "#22d3ee" : "#9ca3af",
//                   fontSize: "0.875rem",
//                   fontWeight: 600,
//                 }}
//               >
//                 Most Popular
//               </span>
//             </div>
//           </div>

//           {/* Features & Not Included */}
//           <div
//             style={{
//               display: "grid",
//               gap: "1rem",
//               gridTemplateColumns: "1fr 1fr",
//               marginBottom: "1rem",
//             }}
//           >
//             <div>
//               <label style={labelStyle}>Features Included (one per line)</label>
//               <textarea
//                 name="features"
//                 rows="6"
//                 value={form.features}
//                 onChange={handleChange}
//                 placeholder={
//                   "Up to 1,000 products\nCSV management\n3 revisions"
//                 }
//                 style={{ ...inputStyle, resize: "none" }}
//                 onFocus={focus}
//                 onBlur={blur}
//               />
//             </div>
//             <div>
//               <label style={labelStyle}>Not Included (one per line)</label>
//               <textarea
//                 name="notIncluded"
//                 rows="6"
//                 value={form.notIncluded}
//                 onChange={handleChange}
//                 placeholder={"Custom scripts\nPriority support"}
//                 style={{ ...inputStyle, resize: "none" }}
//                 onFocus={focus}
//                 onBlur={blur}
//               />
//             </div>
//           </div>

//           {error && (
//             <p
//               style={{
//                 color: "#f87171",
//                 fontSize: "0.8rem",
//                 marginBottom: "1rem",
//               }}
//             >
//               ⚠️ {error}
//             </p>
//           )}

//           <div style={{ display: "flex", gap: "10px" }}>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               style={{
//                 padding: "10px 28px",
//                 backgroundColor: saving ? "#0e7490" : "#06b6d4",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontWeight: 700,
//                 cursor: saving ? "not-allowed" : "pointer",
//                 transition: "background-color 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 if (!saving) e.currentTarget.style.backgroundColor = "#22d3ee";
//               }}
//               onMouseLeave={(e) => {
//                 if (!saving)
//                   e.currentTarget.style.backgroundColor = saving
//                     ? "#0e7490"
//                     : "#06b6d4";
//               }}
//             >
//               {saving
//                 ? "Saving..."
//                 : editing
//                   ? "Update Package"
//                   : "Save Package"}
//             </button>
//             <button
//               onClick={handleCancel}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "transparent",
//                 color: "#9ca3af",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: "10px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Package cards list */}
//       <div
//         style={{
//           display: "grid",
//           gap: "1.25rem",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//         }}
//       >
//         {pricing.map((pkg) => (
//           <div
//             key={pkg._id} // ← _id from MongoDB
//             style={{
//               padding: "1.5rem",
//               borderRadius: "14px",
//               backgroundColor: "rgba(255,255,255,0.04)",
//               border: `1px solid ${pkg.popular ? pkg.color : "rgba(255,255,255,0.08)"}`,
//               position: "relative",
//             }}
//           >
//             {pkg.popular && (
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "-11px",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   padding: "3px 14px",
//                   borderRadius: "9999px",
//                   backgroundColor: pkg.color,
//                   color: "#ffffff",
//                   fontSize: "0.7rem",
//                   fontWeight: 700,
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 ⭐ Most Popular
//               </span>
//             )}

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",
//                 marginBottom: "0.75rem",
//               }}
//             >
//               <div>
//                 <h4
//                   style={{
//                     color: "#ffffff",
//                     fontWeight: 900,
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   {pkg.name}
//                 </h4>
//                 <p
//                   style={{
//                     color: pkg.color,
//                     fontSize: "1.5rem",
//                     fontWeight: 900,
//                   }}
//                 >
//                   {pkg.price}
//                 </p>
//                 <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//                   {pkg.duration} · {pkg.desc}
//                 </p>
//               </div>

//               {/* Action buttons */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "6px",
//                   alignItems: "flex-end",
//                 }}
//               >
//                 <button
//                   onClick={() => handleEdit(pkg)}
//                   style={{
//                     padding: "6px 14px",
//                     borderRadius: "7px",
//                     fontSize: "0.75rem",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     backgroundColor: "rgba(34,211,238,0.1)",
//                     color: "#22d3ee",
//                     border: "1px solid rgba(34,211,238,0.2)",
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(pkg._id)} // ← _id
//                   style={{
//                     padding: "6px 14px",
//                     borderRadius: "7px",
//                     fontSize: "0.75rem",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     backgroundColor: "rgba(239,68,68,0.1)",
//                     color: "#f87171",
//                     border: "1px solid rgba(239,68,68,0.2)",
//                   }}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => togglePopular(pkg)}
//                   style={{
//                     padding: "6px 14px",
//                     borderRadius: "7px",
//                     fontSize: "0.75rem",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     backgroundColor: pkg.popular
//                       ? "rgba(245,158,11,0.1)"
//                       : "rgba(255,255,255,0.05)",
//                     color: pkg.popular ? "#f59e0b" : "#9ca3af",
//                     border: `1px solid ${pkg.popular ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.1)"}`,
//                   }}
//                 >
//                   {pkg.popular ? "★ Popular" : "☆ Set Popular"}
//                 </button>
//               </div>
//             </div>

//             {/* Features preview */}
//             <ul
//               style={{
//                 listStyle: "none",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "4px",
//               }}
//             >
//               {(pkg.features || []).slice(0, 4).map((f) => (
//                 <li
//                   key={f}
//                   style={{
//                     color: "#9ca3af",
//                     fontSize: "0.78rem",
//                     display: "flex",
//                     gap: "6px",
//                   }}
//                 >
//                   <span style={{ color: "#22d3ee" }}>✓</span>
//                   {f}
//                 </li>
//               ))}
//               {(pkg.features || []).length > 4 && (
//                 <li style={{ color: "#6b7280", fontSize: "0.75rem" }}>
//                   +{pkg.features.length - 4} more features
//                 </li>
//               )}
//             </ul>
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
  title: "",
  category: "E-commerce",
  description: "",
  tags: "",
  result: "",
  duration: "",
};
const CATS = ["E-commerce", "Automation", "Web Development"];

export const PortfolioAdminPage = () => {
  const { portfolio, portfolioOps } = useSiteData();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null); // _id
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const payload = { ...form, tags };
      if (editing) {
        await portfolioOps.update(editing, payload);
      } else {
        await portfolioOps.add({
          ...payload,
          color: "from-cyan-500/30 to-blue-500/10",
        });
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
      title: item.title,
      category: item.category,
      description: item.description,
      tags: (item.tags || []).join(", "),
      result: item.result || "",
      duration: item.duration || "",
    });
    setEditing(item._id); // ← _id
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await portfolioOps.remove(id);
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered =
    filter === "All"
      ? portfolio
      : portfolio.filter((i) => i.category === filter);

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
            Portfolio
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            {portfolio.length} projects — changes save to database.
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
          + Add Project
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
            {editing ? "Edit" : "Add"} Project
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
                Title *
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
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {CATS.map((c) => (
                  <option
                    key={c}
                    value={c}
                    style={{ backgroundColor: "#0d1224" }}
                  >
                    {c}
                  </option>
                ))}
              </select>
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
                Tags (comma separated)
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Shopify, CSV, Automation"
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
                Result / Achievement
              </label>
              <input
                name="result"
                value={form.result}
                onChange={handleChange}
                placeholder="Saved 120+ hours"
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
                Duration
              </label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="5 days"
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
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
              Description *
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
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

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {["All", ...CATS].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: filter === f ? "#06b6d4" : "transparent",
              color: filter === f ? "#ffffff" : "#9ca3af",
              border:
                filter === f
                  ? "1px solid #06b6d4"
                  : "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {filtered.map((item) => (
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
              <span
                style={{
                  padding: "3px 12px",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#22d3ee",
                  backgroundColor: "rgba(34,211,238,0.1)",
                }}
              >
                {item.category}
              </span>
            </div>
            <h4
              style={{
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "0.4rem",
              }}
            >
              {item.title}
            </h4>
            {item.result && (
              <p
                style={{
                  color: "#22d3ee",
                  fontSize: "0.78rem",
                  marginBottom: "0.5rem",
                }}
              >
                ✓ {item.result}
              </p>
            )}
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              {item.description?.slice(0, 100)}...
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "1rem",
              }}
            >
              {(item.tags || []).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "2px 10px",
                    borderRadius: "9999px",
                    fontSize: "0.7rem",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#9ca3af",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
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

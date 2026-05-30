import { useState, useEffect } from "react";
import { useSiteData } from "../../context/SiteDataContext";

const inputStyle = { width: "100%", padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s" };
const focus = e => e.currentTarget.style.borderColor = "#22d3ee";
const blur  = e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";

const DEFAULT = [
  { value: 100, suffix: "+",  label: "Projects Completed", icon: "🚀" },
  { value: 5,   suffix: "+",  label: "Years Experience",   icon: "⭐" },
  { value: 24,  suffix: "/7", label: "Support Available",  icon: "🕐" },
  { value: 50,  suffix: "+",  label: "Happy Clients",      icon: "🤝" },
];

export const StatsAdminPage = () => {
  const { owner, updateOwner, stats } = useSiteData();
  const [items,  setItems]  = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState("");

  useEffect(() => {
    setItems(stats?.length > 0 ? [...stats] : [...DEFAULT]);
  }, [stats?.length]);

  const update = (i, field, val) => {
    setItems(prev => prev.map((item, idx) =>
      idx === i ? { ...item, [field]: field === "value" ? Number(val) || 0 : val } : item
    ));
    setSaved(false);
  };

  const addStat = () => {
    setItems(prev => [...prev, { value: 0, suffix: "+", label: "New Stat", icon: "📊" }]);
  };

  const removeStat = (i) => {
    setItems(prev => prev.filter((_, idx) => idx !== i));
  };

  const moveUp = (i) => {
    if (i === 0) return;
    setItems(prev => { const n = [...prev]; [n[i-1], n[i]] = [n[i], n[i-1]]; return n; });
  };

  const moveDown = (i) => {
    if (i === items.length - 1) return;
    setItems(prev => { const n = [...prev]; [n[i], n[i+1]] = [n[i+1], n[i]]; return n; });
  };

  const save = async () => {
    setSaving(true); setError("");
    try {
      await updateOwner({ ...owner, stats: items });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Hero Stats</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            These numbers animate from 0 when a visitor scrolls to them. Shown on the homepage hero section.
          </p>
        </div>
        <button onClick={addStat}
          style={{ padding: "9px 20px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
        >+ Add Stat</button>
      </div>

      {/* Preview */}
      <div style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", marginBottom: "2rem" }}>
        <p style={{ color: "#22d3ee", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>Live Preview</p>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {items.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ color: "#22d3ee", fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}>
                {stat.icon} {stat.value}{stat.suffix}
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "4px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        {items.map((stat, i) => (
          <div key={i} style={{ padding: "1.25rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "60px 1fr 80px 1fr 40px", alignItems: "center", marginBottom: "8px" }}>
              {/* Icon */}
              <div>
                <label style={{ color: "#6b7280", fontSize: "0.72rem", display: "block", marginBottom: "4px" }}>Icon</label>
                <input value={stat.icon} onChange={e => update(i, "icon", e.target.value)}
                  style={{ ...inputStyle, textAlign: "center", fontSize: "1.25rem", padding: "8px 4px" }}
                  onFocus={focus} onBlur={blur}
                />
              </div>
              {/* Label */}
              <div>
                <label style={{ color: "#6b7280", fontSize: "0.72rem", display: "block", marginBottom: "4px" }}>Label</label>
                <input value={stat.label} onChange={e => update(i, "label", e.target.value)}
                  placeholder="Projects Completed"
                  style={inputStyle} onFocus={focus} onBlur={blur}
                />
              </div>
              {/* Value */}
              <div>
                <label style={{ color: "#6b7280", fontSize: "0.72rem", display: "block", marginBottom: "4px" }}>Number</label>
                <input type="number" value={stat.value} onChange={e => update(i, "value", e.target.value)}
                  style={inputStyle} onFocus={focus} onBlur={blur}
                />
              </div>
              {/* Suffix */}
              <div>
                <label style={{ color: "#6b7280", fontSize: "0.72rem", display: "block", marginBottom: "4px" }}>Suffix (shown after number)</label>
                <input value={stat.suffix} onChange={e => update(i, "suffix", e.target.value)}
                  placeholder="+ or /7 or %"
                  style={inputStyle} onFocus={focus} onBlur={blur}
                />
              </div>
              {/* Delete */}
              <button onClick={() => removeStat(i)}
                style={{ width: "36px", height: "36px", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", alignSelf: "flex-end" }}
              >✕</button>
            </div>
            {/* Reorder */}
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => moveUp(i)} disabled={i === 0}
                style={{ padding: "4px 10px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? "#374151" : "#9ca3af", fontSize: "0.75rem" }}
              >▲ Move Up</button>
              <button onClick={() => moveDown(i)} disabled={i === items.length - 1}
                style={{ padding: "4px 10px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: i === items.length - 1 ? "default" : "pointer", color: i === items.length - 1 ? "#374151" : "#9ca3af", fontSize: "0.75rem" }}
              >▼ Move Down</button>
            </div>
          </div>
        ))}
      </div>

      {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}

      <button onClick={save} disabled={saving}
        style={{ padding: "11px 32px", backgroundColor: saved ? "#10b981" : saving ? "#0e7490" : "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontSize: "0.9rem", transition: "all 0.3s" }}
        onMouseEnter={e => { if (!saving && !saved) e.currentTarget.style.backgroundColor = "#22d3ee"; }}
        onMouseLeave={e => { if (!saving && !saved) e.currentTarget.style.backgroundColor = "#06b6d4"; }}
      >{saved ? "✓ Saved!" : saving ? "Saving..." : "Save Stats"}</button>
    </div>
  );
};

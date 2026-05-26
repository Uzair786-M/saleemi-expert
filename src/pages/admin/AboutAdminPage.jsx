import { useState, useEffect } from "react";
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
const labelStyle = {
  color: "#9ca3af",
  fontSize: "0.8rem",
  fontWeight: 500,
  display: "block",
  marginBottom: "6px",
};
const sectionCard = {
  padding: "clamp(1.25rem, 2vw, 2rem)",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "2rem",
};
const focus = (color) => (e) =>
  (e.currentTarget.style.borderColor = color || "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

const SaveBtn = ({ onClick, saved, saving }) => (
  <button
    onClick={onClick}
    disabled={saving}
    style={{
      padding: "10px 28px",
      backgroundColor: saved ? "#10b981" : saving ? "#0e7490" : "#06b6d4",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontWeight: 700,
      cursor: saving ? "not-allowed" : "pointer",
      fontSize: "0.875rem",
      transition: "all 0.3s",
    }}
    onMouseEnter={(e) => {
      if (!saving && !saved) e.currentTarget.style.backgroundColor = "#22d3ee";
    }}
    onMouseLeave={(e) => {
      if (!saving && !saved) e.currentTarget.style.backgroundColor = "#06b6d4";
    }}
  >
    {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Changes"}
  </button>
);

export const AboutAdminPage = () => {
  const {
    owner,
    updateOwner,
    skills,
    updateSkills,
    timeline,
    updateTimeline,
    certs,
    certsOps,
  } = useSiteData();

  // ── Profile ───────────────────────────────────────────────
  const [profile, setProfile] = useState({ ...owner });
  const [profSaved, setProfSaved] = useState(false);
  const [profSaving, setProfSaving] = useState(false);

  useEffect(() => {
    setProfile({ ...owner });
  }, [owner]);

  const handleProfile = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
    setProfSaved(false);
  };
  const saveProfile = async () => {
    setProfSaving(true);
    try {
      await updateOwner(profile);
      setProfSaved(true);
      setTimeout(() => setProfSaved(false), 2500);
    } catch (e) {
      alert(e.message);
    } finally {
      setProfSaving(false);
    }
  };

  // ── Skills ─────────────────────────────────────────────────
  const [localSkills, setLocalSkills] = useState(
    JSON.parse(JSON.stringify(skills || [])),
  );
  const [skillsSaved, setSkillsSaved] = useState(false);
  const [skillsSaving, setSkillsSaving] = useState(false);

  useEffect(() => {
    setLocalSkills(JSON.parse(JSON.stringify(skills || [])));
  }, [skills]);

  const updateSkillItem = (ci, si, field, val) => {
    setLocalSkills((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      n[ci].items[si][field] =
        field === "level" ? Math.min(100, Math.max(0, Number(val))) : val;
      return n;
    });
  };
  const addSkill = (ci) =>
    setLocalSkills((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      n[ci].items.push({ name: "New Skill", level: 80 });
      return n;
    });
  const removeSkill = (ci, si) =>
    setLocalSkills((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      n[ci].items.splice(si, 1);
      return n;
    });
  const saveSkills = async () => {
    setSkillsSaving(true);
    try {
      await updateSkills(localSkills);
      setSkillsSaved(true);
      setTimeout(() => setSkillsSaved(false), 2500);
    } catch (e) {
      alert(e.message);
    } finally {
      setSkillsSaving(false);
    }
  };

  // ── Timeline ───────────────────────────────────────────────
  const [localTimeline, setLocalTimeline] = useState([...(timeline || [])]);
  const [tlSaved, setTlSaved] = useState(false);
  const [tlSaving, setTlSaving] = useState(false);

  useEffect(() => {
    setLocalTimeline([...(timeline || [])]);
  }, [timeline]);

  const updateTl = (i, field, val) =>
    setLocalTimeline((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)),
    );
  const addTl = () =>
    setLocalTimeline((prev) => [
      { year: "", role: "", company: "", desc: "" },
      ...prev,
    ]);
  const removeTl = (i) =>
    setLocalTimeline((prev) => prev.filter((_, idx) => idx !== i));
  const saveTl = async () => {
    setTlSaving(true);
    try {
      await updateTimeline(localTimeline);
      setTlSaved(true);
      setTimeout(() => setTlSaved(false), 2500);
    } catch (e) {
      alert(e.message);
    } finally {
      setTlSaving(false);
    }
  };

  // ── Certs ──────────────────────────────────────────────────
  const [certForm, setCertForm] = useState({ name: "", issuer: "", year: "" });
  const [certSaved, setCertSaved] = useState(false);
  const [editCert, setEditCert] = useState(null);

  const saveCert = async () => {
    if (!certForm.name.trim()) return;
    try {
      if (editCert !== null) {
        await certsOps.update(editCert, certForm);
      } else {
        await certsOps.add({ ...certForm });
      }
      setCertForm({ name: "", issuer: "", year: "" });
      setEditCert(null);
      setCertSaved(true);
      setTimeout(() => setCertSaved(false), 2500);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          About Me
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Edit your profile, skills, experience, certifications and social
          links.
        </p>
      </div>

      {/* ── Profile ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          👤 Profile Info
        </h3>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginBottom: "1rem",
          }}
        >
          {[
            ["name", "Display Name"],
            ["title", "Professional Title"],
            ["email", "Email Address"],
            ["whatsapp", "WhatsApp (+92...)"],
            ["location", "Location"],
          ].map(([name, label]) => (
            <div key={name}>
              <label style={labelStyle}>{label}</label>
              <input
                name={name}
                value={profile[name] || ""}
                onChange={handleProfile}
                style={inputStyle}
                onFocus={focus()}
                onBlur={blur}
              />
            </div>
          ))}
        </div>

        {/* CV URL */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>CV / Resume URL</label>
          <input
            name="cvUrl"
            value={profile.cvUrl || ""}
            onChange={handleProfile}
            placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view or any direct PDF link"
            style={inputStyle}
            onFocus={focus()}
            onBlur={blur}
          />
          <p
            style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "5px" }}
          >
            Upload your CV to Google Drive → right click → Get link → change to
            "Anyone with link" → paste here. Leave empty to hide the Download CV
            button.
          </p>
        </div>

        {/* Photo URL with live preview */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Profile Photo</label>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {/* Input field */}
            <input
              name="photo"
              value={profile.photo || ""}
              onChange={handleProfile}
              placeholder="Paste image URL: https://... or /images/photo.jpg"
              style={{ ...inputStyle, flex: 1 }}
              onFocus={focus()}
              onBlur={blur}
            />
            {/* Live preview circle — same height as input, aligned center */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "9999px",
                flexShrink: 0,
                border: "2px solid rgba(34,211,238,0.35)",
                overflow: "hidden",
                backgroundColor: "#0d1224",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                color: "#22d3ee",
                fontWeight: 700,
              }}
            >
              {profile.photo ? (
                <img
                  key={profile.photo}
                  src={profile.photo}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <span
                style={{
                  display: profile.photo ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                SE
              </span>
            </div>
          </div>
          <p
            style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "6px" }}
          >
            Paste any public image URL — or put a photo in{" "}
            <code style={{ color: "#9ca3af" }}>public/images/</code> and type{" "}
            <code style={{ color: "#9ca3af" }}>/images/yourphoto.jpg</code>
          </p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Bio (Paragraph 1)</label>
          <textarea
            name="bio"
            rows="3"
            value={profile.bio || ""}
            onChange={handleProfile}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focus()}
            onBlur={blur}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Bio (Paragraph 2)</label>
          <textarea
            name="bio2"
            rows="3"
            value={profile.bio2 || ""}
            onChange={handleProfile}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focus()}
            onBlur={blur}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Tagline</label>
          <input
            name="tagline"
            value={profile.tagline || ""}
            onChange={handleProfile}
            style={inputStyle}
            onFocus={focus()}
            onBlur={blur}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            onClick={() => {
              setProfile((p) => ({ ...p, available: !p.available }));
              setProfSaved(false);
            }}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "9999px",
              backgroundColor: profile.available
                ? "#10b981"
                : "rgba(255,255,255,0.1)",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: profile.available ? "24px" : "3px",
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
              color: profile.available ? "#10b981" : "#9ca3af",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {profile.available ? "Available for Work" : "Not Available"}
          </span>
        </div>
        <SaveBtn onClick={saveProfile} saved={profSaved} saving={profSaving} />
      </div>

      {/* ── Social Links ── */}
      <SocialLinksSection owner={owner} updateOwner={updateOwner} />

      {/* ── Skills ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          ⚡ Skills & Proficiency
        </h3>
        {localSkills.map((group, ci) => (
          <div key={group.category || ci} style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h4
                style={{
                  color: "#22d3ee",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {group.category}
              </h4>
              <button
                onClick={() => addSkill(ci)}
                style={{
                  padding: "5px 14px",
                  backgroundColor: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.25)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                + Add Skill
              </button>
            </div>
            {group.items.map((skill, si) => (
              <div
                key={si}
                style={{
                  display: "grid",
                  gap: "8px",
                  gridTemplateColumns: "1fr 80px 36px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkillItem(ci, si, "name", e.target.value)
                  }
                  style={{ ...inputStyle, padding: "8px 12px" }}
                  onFocus={focus()}
                  onBlur={blur}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) =>
                    updateSkillItem(ci, si, "level", e.target.value)
                  }
                  style={{ ...inputStyle, padding: "8px 12px" }}
                  onFocus={focus()}
                  onBlur={blur}
                />
                <button
                  onClick={() => removeSkill(ci, si)}
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
        <SaveBtn
          onClick={saveSkills}
          saved={skillsSaved}
          saving={skillsSaving}
        />
      </div>

      {/* ── Timeline ── */}
      <div style={sectionCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>
            📅 Experience Timeline
          </h3>
          <button
            onClick={addTl}
            style={{
              padding: "8px 18px",
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            + Add Entry
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          {localTimeline.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "1.25rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  marginBottom: "10px",
                }}
              >
                {[
                  ["year", "Year"],
                  ["role", "Job Title / Role"],
                  ["company", "Company"],
                ].map(([field, lbl]) => (
                  <div key={field}>
                    <label style={labelStyle}>{lbl}</label>
                    <input
                      value={item[field] || ""}
                      onChange={(e) => updateTl(i, field, e.target.value)}
                      style={{ ...inputStyle, padding: "8px 12px" }}
                      onFocus={focus()}
                      onBlur={blur}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows="2"
                  value={item.desc || ""}
                  onChange={(e) => updateTl(i, "desc", e.target.value)}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={focus()}
                  onBlur={blur}
                />
              </div>
              <button
                onClick={() => removeTl(i)}
                style={{
                  padding: "6px 16px",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <SaveBtn onClick={saveTl} saved={tlSaved} saving={tlSaving} />
      </div>

      {/* ── Certifications ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          🏆 Certifications
        </h3>
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "12px",
            border: "1px solid rgba(34,211,238,0.2)",
            backgroundColor: "rgba(34,211,238,0.03)",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {editCert !== null ? "Edit" : "Add"} Certification
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              marginBottom: "1rem",
            }}
          >
            {[
              ["name", "Certification Name *"],
              ["issuer", "Issued By"],
              ["year", "Year"],
            ].map(([field, lbl]) => (
              <div key={field}>
                <label style={labelStyle}>{lbl}</label>
                <input
                  value={certForm[field] || ""}
                  onChange={(e) =>
                    setCertForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                  style={{ ...inputStyle, padding: "8px 12px" }}
                  onFocus={focus()}
                  onBlur={blur}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <SaveBtn onClick={saveCert} saved={certSaved} saving={false} />
            {editCert !== null && (
              <button
                onClick={() => {
                  setCertForm({ name: "", issuer: "", year: "" });
                  setEditCert(null);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  color: "#9ca3af",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {certs.map((cert) => (
            <div
              key={cert._id || cert.name}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {cert.name}
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button
                  onClick={() => {
                    setCertForm({
                      name: cert.name,
                      issuer: cert.issuer,
                      year: cert.year,
                    });
                    setEditCert(cert._id || cert.name);
                  }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "7px",
                    fontSize: "0.75rem",
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
                  onClick={() => certsOps.remove(cert._id || cert.name)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "7px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Social Links Manager ───────────────────────────────────────
const emptyLink = { label: "", url: "", icon: "🔗", color: "#22d3ee" };

const SocialLinksSection = ({ owner, updateOwner }) => {
  // Safely convert to array — handles object format, array format, null, undefined
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return [...val];
    // Old object format: { fiverr: "url", upwork: "url" }
    if (typeof val === "object") {
      return Object.entries(val)
        .filter(([, url]) => url && url.trim() !== "")
        .map(([key, url]) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          url,
          icon: "🔗",
          color: "#22d3ee",
        }));
    }
    return [];
  };

  const [links, setLinks] = useState(toArray(owner?.socialLinks));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyLink);
  const [editing, setEditing] = useState(null); // index

  // Sync when owner loads from backend
  useEffect(() => {
    if (owner?.socialLinks !== undefined) setLinks(toArray(owner.socialLinks));
  }, [owner?.socialLinks?.length, typeof owner?.socialLinks]);

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const saveAll = async (newLinks) => {
    setSaving(true);
    setError("");
    try {
      await updateOwner({ ...owner, socialLinks: newLinks });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    if (!form.label.trim() || !form.url.trim()) {
      setError("Label and URL are required.");
      return;
    }
    setError("");
    let newLinks;
    if (editing !== null) {
      newLinks = links.map((l, i) => (i === editing ? { ...form } : l));
    } else {
      newLinks = [...links, { ...form }];
    }
    setLinks(newLinks);
    await saveAll(newLinks);
    setForm(emptyLink);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (i) => {
    setForm({
      label: links[i].label,
      url: links[i].url,
      icon: links[i].icon,
      color: links[i].color,
    });
    setEditing(i);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (i) => {
    if (!window.confirm(`Delete "${links[i].label}"?`)) return;
    const newLinks = links.filter((_, idx) => idx !== i);
    setLinks(newLinks);
    await saveAll(newLinks);
  };

  const handleMoveUp = async (i) => {
    if (i === 0) return;
    const newLinks = [...links];
    [newLinks[i - 1], newLinks[i]] = [newLinks[i], newLinks[i - 1]];
    setLinks(newLinks);
    await saveAll(newLinks);
  };

  const handleMoveDown = async (i) => {
    if (i === links.length - 1) return;
    const newLinks = [...links];
    [newLinks[i], newLinks[i + 1]] = [newLinks[i + 1], newLinks[i]];
    setLinks(newLinks);
    await saveAll(newLinks);
  };

  return (
    <div
      style={{
        padding: "clamp(1.25rem, 2vw, 2rem)",
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>
            🔗 Social & Platform Links
          </h3>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "3px" }}>
            {links.length} link{links.length !== 1 ? "s" : ""} · Appears on
            About page and Footer · Drag to reorder
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(emptyLink);
            setError("");
          }}
          style={{
            padding: "9px 20px",
            backgroundColor: "#06b6d4",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.85rem",
            transition: "background-color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#22d3ee")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#06b6d4")
          }
        >
          + Add Link
        </button>
      </div>

      {saved && (
        <div
          style={{
            padding: "10px 14px",
            backgroundColor: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "8px",
            color: "#10b981",
            fontSize: "0.8rem",
            marginBottom: "1rem",
          }}
        >
          ✓ Links saved successfully!
        </div>
      )}
      {error && (
        <div
          style={{
            padding: "10px 14px",
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "8px",
            color: "#f87171",
            fontSize: "0.8rem",
            marginBottom: "1rem",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "12px",
            border: "1px solid rgba(34,211,238,0.25)",
            backgroundColor: "rgba(34,211,238,0.04)",
            marginBottom: "1.25rem",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {editing !== null ? "✏️ Edit Link" : "➕ Add New Link"}
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginBottom: "10px",
            }}
          >
            {/* Label */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Platform Name *
              </label>
              <input
                value={form.label}
                onChange={(e) =>
                  setForm((p) => ({ ...p, label: e.target.value }))
                }
                placeholder="e.g. Fiverr, Upwork, Twitter..."
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#22d3ee")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Icon */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Icon (emoji)
              </label>
              <input
                value={form.icon}
                onChange={(e) =>
                  setForm((p) => ({ ...p, icon: e.target.value }))
                }
                placeholder="🔗"
                style={{
                  ...inputStyle,
                  fontSize: "1.4rem",
                  textAlign: "center",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#22d3ee")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Color */}
            <div>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Brand Color
              </label>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, color: e.target.value }))
                  }
                  style={{
                    width: "42px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    flexShrink: 0,
                  }}
                />
                <input
                  value={form.color}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, color: e.target.value }))
                  }
                  placeholder="#22d3ee"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#22d3ee")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)")
                  }
                />
              </div>
            </div>
          </div>

          {/* URL — full width */}
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                color: "#9ca3af",
                fontSize: "0.75rem",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Full URL *
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="url"
                value={form.url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://fiverr.com/your_username"
                style={{ ...inputStyle, flex: 1 }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = form.color || "#22d3ee")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              {form.url && (
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: `${form.color}18`,
                    border: `1px solid ${form.color}40`,
                    color: form.color,
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  Preview ↗
                </a>
              )}
            </div>
          </div>

          {/* Preview badge */}
          {form.label && (
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Preview
              </label>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  backgroundColor: `${form.color}18`,
                  border: `1px solid ${form.color}40`,
                  color: form.color,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {form.icon} {form.label}
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleAdd}
              disabled={saving}
              style={{
                padding: "9px 24px",
                backgroundColor: saving ? "#0e7490" : "#06b6d4",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = "#06b6d4";
              }}
            >
              {saving
                ? "Saving..."
                : editing !== null
                  ? "Update Link"
                  : "Add Link"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(emptyLink);
                setEditing(null);
                setError("");
              }}
              style={{
                padding: "9px 20px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Links list */}
      {links.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#6b7280",
            fontSize: "0.875rem",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: "12px",
          }}
        >
          No links yet — click{" "}
          <strong style={{ color: "#22d3ee" }}>+ Add Link</strong> to get
          started
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {links.map((link, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: `1px solid ${link.color}25`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${link.color}60`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = `${link.color}25`)
              }
            >
              {/* Reorder buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => handleMoveUp(i)}
                  disabled={i === 0}
                  style={{
                    width: "22px",
                    height: "20px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    cursor: i === 0 ? "default" : "pointer",
                    color: i === 0 ? "#374151" : "#9ca3af",
                    fontSize: "10px",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ▲
                </button>
                <button
                  onClick={() => handleMoveDown(i)}
                  disabled={i === links.length - 1}
                  style={{
                    width: "22px",
                    height: "20px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    cursor: i === links.length - 1 ? "default" : "pointer",
                    color: i === links.length - 1 ? "#374151" : "#9ca3af",
                    fontSize: "10px",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ▼
                </button>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: `${link.color}20`,
                  border: `1px solid ${link.color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: link.color,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "2px",
                  }}
                >
                  {link.label}
                </p>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.url}
                </p>
              </div>

              {/* Preview */}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  backgroundColor: `${link.color}15`,
                  border: `1px solid ${link.color}35`,
                  color: link.color,
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = `${link.color}30`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = `${link.color}15`)
                }
              >
                ↗
              </a>

              {/* Edit */}
              <button
                onClick={() => handleEdit(i)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.2)",
                  flexShrink: 0,
                }}
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(i)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.2)",
                  flexShrink: 0,
                }}
              >
                Del
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { label: "Home",      to: "/"         },
  { label: "About",     to: "/about"    },
  { label: "Services",  to: "/services" },
  { label: "Portfolio", to: "/portfolio"},
  { label: "Pricing",   to: "/pricing"  },
  { label: "Contact",   to: "/contact"  },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const onScroll  = () => setScrolled(window.scrollY > 20);
    const onResize  = () => { setIsMobile(window.innerWidth < 900); if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener("scroll",  onScroll);
    window.addEventListener("resize",  onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      backgroundColor: scrolled ? "rgba(5,8,22,0.92)" : "rgba(5,8,22,0.6)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      transition: "background-color 0.3s ease",
    }}>
      <div style={{ width: "100%", padding: "14px clamp(1.5rem, 5vw, 6rem)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to="/" onClick={close} style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "0.04em" }}>
            Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "clamp(1rem, 2.5vw, 2.5rem)", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} style={({ isActive }) => ({ color: isActive ? "#22d3ee" : "#d1d5db", textDecoration: "none", fontSize: "clamp(0.8rem, 1vw, 1rem)", fontWeight: 500, transition: "color 0.2s" })}
                  onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
                  onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) e.currentTarget.style.color = "#d1d5db"; }}
                >{label}</NavLink>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <Link to="/contact" onClick={close} style={{ padding: "clamp(8px, 0.8vw, 12px) clamp(16px, 1.5vw, 28px)", backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "9999px", fontWeight: 700, fontSize: "clamp(0.75rem, 0.9vw, 1rem)", textDecoration: "none", transition: "background-color 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
          >Hire Me</Link>

          {isMobile && (
            <button onClick={() => setMenuOpen(p => !p)} aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#ffffff", borderRadius: "2px", transition: "all 0.3s",
                  transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
                  opacity:   menuOpen && i===1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div style={{ maxHeight: menuOpen ? "500px" : "0", overflow: "hidden", transition: "max-height 0.35s ease", backgroundColor: "rgba(5,8,22,0.98)", borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: menuOpen ? "16px 24px 20px" : "0 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} end={to==="/"} onClick={close}
                  style={({ isActive }) => ({ display: "block", padding: "11px 14px", borderRadius: "8px", color: isActive ? "#22d3ee" : "#d1d5db", textDecoration: "none", fontSize: "1rem", fontWeight: 500, backgroundColor: isActive ? "rgba(34,211,238,0.08)" : "transparent", transition: "all 0.2s" })}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(34,211,238,0.06)"; e.currentTarget.style.color = "#22d3ee"; }}
                  onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d1d5db"; } }}
                >{label}</NavLink>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "8px 0" }} />
            <li>
              <Link to="/contact" onClick={close} style={{ display: "block", padding: "12px 14px", borderRadius: "8px", backgroundColor: "#06b6d4", color: "#ffffff", textDecoration: "none", fontSize: "1rem", fontWeight: 700, textAlign: "center", transition: "background-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
              >Hire Me</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

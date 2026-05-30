import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchServices,        createService        as apiCreateService,
  updateService         as apiUpdateService,  deleteService       as apiDeleteService,
  fetchPortfolioItems,  createPortfolioItem  as apiCreatePortfolio,
  updatePortfolioItem   as apiUpdatePortfolio, deletePortfolioItem as apiDeletePortfolio,
  fetchTestimonials,    createTestimonial    as apiCreateTestimonial,
  updateTestimonial     as apiUpdateTestimonial, deleteTestimonial as apiDeleteTestimonial,
  fetchAbout,           updateAbout          as apiUpdateAbout,
  fetchPricing,         createPricing        as apiCreatePricing,
  updatePricing         as apiUpdatePricing,  deletePricing       as apiDeletePricing,
} from "../services/api.js";

const SiteDataContext = createContext(null);

// Convert socialLinks from any format to clean array
const normalizeSocialLinks = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object") {
    return Object.entries(raw)
      .filter(([, v]) => v && String(v).trim())
      .map(([key, url]) => ({ label: key.charAt(0).toUpperCase() + key.slice(1), url, icon: "🔗", color: "#22d3ee" }));
  }
  return [];
};

export const SiteDataProvider = ({ children }) => {
  const [services,     setServices]     = useState([]);
  const [portfolio,    setPortfolio]    = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricing,      setPricing]      = useState([]);
  const [owner,        setOwner]        = useState({});
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  // Derived from owner
  const skills      = Array.isArray(owner.skills)         ? owner.skills        : [];
  const timeline    = Array.isArray(owner.timeline)        ? owner.timeline       : [];
  const certs       = Array.isArray(owner.certifications)  ? owner.certifications : [];
  const socialLinks = normalizeSocialLinks(owner.socialLinks);
  const stats       = Array.isArray(owner.stats)           ? owner.stats          : [];

  // ── Load all data on mount ─────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetchAbout() returns the aboutDoc directly (api.js does r.data.data)
        // fetchServices() returns array directly (api.js does r.data.data ?? [])
        const [svc, port, test, price, about] = await Promise.all([
          fetchServices(),
          fetchPortfolioItems(),
          fetchTestimonials(),
          fetchPricing(),
          fetchAbout(),
        ]);
        if (cancelled) return;

        setServices(    Array.isArray(svc)   ? svc   : []);
        setPortfolio(   Array.isArray(port)  ? port  : []);
        setTestimonials(Array.isArray(test)  ? test  : []);
        setPricing(     Array.isArray(price) ? price : []);
        // about = aboutDoc with { socialLinks, skills, ... }
        setOwner(about && typeof about === "object" ? about : {});

      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load:", err.message);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // ── Services ──────────────────────────────────────────────
  const servicesOps = {
    add:    useCallback(async (item) => { const d = await apiCreateService(item);  setServices(p => [...p, d]); return d; }, []),
    update: useCallback(async (id, b) => { const d = await apiUpdateService(id,b); setServices(p => p.map(s => s._id===id ? d : s)); return d; }, []),
    remove: useCallback(async (id)    => { await apiDeleteService(id);             setServices(p => p.filter(s => s._id!==id)); }, []),
  };

  // ── Portfolio ─────────────────────────────────────────────
  const portfolioOps = {
    add:    useCallback(async (item) => { const d = await apiCreatePortfolio(item);  setPortfolio(p => [...p, d]); return d; }, []),
    update: useCallback(async (id, b) => { const d = await apiUpdatePortfolio(id,b); setPortfolio(p => p.map(i => i._id===id ? d : i)); return d; }, []),
    remove: useCallback(async (id)    => { await apiDeletePortfolio(id);             setPortfolio(p => p.filter(i => i._id!==id)); }, []),
  };

  // ── Testimonials ──────────────────────────────────────────
  const testimonialsOps = {
    add:    useCallback(async (item) => { const d = await apiCreateTestimonial(item);  setTestimonials(p => [...p, d]); return d; }, []),
    update: useCallback(async (id, b) => { const d = await apiUpdateTestimonial(id,b); setTestimonials(p => p.map(t => t._id===id ? d : t)); return d; }, []),
    remove: useCallback(async (id)    => { await apiDeleteTestimonial(id);             setTestimonials(p => p.filter(t => t._id!==id)); }, []),
  };

  // ── Pricing ───────────────────────────────────────────────
  const pricingOps = {
    add:    useCallback(async (item) => { const d = await apiCreatePricing(item);  setPricing(p => [...p, d]); return d; }, []),
    update: useCallback(async (id, b) => { const d = await apiUpdatePricing(id,b); setPricing(p => p.map(i => i._id===id ? d : i)); return d; }, []),
    remove: useCallback(async (id)    => { await apiDeletePricing(id);             setPricing(p => p.filter(i => i._id!==id)); }, []),
  };

  // ── About ─────────────────────────────────────────────────
  // apiUpdateAbout returns the updated aboutDoc directly (r.data.data)
  const updateOwner = useCallback(async (data) => {
    const doc = await apiUpdateAbout(data);
    if (doc && typeof doc === "object") setOwner(doc);
    return doc;
  }, []);

  const updateSkills = useCallback(async (newSkills) => {
    const doc = await apiUpdateAbout({ ...owner, skills: newSkills });
    if (doc && typeof doc === "object") setOwner(doc);
  }, [owner]);

  const updateTimeline = useCallback(async (newTimeline) => {
    const doc = await apiUpdateAbout({ ...owner, timeline: newTimeline });
    if (doc && typeof doc === "object") setOwner(doc);
  }, [owner]);

  // ── Certs ─────────────────────────────────────────────────
  const certsOps = {
    add: useCallback(async (cert) => {
      const doc = await apiUpdateAbout({ ...owner, certifications: [...certs, cert] });
      if (doc && typeof doc === "object") setOwner(doc);
    }, [owner, certs]),
    update: useCallback(async (id, data) => {
      const updated = certs.map(c => (c._id || c.name) === id ? { ...c, ...data } : c);
      const doc = await apiUpdateAbout({ ...owner, certifications: updated });
      if (doc && typeof doc === "object") setOwner(doc);
    }, [owner, certs]),
    remove: useCallback(async (id) => {
      const updated = certs.filter(c => (c._id || c.name) !== id);
      const doc = await apiUpdateAbout({ ...owner, certifications: updated });
      if (doc && typeof doc === "object") setOwner(doc);
    }, [owner, certs]),
  };

  return (
    <SiteDataContext.Provider value={{
      services, portfolio, testimonials, pricing, owner,
      skills, timeline, certs, socialLinks, stats,
      loading, error,
      servicesOps, portfolioOps, testimonialsOps, pricingOps, certsOps,
      updateOwner, updateSkills, updateTimeline,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be inside SiteDataProvider");
  return ctx;
};

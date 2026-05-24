import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  fetchServices,
  createService as apiCreateService,
  updateService as apiUpdateService,
  deleteService as apiDeleteService,
  fetchPortfolioItems,
  createPortfolioItem as apiCreatePortfolio,
  updatePortfolioItem as apiUpdatePortfolio,
  deletePortfolioItem as apiDeletePortfolio,
  fetchTestimonials,
  createTestimonial as apiCreateTestimonial,
  updateTestimonial as apiUpdateTestimonial,
  deleteTestimonial as apiDeleteTestimonial,
  fetchAbout,
  updateAbout as apiUpdateAbout,
  fetchPricing,
  createPricing as apiCreatePricing,
  updatePricing as apiUpdatePricing,
  deletePricing as apiDeletePricing,
} from "../services/api.js";

const SiteDataContext = createContext(null);

export const SiteDataProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Safely derived arrays from owner ──────────────────────
  const skills = Array.isArray(owner.skills) ? owner.skills : [];
  const timeline = Array.isArray(owner.timeline) ? owner.timeline : [];
  const certs = Array.isArray(owner.certifications) ? owner.certifications : [];
  // socialLinks — handle array (new) or object (old format)
  const socialLinks = (() => {
    const raw = owner.socialLinks;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    // Old format: { fiverr: "url", upwork: "url" }
    if (typeof raw === "object") {
      return Object.entries(raw)
        .filter(([, url]) => url && String(url).trim())
        .map(([key, url]) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          url,
          icon: "🔗",
          color: "#22d3ee",
        }));
    }
    return [];
  })();

  // ── Load all data on mount ─────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [svc, port, test, price, about] = await Promise.all([
          fetchServices(),
          fetchPortfolioItems(),
          fetchTestimonials(),
          fetchPricing(),
          fetchAbout(),
        ]);

        if (cancelled) return;

        setServices(Array.isArray(svc) ? svc : []);
        setPortfolio(Array.isArray(port) ? port : []);
        setTestimonials(Array.isArray(test) ? test : []);
        setPricing(Array.isArray(price) ? price : []);

        // fetchAbout returns the about document directly (api.js does r.data.data)
        if (about && typeof about === "object") {
          setOwner(about);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("SiteDataContext load error:", err.message);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Services ───────────────────────────────────────────────
  const servicesOps = {
    add: useCallback(async (item) => {
      const doc = await apiCreateService(item);
      setServices((p) => [...p, doc]);
      return doc;
    }, []),
    update: useCallback(async (id, data) => {
      const doc = await apiUpdateService(id, data);
      setServices((p) => p.map((s) => (s._id === id ? doc : s)));
      return doc;
    }, []),
    remove: useCallback(async (id) => {
      await apiDeleteService(id);
      setServices((p) => p.filter((s) => s._id !== id));
    }, []),
  };

  // ── Portfolio ──────────────────────────────────────────────
  const portfolioOps = {
    add: useCallback(async (item) => {
      const doc = await apiCreatePortfolio(item);
      setPortfolio((p) => [...p, doc]);
      return doc;
    }, []),
    update: useCallback(async (id, data) => {
      const doc = await apiUpdatePortfolio(id, data);
      setPortfolio((p) => p.map((i) => (i._id === id ? doc : i)));
      return doc;
    }, []),
    remove: useCallback(async (id) => {
      await apiDeletePortfolio(id);
      setPortfolio((p) => p.filter((i) => i._id !== id));
    }, []),
  };

  // ── Testimonials ───────────────────────────────────────────
  const testimonialsOps = {
    add: useCallback(async (item) => {
      const doc = await apiCreateTestimonial(item);
      setTestimonials((p) => [...p, doc]);
      return doc;
    }, []),
    update: useCallback(async (id, data) => {
      const doc = await apiUpdateTestimonial(id, data);
      setTestimonials((p) => p.map((t) => (t._id === id ? doc : t)));
      return doc;
    }, []),
    remove: useCallback(async (id) => {
      await apiDeleteTestimonial(id);
      setTestimonials((p) => p.filter((t) => t._id !== id));
    }, []),
  };

  // ── Pricing ────────────────────────────────────────────────
  const pricingOps = {
    add: useCallback(async (item) => {
      const doc = await apiCreatePricing(item);
      setPricing((p) => [...p, doc]);
      return doc;
    }, []),
    update: useCallback(async (id, data) => {
      const doc = await apiUpdatePricing(id, data);
      setPricing((p) => p.map((i) => (i._id === id ? doc : i)));
      return doc;
    }, []),
    remove: useCallback(async (id) => {
      await apiDeletePricing(id);
      setPricing((p) => p.filter((i) => i._id !== id));
    }, []),
  };

  // ── About ──────────────────────────────────────────────────
  // apiUpdateAbout returns the updated about document directly
  const updateOwner = useCallback(async (data) => {
    const doc = await apiUpdateAbout(data);
    if (doc && typeof doc === "object") setOwner(doc);
    return doc;
  }, []);

  const updateSkills = useCallback(
    async (newSkills) => {
      const doc = await apiUpdateAbout({ ...owner, skills: newSkills });
      if (doc && typeof doc === "object") setOwner(doc);
    },
    [owner],
  );

  const updateTimeline = useCallback(
    async (newTimeline) => {
      const doc = await apiUpdateAbout({ ...owner, timeline: newTimeline });
      if (doc && typeof doc === "object") setOwner(doc);
    },
    [owner],
  );

  // ── Certs ──────────────────────────────────────────────────
  const certsOps = {
    add: useCallback(
      async (cert) => {
        const doc = await apiUpdateAbout({
          ...owner,
          certifications: [...certs, cert],
        });
        if (doc && typeof doc === "object") setOwner(doc);
      },
      [owner, certs],
    ),
    update: useCallback(
      async (id, data) => {
        const newCerts = certs.map((c) =>
          (c._id || c.name) === id ? { ...c, ...data } : c,
        );
        const doc = await apiUpdateAbout({
          ...owner,
          certifications: newCerts,
        });
        if (doc && typeof doc === "object") setOwner(doc);
      },
      [owner, certs],
    ),
    remove: useCallback(
      async (id) => {
        const newCerts = certs.filter((c) => (c._id || c.name) !== id);
        const doc = await apiUpdateAbout({
          ...owner,
          certifications: newCerts,
        });
        if (doc && typeof doc === "object") setOwner(doc);
      },
      [owner, certs],
    ),
  };

  return (
    <SiteDataContext.Provider
      value={{
        services,
        portfolio,
        testimonials,
        pricing,
        owner,
        skills,
        timeline,
        certs,
        socialLinks,
        loading,
        error,
        servicesOps,
        portfolioOps,
        testimonialsOps,
        pricingOps,
        certsOps,
        updateOwner,
        updateSkills,
        updateTimeline,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be inside SiteDataProvider");
  return ctx;
};

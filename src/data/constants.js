// ─────────────────────────────────────────────────────────────
// SITE CONSTANTS
// Update values marked with ← your ... with your real info
// ─────────────────────────────────────────────────────────────

export const SITE_OWNER = {
  name: "SaleemiExpert",
  title: "Shopify & WooCommerce Specialist",
  tagline: "E-commerce Expert | CSV & Bulk Product Automation | Web Developer",
  bio: "I'm a freelance e-commerce specialist with 5+ years of experience helping businesses grow their online stores. I specialize in Shopify and WooCommerce product management, bulk CSV uploads, variant mapping, and modern web development.",
  bio2: "I've worked with 50+ clients across USA, UK, UAE, Canada and Australia — delivering fast, accurate, and professional digital solutions. My goal is simple: save your time, grow your store, and exceed your expectations.",
  email: "uzairmaqbool050@gmail.com", // ← your real email
  whatsapp: "+923337623998", // ← replace with your real +92 number
  location: "Pakistan (Available Worldwide)",
  available: true, // ← set false when not available
  photo: null, // ← add "/images/profile.jpg" when ready
};

export const SOCIAL_LINKS = {
  fiverr: "https://fiverr.com/YOUR_USERNAME", // ← replace
  upwork: "https://upwork.com/freelancers/YOUR_USERNAME", // ← replace
  linkedin: "https://linkedin.com/in/YOUR_USERNAME", // ← replace
  github: "https://github.com/YOUR_USERNAME", // ← replace
};

export const SOCIAL_META = {
  fiverr: { icon: "F", label: "Fiverr", color: "#1dbf73" },
  upwork: { icon: "U", label: "Upwork", color: "#14a800" },
  linkedin: { icon: "in", label: "LinkedIn", color: "#0a66c2" },
  github: { icon: "GH", label: "GitHub", color: "#6e40c9" },
};

export const SKILLS = [
  {
    category: "E-commerce Platforms",
    items: [
      { name: "Shopify", level: 95 },
      { name: "WooCommerce", level: 92 },
      { name: "WordPress", level: 85 },
      { name: "Amazon FBA", level: 75 },
    ],
  },
  {
    category: "Data & Automation",
    items: [
      { name: "CSV Management", level: 98 },
      { name: "Bulk Product Upload", level: 97 },
      { name: "Variant Mapping", level: 93 },
      { name: "API Integration", level: 78 },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React.js", level: 82 },
      { name: "HTML / CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Node.js", level: 70 },
    ],
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    year: "2024 – Present",
    role: "Senior Freelance E-commerce Specialist",
    company: "SaleemiExpert (Global Clients)",
    desc: "Managing large-scale Shopify & WooCommerce stores, bulk product automation, and custom web development for clients across USA, UK, UAE.",
  },
  {
    year: "2022 – 2024",
    role: "E-commerce Manager",
    company: "Digital Commerce Agency",
    desc: "Led product data migration projects, handled 50,000+ product uploads, built CSV automation pipelines for 20+ clients.",
  },
  {
    year: "2020 – 2022",
    role: "Shopify Developer & Data Analyst",
    company: "Freelance (Fiverr & Upwork)",
    desc: "Specialized in Shopify store setup, variant mapping, and WooCommerce customization for international clients.",
  },
  {
    year: "2019 – 2020",
    role: "Web Developer",
    company: "Local IT Company, Pakistan",
    desc: "Built WordPress websites, learned e-commerce fundamentals, and developed client management skills.",
  },
];

export const CERTIFICATIONS = [
  { name: "Shopify Partner Certified", issuer: "Shopify", year: "2023" },
  { name: "Google Digital Marketing", issuer: "Google", year: "2022" },
  { name: "WooCommerce Developer", issuer: "WooCommerce", year: "2022" },
  { name: "JavaScript Algorithms", issuer: "freeCodeCamp", year: "2021" },
];

export const PRICING_PACKAGES = [
  {
    id: 1,
    name: "Basic",
    price: "$49",
    duration: "3–5 Days",
    color: "#6b7280",
    popular: false,
    desc: "Perfect for small tasks and quick fixes.",
    features: [
      "Up to 100 product uploads",
      "Basic CSV formatting",
      "1 platform (Shopify or WooCommerce)",
      "Image optimization",
      "1 revision",
      "Email support",
    ],
    notIncluded: ["Variant mapping", "Automation scripts", "Priority support"],
  },
  {
    id: 2,
    name: "Standard",
    price: "$149",
    duration: "5–7 Days",
    color: "#06b6d4",
    popular: true,
    desc: "Most popular — ideal for growing stores.",
    features: [
      "Up to 1,000 product uploads",
      "Advanced CSV management",
      "Variant & attribute mapping",
      "2 platforms supported",
      "SEO metadata included",
      "3 revisions",
      "Priority email support",
    ],
    notIncluded: ["Custom automation scripts"],
  },
  {
    id: 3,
    name: "Premium",
    price: "$349",
    duration: "7–14 Days",
    color: "#8b5cf6",
    popular: false,
    desc: "Full-service solution for large stores.",
    features: [
      "Unlimited product uploads",
      "Full CSV automation pipeline",
      "Complex variant mapping",
      "Multi-platform management",
      "Custom automation scripts",
      "Website development included",
      "Unlimited revisions",
      "24/7 WhatsApp support",
    ],
    notIncluded: [],
  },
];

export const SERVICES = [
  {
    id: 1,
    icon: "🌐",
    title: "Website Development",
    shortDesc:
      "Modern responsive websites built with clean UI, performance and scalability in mind.",
    fullDesc:
      "We build fast, modern, and responsive websites tailored to your business needs. From landing pages to full-stack web applications, every project is crafted with clean code, SEO best practices, and scalability in mind.",
    features: [
      "Custom responsive design",
      "SEO-optimized structure",
      "Performance-first architecture",
      "CMS integration",
      "Cross-browser compatibility",
    ],
  },
  {
    id: 2,
    icon: "⚡",
    title: "Digital Solutions",
    shortDesc:
      "Professional digital services focused on business growth and online presence.",
    fullDesc:
      "End-to-end digital solutions including e-commerce setup, product data management, CSV imports/exports, and automation workflows that save your team hours every week.",
    features: [
      "Shopify & WooCommerce setup",
      "Bulk product uploads via CSV",
      "Variant & inventory mapping",
      "Automation workflows",
      "Platform migrations",
    ],
  },
  {
    id: 3,
    icon: "🎨",
    title: "Creative Design",
    shortDesc:
      "Creative UI/UX design solutions with modern layouts and interactive experiences.",
    fullDesc:
      "Visually compelling interfaces that convert visitors into customers. We focus on user experience, accessibility, and brand consistency across all touchpoints.",
    features: [
      "UI/UX wireframing & prototyping",
      "Brand identity design",
      "Landing page design",
      "Icon & illustration design",
      "Figma deliverables",
    ],
  },
  {
    id: 4,
    icon: "📈",
    title: "Business Growth",
    shortDesc:
      "Helping brands improve visibility, engagement and customer experience online.",
    fullDesc:
      "Boost online visibility through targeted strategies, conversion-optimized funnels, and data-driven decisions that translate into measurable growth.",
    features: [
      "Conversion rate optimization",
      "Digital marketing strategy",
      "Analytics & reporting setup",
      "Customer experience audits",
      "Competitive analysis",
    ],
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "5000+ Shopify Products Upload",
    category: "E-commerce",
    description:
      "Managed and uploaded over 5,000 product listings to a Shopify store, including images, variants, pricing, and SEO metadata — all within a tight deadline.",
    tags: ["Shopify", "CSV", "Data Management"],
    color: "from-cyan-500/30 to-blue-500/10",
    result: "Saved client 120+ hours of manual work",
    duration: "4 days",
  },
  {
    id: 2,
    title: "WooCommerce CSV Import System",
    category: "Automation",
    description:
      "Built a streamlined CSV import pipeline for a WooCommerce store, handling complex product attributes, categories, and inventory syncing.",
    tags: ["WooCommerce", "PHP", "Automation"],
    color: "from-purple-500/30 to-cyan-500/10",
    result: "Reduced import time by 85%",
    duration: "6 days",
  },
  {
    id: 3,
    title: "Variant Mapping Store",
    category: "E-commerce",
    description:
      "Created a custom variant mapping solution for a fashion brand, allowing seamless product customization across sizes, colors, and materials.",
    tags: ["Shopify", "Variant Mapping"],
    color: "from-blue-500/30 to-purple-500/10",
    result: "Zero inventory errors post-launch",
    duration: "5 days",
  },
  {
    id: 4,
    title: "Bulk Product Automation",
    category: "Automation",
    description:
      "Developed an automated bulk product management system that syncs inventory, updates pricing, and manages listings across multiple platforms simultaneously.",
    tags: ["Python", "API", "Automation"],
    color: "from-teal-500/30 to-cyan-500/10",
    result: "Automated 10,000+ SKUs across 3 platforms",
    duration: "10 days",
  },
  {
    id: 5,
    title: "Custom Shopify Theme",
    category: "Web Development",
    description:
      "Designed and developed a custom Shopify theme from scratch with unique animations, fast load times, and mobile-first design.",
    tags: ["Shopify", "Liquid", "CSS"],
    color: "from-cyan-500/30 to-teal-500/10",
    result: "40% increase in conversion rate",
    duration: "12 days",
  },
  {
    id: 6,
    title: "Multi-Vendor Marketplace",
    category: "Web Development",
    description:
      "Built a full-featured multi-vendor marketplace platform supporting vendor onboarding, commission management, and order routing.",
    tags: ["WooCommerce", "PHP", "MySQL"],
    color: "from-indigo-500/30 to-blue-500/10",
    result: "Launched with 15 vendors on day 1",
    duration: "14 days",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "John Smith",
    title: "Store Owner, USA",
    rating: 5,
    review:
      "Excellent work on Shopify product uploads. Very professional and fast delivery. Will definitely work again!",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    title: "E-commerce Manager, UK",
    rating: 5,
    review:
      "Amazing communication and perfectly handled CSV variants for our store. Saved us days of manual work.",
  },
  {
    id: 3,
    name: "David Lee",
    title: "Entrepreneur, Canada",
    rating: 5,
    review:
      "Highly recommended for WooCommerce bulk uploads and customization. Delivered beyond expectations.",
  },
  {
    id: 4,
    name: "Emma Johnson",
    title: "Digital Agency Owner, Australia",
    rating: 5,
    review:
      "Outstanding web development skills. The website looks fantastic and loads super fast. Our conversions have improved significantly.",
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    title: "Retail Brand, UAE",
    rating: 5,
    review:
      "Professional, reliable and highly skilled. Managed our entire product catalog migration flawlessly.",
  },
  {
    id: 6,
    name: "Maria Garcia",
    title: "Fashion Boutique, Spain",
    rating: 5,
    review:
      "The variant mapping solution was exactly what we needed. Clean code, great communication, delivered on time.",
  },
];

export const STATS = [
  { value: "100+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
  { value: "50+", label: "Happy Clients" },
];

export const HERO_CARDS = [
  { label: "Shopify Upload", title: "Professional Solutions" },
  { label: "CSV Management", title: "Creative Digital Services" },
  { label: "WooCommerce", title: "Modern Web Experiences" },
];

export const CONTACT_INFO = [
  {
    icon: "📧",
    label: "Email",
    value: "info@saleemiexpert.com",
    href: "mailto:info@saleemiexpert.com",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+92 300 123 4567",
    href: "https://wa.me/923001234567",
  },
  { icon: "📍", label: "Location", value: "Pakistan (Worldwide)", href: null },
  { icon: "⏰", label: "Response", value: "Within 24 hours", href: null },
];

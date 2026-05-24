# SaleemiExpert — React Frontend

A full multi-page React application with routing, scalable architecture, and backend-ready service layer.

---

## 🚀 Quick Start

```bash
cd saleemi-expert
npm install
npm run dev
```

Open http://localhost:5173

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root — Router + Layout
├── main.jsx                 # Entry point
├── index.css                # Global styles (Tailwind)
│
├── components/              # Reusable UI components
│   ├── Navbar.jsx           # Fixed nav with mobile menu + active links
│   ├── Footer.jsx           # Footer with nav links
│   ├── HeroSection.jsx      # Hero with stats and cards
│   ├── SectionHeader.jsx    # Eyebrow / Title / Subtitle block
│   ├── ServicesGrid.jsx     # Service cards (reused on Home + Services page)
│   ├── PortfolioGrid.jsx    # Portfolio cards (reused on Home + Portfolio page)
│   ├── TestimonialsGrid.jsx # Testimonial cards
│   ├── ContactForm.jsx      # Validated contact form with status
│   └── ScrollToTop.jsx      # Scroll-to-top on route change
│
├── pages/                   # Route-level page components
│   ├── HomePage.jsx         # / — Full landing page
│   ├── ServicesPage.jsx     # /services — Detailed service cards + process
│   ├── PortfolioPage.jsx    # /portfolio — Filterable portfolio grid
│   ├── ContactPage.jsx      # /contact — Form + FAQ + testimonials
│   └── NotFoundPage.jsx     # * — 404 fallback
│
├── data/
│   └── constants.js         # All static content (services, portfolio, testimonials, etc.)
│
├── services/
│   └── api.js               # API layer — swap stubs for real fetch() calls
│
└── hooks/
    └── useData.js           # useFetch + useContactForm hooks
```

---

## 🔌 Integrating Your Backend

### 1. Contact Form
In `src/services/api.js`, replace `submitContactForm`:
```js
export const submitContactForm = async (formData) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};
```

### 2. Testimonials / Reviews from DB
Replace `fetchTestimonials`:
```js
export const fetchTestimonials = async () => {
  const res = await fetch('/api/testimonials');
  return res.json();
};
```

### 3. Portfolio / Services from DB
Same pattern — replace `fetchPortfolioItems` and `fetchServices` in `api.js`.

All UI components consume data from these hooks — **no other files need to change**.

---

## 🛣️ Routes

| Path         | Page             |
|--------------|------------------|
| `/`          | HomePage         |
| `/services`  | ServicesPage     |
| `/portfolio` | PortfolioPage    |
| `/contact`   | ContactPage      |
| `*`          | NotFoundPage     |

---

## 🧰 Tech Stack

- **React 18** + **Vite 5**
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- Custom hooks for data fetching and form state
- Backend-ready API service layer

---

## 📦 Build for Production

```bash
npm run build
# Output in /dist — deploy to Netlify, Vercel, or your own server
```

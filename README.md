# NayePankh Foundation Website 🕊️

A modern, responsive, single-page website for **NayePankh Foundation**, a student-led NGO working on food security, free education, women's hygiene and clothing drives across India.

Built as an internship project for NayePankh Foundation using React and Vite.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

---

## Sections

| Section | What it shows |
|---------|---------------|
| **Hero** | Split green/gold layout with the foundation's tagline and an interactive centre badge that bursts into particles on click |
| **Marquee** | Scrolling strip of the foundation's focus areas |
| **Impact stats** | Animated counters that start counting when scrolled into view (powered by `IntersectionObserver`) |
| **About** | The foundation's story and registrations |
| **Causes** | Five horizontally scrollable cards: Food Security, Free Education, Women's Hygiene, Clothing Drives, Community Growth |
| **Founder** | Founder profile card over a background image |
| **Call to action** | "Donate Now" and volunteer prompts |
| **Contact** | Contact details plus an enquiry form (donate / volunteer / partner / other) |
| **Footer** | Navigation, contact info and links to Instagram, LinkedIn, YouTube and Facebook |

## Highlights

- 📱 **Fully responsive:** tablet (≤ 900px) and mobile (≤ 768px) layouts with a hamburger drawer
- ✨ **Polished micro-interactions:** hover lifts, burst animation, smooth scrolling between sections
- 🎨 **Consistent brand palette** (forest green, gold, cream) with Fraunces + Plus Jakarta Sans typography
- 🧩 **Lightweight:** only React, React DOM and `lucide-react` icons as runtime dependencies

## Tech stack

- **React 19** with hooks (`useState`, `useEffect`, `useRef`)
- **Vite 8** for the dev server and production build
- **lucide-react** for icons
- **Plain CSS** (global styles + CSS animations), Google Fonts
- **ESLint** with React Hooks and React Refresh plugins

## Getting started

Requires **Node.js 20+**.

```bash
git clone https://github.com/Deep9873/nayepankh.git
cd nayepankh
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
nayepankh/
├── public/           # logo, favicon, background and decorative images
├── src/
│   ├── App.jsx       # All page sections (Hero, Stats, About, Causes, Founder, Contact, Footer)
│   ├── App.css
│   ├── index.css
│   └── main.jsx      # React entry point
├── index.html
├── vite.config.js
└── eslint.config.js
```

## Deployment

The build output is a static site, so it can be hosted on Vercel, Netlify, GitHub Pages or any static host:

```bash
npm run build      # outputs to dist/
```

## Known limitations and next steps

- The **contact form is front-end only:** it shows a success state but does not send data anywhere yet. Connect it to a backend, EmailJS, Formspree or a Google Form.
- **"Donate Now"** currently scrolls to the contact section. Integrate a payment gateway (for example Razorpay) or link to the foundation's official donation page.
- Split `App.jsx` into smaller components (one file per section) for easier maintenance.
- Add page-level SEO tags (description, Open Graph image) in `index.html`.

## Author

**Deep Jangid** · [@Deep9873](https://github.com/Deep9873)

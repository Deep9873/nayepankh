import { useState, useEffect, useRef } from "react";
import {
  Utensils, BookOpen, Heart, Shirt, Sprout,
  Users, MapPin, Phone, Mail,
  ArrowRight, ChevronRight, Menu, X,
  HandHeart, Globe, ShieldCheck, Star,
  GraduationCap, Droplets,
} from "lucide-react";

const C = {
  forest:    "#062C1A",
  forestMid: "#0D4A2A",
  gold:      "#E8A020",
  goldLight: "#FFF3D6",
  cream:     "#FAF7F2",
  charcoal:  "#141414",
  muted:     "#6B7280",
  mintTint:  "#E6F4EC",
  white:     "#FFFFFF",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF7F2; color: #141414; overflow-x: hidden; }
  .np-serif { font-family: 'Fraunces', serif; }
  a { text-decoration: none; color: inherit; cursor: pointer; }
  button { cursor: pointer; border: none; font-family: 'Plus Jakarta Sans', sans-serif; }

  /* ── Nav ── */
  .np-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 56px; height: 68px; transition: background 0.3s, backdrop-filter 0.3s; }
  .np-nav.scrolled { background: rgba(6,44,26,0.97); backdrop-filter: blur(12px); }
  .np-nav.top { background: transparent; }
  .nav-logo { display: flex; align-items: center; }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-link { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.75); transition: color 0.2s; cursor: pointer; }
  .nav-link:hover { color: #FFFFFF; text-decoration: underline; text-underline-offset: 4px; }
  .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; color: #fff; }
  .mobile-drawer { display: none; position: fixed; top: 68px; left: 0; right: 0; background: rgba(6,44,26,0.98); backdrop-filter: blur(16px); z-index: 99; flex-direction: column; padding: 20px 24px 32px; border-top: 1px solid rgba(255,255,255,0.08); }
  .mobile-drawer.open { display: flex; }
  .mobile-nav-link { font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.8); padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07); cursor: pointer; transition: color 0.2s; }
  .mobile-nav-link:last-of-type { border-bottom: none; }
  .mobile-nav-link:hover { color: #E8A020; }

  /* ── Buttons ── */
  .np-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 11px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; transition: all 0.2s; }
  .np-btn-gold { background: #E8A020; color: #062C1A; }
  .np-btn-gold:hover { background: #d08e18; }
  .np-btn-outline-white { background: transparent; color: #FFFFFF; border: 1.5px solid rgba(255,255,255,0.5); }
  .np-btn-outline-white:hover { border-color: #E8A020; color: #E8A020; }
  .np-btn-outline-forest { background: transparent; color: #062C1A; border: 1.5px solid #062C1A; }
  .np-btn-outline-forest:hover { background: #062C1A; color: #FFFFFF; }
  .np-btn-lg { padding: 15px 32px; font-size: 15px; border-radius: 8px; }
  .np-btn-forest { background: #062C1A; color: #FFFFFF; }
  .np-btn-forest:hover { background: #0D4A2A; }

  /* ── Hero ── */
  .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; position: relative; }
  .hero-left { background: #062C1A; display: flex; flex-direction: column; justify-content: flex-end; padding: 120px 56px 72px; position: relative; overflow: hidden; }
  .hero-right { background: #E8A020; display: flex; flex-direction: column; justify-content: flex-end; padding: 120px 56px 72px; position: relative; overflow: hidden; }
  .hero-divider { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; background: #FFFFFF; transform: translateX(-50%); z-index: 10; }
  .hero-center-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 20; background: #FFFFFF; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 24px rgba(0,0,0,0.15); overflow: hidden; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; cursor: pointer; }
  .hero-center-badge:hover { transform: translate(-50%,-50%) scale(1.18) !important; box-shadow: 0 8px 32px rgba(232,160,32,0.5) !important; }
  .hero-center-badge.badge-burst { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes badgePop {
    0%   { transform: translate(-50%,-50%) scale(1); }
    40%  { transform: translate(-50%,-50%) scale(1.35); }
    70%  { transform: translate(-50%,-50%) scale(0.92); }
    100% { transform: translate(-50%,-50%) scale(1.18); }
  }

  /* ── Particles ── */
  .particle { position: absolute; width: 9px; height: 9px; border-radius: 50%; pointer-events: none; }
  .particle-0 { background:#E8A020; animation:fly0 0.9s  ease-out forwards; }
  .particle-1 { background:#ffffff; animation:fly1 0.85s ease-out forwards; }
  .particle-2 { background:#E8A020; animation:fly2 1.0s  ease-out forwards; }
  .particle-3 { background:#ffffff; animation:fly3 0.8s  ease-out forwards; }
  .particle-4 { background:#86EFAC; animation:fly4 0.95s ease-out forwards; }
  .particle-5 { background:#E8A020; animation:fly5 0.88s ease-out forwards; }
  .particle-6 { background:#ffffff; animation:fly6 1.0s  ease-out forwards; }
  .particle-7 { background:#FDE68A; animation:fly7 0.82s ease-out forwards; }
  .particle-8 { background:#E8A020; animation:fly8 0.92s ease-out forwards; }
  .particle-9 { background:#ffffff; animation:fly9 0.78s ease-out forwards; }
  @keyframes fly0{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(72px,-82px) scale(0.3);}}
  @keyframes fly1{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(-76px,-72px) scale(0.3);}}
  @keyframes fly2{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(82px,-42px) scale(0.3);}}
  @keyframes fly3{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(-62px,-92px) scale(0.3);}}
  @keyframes fly4{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(52px,92px) scale(0.3);}}
  @keyframes fly5{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(-82px,62px) scale(0.3);}}
  @keyframes fly6{0%{opacity:1;transform:translate(0,0) scale(1.2);}100%{opacity:0;transform:translate(32px,-102px) scale(0.2);}}
  @keyframes fly7{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(-42px,96px) scale(0.3);}}
  @keyframes fly8{0%{opacity:1;transform:translate(0,0) scale(0.8);}100%{opacity:0;transform:translate(96px,32px) scale(0.2);}}
  @keyframes fly9{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(-92px,22px) scale(0.3);}}

  /* ── Marquee ── */
  .marquee-strip { background:#141414; padding:16px 0; overflow:hidden; display:flex; }
  .marquee-track { display:flex; animation:marquee 24s linear infinite; white-space:nowrap; }
  .marquee-item  { display:flex; align-items:center; gap:14px; padding:0 28px; font-size:11px; font-weight:700; color:#FFFFFF; text-transform:uppercase; letter-spacing:0.1em; }
  .marquee-dot   { width:5px; height:5px; background:#E8A020; border-radius:50%; flex-shrink:0; }
  @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

  /* ── Stats ── */
  .stats-section { background:#FAF7F2; padding:72px 56px; }
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); max-width:960px; margin:0 auto; }
  .stat-item { padding:28px 16px; border-left:1px solid #E5E2DB; text-align:center; }
  .stat-item:first-child { border-left:none; }
  .stat-num { font-family:'Fraunces',serif; font-size:3.2rem; font-weight:900; color:#062C1A; line-height:1; }
  .stat-label { font-size:13px; color:#6B7280; margin-top:8px; font-weight:500; }

  /* ── About (left panel only now) ── */
  .about-section { background:#E6F4EC; padding:80px 56px; }
  .about-inner { max-width:680px; }
  .section-tag { display:inline-flex; align-items:center; gap:8px; background:#FFF3D6; color:#92400E; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:20px; margin-bottom:20px; }
  .section-heading { font-family:'Fraunces',serif; font-size:clamp(2rem,3.5vw,2.8rem); font-weight:700; color:#062C1A; line-height:1.2; margin-bottom:20px; }
  .section-body { font-size:15px; color:#374151; line-height:1.8; margin-bottom:16px; }

  /* ── Causes ── */
  .causes-section { background:#062C1A; padding:80px 0 80px 56px; overflow:hidden; }
  .causes-header { padding-right:56px; margin-bottom:48px; display:flex; justify-content:space-between; align-items:flex-end; }
  .causes-scroll { display:flex; gap:20px; overflow-x:auto; padding-right:56px; padding-bottom:8px; scrollbar-width:none; }
  .causes-scroll::-webkit-scrollbar { display:none; }
  .cause-card { min-width:280px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:16px; padding:32px 28px; flex-shrink:0; transition:background 0.2s,transform 0.2s; }
  .cause-card:hover { background:rgba(255,255,255,0.1); transform:translateY(-4px); }
  .cause-num { font-family:'Fraunces',serif; font-size:2.8rem; font-weight:900; color:rgba(232,160,32,0.2); line-height:1; margin-bottom:16px; }
  .cause-icon-wrap { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
  .cause-title { font-family:'Fraunces',serif; font-size:1.2rem; font-weight:700; color:#FFFFFF; margin-bottom:10px; }
  .cause-desc { font-size:13px; color:rgba(255,255,255,0.65); line-height:1.75; }
  .cause-pill { display:inline-flex; align-items:center; gap:6px; margin-top:16px; background:rgba(232,160,32,0.18); color:#E8A020; font-size:11px; font-weight:600; padding:4px 12px; border-radius:20px; }

  /* ── Founder ── */
  .founder-section { background-size:cover; background-position:center; background-repeat:no-repeat; position:relative; }
  .founder-inner { position:relative; z-index:1; padding:96px 56px; max-width:960px; margin:0 auto; }
  .founder-card { display:grid; grid-template-columns:1fr 2fr; gap:48px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:48px; align-items:center; }

  /* ── CTA ── */
  .cta-section { background:#E8A020; padding:96px 56px; display:flex; align-items:center; justify-content:space-between; gap:48px; }
  .cta-btns { display:flex; flex-direction:column; gap:14px; min-width:220px; }

  /* ── Quote ── */
  .quote-section { background:#FFFFFF; padding:96px 56px; text-align:center; }

  /* ── Contact ── */
  .contact-section { display:grid; grid-template-columns:1fr 1fr; }
  .contact-left  { background:#062C1A; padding:80px 56px; display:flex; flex-direction:column; justify-content:center; }
  .contact-right { background:#FFFFFF; padding:80px 56px; display:flex; flex-direction:column; justify-content:center; }
  .contact-field { display:flex; flex-direction:column; gap:6px; margin-bottom:18px; }
  .contact-label { font-size:12px; font-weight:600; color:#6B7280; text-transform:uppercase; letter-spacing:0.08em; }
  .contact-input { padding:12px 16px; border:1.5px solid #E5E2DB; border-radius:8px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; color:#141414; outline:none; transition:border-color 0.2s; background:#FAF7F2; }
  .contact-input:focus { border-color:#062C1A; }
  .contact-textarea { resize:vertical; min-height:100px; }
  .contact-info-row { display:flex; gap:14px; align-items:center; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.08); }
  .contact-info-row:last-child { border-bottom:none; }

  /* ── Footer ── */
  .footer { background:#141414; padding:64px 56px 32px; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
  .footer-col-title { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:rgba(255,255,255,0.35); margin-bottom:16px; }
  .footer-link { display:block; font-size:14px; color:rgba(255,255,255,0.55); margin-bottom:10px; transition:color 0.2s; cursor:pointer; }
  .footer-link:hover { color:#E8A020; }
  .footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:24px; display:flex; justify-content:space-between; align-items:center; gap:16px; }
  .footer-copy { font-size:12px; color:rgba(255,255,255,0.3); }
  .footer-socials { display:flex; gap:12px; flex-shrink:0; }
  .social-btn { width:36px; height:36px; border-radius:50%; border:1px solid rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.5); transition:all 0.2s; cursor:pointer; }
  .social-btn:hover { border-color:#E8A020; color:#E8A020; }

  /* ════════════════════════════════
     TABLET  ≤ 900px
  ════════════════════════════════ */
  @media (max-width:900px) {
    .np-nav { padding:0 28px; }
    .hero-left  { padding:100px 36px 56px; }
    .hero-right { padding:100px 36px 56px; }
    .stats-section { padding:56px 28px; }
    .about-section { padding:64px 36px; }
    .causes-section { padding:64px 0 64px 28px; }
    .causes-header { padding-right:28px; }
    .causes-scroll { padding-right:28px; }
    .founder-inner { padding:72px 36px; }
    .founder-card { gap:32px; padding:36px; }
    .cta-section { padding:72px 36px; }
    .quote-section { padding:72px 36px; }
    .contact-left  { padding:64px 36px; }
    .contact-right { padding:64px 36px; }
    .footer { padding:56px 36px 28px; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:36px; }
  }

  /* ════════════════════════════════
     MOBILE  ≤ 768px
  ════════════════════════════════ */
  @media (max-width:768px) {
    /* Nav */
    .np-nav { padding:0 20px; height:60px; }
    .nav-links { display:none; }
    .nav-hamburger { display:flex; }
    .mobile-drawer { top:60px; }

    /* Hero: stack */
    .hero { grid-template-columns:1fr; min-height:auto; }
    .hero-left  { padding:90px 20px 48px; }
    .hero-right { padding:44px 20px 56px; }
    .hero-divider { display:none; }
    .hero-center-badge { display:none; }

    /* Stats: 2 col */
    .stats-section { padding:44px 20px; }
    .stats-grid { grid-template-columns:1fr 1fr; }
    .stat-item { padding:20px 12px; }
    .stat-item:nth-child(3) { border-left:none; }
    .stat-num { font-size:2.4rem; }

    /* About */
    .about-section { padding:52px 20px; }
    .section-heading { font-size:1.9rem; }

    /* Causes */
    .causes-section { padding:52px 20px; }
    .causes-header { padding-right:20px; flex-direction:column; align-items:flex-start; gap:16px; margin-bottom:28px; }
    .causes-section { padding:52px 20px; }
    .causes-scroll { flex-direction:column; padding-right:0; gap:14px; overflow-x:visible; }
    .cause-card { min-width:unset; width:100%; padding:24px 20px; }

    /* Founder */
    .founder-inner { padding:56px 20px; }
    .founder-card { grid-template-columns:1fr; gap:28px; padding:28px 20px; }

    /* CTA */
    .cta-section { padding:56px 20px; flex-direction:column; align-items:flex-start; gap:28px; }
    .cta-btns { width:100%; }

    /* Quote */
    .quote-section { padding:56px 20px; }

    /* Contact: stack */
    .contact-section { grid-template-columns:1fr; }
    .contact-left  { padding:52px 20px 44px; }
    .contact-right { padding:44px 20px 56px; }

    /* Footer */
    .footer { padding:44px 20px 24px; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:28px; margin-bottom:36px; }
    .footer-bottom { flex-direction:column; text-align:center; }
  }

  /* ════════════════════════════════
     SMALL MOBILE  ≤ 480px
  ════════════════════════════════ */
  @media (max-width:480px) {
    .hero-left  { padding:84px 16px 40px; }
    .hero-right { padding:36px 16px 48px; }
    .stat-num { font-size:2rem; }
    .stat-label { font-size:11px; }
    
    .np-btn-lg { padding:13px 24px; font-size:14px; }
    .footer-grid { grid-template-columns:1fr; }
    .footer-copy { font-size:11px; }
  }
`;

/* ── Counter hook ──────────────────────────────────────── */
function useCountUp(target, suffix = "", started = false) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!started) return;
    let startTs = null;
    const duration = 2000;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const n = Math.round(ease * target);
      if (target >= 100000) setVal(n >= 100000 ? "2L+" : Math.round(n / 1000) + "K+");
      else setVal(n + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started]);
  return val;
}

/* ── Navbar ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  const links = [["About", "about"], ["Our Work", "causes"], ["Founder", "team"], ["Contact", "contact"]];
  return (
    <>
      <nav className={`np-nav ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-logo">
          <img src="/logo.png" alt="NayePankh Foundation" style={{ marginTop: 14, height: 60, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="nav-links">
          {links.map(([label, id]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
          ))}
          <button className="np-btn np-btn-gold" onClick={() => scrollTo("contact")}>
            Donate Now <ArrowRight size={14} />
          </button>
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {links.map(([label, id]) => (
          <span key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>{label}</span>
        ))}
        <button
          className="np-btn np-btn-gold np-btn-lg"
          style={{ marginTop: 16 }}
          onClick={() => scrollTo("contact")}
        >
          Donate Now <ArrowRight size={15} />
        </button>
      </div>
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────── */
function HeroSection() {
  const [burst, setBurst] = useState(false);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const handleBadgeClick = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 1000);
  };
  return (
    <section className="hero" id="home">
      {/* Left */}
      <div className="hero-left">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%, rgba(232,160,32,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
          UP Govt. · 80G and 12A Registered NGO
        </p>
        <div className="np-serif" style={{ fontSize: "clamp(3.8rem,9vw,8.5rem)", fontWeight: 900, lineHeight: 0.9, marginBottom: 24, color: C.gold }}>
          2L+<br />
          <span style={{ color: C.white }}>Lives</span>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 360, marginBottom: 36 }}>
          Changed across India through food, education, clothing and women's hygiene initiatives run by students like you.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="np-btn np-btn-gold np-btn-lg" onClick={() => scrollTo("contact")}>
            Join the Mission <ArrowRight size={15} />
          </button>
          <button className="np-btn np-btn-outline-white np-btn-lg" onClick={() => scrollTo("about")}>
            Learn More
          </button>
        </div>
      </div>

      {/* Divider + badge (desktop only) */}
      <div className="hero-divider" />
      <div className={`hero-center-badge ${burst ? "badge-burst" : ""}`} onClick={handleBadgeClick}>
        <img src="/wings.png" alt="NayePankh" style={{ height: 66, width: 66, objectFit: "contain" }} />
        {burst && [...Array(10)].map((_, i) => <div key={i} className={`particle particle-${i}`} />)}
      </div>

      {/* Right */}
      <div className="hero-right">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(6,44,26,0.45)", marginBottom: 20 }}>
          India's Biggest Student-Led NGO
        </p>
        <h1 className="np-serif" style={{ fontSize: "clamp(1.9rem,3.8vw,3.4rem)", fontWeight: 900, color: C.forest, lineHeight: 1.1, marginBottom: 24 }}>
          It's That Easy<br />
          to Bring a{" "}
          <em style={{ fontStyle: "italic", textDecoration: `underline 3px solid ${C.forest}`, textUnderlineOffset: 6 }}>Smile</em>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(6,44,26,0.65)", lineHeight: 1.8, maxWidth: 380, marginBottom: 36 }}>
          Service to mankind is the service to God. We are a youth-led movement working from the ground up in Kanpur, Ghaziabad, and beyond.
        </p>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex" }}>
            {["S","P","R","A"].map((l, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: C.forest, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? -8 : 0, fontSize: 11, fontWeight: 700, color: C.gold }}>
                {l}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(6,44,26,0.65)" }}>
            <strong style={{ color: C.forest }}>5,000+</strong> student volunteers active
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ───────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["Food Security","Free Education","Women's Hygiene","Clothing Drives","80G Tax Exempt","Student-Led","12+ Cities","Since 2020"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}><span className="marquee-dot" />{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Stats ─────────────────────────────────────────────── */
function StatsSection() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const stats = [
    { val: useCountUp(200000, "", started), label: "People Uplifted" },
    { val: useCountUp(12, "+", started),   label: "Cities Reached" },
    { val: useCountUp(5000, "+", started), label: "Student Volunteers" },
    { val: useCountUp(5, "+", started),    label: "Years of Impact" },
  ];
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── About (single panel, no repeated features) ────────── */
function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <span className="section-tag"><Star size={11} /> Our Mission</span>
        <h2 className="section-heading">Think Global,<br />Act Local.</h2>
        <p className="section-body">
          NayePankh Foundation is a non-governmental organisation driven by the belief that small actions create transformative change. We operate in Kanpur, Ghaziabad, and beyond doing everything in our power to uplift India's most vulnerable communities.
        </p>
        <p className="section-body" style={{ marginBottom: 32 }}>
          Registered with the UP Government and recognised under 80G and 12A, your support is both meaningful and tax-exempt. What began as a small student initiative has today grown into one of India's biggest student-led NGOs, running drives across food, education, women's hygiene, and clothing.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="np-btn np-btn-gold np-btn-lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Volunteer With Us <ArrowRight size={15} />
          </button>
          <button className="np-btn np-btn-outline-forest np-btn-lg" onClick={() => document.getElementById("causes")?.scrollIntoView({ behavior: "smooth" })}>
            Our Work
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Causes ────────────────────────────────────────────── */
function CausesSection() {
  const causes = [
    { n: "01", Icon: Utensils, iconBg: "rgb(232 160 32)", iconColor: "#92400E", title: "Food Security",    desc: "We run regular food distribution drives ensuring no one goes to bed hungry, from city streets to rural outskirts.", tag: "Active in 12+ cities" },
    { n: "02", Icon: BookOpen, iconBg: "rgb(232 160 32)", iconColor: "#4338CA", title: "Free Education",   desc: "Free tuition sessions, stationery kits, and mentorship programs that give children a real shot at a better future.", tag: "1,000+ children reached" },
    { n: "03", Icon: Heart,    iconBg: "rgb(232 160 32)", iconColor: "#065F46", title: "Women's Hygiene",  desc: "Breaking the taboo around menstrual health by distributing free sanitary pads and conducting awareness drives.", tag: "Partnered with local NGOs" },
    { n: "04", Icon: Shirt,    iconBg: "rgb(232 160 32)", iconColor: "#9B1C1C", title: "Clothing Drives",  desc: "Collecting and distributing warm clothing across communities because dignity is a basic right.", tag: "50,000+ items donated" },
    { n: "05", Icon: Sprout,   iconBg: "rgb(232 160 32)", iconColor: "#166534", title: "Community Growth", desc: "Skill workshops, career guidance, and mental health awareness for holistic and lasting development.", tag: "Ongoing initiative" },
  ];
  return (
    <section className="causes-section" id="causes">
      <div className="causes-header">
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>What We Do</p>
          <h2 className="np-serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: C.white, lineHeight: 1.2 }}>Every Action Counts</h2>
        </div>
        <button className="np-btn np-btn-gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Support a Cause <ChevronRight size={14} />
        </button>
      </div>
      <div className="causes-scroll">
        {causes.map(({ n, Icon, iconBg, iconColor, title, desc, tag }, i) => (
          <div className="cause-card" key={i}>
            <div className="cause-num">{n}</div>
            <div className="cause-icon-wrap" style={{ background: iconBg }}>
              <Icon size={22} color={iconColor} strokeWidth={2} />
            </div>
            <div className="cause-title">{title}</div>
            <div className="cause-desc">{desc}</div>
            <span className="cause-pill"><ShieldCheck size={11} color={C.gold} /> {tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Founder ───────────────────────────────────────────── */
function FounderSection() {
  return (
    <section
      id="team"
      className="founder-section"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,44,26,0.86)", zIndex: 0 }} />
      <div className="founder-inner">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="section-tag" style={{ display: "inline-flex", margin: "0 auto 20px" }}>
            <Users size={11} /> Our Founder
          </span>
          <h2 className="np-serif" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: C.white, lineHeight: 1.2, marginBottom: 14 }}>
            The Person Behind the Purpose
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            NayePankh Foundation was born from one student's belief that compassion, when acted upon, can change the world.
          </p>
        </div>

        <div className="founder-card">
          {/* Avatar col */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "clamp(96px,12vw,140px)", height: "clamp(96px,12vw,140px)",
              borderRadius: "50%", background: C.gold,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", border: "4px solid rgba(255,255,255,0.15)",
              fontFamily: "'Fraunces',serif", fontWeight: 900,
              fontSize: "clamp(28px,4vw,48px)", color: C.forest,
            }}>PS</div>
            <p style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 700, color: C.white, marginBottom: 8 }}>
              Prashant Shukla
            </p>
            <span style={{ display: "inline-block", background: "rgba(232,160,32,0.2)", color: C.gold, fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 20 }}>
              Founder and President
            </span>
          </div>

          {/* Bio col */}
          <div>
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: 20 }}>
              Prashant Shukla, along with a group of passionate high schoolers, founded NayePankh Foundation with a simple but powerful idea that students have the energy, empathy, and reach to uplift their own communities. What started as a small food drive in Kanpur has grown into one of India's biggest student-led NGOs.
            </p>
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: 32 }}>
              Under his leadership, the foundation has touched over 2 lakh lives across 12+ cities, running drives for food, education, women's hygiene, and clothing, all powered by volunteers who believe that service to mankind is the service to God.
            </p>
            <div style={{ display: "flex", gap: "clamp(16px,3vw,32px)", flexWrap: "wrap" }}>
              {[["2L+","Lives Touched"],["12+","Cities"],["5000+","Volunteers Led"]].map(([val, label], i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: C.gold, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────── */
function CTASection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="cta-section">
      <div style={{ maxWidth: 540 }}>
        <h2 className="np-serif" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 900, color: C.forest, lineHeight: 1.1, marginBottom: 16 }}>
          Be the Wing Someone Needs.
        </h2>
        <p style={{ fontSize: 15, color: "rgba(6,44,26,0.68)", lineHeight: 1.75 }}>
          Join our growing family of student volunteers and changemakers. Your time, skills, and compassion can quite literally change a life.
        </p>
      </div>
      <div className="cta-btns">
        <button className="np-btn np-btn-forest np-btn-lg" onClick={() => scrollTo("contact")}>
          Volunteer Today <ArrowRight size={15} />
        </button>
        <button className="np-btn np-btn-outline-forest np-btn-lg" onClick={() => scrollTo("contact")}>
          Make a Donation
        </button>
        <p style={{ fontSize: 12, color: "rgba(6,44,26,0.5)", textAlign: "center" }}>Donations are 80G tax-exempt.</p>
      </div>
    </section>
  );
}

/* ── Quote ─────────────────────────────────────────────── */
function QuoteSection() {
  return (
    <section className="quote-section">
      <span className="np-serif" style={{ fontSize: "4.5rem", color: C.goldLight, lineHeight: 0.5, display: "block", marginBottom: 24 }}>"</span>
      <p className="np-serif" style={{ fontSize: "clamp(1.1rem,2.5vw,1.8rem)", fontStyle: "italic", color: C.forest, maxWidth: 640, margin: "0 auto 32px", lineHeight: 1.5 }}>
        If we all do something, then together there is no problem that we cannot solve.
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, background: C.forest, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 16, color: C.gold, flexShrink: 0 }}>PS</div>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: C.forest }}>Prashant Shukla</p>
          <p style={{ fontSize: 13, color: C.muted }}>Founder and President, NayePankh Foundation</p>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", type: "volunteer", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="contact-section" id="contact">
      <div className="contact-left">
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: 20 }}>Get In Touch</span>
        <h2 className="np-serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: C.white, lineHeight: 1.2, marginBottom: 20 }}>
          Let's Work<br />Together.
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
          Whether you want to donate, volunteer, partner with us, or simply learn more, we would love to hear from you.
        </p>
        {[
          { Icon: Mail,   text: "contact@nayepankh.com" },
          { Icon: Phone,  text: "+91-8318500748" },
          { Icon: MapPin, text: "Kanpur, Uttar Pradesh, India" },
          { Icon: Globe,  text: "nayepankh.com" },
        ].map(({ Icon, text }, i) => (
          <div className="contact-info-row" key={i}>
            <div style={{ width: 36, height: 36, minWidth: 36, background: "rgba(232,160,32,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={16} color={C.gold} />
            </div>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{text}</span>
          </div>
        ))}
      </div>
      <div className="contact-right">
        <h3 className="np-serif" style={{ fontSize: "1.4rem", fontWeight: 700, color: C.forest, marginBottom: 28 }}>Send Us a Message</h3>
        {sent ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ width: 64, height: 64, background: C.mintTint, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <HandHeart size={28} color={C.forest} />
            </div>
            <p className="np-serif" style={{ fontSize: "1.4rem", fontWeight: 700, color: C.forest, marginBottom: 8 }}>Thank you!</p>
            <p style={{ fontSize: 14, color: C.muted }}>We will get back to you within 24 hours.</p>
            <button style={{ marginTop: 24, background: "none", border: "none", color: C.forest, fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "underline" }} onClick={() => setSent(false)}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="contact-field">
              <label className="contact-label">Full Name</label>
              <input className="contact-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
            </div>
            <div className="contact-field">
              <label className="contact-label">Email</label>
              <input className="contact-input" type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
            </div>
            <div className="contact-field">
              <label className="contact-label">I want to</label>
              <select className="contact-input" name="type" value={form.type} onChange={handle}>
                <option value="volunteer">Volunteer</option>
                <option value="donate">Donate</option>
                <option value="partner">Partner / CSR</option>
                <option value="intern">Intern with NayePankh</option>
                <option value="other">Just say hello</option>
              </select>
            </div>
            <div className="contact-field">
              <label className="contact-label">Message</label>
              <textarea className="contact-input contact-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us a bit about yourself..." required />
            </div>
            <button type="submit" className="np-btn np-btn-gold np-btn-lg" style={{ width: "100%" }}>
              Send Message <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <img src="/logo.png" alt="NayePankh Foundation" style={{ height: 36, width: "auto", objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: 15, color: C.white }}>NayePankh Foundation</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 12 }}>
            UP Govt. and 80G · 12A Registered NGO. Uplifting underprivileged communities across India since 2020.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>contact@nayepankh.com</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>+91-8318500748</p>
        </div>
        <div>
          <p className="footer-col-title">Organisation</p>
          <span className="footer-link" onClick={() => scrollTo("about")}>About Us</span>
          <span className="footer-link" onClick={() => scrollTo("causes")}>Our Work</span>
          <span className="footer-link" onClick={() => scrollTo("team")}>Founder</span>
          <span className="footer-link" onClick={() => scrollTo("contact")}>Contact</span>
        </div>
        <div>
          <p className="footer-col-title">Get Involved</p>
          <span className="footer-link" onClick={() => scrollTo("contact")} style={{ color: C.gold, fontWeight: 600 }}>Donate Now</span>
          <span className="footer-link" onClick={() => scrollTo("contact")}>Volunteer</span>
          {/* <span className="footer-link" onClick={() => scrollTo("contact")}>Corporate CSR</span> */}
          <span className="footer-link" onClick={() => scrollTo("contact")}>Internships</span>
        </div>
        <div>
          <p className="footer-col-title">Causes</p>
          <span className="footer-link" onClick={() => scrollTo("causes")}>Food Security</span>
          <span className="footer-link" onClick={() => scrollTo("causes")}>Education</span>
          <span className="footer-link" onClick={() => scrollTo("causes")}>Women's Hygiene</span>
          <span className="footer-link" onClick={() => scrollTo("causes")}>Clothing Drives</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">2026 NayePankh Foundation. All rights reserved. Donations exempt under 80G.</p>
        <div className="footer-socials">
          {[
            { label: "Instagram", href: "https://www.instagram.com/nayepankhfoundation", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
            { label: "LinkedIn",  href: "https://www.linkedin.com/company/nayepankh",    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="3"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8.5"/><path d="M12 16v-5"/><path d="M16 16v-3a2 2 0 0 0-4 0"/></svg> },
            { label: "YouTube",   href: "https://www.youtube.com/@nayepankhfoundation",   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/></svg> },
            { label: "Facebook",  href: "https://www.facebook.com/nayepankhfoundation",   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
          ].map(({ label, href, svg }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-btn" title={label}>
              {svg}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Root ──────────────────────────────────────────────── */
export default function NayePankhFoundation() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  useEffect(() => {
    const existing = document.querySelector("link[rel~='icon']");
    if (existing) existing.remove();
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/logo.png";
    document.head.appendChild(link);
    // Also set page title
    document.title = "NayePankh Foundation - UP Gov Registered Student led NGO";
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <AboutSection />
      <CausesSection />
      <FounderSection />
      <CTASection />
      <QuoteSection />
      <ContactSection />
      <Footer />
    </>
  );
}
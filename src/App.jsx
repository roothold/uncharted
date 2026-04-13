import { useState, useEffect } from "react";
import DivinePage from "./Divine";
import ContactPage from "./Contact";
import BecomeThinker from "./BecomeThinker";
import IndustriesPage from "./Industries";
import SolutionsPage from "./Solutions";

const C = {
  bg:          "#FFFFFF",
  ink:         "#0D0D0D",
  inkMid:      "#555555",
  inkSoft:     "#888888",
  accent:      "#C8512A",
  accentHover: "#A83E1E",
  accentSoft:  "rgba(200,81,42,0.07)",
  gold:        "#B8962E",
  border:      "#E8E8E8",
  soft:        "#F7F7F7",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&family=Poppins:wght@400;700&display=swap');`;

const ICON_SRC = "/icon.png";

const LOGO_SRC = "/logo.png";

const PORTFOLIO = [
  { id:"sweetkiwi", name:"Sweetkiwi", cat:"Consumer · Retail",    url:"https://www.sweetkiwi.com",  desc:"Better-for-you frozen yogurt brand. Built the brand, go-to-market, and retail distribution from scratch.", metric:"ROC +12.5%" },
  { id:"surplus",   name:"Surplus",   cat:"Supply Chain · B2B",   url:"https://www.surpluspods.com", desc:"Supply chain optimisation platform for retail operators. Built the product and early customer pipeline.",    metric:"ARR +2.3×"  },
  { id:"stealth",   name:"Stealth",   cat:"Unannounced",           url:null,                          desc:"New venture in development inside Uncharted.",                                                               metric:"Coming Soon" },
];

const QUOTES = [
  { quote:"Uncharted didn't just invest — they built alongside us. That makes all the difference.", name:"Surplus", role:"Portfolio Company" },
  { quote:"Having a studio behind you that's done this before removes so much uncertainty in the early days.", name:"Sweetkiwi Team", role:"Consumer Brand" },
];

export default function App() {
  const [page, setPage]         = useState("home");
  const [scrollY, setScrollY]   = useState(0);
  const [activeQuote, setAQ]    = useState(0);
  const [menuOpen, setMenu]     = useState(false);
  const [dropdown, setDropdown] = useState(null); // 'industries' | 'solutions' | null

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { window.scrollTo(0,0); setMenu(false); }, [page]);

  useEffect(() => {
    const t = setInterval(() => setAQ(q => (q+1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Close menu/dropdown on outside click
  useEffect(() => {
    if (!menuOpen && !dropdown) return;
    const h = () => { setMenu(false); setDropdown(null); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [menuOpen, dropdown]);

  if (page === "divine")        return <DivinePage onBack={() => setPage("home")} onBecomeThinker={() => setPage("become-thinker")} />;
  if (page === "contact")       return <ContactPage onBack={() => setPage("home")} />;
  if (page === "become-thinker") return <BecomeThinker onBack={() => setPage("home")} />;
  if (page === "industries")    return <IndustriesPage onBack={() => setPage("home")} onContact={() => setPage("contact")} onSolutions={() => setPage("solutions")} />;
  if (page === "solutions")     return <SolutionsPage onBack={() => setPage("home")} onContact={() => setPage("contact")} onDivine={() => setPage("divine")} onBecomeThinker={() => setPage("become-thinker")} onIndustries={() => setPage("industries")} />;

  const scrolled = scrollY > 30;

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }

        /* ── Responsive helpers ── */
        .grid-4  { display:grid; grid-template-columns:repeat(4,1fr); }
        .grid-3  { display:grid; grid-template-columns:repeat(3,1fr); }
        .grid-2  { display:grid; grid-template-columns:1fr 1fr; }
        .grid-2a { display:grid; grid-template-columns:2fr 1fr; }
        .px-main { padding-left:2.5rem; padding-right:2.5rem; }
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; }

        @media (max-width: 900px) {
          .grid-3  { grid-template-columns:1fr !important; }
          .grid-2  { grid-template-columns:1fr !important; }
          .grid-2a { grid-template-columns:1fr !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; gap:2rem !important; }
        }
        @media (max-width: 600px) {
          .grid-4  { grid-template-columns:repeat(2,1fr) !important; }
          .px-main { padding-left:1.5rem !important; padding-right:1.5rem !important; }
          .footer-grid { grid-template-columns:1fr !important; }
          .hero-btns { flex-direction:column !important; }
          .hero-btns a, .hero-btns button { width:100% !important; text-align:center !important; }
          .hero-top { padding-top:7rem !important; padding-bottom:4rem !important; }
        }

        /* ── Interactions ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
        @keyframes blink  { 50%{opacity:0;} }
        .nav-outer { padding-left:3rem; padding-right:3rem; }
        @media (max-width:600px) {
          .nav-outer { padding-left:1.25rem !important; padding-right:1.25rem !important; }
          .mobile-menu { padding-left:1.25rem !important; padding-right:1.25rem !important; }
          .hero-top { padding-top:7rem !important; padding-left:1.25rem !important; padding-right:1.25rem !important; }
        }
        .port-card { transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .port-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,0.07); }
        .cta-primary { transition:all 0.2s ease; cursor:pointer; }
        .cta-primary:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .cta-ghost { transition:all 0.2s ease; cursor:pointer; }
        .cta-ghost:hover { border-color:${C.accent} !important; color:${C.accent} !important; transform:translateY(-2px); }
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }

        /* ── Nav dropdowns — full-width overlay, OpenAI-style ── */
        .nav-dropdown-btn {
          display:inline-flex; align-items:center; gap:0.25rem;
          background:none; border:none; cursor:pointer;
          font-family:'Inter Tight',sans-serif; font-weight:500;
          font-size:0.82rem; color:#333; padding:0.4rem 0.65rem; line-height:1;
          transition:color 0.15s; white-space:nowrap;
        }
        .nav-dropdown-btn:hover { color:#000; }
        .nav-dropdown-btn svg { display:block; flex-shrink:0; transition:transform 0.2s; }
        .nav-dropdown-btn.open { color:#000; }
        .nav-dropdown-btn.open svg { transform:rotate(180deg); }

        /* Full-width panel — anchored to nav bottom, spans viewport */
        .dropdown-panel {
          position:fixed; top:56px; left:0; right:0;
          background:#0D0D0D; border-top:1px solid rgba(255,255,255,0.08);
          padding:3rem 0 4rem; z-index:199;
          animation:dropIn 0.2s ease;
        }
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .dropdown-inner {
          display:grid; gap:0; align-items:start;
        }
        .dropdown-inner.cols-4 { grid-template-columns:repeat(4,1fr); }
        .dropdown-inner.cols-3 { grid-template-columns:repeat(3,1fr); }
        .dropdown-section-label {
          font-family:'JetBrains Mono',monospace; font-size:0.6rem;
          color:rgba(255,255,255,0.35); letter-spacing:0.12em; text-transform:uppercase;
          margin-bottom:1.5rem; padding-bottom:0.75rem;
          border-bottom:1px solid rgba(255,255,255,0.08);
        }
        .dropdown-item {
          display:block; width:100%; padding:0.5rem 2rem 0.5rem 0; text-align:left;
          background:none; border:none; cursor:pointer;
          transition:opacity 0.15s;
        }
        .dropdown-item:hover { opacity:0.7; }
        .di-title {
          display:block; font-family:'Instrument Serif',serif; font-weight:400;
          font-size:1.6rem; color:#FFFFFF; line-height:1.15;
          transition:opacity 0.15s; margin-bottom:0.35rem;
        }
        .di-sub {
          display:block; font-family:'Inter Tight',sans-serif; font-weight:300;
          font-size:0.78rem; color:rgba(255,255,255,0.55); line-height:1.55;
          transition:opacity 0.15s;
        }
        .dropdown-overlay {
          position:fixed; top:56px; left:0; right:0; bottom:0;
          background:rgba(0,0,0,0.5); z-index:198; cursor:default;
        }
        .desktop-nav { display:flex; }
        .hamburger   { display:none !important; }
        /* Logo: full on desktop, icon only on mobile */
        .logo-full { display:block; }
        .logo-icon { display:none; }
        /* Hero: left-aligned on desktop, centered on mobile */
        .hero-inner { text-align:left; }
        .hero-inner h1 { max-width:820px; }
        .hero-inner p  { max-width:500px; }
        @media(max-width:768px) {
          .logo-full { display:none !important; }
          .logo-icon { display:block !important; }
          .hero-inner { text-align:center; }
          .hero-inner h1 { max-width:100%; font-size:clamp(2.4rem,12vw,4rem) !important; }
          .hero-inner p  { max-width:100% !important; margin-left:auto; margin-right:auto; }
          .hero-btns    { justify-content:center; }
        }
        @media(max-width:768px) {
          .desktop-nav { display:none !important; }
          .hamburger   { display:flex !important; }
        }

        /* ── Mobile menu ── */
        .mobile-menu {
          position:fixed; top:56px; left:0; right:0; background:#fff;
          border-bottom:1px solid ${C.border}; padding:1.5rem 1.25rem;
          display:flex; flex-direction:column; gap:1rem; z-index:99;
          animation:fadeIn 0.2s ease;
        }
        .mobile-menu a, .mobile-menu button {
          font-family:'JetBrains Mono', monospace; font-weight:500; font-size:1rem;
          color:${C.ink}; text-decoration:none; background:none; border:none;
          text-align:left; padding:0.5rem 0; cursor:pointer;
          border-bottom:1px solid ${C.border};
        }
        .mobile-menu a:last-child, .mobile-menu button:last-child { border-bottom:none; }
      `}</style>

      {/* ── PLATFORM NAV ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        backgroundColor:"#FFFFFF",
        borderBottom:"1px solid #E8E8E8",
      }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"56px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 2.5rem" }}>

          {/* ── LEFT: Logo + nav dropdowns ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>

            {/* Logo */}
            <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0 }}>
              <img src={LOGO_SRC} alt="Uncharted Ventures" className="logo-full"
                style={{ height:"40px", width:"auto", display:"block", imageRendering:"crisp-edges" }} />
              <img src={ICON_SRC} alt="Uncharted Ventures" className="logo-icon"
                style={{ height:"32px", width:"32px", display:"none" }} />
            </button>

            {/* Industries dropdown */}
            <div style={{ position:"relative" }} className="desktop-nav" onClick={e => e.stopPropagation()}>
              <button className={`nav-dropdown-btn${dropdown==="industries" ? " open" : ""}`}
                onClick={() => setDropdown(d => d==="industries" ? null : "industries")}>
                Industries
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropdown==="industries" && (
                <>
                  <div className="dropdown-overlay" onClick={() => setDropdown(null)} />
                  <div className="dropdown-panel" onClick={e => e.stopPropagation()}>
                    <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
                      <div className="dropdown-section-label" style={{ marginBottom:"2rem" }}>Industries</div>
                      <div className="dropdown-inner cols-4">
                        {[
                          { label:"Professional Services", sub:"The billable hour is ending. The judgment economy is beginning." },
                          { label:"Specialty Consumer",    sub:"Brand endures. Supply chain doesn't." },
                          { label:"B2B Infrastructure",    sub:"Every mid-market company is reorganising around AI." },
                          { label:"Thinking Economy",      sub:"When execution is automated, judgment becomes the product." },
                        ].map(item => (
                          <button key={item.label} className="dropdown-item"
                            onClick={() => { setDropdown(null); setPage("industries"); }}>
                            <span className="di-title">{item.label}</span>
                            <span className="di-sub">{item.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Solutions dropdown */}
            <div style={{ position:"relative" }} className="desktop-nav" onClick={e => e.stopPropagation()}>
              <button className={`nav-dropdown-btn${dropdown==="solutions" ? " open" : ""}`}
                onClick={() => setDropdown(d => d==="solutions" ? null : "solutions")}>
                Solutions
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropdown==="solutions" && (
                <>
                  <div className="dropdown-overlay" onClick={() => setDropdown(null)} />
                  <div className="dropdown-panel" onClick={e => e.stopPropagation()}>
                    <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
                      <div className="dropdown-section-label" style={{ marginBottom:"2rem" }}>Solutions</div>
                      <div className="dropdown-inner cols-3">
                        {[
                          { label:"Divine AI",           sub:"Operator intelligence, on demand.", action:"divine" },
                          { label:"Venture Foundry",     sub:"We don't just invest. We co-build AI-native firms.", action:"solutions" },
                          { label:"Capital Stewardship", sub:"Capital that sequences correctly — internal first, external at proof.", action:"solutions" },
                        ].map(item => (
                          <button key={item.label} className="dropdown-item"
                            onClick={() => { setDropdown(null); setPage(item.action); }}>
                            <span className="di-title">{item.label}</span>
                            <span className="di-sub">{item.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>{/* end left group */}

          {/* ── RIGHT: Sign In + Hamburger ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <a href="https://divine.uncharted.ventures/?login=1"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500,
                fontSize:"0.82rem", padding:"0.4rem 1.1rem",
                border:"1px solid #D0D0D0", borderRadius:"20px",
                background:"#fff", color:"#111",
                textDecoration:"none", display:"inline-flex", alignItems:"center",
                transition:"all 0.15s ease", lineHeight:1 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#111"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#D0D0D0"; }}>
              Sign In
            </a>
            <button onClick={e => { e.stopPropagation(); setMenu(o => !o); }}
              style={{ display:"none", background:"none", border:"none", cursor:"pointer",
                padding:"4px", flexDirection:"column", gap:"5px" }} className="hamburger">
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111",
                transition:"all 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111",
                transition:"all 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111",
                transition:"all 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setPage("industries"); setMenu(false); }}>Industries</button>
            <button onClick={() => { setPage("solutions"); setMenu(false); }}>Solutions</button>
            <button onClick={() => { setPage("divine"); setMenu(false); }}>Divine AI</button>
            <button onClick={() => { setPage("contact"); setMenu(false); }}>Contact</button>
            <a href="https://divine.uncharted.ventures/?login=1" target="_blank" rel="noopener noreferrer"
              onClick={() => setMenu(false)}
              style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.88rem", color:"#333", textDecoration:"none" }}>
              Sign In
            </a>
          </div>
        )}
      </nav>
      {/* ── HERO ── */}
      <section style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        justifyContent:"center", padding:"8rem 0 6rem",
        position:"relative",
        backgroundImage:"url(/hero-bg.jpg)",
        backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat",
      }} className="px-main hero-top">
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to bottom right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.28) 100%)",
          zIndex:0 }} />
        <div style={{ maxWidth:"1280px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }} className="hero-inner">

          <h1 style={{
            fontFamily:"'Instrument Serif',serif", fontWeight:600,
            fontSize:"clamp(2.4rem, 8vw, 6.8rem)", lineHeight:1.0,
            color:"#FFFFFF", marginBottom:"1.5rem",
            opacity:0, animation:"fadeUp 0.8s 0.2s forwards",
          }}>
            Turning opportunities<br />into growth assets.
          </h1>

          <p style={{
            fontFamily:"'Inter Tight',sans-serif", fontWeight:300,
            fontSize:"clamp(0.95rem, 1.6vw, 1.1rem)", lineHeight:1.85,
            color:"rgba(255,255,255,0.72)", maxWidth:"540px",
            marginBottom:"3rem", opacity:0, animation:"fadeUp 0.8s 0.35s forwards",
          }}>
            Uncharted is an institutional venture engine integrating proprietary AI and expert operators to secure high-moat infrastructure.
          </p>

          <div style={{ opacity:0, animation:"fadeUp 0.8s 0.5s forwards" }}>
            <button onClick={() => setPage("divine")}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:600,
                fontSize:"0.82rem", color:"#fff", backgroundColor:C.accent,
                border:"none", borderRadius:"4px", padding:"0.9rem 2.25rem",
                cursor:"pointer" }}>
              Try Divine →
            </button>
          </div>

        </div>
      </section>
      <div style={{ height:"1px", backgroundColor:C.border }} />

      {/* ── HOW WE BUILD ── */}
      <section id="studio" style={{ padding:"8rem 0" }} className="px-main">
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:700, fontSize:"clamp(2rem, 5vw, 3.5rem)", color:C.ink, marginBottom:"1.5rem", maxWidth:"520px", lineHeight:1.1 }}>
            A different kind of partner.
          </h2>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.95rem", lineHeight:1.85, color:C.inkMid, maxWidth:"520px", marginBottom:"5rem" }}>
            We provide the institutional infrastructure and cognitive edge. You provide the vision. Together, we secure the asset.
          </p>
          <div className="grid-3" style={{ gap:"3rem" }}>
            {[
              { n:"1", t:"We've done this before", d:"Our founders have started, scaled, and exited companies. That pattern recognition is inside every decision we make with you — from pricing to hiring to fundraising." },
              { n:"2", t:"Infrastructure you can't hire", d:"Legal, design, AI tools, recruiting — Uncharted runs these functions so you don't have to. The things that slow most companies down don't touch ours." },
              { n:"3", t:"AI baked in from day one", d:"Divine, our proprietary intelligence protocol, is built into how we operate. Every portfolio company uses it. You don't get AI bolted on — it's the substrate." },
            ].map(item => (
              <div key={item.n}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"3.5rem", color:C.accent, lineHeight:1, marginBottom:"1.5rem" }}>{item.n}</div>
                <h3 style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"1rem", color:C.ink, marginBottom:"0.75rem" }}>{item.t}</h3>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.9rem", lineHeight:1.9, color:C.inkMid }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding:"8rem 0", backgroundColor:"#BF452A" }} className="px-main">
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1rem" }}>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2rem, 5vw, 3.5rem)", color:"#fff", lineHeight:1.1 }}>Our companies.</h2>
          </div>
          <div className="grid-3" style={{ gap:"1.5rem" }}>
            {PORTFOLIO.map(v => {
              const El = v.url ? "a" : "div";
              const props = v.url ? { href:v.url, target:"_blank", rel:"noopener noreferrer", style:{ textDecoration:"none", color:"inherit", display:"block" } } : {};
              return (
                <El key={v.id} {...props}>
                  <div className="port-card" style={{ border:"1px solid rgba(255,255,255,0.15)", borderRadius:"8px", padding:"2.5rem 2rem", backgroundColor:"#fff" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", color: v.url ? C.gold : C.inkSoft, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.5rem" }}>{v.cat}</div>
                    <h3 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"2rem", color:C.ink, marginBottom:"0.75rem", lineHeight:1.1 }}>{v.name}</h3>
                    <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.87rem", lineHeight:1.85, color:C.inkMid, marginBottom:"2rem" }}>{v.desc}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"1.25rem", borderTop:`1px solid ${C.border}` }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", color: v.url ? C.gold : C.inkSoft, letterSpacing:"0.06em" }}>{v.metric}</span>
                      {v.url && <span style={{ fontSize:"0.8rem", color:C.inkSoft }}>↗</span>}
                    </div>
                  </div>
                </El>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIVINE ── */}
      <section id="divine" style={{ padding:"8rem 0", borderTop:`1px solid ${C.border}` }} className="px-main">
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ maxWidth:"620px" }}>
            <div>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.72rem", color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.5rem" }}>Divine · AI Tool</p>
              <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2rem, 4vw, 3.5rem)", lineHeight:1.1, color:C.ink, marginBottom:"1.5rem" }}>
                Better decisions,<br />faster.
              </h2>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.95rem", lineHeight:1.9, color:C.inkMid, marginBottom:"2.5rem", maxWidth:"420px" }}>
                Our proprietary AI protocol. Ask any business question — strategy, pricing, hiring, capital — and get a direct answer shaped by operators who've built and exited companies.
              </p>
              <button onClick={() => setPage("divine")} className="cta-primary" style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.85rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.85rem 2rem" }}>Try Divine →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA + FOOTER ── */}
      <div style={{ backgroundColor:"#0D0D0D" }}>

        {/* Closing CTA */}
        <section style={{ padding:"10rem 0", textAlign:"center" }} className="px-main">
          <div style={{ maxWidth:"680px", margin:"0 auto" }}>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2.5rem, 8vw, 5rem)", lineHeight:1.05, color:"#FFFFFF", marginBottom:"2rem" }}>Join the Engine.</h2>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.98rem", lineHeight:1.9, color:"rgba(255,255,255,0.55)", marginBottom:"3rem" }}>
              Founders, operators, and capital partners who want to build companies that become durable growth assets. The Engine is open.
            </p>
            <button onClick={() => setPage("contact")} className="cta-primary" style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.92rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"1rem 2.75rem" }}>Apply for access</button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop:"1px solid rgba(255,255,255,0.1)", padding:"4rem 0 3rem" }} className="px-main">
          <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
            <div className="footer-grid" style={{ marginBottom:"4rem" }}>
              <div>
                <img src="/logo-white.png" alt="Uncharted Ventures" style={{ height:"36px", width:"auto", display:"block", marginBottom:"0.75rem", imageRendering:"crisp-edges" }} />
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:"240px" }}>We build and back companies that last — with the infrastructure, intelligence, and conviction to see it through.</div>
              </div>
              <div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.72rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>Studio</div>
                {[
                    { l:"Companies",   action:() => { setPage("home"); setTimeout(()=>{ const el=document.getElementById("portfolio"); if(el) el.scrollIntoView({behavior:"smooth"}); },100); }},
                    { l:"Divine",      action:() => setPage("divine") },
                    { l:"Get in touch",action:() => setPage("contact") },
                  ].map(({l, action}) => (
                  <div key={l} style={{ marginBottom:"0.5rem" }}>
                    <button onClick={action}
                      style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:"rgba(255,255,255,0.6)", textDecoration:"none", cursor:"pointer", transition:"color 0.15s", background:"none", border:"none", padding:0 }}
                      onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.6)"}>{l}</button>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.72rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>Connect</div>
                <div style={{ marginBottom:"0.5rem" }}>
                    <button onClick={() => setPage("contact")}
                      style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:"rgba(255,255,255,0.6)", cursor:"pointer", transition:"color 0.15s", background:"none", border:"none", padding:0 }}
                      onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.6)"}>Contact</button>
                  </div>
              </div>
              <div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.72rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>Contact</div>
                {["hello@uncharted.ventures","founders@uncharted.ventures"].map(email => (
                  <a key={email} href={`mailto:${email}`} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.78rem", color:"rgba(255,255,255,0.6)", textDecoration:"none", display:"block", marginBottom:"0.5rem", transition:"color 0.15s", wordBreak:"break-all" }}
                    onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.6)"}>{email}</a>
                ))}
              </div>
            </div>
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.75rem", color:"rgba(255,255,255,0.35)" }}>© 2026 Uncharted Ventures LLC. All rights reserved.</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em" }}>uncharted.ventures</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

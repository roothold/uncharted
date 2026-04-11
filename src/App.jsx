import { useState, useEffect } from "react";
import DivinePage from "./Divine";
import ContactPage from "./Contact";

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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@400;500&display=swap');`;

const PORTFOLIO = [
  { id:"sweetkiwi", name:"Sweetkiwi", cat:"Consumer · Retail",    url:"https://www.sweetkiwi.com",  desc:"Better-for-you frozen yogurt brand. Built the brand, go-to-market, and retail distribution from scratch.", metric:"ROC +12.5%" },
  { id:"surplus",   name:"Surplus",   cat:"Supply Chain · B2B",   url:"https://www.surpluspods.com", desc:"Supply chain optimisation platform for retail operators. Built the product and early customer pipeline.",    metric:"ARR +2.3×"  },
  { id:"stealth",   name:"Stealth",   cat:"Unannounced",           url:null,                          desc:"New venture in development inside Uncharted.",                                                               metric:"Coming Soon" },
];

const QUOTES = [
  { quote:"Uncharted didn't just invest — they built alongside us. That makes all the difference.", name:"Michael A.", role:"Founder · Surplus" },
  { quote:"Having a studio behind you that's done this before removes so much uncertainty in the early days.", name:"Sweetkiwi Team", role:"Consumer Brand" },
];

export default function App() {
  const [page, setPage]         = useState("home");
  const [scrollY, setScrollY]   = useState(0);
  const [activeQuote, setAQ]    = useState(0);
  const [menuOpen, setMenu]     = useState(false);

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

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const h = () => setMenu(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [menuOpen]);

  if (page === "divine")  return <DivinePage onBack={() => setPage("home")} />;
  if (page === "contact") return <ContactPage onBack={() => setPage("home")} />;

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
        .px-main { padding-left:3rem; padding-right:3rem; }
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; }

        @media (max-width: 900px) {
          .grid-3  { grid-template-columns:1fr !important; }
          .grid-2  { grid-template-columns:1fr !important; }
          .grid-2a { grid-template-columns:1fr !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; gap:2rem !important; }
        }
        @media (max-width: 600px) {
          .grid-4  { grid-template-columns:repeat(2,1fr) !important; }
          .px-main { padding-left:1.25rem !important; padding-right:1.25rem !important; }
          .footer-grid { grid-template-columns:1fr !important; }
          .hero-btns { flex-direction:column !important; }
          .hero-btns a, .hero-btns button { width:100% !important; text-align:center !important; }
        }

        /* ── Interactions ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
        @keyframes blink  { 50%{opacity:0;} }
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }
        .port-card { transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .port-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,0.07); }
        .cta-primary { transition:all 0.2s ease; cursor:pointer; }
        .cta-primary:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .cta-ghost { transition:all 0.2s ease; cursor:pointer; }
        .cta-ghost:hover { border-color:${C.accent} !important; color:${C.accent} !important; transform:translateY(-2px); }

        /* ── Mobile menu ── */
        .mobile-menu {
          position:fixed; top:68px; left:0; right:0; background:#fff;
          border-bottom:1px solid ${C.border}; padding:1.5rem 1.25rem;
          display:flex; flex-direction:column; gap:1rem; z-index:99;
          animation:fadeIn 0.2s ease;
        }
        .mobile-menu a, .mobile-menu button {
          font-family:'Poppins',sans-serif; font-weight:500; font-size:1rem;
          color:${C.ink}; text-decoration:none; background:none; border:none;
          text-align:left; padding:0.5rem 0; cursor:pointer;
          border-bottom:1px solid ${C.border};
        }
        .mobile-menu a:last-child, .mobile-menu button:last-child { border-bottom:none; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 3rem", backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition:"all 0.4s ease" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"1.05rem", color:C.ink }}>Uncharted</span>
          </button>

          {/* Desktop nav */}
          <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }} className="desktop-nav">
            <style>{`.desktop-nav { } @media(max-width:768px){.desktop-nav{display:none!important;}}`}</style>
            {[["Companies","#portfolio"],["Studio","#studio"],["Divine","#divine"]].map(([l,h]) => (
              <a key={l} href={h} className="nav-link" style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.ink, textDecoration:"none" }}>{l}</a>
            ))}
            <button onClick={() => setPage("contact")} className="nav-link" style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.ink, background:"none", border:"none", cursor:"pointer", padding:0 }}>Contact</button>
            <button onClick={() => setPage("contact")} className="cta-primary" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.78rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.55rem 1.4rem" }}>Work with us</button>
          </div>

          {/* Hamburger */}
          <button onClick={e => { e.stopPropagation(); setMenu(o => !o); }} style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"4px", flexDirection:"column", gap:"5px" }} className="hamburger">
            <style>{`.hamburger{display:none!important;} @media(max-width:768px){.hamburger{display:flex!important;}}`}</style>
            <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:C.ink, transition:"all 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:C.ink, transition:"all 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:C.ink, transition:"all 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            {[["Companies","#portfolio"],["Studio","#studio"],["Divine","#divine"]].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenu(false)}>{l}</a>
            ))}
            <button onClick={() => { setPage("contact"); setMenu(false); }}>Contact</button>
            <button onClick={() => { setPage("contact"); setMenu(false); }} style={{ color:"#fff !important", backgroundColor:C.accent, borderRadius:"4px", padding:"0.75rem 1rem", marginTop:"0.5rem", fontWeight:600, border:"none !important" }}>Work with us</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"10rem 3rem 6rem" }} className="px-main">
        <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%" }}>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"2rem", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
            Venture Studio · AI Tools · Est. 2017
          </p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2.4rem, 8vw, 6.8rem)", lineHeight:1.0, color:C.ink, marginBottom:"2.5rem", maxWidth:"820px", opacity:0, animation:"fadeUp 0.8s 0.2s forwards" }}>
            We build and back<br />companies that last.
          </h1>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"clamp(0.95rem, 2vw, 1.15rem)", lineHeight:1.85, color:C.inkMid, maxWidth:"500px", marginBottom:"3.5rem", opacity:0, animation:"fadeUp 0.8s 0.35s forwards" }}>
            Uncharted is a venture studio. We co-build companies with founders, give them access to AI tools that sharpen decisions, and help them grow from idea to traction.
          </p>
          <div className="hero-btns" style={{ display:"flex", gap:"1rem", opacity:0, animation:"fadeUp 0.8s 0.5s forwards" }}>
            <button onClick={() => setPage("contact")} className="cta-primary" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.9rem 2.25rem" }}>Build with us</button>
            <button onClick={() => setPage("divine")} className="cta-ghost" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.88rem", color:C.inkMid, backgroundColor:"transparent", border:`1.5px solid ${C.border}`, borderRadius:"4px", padding:"0.9rem 2.25rem" }}>Try Divine AI →</button>
          </div>
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} className="px-main" />

      {/* ── HOW WE BUILD ── */}
      <section id="studio" style={{ padding:"8rem 3rem" }} className="px-main">
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem, 5vw, 3.5rem)", color:C.ink, marginBottom:"5rem", maxWidth:"520px", lineHeight:1.1 }}>
            A different kind of co-founder.
          </h2>
          <div className="grid-3" style={{ gap:"3rem" }}>
            {[
              { n:"1", t:"Build with experience",         d:"Work with founders who have done this before. We bring playbooks, networks, and pattern recognition from building multiple companies." },
              { n:"2", t:"Stack the odds in your favour", d:"Capital, AI tools, legal, design, and recruiting — all inside the studio. You focus on product and customers. We handle the rest." },
              { n:"3", t:"Move faster than alone",        d:"We compress the early-stage timeline. From idea validation to first revenue, our infrastructure removes the typical speed bumps." },
            ].map(item => (
              <div key={item.n}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"3.5rem", color:C.accent, lineHeight:1, marginBottom:"1.5rem" }}>{item.n}</div>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"1rem", color:C.ink, marginBottom:"0.75rem" }}>{item.t}</h3>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.inkMid }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} className="px-main" />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding:"8rem 3rem" }} className="px-main">
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1rem" }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem, 5vw, 3.5rem)", color:C.ink, lineHeight:1.1 }}>Our companies.</h2>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem", color:C.inkSoft, letterSpacing:"0.1em" }}>2017 — PRESENT</span>
          </div>
          <div className="grid-3" style={{ gap:"1.5rem" }}>
            {PORTFOLIO.map(v => {
              const El = v.url ? "a" : "div";
              const props = v.url ? { href:v.url, target:"_blank", rel:"noopener noreferrer", style:{ textDecoration:"none", color:"inherit", display:"block" } } : {};
              return (
                <El key={v.id} {...props}>
                  <div className="port-card" style={{ border:`1px solid ${C.border}`, borderRadius:"8px", padding:"2.5rem 2rem" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", color: v.url ? C.gold : C.inkSoft, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.5rem" }}>{v.cat}</div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"2rem", color:C.ink, marginBottom:"0.75rem", lineHeight:1.1 }}>{v.name}</h3>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.85rem", lineHeight:1.75, color:C.inkMid, marginBottom:"2rem" }}>{v.desc}</p>
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

      {/* ── QUOTE ── */}
      <section style={{ padding:"8rem 3rem", backgroundColor:C.soft }} className="px-main">
        <div style={{ maxWidth:"760px", margin:"0 auto", textAlign:"center" }}>
          <div style={{ position:"relative", minHeight:"140px" }}>
            {QUOTES.map((q,i) => (
              <div key={i} style={{ position: i===0 ? "relative" : "absolute", top:0, left:0, right:0, transition:"opacity 0.8s ease, transform 0.8s ease", opacity: activeQuote===i ? 1 : 0, transform: activeQuote===i ? "translateY(0)" : "translateY(12px)", pointerEvents: activeQuote===i ? "auto" : "none" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:500, fontStyle:"italic", fontSize:"clamp(1.4rem, 4vw, 2.2rem)", lineHeight:1.45, color:C.ink, marginBottom:"2rem" }}>"{q.quote}"</p>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.82rem", color:C.inkMid }}>{q.name} <span style={{ color:C.border }}>·</span> {q.role}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", marginTop:"3rem" }}>
            {QUOTES.map((_,i) => (
              <button key={i} onClick={() => setAQ(i)} style={{ width: activeQuote===i ? "24px" : "6px", height:"6px", borderRadius:"3px", backgroundColor: activeQuote===i ? C.accent : C.border, border:"none", cursor:"pointer", padding:0, transition:"all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVINE ── */}
      <section id="divine" style={{ padding:"8rem 3rem", borderTop:`1px solid ${C.border}` }} className="px-main">
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="grid-2" style={{ gap:"4rem", alignItems:"center" }}>
            <div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem" }}>Divine · AI Tool</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem, 4vw, 3.5rem)", lineHeight:1.1, color:C.ink, marginBottom:"1.5rem" }}>
                Better decisions,<br />faster.
              </h2>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.85, color:C.inkMid, marginBottom:"1rem", maxWidth:"420px" }}>
                Divine is an AI tool built for founders. Ask any question about your business — strategy, hiring, pricing, fundraising — and get a direct answer shaped by real operator experience.
              </p>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.85rem", lineHeight:1.8, color:C.inkSoft, marginBottom:"2.5rem", maxWidth:"420px" }}>
                Not a generic chatbot. Every response is shaped by founders who've built companies.
              </p>
              <div className="hero-btns" style={{ display:"flex", gap:"1rem" }}>
                <button onClick={() => setPage("divine")} className="cta-primary" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.85rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.85rem 2rem" }}>Try Divine free</button>
                <button onClick={() => setPage("divine")} className="cta-ghost" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.85rem", color:C.inkMid, backgroundColor:"transparent", border:`1.5px solid ${C.border}`, borderRadius:"4px", padding:"0.85rem 2rem" }}>Become a Thinker →</button>
              </div>
            </div>
            <div className="grid-2" style={{ gap:"1px", backgroundColor:C.border }}>
              {[
                { v:"$0.05", l:"Per question",         sub:"No subscription required" },
                { v:"70%",   l:"Thinker revenue share", sub:"Earn from your expertise" },
                { v:"2",     l:"Expert frameworks",     sub:"Real operator experience" },
                { v:"v1.4",  l:"Current version",       sub:"Powered by Claude" },
              ].map(s => (
                <div key={s.l} style={{ padding:"2.5rem 2rem", backgroundColor:C.bg }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"2.8rem", color:C.ink, lineHeight:1, marginBottom:"0.4rem" }}>{s.v}</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"0.82rem", color:C.ink, marginBottom:"0.2rem" }}>{s.l}</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.72rem", color:C.inkSoft }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section style={{ padding:"10rem 3rem", textAlign:"center", borderTop:`1px solid ${C.border}` }} className="px-main">
        <div style={{ maxWidth:"680px", margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2.5rem, 8vw, 5rem)", lineHeight:1.05, color:C.ink, marginBottom:"2rem" }}>Come build with us.</h2>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"1rem", lineHeight:1.85, color:C.inkMid, marginBottom:"3rem" }}>
            Whether you have an idea, a company in motion, or expertise worth monetising — there's a place for you inside Uncharted.
          </p>
          <button onClick={() => setPage("contact")} className="cta-primary" style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.92rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"1rem 2.75rem" }}>Get in touch</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"4rem 3rem 3rem" }} className="px-main">
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="footer-grid" style={{ marginBottom:"4rem" }}>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"1.05rem", color:C.ink, marginBottom:"0.5rem" }}>Uncharted</div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkSoft, lineHeight:1.7, maxWidth:"240px" }}>Venture Studio + AI Tools. Building companies that last since 2017.</div>
            </div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.78rem", color:C.ink, marginBottom:"1rem", letterSpacing:"0.04em" }}>Studio</div>
              {["Companies","About","Divine"].map(l => (
                <div key={l} style={{ marginBottom:"0.5rem" }}>
                  <a href={`#${l.toLowerCase()}`} style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, textDecoration:"none", transition:"color 0.15s" }}
                    onMouseEnter={e => e.target.style.color=C.ink} onMouseLeave={e => e.target.style.color=C.inkMid}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.78rem", color:C.ink, marginBottom:"1rem", letterSpacing:"0.04em" }}>Connect</div>
              {[["Contact","contact"],["LinkedIn","https://linkedin.com"],["Twitter / X","https://x.com"]].map(([l,h]) => (
                <div key={l} style={{ marginBottom:"0.5rem" }}>
                  <a href={h.startsWith("http") ? h : "#"} onClick={!h.startsWith("http") ? (e) => { e.preventDefault(); setPage("contact"); } : undefined}
                    style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, textDecoration:"none", cursor:"pointer", transition:"color 0.15s" }}
                    onMouseEnter={e => e.target.style.color=C.ink} onMouseLeave={e => e.target.style.color=C.inkMid}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.78rem", color:C.ink, marginBottom:"1rem", letterSpacing:"0.04em" }}>Contact</div>
              {["hello@uncharted.ventures","founders@uncharted.ventures"].map(email => (
                <a key={email} href={`mailto:${email}`} style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.78rem", color:C.inkMid, textDecoration:"none", display:"block", marginBottom:"0.5rem", transition:"color 0.15s", wordBreak:"break-all" }}
                  onMouseEnter={e => e.target.style.color=C.ink} onMouseLeave={e => e.target.style.color=C.inkMid}>{email}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>© 2026 Uncharted Ventures LLC. All rights reserved.</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", color:C.inkSoft, letterSpacing:"0.08em" }}>uncharted.ventures</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

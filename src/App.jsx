import { useState, useEffect } from "react";
import DivinePage from "./Divine";
import ContactPage from "./Contact";

const C = {
  bg:           "#FAFAFA",
  surface:      "#FFFFFF",
  ink:          "#111111",
  inkDim:       "rgba(17,17,17,0.5)",
  inkDimmer:    "rgba(17,17,17,0.25)",
  gold:         "#B8962E",
  goldDim:      "rgba(184,150,46,0.08)",
  goldBorder:   "rgba(184,150,46,0.3)",
  border:       "rgba(17,17,17,0.08)",
  borderStrong: "rgba(17,17,17,0.14)",
  sectionAlt:   "#F2F2F2",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');`;

const PORTFOLIO = [
  { id:"sweetkiwi", name:"Sweetkiwi", cat:"Consumer / Retail", url:"https://www.sweetkiwi.com", desc:"Better-for-you frozen yogurt brand. Built the brand, go-to-market strategy, and retail distribution from scratch.", status:"Active", metric:"ROC: 12.5%" },
  { id:"surplus", name:"Surplus", cat:"Asset / Supply Chain", url:"https://www.surpluspods.com", desc:"Supply chain optimisation platform for retail operators. Built the product and early customer pipeline.", status:"Active", metric:"ARR: +2.3×" },
  { id:"stealth", name:"Stealth", cat:"Unannounced", url:null, desc:"New venture in development. Details coming soon.", status:"In Development", metric:"Coming Soon" },
];

function GridBg() {
  return (
    <div aria-hidden style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(17,17,17,0.04)" strokeWidth="1"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function Nav({ setPage, scrollY }) {
  const scrolled = scrollY > 40;
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor: scrolled ? "rgba(250,250,250,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition:"all 0.4s ease", padding:"0 2.5rem" }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.65rem", padding:0 }}>
          <div style={{ width:"26px", height:"26px", border:`1.5px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.65rem", color:C.gold }}>U</span>
          </div>
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.ink, letterSpacing:"-0.01em" }}>Uncharted</span>
        </button>
        <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
          {[["Studio","#studio"],["Portfolio","#portfolio"],["Divine","#divine"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.8rem", fontWeight:500, letterSpacing:"0.04em", textDecoration:"none", color:C.inkDim, textTransform:"uppercase", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDim}
            >{label}</a>
          ))}
          <button onClick={() => setPage("contact")} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.8rem", fontWeight:500, letterSpacing:"0.04em", color:C.inkDim, background:"none", border:"none", cursor:"pointer", textTransform:"uppercase", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDim}
          >Contact</button>
          <button onClick={() => setPage("divine")} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", color:"#fff", backgroundColor:C.ink, border:"none", borderRadius:"2px", padding:"0.5rem 1.1rem", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.target.style.backgroundColor="#333"; e.target.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.backgroundColor=C.ink; e.target.style.transform="translateY(0)"; }}
          >✦ Try Divine</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ setPage }) {
  const [tick, setTick] = useState(0);
  const streams = ["SWEETKIWI · CONSUMER BRAND · ACTIVE ············","SURPLUS · SUPPLY CHAIN PLATFORM · SCALING ·······","DIVINE AI · FOUNDER INTELLIGENCE TOOL · v1.4 ····","UNCHARTED STUDIO · OPEN FOR NEW FOUNDERS ········"];
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 80); return () => clearInterval(t); }, []);
  const stream = streams[Math.floor(tick / 60) % streams.length];
  const displayed = stream.slice(0, Math.min(tick % (stream.length + 20), stream.length));
  return (
    <section id="studio" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 2.5rem 6rem", position:"relative" }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2.5rem", opacity:0, animation:"fadeUp 0.8s 0.1s forwards" }}>
          <div style={{ width:"28px", height:"1px", backgroundColor:C.gold }} />
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>Venture Studio · AI Tools · Est. 2017</span>
        </div>
        <h1 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(3rem, 7.5vw, 7.5rem)", lineHeight:1.0, letterSpacing:"-0.04em", color:C.ink, marginBottom:"2rem", maxWidth:"900px", opacity:0, animation:"fadeUp 0.9s 0.2s forwards" }}>
          We build and back<br />companies that<br /><span style={{ color:C.gold }}>last.</span>
        </h1>
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"clamp(1rem, 1.8vw, 1.2rem)", lineHeight:1.75, color:C.inkDim, maxWidth:"560px", marginBottom:"3.5rem", opacity:0, animation:"fadeUp 0.9s 0.35s forwards" }}>
          Uncharted is a venture studio. We co-build companies with founders, give them access to AI tools that sharpen their decisions, and help them grow from idea to traction.
        </p>
        <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"5rem", opacity:0, animation:"fadeUp 0.9s 0.5s forwards" }}>
          <a href="#portfolio" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.04em", textDecoration:"none", color:"#fff", backgroundColor:C.ink, padding:"0.85rem 2rem", borderRadius:"2px", textTransform:"uppercase", transition:"all 0.2s ease", display:"inline-block" }}
            onMouseEnter={e => { e.target.style.backgroundColor="#333"; e.target.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.backgroundColor=C.ink; e.target.style.transform="translateY(0)"; }}
          >See Our Work</a>
          <button onClick={() => setPage("divine")} style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.78rem", letterSpacing:"0.1em", color:C.gold, backgroundColor:"transparent", border:`1px solid ${C.goldBorder}`, padding:"0.85rem 2rem", borderRadius:"2px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.target.style.borderColor=C.gold; e.target.style.backgroundColor=C.goldDim; e.target.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor=C.goldBorder; e.target.style.backgroundColor="transparent"; e.target.style.transform="translateY(0)"; }}
          >✦ Try Divine AI</button>
        </div>
        <div style={{ opacity:0, animation:"fadeUp 0.9s 0.65s forwards" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.65rem 1rem", border:`1px solid ${C.border}`, borderLeft:`2px solid ${C.gold}`, backgroundColor:C.goldDim, maxWidth:"520px" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", backgroundColor:C.gold, flexShrink:0, animation:"pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.gold, letterSpacing:"0.1em", whiteSpace:"nowrap", overflow:"hidden" }}>
              {displayed}<span style={{ animation:"blink 0.7s step-end infinite" }}>_</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [["7+","Years Building"],["2","Ventures Launched"],["1","AI Tool in Market"],["2017","Founded"]];
  return (
    <section style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, backgroundColor:C.surface }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", backgroundColor:C.border }}>
        {stats.map(([val, label]) => (
          <div key={label} style={{ padding:"2.5rem 2rem", backgroundColor:C.surface }}>
            <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"2.2rem", color:C.ink, letterSpacing:"-0.03em", marginBottom:"0.3rem" }}>{val}</div>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, letterSpacing:"0.12em", textTransform:"uppercase" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DivineSection({ setPage }) {
  return (
    <section id="divine" style={{ padding:"7rem 2.5rem", backgroundColor:C.bg, borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", backgroundColor:C.border }}>
          {/* Founders card */}
          <div style={{ padding:"3.5rem 3rem", backgroundColor:C.surface }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
              <div style={{ width:"20px", height:"1px", backgroundColor:C.gold }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase" }}>For Founders</span>
            </div>
            <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(1.6rem, 2.5vw, 2.5rem)", lineHeight:1.1, letterSpacing:"-0.03em", color:C.ink, marginBottom:"1.25rem" }}>
              Get answers to your<br />hardest questions.
            </h2>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.8, color:C.inkDim, marginBottom:"2rem", maxWidth:"380px" }}>
              Strategy, hiring, pricing, fundraising. Ask anything and get a direct answer shaped by real operator experience — not generic AI.
            </p>
            <div style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
              <button onClick={() => setPage("divine")} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.82rem", letterSpacing:"0.04em", color:"#fff", backgroundColor:C.ink, border:"none", borderRadius:"2px", padding:"0.8rem 1.75rem", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
                onMouseEnter={e => { e.target.style.backgroundColor="#333"; e.target.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.backgroundColor=C.ink; e.target.style.transform="translateY(0)"; }}>Ask a Question ✦</button>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, letterSpacing:"0.06em" }}>$0.05 per answer</span>
            </div>
          </div>

          {/* Thinkers card */}
          <div style={{ padding:"3.5rem 3rem", backgroundColor:C.sectionAlt, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", backgroundColor:C.gold }} />
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
              <div style={{ width:"20px", height:"1px", backgroundColor:C.gold }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase" }}>For Thinkers</span>
            </div>
            <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(1.6rem, 2.5vw, 2.5rem)", lineHeight:1.1, letterSpacing:"-0.03em", color:C.ink, marginBottom:"1.25rem" }}>
              Earn from your<br />expertise.
            </h2>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.8, color:C.inkDim, marginBottom:"2rem", maxWidth:"380px" }}>
              Encode your thinking into Divine. Founders pay to ask you questions. You earn 70% of every answer — no calls, no calendar, no limit.
            </p>
            <div style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
              <button onClick={() => setPage("divine")} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.82rem", letterSpacing:"0.04em", color:C.ink, backgroundColor:"transparent", border:`1px solid ${C.borderStrong}`, borderRadius:"2px", padding:"0.8rem 1.75rem", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
                onMouseEnter={e => { e.target.style.borderColor=C.gold; e.target.style.backgroundColor=C.goldDim; e.target.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.borderColor=C.borderStrong; e.target.style.backgroundColor="transparent"; e.target.style.transform="translateY(0)"; }}>Become a Thinker →</button>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, letterSpacing:"0.06em" }}>70% revenue share</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="portfolio" style={{ padding:"7rem 2.5rem", borderTop:`1px solid ${C.border}`, backgroundColor:C.surface }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
              <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>Companies We've Built</span>
            </div>
            <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(2rem, 3.5vw, 3rem)", letterSpacing:"-0.03em", lineHeight:1.1, color:C.ink }}>Our Portfolio</h2>
          </div>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, letterSpacing:"0.1em" }}>2017 — PRESENT</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", backgroundColor:C.border }}>
          {PORTFOLIO.map(v => {
            const CardEl = v.url ? "a" : "div";
            const cardProps = v.url ? { href:v.url, target:"_blank", rel:"noopener noreferrer", style:{ textDecoration:"none", color:"inherit", display:"block" } } : {};
            return (
              <CardEl key={v.id} {...cardProps}>
                <div onMouseEnter={() => setHovered(v.id)} onMouseLeave={() => setHovered(null)}
                  style={{ backgroundColor: hovered === v.id ? C.sectionAlt : C.surface, padding:"2.5rem 2rem", transition:"background 0.3s ease", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", backgroundColor:C.gold, transform: hovered === v.id ? "scaleX(1)" : "scaleX(0)", transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformOrigin:"left" }} />
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.5rem" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", backgroundColor: v.status === "Active" ? "#16a34a" : C.inkDimmer }} />
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color: v.status === "Active" ? "#16a34a" : C.inkDimmer, letterSpacing:"0.1em", textTransform:"uppercase" }}>{v.status}</span>
                  </div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.4rem" }}>{v.cat}</div>
                  <h3 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"1.5rem", letterSpacing:"-0.02em", color:C.ink, marginBottom:"0.75rem" }}>{v.name}</h3>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.83rem", lineHeight:1.7, color:C.inkDim, marginBottom:"2rem" }}>{v.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color: v.status === "Active" ? C.gold : C.inkDimmer, letterSpacing:"0.08em" }}>{v.metric}</span>
                    {v.url && <span style={{ color:C.ink, fontSize:"0.8rem", opacity: hovered === v.id ? 1 : 0, transform: hovered === v.id ? "translateX(0)" : "translateX(-6px)", transition:"all 0.25s ease" }}>→</span>}
                  </div>
                </div>
              </CardEl>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ backgroundColor:C.surface, padding:"4rem 2.5rem 3rem", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"3rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.5rem" }}>
              <div style={{ width:"24px", height:"24px", border:`1.5px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.6rem", color:C.gold }}>U</span>
              </div>
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.ink }}>Uncharted</span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.1em", textTransform:"uppercase" }}>VENTURE STUDIO · AI TOOLS · EST. 2017</div>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            {["Studio","Portfolio","Divine"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.75rem", color:C.inkDimmer, textDecoration:"none", letterSpacing:"0.04em", transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDimmer}>{l}</a>
            ))}
            <button onClick={() => setPage("contact")} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.75rem", color:C.inkDimmer, background:"none", border:"none", cursor:"pointer", letterSpacing:"0.04em", padding:0, transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDimmer}>Contact</button>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.08em" }}>uncharted.ventures ~ $ ready to build<span style={{ animation:"blink 1s step-end infinite" }}>_</span></span>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.08em" }}>© 2026 UNCHARTED VENTURES LLC · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  if (page === "divine")  return <DivinePage onBack={() => setPage("home")} />;
  if (page === "contact") return <ContactPage onBack={() => setPage("home")} />;

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.gold}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink { 50%{opacity:0;} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.3;} }
      `}</style>
      <GridBg />
      <Nav setPage={setPage} scrollY={scrollY} />
      <Hero setPage={setPage} />
      <StatsStrip />
      <DivineSection setPage={setPage} />
      <Portfolio />
      <Footer setPage={setPage} />
    </div>
  );
}

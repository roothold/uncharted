import { useState, useEffect, useRef } from "react";
import DivinePage from "./Divine";
import ContactPage from "./Contact";

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  charcoal: "#121212",
  paper: "#F5F5F5",
  gold: "#D4AF37",
  goldDim: "rgba(212,175,55,0.15)",
  goldBorder: "rgba(212,175,55,0.3)",
  white: "#FFFFFF",
  dim: "rgba(245,245,245,0.45)",
  dimmer: "rgba(245,245,245,0.2)",
  border: "rgba(245,245,245,0.08)",
};

// ── Fonts injected once ────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');`;

const PORTFOLIO = [
  {
    id: "sweetkiwi", name: "Sweetkiwi", cat: "Consumer / Retail",
    url: "https://www.sweetkiwi.com",
    desc: "Better-for-you frozen yogurt brand redefining the premium snack category.",
    divineStatus: "Governance: Divine-Enforced", statusColor: C.gold,
    metric: "ROC: 12.5%", active: true,
  },
  {
    id: "surplus", name: "Surplus", cat: "Asset / Supply Chain",
    url: "https://www.surpluspods.com",
    desc: "Intelligent supply chain optimisation platform for modern retail operations.",
    divineStatus: "Protocol: Embedded · v1.2", statusColor: C.gold,
    metric: "ARR: +2.3×", active: true,
  },
  {
    id: "stealth", name: "Stealth", cat: "Unannounced",
    url: null,
    desc: "Something new is being encoded inside the Foundry. Details coming soon.",
    divineStatus: "Status: Pre-Encoding", statusColor: "rgba(245,245,245,0.3)",
    metric: "Coming Soon", active: false,
  },
];

// ── Animated grid background ───────────────────────────────────────────────
function GridBg() {
  return (
    <div aria-hidden style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(245,245,245,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Gold radial glow top-right */}
      <div style={{ position:"absolute", top:"-200px", right:"-200px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
    </div>
  );
}

// ── Capital health bar ─────────────────────────────────────────────────────
function CapitalBar() {
  const [blink, setBlink] = useState(true);
  useEffect(() => { const t = setInterval(() => setBlink(b => !b), 1200); return () => clearInterval(t); }, []);
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, backgroundColor:"rgba(18,18,18,0.95)", backdropFilter:"blur(12px)", borderTop:`1px solid ${C.goldBorder}`, padding:"0.45rem 2.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor: blink ? C.gold : "transparent", transition:"background 0.4s ease" }} />
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase" }}>
          Capitalized by RootHold.inc
        </span>
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.dimmer, letterSpacing:"0.08em" }}>|</span>
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.dim, letterSpacing:"0.08em" }}>
          $3M Liquidity Facility Active
        </span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.dimmer, letterSpacing:"0.1em" }}>DIVINE PROTOCOL · v1.4 · LIVE</span>
        <div style={{ width:"48px", height:"2px", backgroundColor:C.goldDim, borderRadius:"1px", overflow:"hidden" }}>
          <div style={{ width:"72%", height:"100%", backgroundColor:C.gold, animation:"liquidPulse 2.5s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav({ setPage, scrollY }) {
  const scrolled = scrollY > 40;
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor: scrolled ? "rgba(18,18,18,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)", padding:"0 2.5rem" }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.65rem", padding:0 }}>
          <div style={{ width:"28px", height:"28px", border:`1.5px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.7rem", color:C.gold }}>U</span>
          </div>
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.paper, letterSpacing:"-0.01em" }}>Uncharted</span>
        </button>
        <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
          {[["Foundry","#foundry"],["Portfolio","#portfolio"],["Protocol","#protocol"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.05em", textDecoration:"none", color:C.dim, textTransform:"uppercase", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.paper}
              onMouseLeave={e => e.target.style.color = C.dim}
            >{label}</a>
          ))}
          <button onClick={() => setPage("contact")} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.05em", color:C.dim, background:"none", border:"none", cursor:"pointer", textTransform:"uppercase", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.paper}
            onMouseLeave={e => e.target.style.color = C.dim}
          >Contact</button>
          <button onClick={() => setPage("divine")} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.08em", color:C.charcoal, backgroundColor:C.gold, border:"none", borderRadius:"2px", padding:"0.5rem 1.1rem", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.target.style.backgroundColor="#c9a227"; e.target.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.backgroundColor=C.gold; e.target.style.transform="translateY(0)"; }}
          >Query Divine ✦</button>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ setPage }) {
  const [tick, setTick] = useState(0);
  const streams = [
    "DIVINE PROTOCOL · ENCODING VENTURE DNA ·····",
    "ROOTHOLD.INC · $3M LIQUIDITY FACILITY · ACTIVE",
    "COGNITIVE NODES · SWEETKIWI · SURPLUS · STEALTH",
    "FOUNDRY STATUS · ACCEPTING NEW ARCHITECTS ·····",
  ];
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 80); return () => clearInterval(t); }, []);
  const stream = streams[Math.floor(tick / 60) % streams.length];
  const charIdx = tick % (stream.length + 20);
  const displayed = stream.slice(0, Math.min(charIdx, stream.length));

  return (
    <section id="foundry" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 2.5rem 6rem", position:"relative" }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>

        {/* Eyebrow */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2.5rem", opacity:0, animation:"fadeUp 0.8s 0.1s forwards" }}>
          <div style={{ width:"32px", height:"1px", backgroundColor:C.gold }} />
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.16em", color:C.gold, textTransform:"uppercase" }}>
            AI-Native Institutional Foundry · Est. 2017
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(3rem, 7.5vw, 7.5rem)", lineHeight:1.0, letterSpacing:"-0.04em", color:C.paper, marginBottom:"2rem", maxWidth:"900px", opacity:0, animation:"fadeUp 0.9s 0.2s forwards" }}>
          Deploying the<br />
          Future of<br />
          <span style={{ color:C.gold }}>Sovereignty.</span>
        </h1>

        {/* Sub-headline */}
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"clamp(1rem, 1.8vw, 1.25rem)", lineHeight:1.75, color:C.dim, maxWidth:"580px", marginBottom:"3.5rem", opacity:0, animation:"fadeUp 0.9s 0.35s forwards" }}>
          Uncharted.ventures is an AI-native foundry powered by the Divine Intelligence Protocol. We build the off-ramps of the future.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"5rem", opacity:0, animation:"fadeUp 0.9s 0.5s forwards" }}>
          <a href="#portfolio" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.04em", textDecoration:"none", color:C.charcoal, backgroundColor:C.paper, padding:"0.85rem 2rem", borderRadius:"2px", textTransform:"uppercase", transition:"all 0.2s ease", display:"inline-block" }}
            onMouseEnter={e => { e.target.style.backgroundColor="#e8e8e8"; e.target.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.backgroundColor=C.paper; e.target.style.transform="translateY(0)"; }}
          >Enter the Foundry</a>
          <button onClick={() => setPage("divine")} style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.78rem", letterSpacing:"0.1em", color:C.gold, backgroundColor:"transparent", border:`1px solid ${C.goldBorder}`, padding:"0.85rem 2rem", borderRadius:"2px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.target.style.borderColor=C.gold; e.target.style.backgroundColor=C.goldDim; e.target.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor=C.goldBorder; e.target.style.backgroundColor="transparent"; e.target.style.transform="translateY(0)"; }}
          >✦ Query Divine</button>
        </div>

        {/* Live stream ticker */}
        <div style={{ opacity:0, animation:"fadeUp 0.9s 0.65s forwards" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.65rem 1rem", border:`1px solid ${C.border}`, borderLeft:`2px solid ${C.gold}`, backgroundColor:"rgba(212,175,55,0.04)", maxWidth:"520px" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", backgroundColor:C.gold, flexShrink:0, animation:"pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(212,175,55,0.7)", letterSpacing:"0.1em", whiteSpace:"nowrap", overflow:"hidden" }}>
              {displayed}<span style={{ animation:"blink 0.7s step-end infinite" }}>_</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Thesis strip ───────────────────────────────────────────────────────────
function ThesisStrip() {
  const stats = [["7+", "Years Operating"], ["$3M", "Liquidity Facility"], ["3", "Active Ventures"], ["v1.4", "Divine Protocol"]];
  return (
    <section style={{ padding:"4rem 2.5rem", backgroundColor:"rgba(245,245,245,0.02)", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"1px", backgroundColor:C.border }}>
        {stats.map(([val, label]) => (
          <div key={label} style={{ padding:"2.5rem 2rem", backgroundColor:C.charcoal }}>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"2rem", color:C.paper, letterSpacing:"-0.02em", marginBottom:"0.35rem" }}>{val}</div>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.dimmer, letterSpacing:"0.12em", textTransform:"uppercase" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Divine Protocol section ────────────────────────────────────────────────
function ProtocolSection({ setPage }) {
  const [logLines] = useState([
    { t: "00:00:01", msg: "DIVINE PROTOCOL INITIALISED · NODE COUNT: 3", col: C.gold },
    { t: "00:00:02", msg: "VENTURE DNA ENCODING · SWEETKIWI ··· COMPLETE", col: C.dim },
    { t: "00:00:03", msg: "COGNITIVE LAYER · SURPLUS · GOVERNANCE ACTIVE", col: C.dim },
    { t: "00:00:04", msg: "STEALTH NODE · PRE-ENCODING · AWAITING ARCHITECT", col: "rgba(245,245,245,0.3)" },
    { t: "00:00:05", msg: "ROOTHOLD.INC · LIQUIDITY BRIDGE · $3,000,000 CONFIRMED", col: C.gold },
    { t: "00:00:06", msg: "DIVINE v1.4 · ALL SYSTEMS SOVEREIGN ·····", col: C.gold },
  ]);
  return (
    <section id="protocol" style={{ padding:"7rem 2.5rem" }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
            <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>The Intelligence Layer</span>
          </div>
          <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(2rem, 4vw, 3.5rem)", lineHeight:1.05, letterSpacing:"-0.03em", color:C.paper, marginBottom:"1.5rem" }}>
            Divine Intelligence<br /><span style={{ color:C.gold }}>Protocol.</span>
          </h2>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.95rem", lineHeight:1.8, color:C.dim, marginBottom:"1.5rem", maxWidth:"440px" }}>
            Every venture launched through Uncharted is encoded with the Divine Intelligence Protocol — a cognitive operating system that enforces governance, sharpens decision-making, and compounds founder intelligence over time.
          </p>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:"rgba(245,245,245,0.35)", marginBottom:"2.5rem", maxWidth:"440px" }}>
            Divine is not a chatbot. It is the operating system for greatness — a verified human cognitive layer running on top of AI infrastructure.
          </p>
          <button onClick={() => setPage("divine")} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.1em", color:C.charcoal, backgroundColor:C.gold, border:"none", borderRadius:"2px", padding:"0.85rem 1.75rem", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.target.style.backgroundColor="#c9a227"; e.target.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.backgroundColor=C.gold; e.target.style.transform="translateY(0)"; }}
          >✦ Enter the Cognitive Portal</button>
        </div>

        {/* Terminal */}
        <div style={{ backgroundColor:"#0a0a0a", border:`1px solid ${C.goldBorder}`, borderRadius:"4px", overflow:"hidden" }}>
          <div style={{ padding:"0.65rem 1rem", borderBottom:`1px solid ${C.goldBorder}`, display:"flex", alignItems:"center", gap:"0.5rem", backgroundColor:"rgba(212,175,55,0.05)" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.gold, letterSpacing:"0.12em" }}>DIVINE · COGNITIVE ENGINE · LIVE</span>
          </div>
          <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {logLines.map((line, i) => (
              <div key={i} style={{ display:"flex", gap:"1rem", opacity:0, animation:`fadeUp 0.5s ${0.1 + i * 0.15}s forwards` }}>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(245,245,245,0.2)", letterSpacing:"0.05em", flexShrink:0 }}>{line.t}</span>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:line.col, letterSpacing:"0.06em", lineHeight:1.6 }}>{line.msg}</span>
              </div>
            ))}
            <div style={{ display:"flex", gap:"1rem", marginTop:"0.5rem" }}>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(245,245,245,0.2)" }}>00:00:07</span>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.gold }}>› <span style={{ animation:"blink 0.8s step-end infinite" }}>_</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Portfolio ──────────────────────────────────────────────────────────────
function Portfolio() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="portfolio" style={{ padding:"7rem 2.5rem", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
              <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>Case Studies · Divine Optimisation</span>
            </div>
            <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(2rem, 3.5vw, 3rem)", letterSpacing:"-0.03em", lineHeight:1.1, color:C.paper }}>
              Off-Ramp<br />Portfolio
            </h2>
          </div>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.dimmer, letterSpacing:"0.1em" }}>2017 — PRESENT</span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1px", backgroundColor:C.border }}>
          {PORTFOLIO.map(v => {
            const CardEl = v.url ? "a" : "div";
            const cardProps = v.url ? { href:v.url, target:"_blank", rel:"noopener noreferrer", style:{ textDecoration:"none", color:"inherit", display:"block" } } : {};
            return (
              <CardEl key={v.id} {...cardProps}>
                <div
                  onMouseEnter={() => setHovered(v.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ backgroundColor: hovered === v.id ? "#1a1a1a" : C.charcoal, padding:"2.5rem 2rem", transition:"background 0.3s ease", cursor: v.url ? "pointer" : "default", position:"relative", overflow:"hidden" }}
                >
                  {/* Gold top border on hover */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", backgroundColor:C.gold, transform: hovered === v.id ? "scaleX(1)" : "scaleX(0)", transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformOrigin:"left" }} />

                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color: v.active ? C.gold : "rgba(245,245,245,0.3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%", backgroundColor: v.active ? C.gold : "rgba(245,245,245,0.2)" }} />
                    {v.divineStatus}
                  </div>

                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.4rem" }}>{v.cat}</div>
                  <h3 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"1.5rem", letterSpacing:"-0.02em", color:C.paper, marginBottom:"0.75rem" }}>{v.name}</h3>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.83rem", lineHeight:1.7, color:C.dim, marginBottom:"2rem" }}>{v.desc}</p>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color: v.active ? C.gold : C.dimmer, letterSpacing:"0.08em" }}>{v.metric}</span>
                    {v.url && <span style={{ color:C.gold, fontSize:"0.8rem", opacity: hovered === v.id ? 1 : 0, transform: hovered === v.id ? "translateX(0)" : "translateX(-6px)", transition:"all 0.25s ease" }}>→</span>}
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

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ backgroundColor:"#0a0a0a", padding:"4rem 2.5rem 5rem", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1360px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"3rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.5rem" }}>
              <div style={{ width:"24px", height:"24px", border:`1.5px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.6rem", color:C.gold }}>U</span>
              </div>
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.paper }}>Uncharted</span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.1em", textTransform:"uppercase" }}>VENTURES + FOUNDRY + DIVINE INTELLIGENCE</div>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            {["Foundry","Portfolio","Protocol"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.75rem", color:C.dimmer, textDecoration:"none", letterSpacing:"0.04em", transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.gold}
                onMouseLeave={e => e.target.style.color = C.dimmer}
              >{l}</a>
            ))}
            <button onClick={() => setPage("contact")} style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.75rem", color:C.dimmer, background:"none", border:"none", cursor:"pointer", letterSpacing:"0.04em", padding:0, transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = C.dimmer}
            >Contact</button>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.08em" }}>
            uncharted.ventures ~ $ divine --status sovereign<span style={{ animation:"blink 1s step-end infinite" }}>_</span>
          </span>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.08em" }}>
            © 2026 UNCHARTED VENTURES LLC · ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  if (page === "divine") return <DivinePage onBack={() => setPage("home")} />;
  if (page === "contact") return <ContactPage onBack={() => setPage("home")} />;

  return (
    <div style={{ backgroundColor:C.charcoal, color:C.paper, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.gold}; color: ${C.charcoal}; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 50% { opacity:0; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes liquidPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes scanline { 0% { transform:translateY(-100%); } 100% { transform:translateY(100vh); } }
      `}</style>
      <GridBg />
      <Nav setPage={setPage} scrollY={scrollY} />
      <Hero setPage={setPage} />
      <ThesisStrip />
      <ProtocolSection setPage={setPage} />
      <Portfolio />
      <Footer setPage={setPage} />
      <CapitalBar />
    </div>
  );
}

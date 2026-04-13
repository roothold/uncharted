import { useState, useEffect } from "react";

const LOGO_SRC = "/logo.png";
const ICON_SRC = "/icon.png";


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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&family=Poppins:wght@400&display=swap');`;

const THINKERS = [
  { id:"2", name:"Michael Akindele", title:"Product · Brand · Venture Building", domains:["Product Strategy","Brand Building","Venture Design"], tier:"Perspective", price:"$2.50" },
  { id:"3", name:"Divine Composite", title:"All domains · Cross-functional advice", domains:["Strategy","Operations","Fundraising","Growth"], tier:"Perspective", price:"$2.50" },
];

const USE_CASES = [
  { q:"Should I raise now or wait 6 months?",               domain:"Fundraising" },
  { q:"My co-founder wants to pivot. How do I think about this?", domain:"Strategy" },
  { q:"When should I hire my first salesperson?",            domain:"Hiring" },
  { q:"Our margins are compressing. What do I cut first?",   domain:"Operations" },
  { q:"How do I price this for enterprise vs. SMB?",         domain:"Pricing" },
  { q:"We have 3 months of runway. What are our real options?", domain:"Capital" },
];

// ── Query Portal ────────────────────────────────────────────────────────────
function QueryPortal({ externalQuery }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery]       = useState(externalQuery || "");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (externalQuery) { setQuery(externalQuery); setResponse(null); }
  }, [externalQuery]);
  const [loading, setLoading]   = useState(false);
  const [typed, setTyped]       = useState("");

  useEffect(() => {
    if (!response) return;
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      setTyped(response.slice(0, i));
      i++;
      if (i > response.length) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [response]);

  const ask = async () => {
    if (!query.trim() || !selected) return;
    setLoading(true); setResponse(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are Divine — an AI tool built for founders. You're operating through the lens of "${selected.name}", ${selected.title}. Their domains: ${selected.domains.join(", ")}. Give a direct, practical answer. No fluff, no caveats. Think like an operator who has seen this problem before. Start with a one-sentence bottom line, then unpack it in 3–4 paragraphs. Be honest even if it's uncomfortable.`,
          messages:[{ role:"user", content:query }]
        })
      });
      const data = await res.json();
      setResponse(data.content?.find(b => b.type==="text")?.text || "Unable to retrieve a response. Please try again.");
    } catch { setResponse("Connection error. Please try again."); }
    setLoading(false);
  };

  // Explicit white-surface palette — works on any background
  const W = {
    card:       "#FFFFFF",
    cardHover:  "#F7F7F7",
    cardBorder: "#E8E8E8",
    cardActive: "#FFF8F6",
    ink:        "#0D0D0D",
    inkMid:     "#555555",
    inkSoft:    "#888888",
    accent:     "#C8512A",
    label:      "rgba(255,255,255,0.7)",  // for text directly on terracotta bg
  };

  return (
    <div className="divine-query-grid">

      {/* ── Selector column ── */}
      <div>
        <p style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500,
          fontSize:"0.68rem", color:C.inkSoft, letterSpacing:"0.1em",
          textTransform:"uppercase", marginBottom:"0.85rem" }}>Choose a framework</p>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          {THINKERS.map(t => (
            <div key={t.id} onClick={() => setSelected(t)}
              data-thinker-id={t.id === "2" ? "michael" : "composite"}
              style={{
                padding:"1.1rem 1.1rem 1.1rem 1.3rem",
                border:`1px solid ${selected?.id===t.id ? W.accent : W.cardBorder}`,
                borderRadius:"6px", cursor:"pointer",
                backgroundColor: selected?.id===t.id ? W.cardActive : W.card,
                transition:"all 0.2s ease", position:"relative",
                boxShadow: selected?.id===t.id ? `0 0 0 1px ${W.accent}` : "none",
              }}>
              {selected?.id===t.id && (
                <div style={{ position:"absolute", left:0, top:"15%", bottom:"15%",
                  width:"3px", backgroundColor:W.accent, borderRadius:"0 2px 2px 0" }} />
              )}
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                fontSize:"0.82rem", color:W.ink, marginBottom:"0.2rem" }}>{t.name}</div>
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                fontSize:"0.75rem", color:W.inkMid, marginBottom:"0.65rem" }}>{t.title}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.66rem",
                  color:W.accent, fontWeight:500 }}>{t.tier}</span>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem",
                  color:W.inkSoft }}>{t.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div style={{ marginTop:"1rem", padding:"1.1rem 1.25rem",
          border:`1px solid ${W.cardBorder}`, borderRadius:"6px",
          backgroundColor:W.card }}>
          {[["Per question","$0.05"],["Thinker cut","70%"],["Powered by","Claude"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between",
              marginBottom:"0.5rem" }}>
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                fontSize:"0.75rem", color:W.inkMid }}>{k}</span>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                fontSize:"0.75rem", color:W.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Terminal column ── */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>

        {/* Response panel */}
        <div style={{ border:`1px solid ${W.cardBorder}`, borderRadius:"8px",
          overflow:"hidden", backgroundColor:W.card, flex:1 }}>

          {/* Panel header */}
          <div style={{ padding:"0.7rem 1.25rem", borderBottom:`1px solid ${W.cardBorder}`,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            backgroundColor:"#F7F7F7" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%",
                backgroundColor: selected ? W.accent : "#CCCCCC",
                transition:"background 0.3s" }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.68rem",
                fontWeight:500, color: selected ? W.ink : W.inkSoft }}>
                {selected ? selected.name : "No framework selected"}
              </span>
            </div>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
              color:W.inkSoft }}>Divine · v1.4</span>
          </div>

          {/* Panel body */}
          <div style={{ padding:"1.75rem", minHeight:"220px" }}>
            {!selected && (
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                fontSize:"0.88rem", color:"#BBBBBB", fontStyle:"italic" }}>
                Choose a framework on the left to get started.
              </p>
            )}
            {selected && !loading && !response && (
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                fontSize:"0.88rem", color:W.inkSoft }}>
                <span style={{ color:W.accent }}>✦</span> {selected.name} is ready. Ask your question below.
              </p>
            )}
            {loading && (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.82rem",
                  color:W.accent }}>Working on your answer...</p>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.8rem", color:W.inkSoft }}>
                  Applying {selected?.name} framework.
                </p>
              </div>
            )}
            {response && !loading && (
              <div>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
                  color:W.accent, letterSpacing:"0.1em", marginBottom:"1rem" }}>
                  ✦ {selected?.name?.toUpperCase()} · {new Date().toLocaleTimeString()}
                </p>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.9rem", lineHeight:1.9, color:W.ink, whiteSpace:"pre-wrap" }}>
                  {typed}
                  <span style={{ color:W.accent, animation:"blink 0.7s step-end infinite" }}>
                    {typed.length < response.length ? "▌" : ""}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Input row */}
        <div style={{ display:"flex", gap:"0.75rem" }}>
          <textarea id="divine-question" value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && e.metaKey) ask(); }}
            placeholder="What decision are you working through? Strategy, hiring, pricing, fundraising..."
            rows={3} style={{ flex:1, padding:"0.85rem 1rem", borderRadius:"6px",
              fontSize:"0.85rem", fontFamily:"'Inter Tight', sans-serif",
              resize:"none", lineHeight:1.65, border:`1px solid ${W.cardBorder}`,
              backgroundColor:W.card, color:W.ink, outline:"none" }}
            onFocus={e => e.target.style.borderColor=W.ink}
            onBlur={e => e.target.style.borderColor=W.cardBorder} />
          <button id="divine-ask-btn" onClick={ask} disabled={!selected || !query.trim() || loading}
            style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
              fontSize:"0.82rem", color:"#fff",
              backgroundColor: (!selected || !query.trim() || loading) ? "#BBBBBB" : W.accent,
              border:"none", borderRadius:"6px", padding:"0 1.5rem",
              cursor: (!selected || !query.trim() || loading) ? "not-allowed" : "pointer",
              minWidth:"90px", transition:"background 0.2s" }}>
            {loading ? "···" : "Ask ✦"}
          </button>
        </div>

        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
          fontSize:"0.7rem", color:C.inkSoft }}>
          ⌘ + Enter to submit · $0.05 per question · Powered by Anthropic Claude
        </p>
      </div>
    </div>
  );
}

// ── Main Divine Page ────────────────────────────────────────────────────────
export default function DivinePage({ onBack, onBecomeThinker }) {
  const [prefillQuery, setPrefillQuery] = useState("");
  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'JetBrains Mono', monospace" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink   { 50%{opacity:0;} }
        .nav-outer { padding-left:3rem; padding-right:3rem; }
        @media(max-width:600px){.nav-outer{padding-left:1rem!important;padding-right:1rem!important;}}
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }
        .cta-primary { transition:all 0.2s ease; }
        .cta-primary:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .cta-ghost { transition:all 0.2s ease; }
        .cta-ghost:hover { border-color:${C.accent} !important; color:${C.accent} !important; transform:translateY(-2px); }
        .use-card:hover { border-color:${C.accent} !important; transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.06); }
        .step-row:hover { border-color:${C.ink} !important; }
        .logo-full { display:block; } .logo-icon { display:none; }
        @media(max-width:768px){ .logo-full{display:none!important;} .logo-icon{display:block!important;} }
        /* ── Responsive ── */
        .divine-hero-grid   { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; }
        .divine-how-grid    { display:grid; grid-template-columns:1fr 2fr; gap:5rem; align-items:start; }
        .divine-how-3       { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
        .divine-thinker-grid{ display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }
        .divine-stat-3      { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:${C.border}; }
        .divine-query-grid  { display:grid; grid-template-columns:260px 1fr; gap:2rem; }
        .divine-use-grid    { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
        .divine-px          { padding-left:3rem; padding-right:3rem; }
        .divine-cta-row     { display:flex; gap:1rem; }
        @media (max-width:900px) {
          .divine-hero-grid    { grid-template-columns:1fr !important; gap:3rem !important; }
          .divine-how-grid     { grid-template-columns:1fr !important; gap:2.5rem !important; }
          .divine-how-3        { grid-template-columns:1fr !important; }
          .divine-thinker-grid { grid-template-columns:1fr !important; gap:3rem !important; }
          .divine-query-grid   { grid-template-columns:1fr !important; gap:1.5rem !important; }
        }
        @media (max-width:600px) {
          .divine-use-grid  { grid-template-columns:1fr !important; }
          .divine-stat-3    { grid-template-columns:1fr 1fr !important; }
          .divine-px        { padding-left:1rem !important; padding-right:1rem !important; }
          .divine-cta-row   { flex-direction:column !important; }
          .divine-cta-row a, .divine-cta-row button { width:100% !important; text-align:center !important; box-sizing:border-box; }
          .divine-nav-links { display:none !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }} className="nav-outer">
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
              <img src={LOGO_SRC} alt="Uncharted Ventures" className="logo-full" style={{ height:"40px", width:"auto", display:"block" }} />
              <img src={ICON_SRC} alt="Uncharted Ventures" className="logo-icon" style={{ height:"40px", width:"40px", display:"none" }} />
            </button>
            <div style={{ width:"1px", height:"16px", backgroundColor:C.border }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"1.05rem", color:C.ink }}>Divine</span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkSoft }}>v1.4</span>
          </div>
          <a href="#ask" style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.78rem", color:"#fff", backgroundColor:C.accent, borderRadius:"4px", padding:"0.55rem 1.4rem", textDecoration:"none" }}>Ask now</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"10rem 3rem 6rem" }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto", width:"100%" }} className="divine-hero-grid">
          <div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(2.8rem, 5.5vw, 5.5rem)", lineHeight:1.0, color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.8s 0.2s forwards" }}>
              Ask a hard<br />question.<br />Get a real<br />answer.
            </h1>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.98rem", lineHeight:1.9, color:C.inkMid, maxWidth:"420px", marginBottom:"3rem", opacity:0, animation:"fadeUp 0.8s 0.35s forwards" }}>
              Divine gives founders direct, practical answers to their hardest business questions — drawn from real operator experience.
            </p>
            <div style={{ opacity:0, animation:"fadeUp 0.8s 0.5s forwards" }}>
              <a href="#ask" className="cta-primary" style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, borderRadius:"4px", padding:"0.9rem 2.25rem", textDecoration:"none", display:"inline-block" }}>Ask your first question →</a>
            </div>
          </div>
          {/* Use case grid — clickable, pre-fills question */}
          <div className="divine-use-grid" style={{ opacity:0, animation:"fadeUp 0.8s 0.3s forwards" }}>
            {USE_CASES.map((uc, i) => (
              <div key={i} className="use-card" onClick={() => {
                setPrefillQuery(uc.q);
                setTimeout(() => {
                  const askEl = document.getElementById("ask");
                  if (askEl) askEl.scrollIntoView({ behavior:"smooth", block:"start" });
                }, 50);
              }}
              style={{ padding:"1.25rem", border:`1px solid ${C.border}`, borderRadius:"6px",
                transition:"all 0.2s ease", cursor:"pointer" }}>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.65rem", color:C.ink, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>{uc.domain}</p>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, lineHeight:1.55, fontStyle:"italic" }}>"{uc.q}"</p>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.accent, marginTop:"0.6rem", letterSpacing:"0.08em" }}>Ask this →</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FOR FOUNDERS ── */}
      <section id="founders" style={{ padding:"8rem 2.5rem", backgroundColor:"#FBF8F2" }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.72rem", color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.5rem" }}>For Founders</p>
          <div className="divine-how-grid">
            <div>
              <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(2rem, 3.5vw, 3.2rem)", lineHeight:1.1, color:C.ink, marginBottom:"1.25rem" }}>
                Better answers than your smartest friend.
              </h2>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.9rem", lineHeight:1.85, color:C.inkMid, marginBottom:"1rem" }}>
                Every response is shaped by a real operator's thinking — not a generic language model. Pick the lens, ask your question, get a direct answer.
              </p>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.inkSoft }}>$0.05 per question. No subscription.</p>
            </div>
            <div className="divine-how-3">
              {[
                { n:"1", t:"Pick a thinker",    d:"Choose someone whose experience matches your problem.",  bg:"rgba(212,175,55,0.06)" },
                { n:"2", t:"Ask your question", d:"Be specific. More context = sharper answer.",            bg:"rgba(212,175,55,0.11)" },
                { n:"3", t:"Act on it",         d:"Direct, honest, operator-grade. No hedging.",            bg:"rgba(212,175,55,0.18)" },
              ].map(s => (
                <div key={s.n} style={{ padding:"2rem 1.5rem", backgroundColor:s.bg }}>
                  <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"3rem", color:C.ink, lineHeight:1, marginBottom:"1.25rem" }}>{s.n}</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.9rem", color:C.ink, marginBottom:"0.5rem" }}>{s.t}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, lineHeight:1.7 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── LIVE QUERY ── */}
      <section id="ask" style={{ padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.72rem", color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1rem" }}>Try it now</p>
          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(2rem, 3.5vw, 3rem)", color:C.ink, marginBottom:"3rem" }}>
            Ask your first question.
          </h2>
          <QueryPortal externalQuery={prefillQuery} />
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} />

      {/* ── THINKER CTA STRIP ── */}
      <section style={{ padding:"5rem 2.5rem", backgroundColor:C.soft }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(1.5rem, 3vw, 2.2rem)", color:C.ink, marginBottom:"0.5rem" }}>
              Your experience is worth more than you're charging.
            </h2>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", color:C.inkMid }}>
              Encode your thinking into Divine. Founders pay to access it. You earn 70%.
            </p>
          </div>
          <button onClick={onBecomeThinker} className="cta-primary"
            style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.78rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.9rem 2rem", cursor:"pointer", whiteSpace:"nowrap" }}>
            Apply to become a Thinker →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 2.5rem" }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.95rem", color:C.ink }}>Divine</span>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>by Uncharted Ventures</span>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            <a href="https://divine.uncharted.ventures/?login=1" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkSoft, textDecoration:"none", transition:"color 0.15s" }}
              onMouseEnter={e => e.target.style.color=C.accent} onMouseLeave={e => e.target.style.color=C.inkSoft}>Full app →</a>
            <button onClick={onBack} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkSoft, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.15s" }}
              onMouseEnter={e => e.target.style.color=C.ink} onMouseLeave={e => e.target.style.color=C.inkSoft}>← Back to Uncharted</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

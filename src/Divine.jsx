import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=Poppins:wght@400&display=swap');`;

const THINKERS = [
  { id:"2", name:"Michael Akindele", title:"Product · Brand · Venture Building", domains:["Product Strategy","Brand Building","Venture Design"], tier:"Perspective", price:"$0.05" },
  { id:"3", name:"Divine Composite", title:"All domains · Cross-functional advice", domains:["Strategy","Operations","Fundraising","Growth"], tier:"Perspective", price:"$0.05" },
];

const USE_CASES = [
  { q:"Audit my current runway against 2026 market benchmarks.",               domain:"Capital Strategy"    },
  { q:"Identify the structural fragility in my supply chain.",                  domain:"Operational Moats"   },
  { q:"Stress-test our pricing model for a high-inflation environment.",        domain:"Growth Logic"        },
  { q:"Design a vesting schedule that secures long-term executive alignment.",  domain:"Talent Architecture" },
];

// ── Query Portal ────────────────────────────────────────────────────────────
function QueryPortal({ externalQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = externalQuery || searchParams.get("q") || "";

  const [selected, setSelected] = useState(null);
  const [query, setQuery]       = useState(initialQuery);
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
    // Generate session ID and update URL for bookmarking
    const sessionId = `${selected.id}-${Date.now().toString(36)}`;
    setSearchParams({ session: sessionId, q: query.trim() });
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
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
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
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600,
                fontSize:"0.82rem", color:W.ink, marginBottom:"0.2rem" }}>{t.name}</div>
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                fontSize:"0.75rem", color:W.inkMid, marginBottom:"0.65rem" }}>{t.title}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.66rem",
                  color:W.accent, fontWeight:500 }}>{t.tier}</span>
                <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.62rem",
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
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600,
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
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.68rem",
                fontWeight:500, color: selected ? W.ink : W.inkSoft }}>
                {selected ? selected.name : "No framework selected"}
              </span>
            </div>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.58rem",
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
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.82rem",
                  color:W.accent }}>Working on your answer...</p>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.8rem", color:W.inkSoft }}>
                  Applying {selected?.name} framework.
                </p>
              </div>
            )}
            {response && !loading && (
              <div>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.58rem",
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

        {/* ── Suggested questions ── */}
        <div>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
            fontSize:"0.65rem", color:W.inkSoft, letterSpacing:"0.08em",
            textTransform:"uppercase", marginBottom:"0.65rem" }}>
            Try one of these
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {USE_CASES.map((uc, i) => (
              <button key={i} onClick={() => { setQuery(uc.q); setResponse(null); }}
                style={{
                  fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                  fontSize:"0.78rem",
                  color: query===uc.q ? "#fff" : W.inkMid,
                  backgroundColor: query===uc.q ? W.accent : "#F2F2F2",
                  border: `1px solid ${query===uc.q ? W.accent : "#DCDCDC"}`,
                  borderRadius:"20px", padding:"0.45rem 1rem",
                  cursor:"pointer", transition:"all 0.15s ease",
                  textAlign:"left", lineHeight:1.4,
                }}
                onMouseEnter={e => {
                  if (query !== uc.q) {
                    e.currentTarget.style.backgroundColor = "#E8E8E8";
                    e.currentTarget.style.color = W.ink;
                  }
                }}
                onMouseLeave={e => {
                  if (query !== uc.q) {
                    e.currentTarget.style.backgroundColor = "#F2F2F2";
                    e.currentTarget.style.color = W.inkMid;
                  }
                }}>
                {uc.q}
              </button>
            ))}
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
            style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600,
              fontSize:"0.82rem", color:"#fff",
              backgroundColor: (!selected || !query.trim() || loading) ? "#BBBBBB" : W.accent,
              border:"none", borderRadius:"20px", padding:"0 1.5rem",
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
  const [searchParams] = useSearchParams();
  const [prefillQuery, setPrefillQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();
  const [menuOpen, setMenu]     = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const setPage = (p) => {
    const routes = { home:"/", divine:"/divine", contact:"/contact",
      "become-thinker":"/thinker", industries:"/industries", solutions:"/solutions" };
    navigate(routes[p] || "/");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!menuOpen && !dropdown) return;
    const h = () => { setMenu(false); setDropdown(null); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [menuOpen, dropdown]);

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        h1, h2, h3 { -webkit-text-stroke: 0.3px currentColor; }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink   { 50%{opacity:0;} }
        @keyframes dropIn  { from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }
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
        /* ── Nav dropdowns ── */
        .nav-dropdown-btn {
          display:inline-flex; align-items:center; gap:0.25rem;
          background:none; border:none; cursor:pointer;
          font-family:'Inter Tight',sans-serif; font-weight:500;
          font-size:0.82rem; color:#333; padding:0.4rem 0.65rem; line-height:1;
          transition:color 0.15s; white-space:nowrap;
        }
        .nav-dropdown-btn:hover { color:#C8512A; background:rgba(200,81,42,0.06); border-radius:6px; }
        .nav-dropdown-btn:hover svg { color:#C8512A; }
        .nav-dropdown-btn svg { display:block; flex-shrink:0; transition:transform 0.2s; }
        .nav-dropdown-btn.open { color:#C8512A; background:rgba(200,81,42,0.06); border-radius:6px; }
        .nav-dropdown-btn.open svg { transform:rotate(180deg); color:#C8512A; }
        .dropdown-panel { position:fixed; top:56px; left:0; right:0; padding:3rem 0 4rem; z-index:199; animation:dropIn 0.2s ease; }
        .dropdown-inner { display:grid; gap:0; align-items:start; }
        .dropdown-inner.cols-4 { grid-template-columns:repeat(4,1fr); }
        .dropdown-inner.cols-3 { grid-template-columns:repeat(3,1fr); }
        .dropdown-section-label { font-family:'Inter Tight',sans-serif; font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:1.5rem; padding-bottom:0.75rem; }
        .dropdown-item { display:block; width:100%; padding:0.5rem 2rem 0.5rem 0; text-align:left; background:none; border:none; cursor:pointer; transition:opacity 0.15s; }
        .dropdown-item:hover { opacity:0.6; }
        .di-title { display:block; font-family:'Instrument Serif',serif; font-weight:400; font-size:1.6rem; line-height:1.15; transition:opacity 0.15s; margin-bottom:0.35rem; }
        .di-sub { display:block; font-family:'Inter Tight',sans-serif; font-weight:300; font-size:0.78rem; line-height:1.55; }
        .dropdown-overlay { position:fixed; top:56px; left:0; right:0; bottom:0; z-index:198; cursor:default; }
        @media (prefers-color-scheme: light) {
          .dropdown-panel { background:#FFFFFF; border-top:1px solid #E8E8E8; box-shadow:0 8px 32px rgba(0,0,0,0.08); }
          .dropdown-section-label { color:#AAAAAA; border-bottom:1px solid #E8E8E8; }
          .di-title { color:#0D0D0D; } .di-sub { color:#888888; }
          .dropdown-overlay { background:rgba(0,0,0,0.15); }
        }
        @media (prefers-color-scheme: dark) {
          .dropdown-panel { background:#0D0D0D; border-top:1px solid rgba(255,255,255,0.08); }
          .dropdown-section-label { color:rgba(255,255,255,0.35); border-bottom:1px solid rgba(255,255,255,0.08); }
          .di-title { color:#FFFFFF; } .di-sub { color:rgba(255,255,255,0.55); }
          .dropdown-overlay { background:rgba(0,0,0,0.5); }
        }
        /* ── Responsive ── */
        .desktop-nav { display:flex; }
        .hamburger   { display:none !important; }
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
        @media (max-width:768px) {
          .desktop-nav { display:none !important; }
          .hamburger   { display:flex !important; }
        }
        @media (max-width:600px) {
          .divine-use-grid  { grid-template-columns:1fr !important; }
          .divine-stat-3    { grid-template-columns:1fr 1fr !important; }
          .divine-px        { padding-left:1rem !important; padding-right:1rem !important; }
          .divine-cta-row   { flex-direction:column !important; }
          .divine-cta-row a, .divine-cta-row button { width:100% !important; text-align:center !important; box-sizing:border-box; }
        }
        /* ── Mobile menu ── */
        .mobile-menu { position:fixed; top:0; left:0; right:0; bottom:0; background:#0D0D0D; z-index:200; display:flex; flex-direction:column; padding:0 1rem; animation:slideDown 0.25s ease; }
        .mobile-menu-header { height:56px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
        .mobile-menu-links  { flex:1; display:flex; flex-direction:column; justify-content:center; gap:0; }
        .mobile-menu-item { font-family:'Instrument Serif',serif; font-weight:400; font-size:2.4rem; color:rgba(255,255,255,0.9); background:none; border:none; text-align:left; padding:0.6rem 0; cursor:pointer; transition:opacity 0.15s; line-height:1.2; }
        .mobile-menu-item:hover { opacity:0.6; }
        .mobile-menu-footer { padding-bottom:2.5rem; flex-shrink:0; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem; }
        .mobile-menu-signin { font-family:'Inter Tight',sans-serif; font-weight:400; font-size:0.95rem; color:rgba(255,255,255,0.45); text-decoration:none; display:block; }
      `}</style>

      {/* ── NAV — matches homepage ── */}
      <nav className="nav-outer" style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"#FFFFFF", borderBottom:"1px solid #FFFFFF", padding:"0 3rem" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0 }}>
              <img src={LOGO_SRC} alt="Uncharted Ventures" className="logo-full" style={{ height:"40px", width:"auto", display:"block", imageRendering:"crisp-edges" }} />
              <img src={ICON_SRC} alt="Uncharted Ventures" className="logo-icon" style={{ height:"32px", width:"32px", display:"none" }} />
            </button>
            <div style={{ position:"relative" }} className="desktop-nav" onClick={e => e.stopPropagation()}>
              <button className={`nav-dropdown-btn${dropdown==="industries" ? " open" : ""}`} onClick={() => setDropdown(d => d==="industries" ? null : "industries")}>
                Industries
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {dropdown==="industries" && (<>
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
                        <button key={item.label} className="dropdown-item" onClick={() => { setDropdown(null); setPage("industries"); }}>
                          <span className="di-title">{item.label}</span>
                          <span className="di-sub">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>)}
            </div>
            <div style={{ position:"relative" }} className="desktop-nav" onClick={e => e.stopPropagation()}>
              <button className={`nav-dropdown-btn${dropdown==="solutions" ? " open" : ""}`} onClick={() => setDropdown(d => d==="solutions" ? null : "solutions")}>
                Solutions
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {dropdown==="solutions" && (<>
                <div className="dropdown-overlay" onClick={() => setDropdown(null)} />
                <div className="dropdown-panel" onClick={e => e.stopPropagation()}>
                  <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 2.5rem" }}>
                    <div className="dropdown-section-label" style={{ marginBottom:"2rem" }}>Solutions</div>
                    <div className="dropdown-inner cols-3">
                      {[
                        { label:"Divine AI",           sub:"Operator intelligence, on demand.",                                    action:"divine"    },
                        { label:"Venture Foundry",     sub:"We don't just invest. We co-build AI-native firms.",                  action:"solutions" },
                        { label:"Capital Stewardship", sub:"Capital that sequences correctly — internal first, external at proof.", action:"solutions" },
                      ].map(item => (
                        <button key={item.label} className="dropdown-item" onClick={() => { setDropdown(null); setPage(item.action); }}>
                          <span className="di-title">{item.label}</span>
                          <span className="di-sub">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>)}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <a href="https://divine.uncharted.ventures/?login=1" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:"0.82rem", padding:"0.4rem 1.1rem", border:"1px solid #D0D0D0", borderRadius:"20px", background:"#fff", color:"#111", textDecoration:"none", display:"inline-flex", alignItems:"center", transition:"all 0.15s ease", lineHeight:1 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#111"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#D0D0D0"; }}>
              Log In
            </a>
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111", transition:"all 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111", transition:"all 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display:"block", width:"22px", height:"2px", backgroundColor:"#111", transition:"all 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <button onClick={() => { setPage("home"); setMenu(false); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
                <img src="/logo-white.png" alt="Uncharted" style={{ height:"36px", width:"auto", display:"block" }} />
              </button>
              <button onClick={() => setMenu(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", color:"rgba(255,255,255,0.7)", fontSize:"1.4rem", lineHeight:1 }}>✕</button>
            </div>
            <div className="mobile-menu-links">
              {[
                { label:"Industries", action:() => { setPage("industries"); setMenu(false); } },
                { label:"Solutions",  action:() => { setPage("solutions");  setMenu(false); } },
                { label:"Divine AI",  action:() => { setPage("divine");     setMenu(false); } },
                { label:"Contact",    action:() => { setPage("contact");    setMenu(false); } },
              ].map(item => (
                <button key={item.label} className="mobile-menu-item" onClick={item.action}>{item.label}</button>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <a href="https://divine.uncharted.ventures/?login=1" target="_blank" rel="noopener noreferrer" className="mobile-menu-signin" onClick={() => setMenu(false)}>Log In →</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"10rem 3rem 6rem" }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto", width:"100%" }} className="divine-hero-grid">
          <div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(2.8rem, 5.5vw, 5.5rem)", lineHeight:1.0, color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.8s 0.2s forwards" }}>
              Hard decisions,<br />decoded.
            </h1>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.98rem", lineHeight:1.9, color:C.inkMid, maxWidth:"420px", marginBottom:"3rem", opacity:0, animation:"fadeUp 0.8s 0.35s forwards" }}>
              Divine is a proprietary intelligence layer providing direct, operator-grade answers to consequential business questions. The protocol bypasses generic AI noise by utilising a private corpus of verified expertise from founders who have built and exited companies.
            </p>
            <div style={{ opacity:0, animation:"fadeUp 0.8s 0.5s forwards" }}>
              <a href="#ask" className="cta-primary" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, borderRadius:"20px", padding:"0.9rem 2.25rem", textDecoration:"none", display:"inline-block" }}>Initiate a Protocol →</a>
            </div>
          </div>
          {/* Protocol cards — clickable, pre-fills question */}
          <div className="divine-use-grid" style={{ opacity:0, animation:"fadeUp 0.8s 0.3s forwards" }}>
            {USE_CASES.map((uc, i) => (
              <div key={i} className="use-card" onClick={() => {
                setPrefillQuery(uc.q);
                setTimeout(() => {
                  const askEl = document.getElementById("ask");
                  if (askEl) askEl.scrollIntoView({ behavior:"smooth", block:"start" });
                }, 50);
              }}
              style={{ padding:"1.5rem", border:`1px solid ${C.border}`, borderRadius:"6px",
                transition:"all 0.2s ease", cursor:"pointer" }}>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.6rem", color:C.accent, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"0.65rem" }}>Protocol · {uc.domain}</p>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.ink, lineHeight:1.6 }}>"{uc.q}"</p>
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
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.9rem", color:C.ink, marginBottom:"0.5rem" }}>{s.t}</div>
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
            style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.78rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"20px", padding:"0.9rem 2rem", cursor:"pointer", whiteSpace:"nowrap" }}>
            Apply to become a Thinker →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 2.5rem" }} className="divine-px">
        <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.95rem", color:C.ink }}>Divine</span>
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

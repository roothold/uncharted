import { useState, useEffect } from "react";

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

const THINKERS = [
  { id:"2", name:"Michael Akindele", title:"Product · Brand · Venture Building", domains:["Product Strategy","Brand Building","Venture Design"], tier:"Prophecy", price:"$2.50" },
  { id:"3", name:"Divine Composite", title:"All domains · Cross-functional advice", domains:["Strategy","Operations","Fundraising","Growth"], tier:"Prophecy", price:"$2.50" },
];

const USE_CASES = [
  { q:"Should I raise now or wait 6 months?",               domain:"Fundraising" },
  { q:"My co-founder wants to pivot. How do I think about this?", domain:"Strategy" },
  { q:"When should I hire my first salesperson?",            domain:"Hiring" },
  { q:"Our margins are compressing. What do I cut first?",   domain:"Operations" },
  { q:"How do I price this for enterprise vs. SMB?",         domain:"Pricing" },
  { q:"We have 3 months of runway. What are our real options?", domain:"Capital" },
];

const ONBOARDING_STEPS = [
  { num:"1", title:"Set your identity",     desc:"Name, title, two-sentence background. This is how founders find you." },
  { num:"2", title:"Define your framework", desc:"How do you approach decisions? What do you look for? Be specific." },
  { num:"3", title:"Write your lens",       desc:"One sentence capturing how you uniquely see the world." },
  { num:"4", title:"Choose your domains",   desc:"3–8 topics where your thinking creates the most value." },
  { num:"5", title:"Set your price & go live", desc:"$0.05–$2.50 per answer. You earn 70%. No ceiling." },
];

// ── Query Portal ────────────────────────────────────────────────────────────
function QueryPortal() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery]       = useState("");
  const [response, setResponse] = useState(null);
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

  return (
    <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:"2rem" }}>
      {/* Selector */}
      <div>
        <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", color:C.inkSoft, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Choose a framework</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          {THINKERS.map(t => (
            <div key={t.id} onClick={() => setSelected(t)}
              style={{ padding:"1.1rem", border:`1px solid ${selected?.id===t.id ? C.ink : C.border}`, borderRadius:"6px", cursor:"pointer", backgroundColor: selected?.id===t.id ? C.soft : C.bg, transition:"all 0.2s ease", position:"relative" }}>
              {selected?.id===t.id && <div style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:"3px", backgroundColor:C.accent, borderRadius:"0 2px 2px 0" }} />}
              <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.85rem", color:C.ink, marginBottom:"0.15rem" }}>{t.name}</div>
              <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft, marginBottom:"0.6rem" }}>{t.title}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"0.72rem", color:C.accent, fontWeight:500 }}>{t.tier}</span>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color:C.inkSoft }}>{t.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div style={{ marginTop:"1.5rem", padding:"1.25rem", border:`1px solid ${C.border}`, borderRadius:"6px", backgroundColor:C.soft }}>
          {[["Per question","$0.05"],["Thinker cut","70%"],["Powered by","Claude"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
              <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>{k}</span>
              <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.75rem", color:C.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        <div style={{ border:`1px solid ${C.border}`, borderRadius:"8px", overflow:"hidden", flex:1 }}>
          <div style={{ padding:"0.75rem 1.25rem", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:C.soft }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor: selected ? C.accent : C.border, transition:"background 0.3s" }} />
              <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"0.72rem", fontWeight:500, color: selected ? C.ink : C.inkSoft }}>
                {selected ? selected.name : "No framework selected"}
              </span>
            </div>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkSoft }}>Divine · v1.4</span>
          </div>
          <div style={{ padding:"1.75rem", minHeight:"240px" }}>
            {!selected && <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.inkSoft, fontStyle:"italic" }}>Choose a framework on the left to get started.</p>}
            {selected && !loading && !response && <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.inkSoft }}><span style={{ color:C.accent }}>✦</span> {selected.name} is ready. Ask your question below.</p>}
            {loading && (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.85rem", color:C.accent }}>Working on your answer...</p>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkSoft }}>Applying {selected?.name} framework.</p>
              </div>
            )}
            {response && !loading && (
              <div>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.accent, letterSpacing:"0.1em", marginBottom:"1rem" }}>
                  ✦ {selected?.name?.toUpperCase()} · {new Date().toLocaleTimeString()}
                </p>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.ink, whiteSpace:"pre-wrap" }}>
                  {typed}<span style={{ color:C.accent, animation:"blink 0.7s step-end infinite" }}>{typed.length < response.length ? "▌" : ""}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.75rem" }}>
          <textarea value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && e.metaKey) ask(); }}
            placeholder="What decision are you working through? Strategy, hiring, pricing, fundraising..."
            rows={3} style={{ flex:1, padding:"0.85rem 1rem", borderRadius:"6px", fontSize:"0.85rem", fontFamily:"'Poppins',sans-serif", resize:"none", lineHeight:1.65, border:`1px solid ${C.border}`, color:C.ink, outline:"none" }}
            onFocus={e => e.target.style.borderColor=C.ink} onBlur={e => e.target.style.borderColor=C.border} />
          <button onClick={ask} disabled={!selected || !query.trim() || loading}
            style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.85rem", color:"#fff", backgroundColor: (!selected || !query.trim() || loading) ? "#ccc" : C.accent, border:"none", borderRadius:"6px", padding:"0 1.5rem", cursor: (!selected || !query.trim() || loading) ? "not-allowed" : "pointer", minWidth:"90px", transition:"background 0.2s" }}>
            {loading ? "···" : "Ask ✦"}
          </button>
        </div>
        <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.72rem", color:C.inkSoft }}>⌘ + Enter to submit · $0.05 per question · Powered by Anthropic Claude</p>
      </div>
    </div>
  );
}

// ── Main Divine Page ────────────────────────────────────────────────────────
export default function DivinePage({ onBack }) {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Poppins', sans-serif" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink   { 50%{opacity:0;} }
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }
        .cta-primary { transition:all 0.2s ease; }
        .cta-primary:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .cta-ghost { transition:all 0.2s ease; }
        .cta-ghost:hover { border-color:${C.accent} !important; color:${C.accent} !important; transform:translateY(-2px); }
        .use-card:hover { border-color:${C.accent} !important; }
        .step-row:hover { border-color:${C.ink} !important; }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <button onClick={onBack} className="nav-link" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Poppins', sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.inkMid, padding:0 }}>← Uncharted</button>
            <div style={{ width:"1px", height:"16px", backgroundColor:C.border }} />
            <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"1.05rem", color:C.ink }}>Divine</span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkSoft }}>v1.4</span>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            <a href="#founders" className="nav-link" style={{ fontFamily:"'Poppins', sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.inkMid, textDecoration:"none" }}>For Founders</a>
            <a href="#thinkers" className="nav-link" style={{ fontFamily:"'Poppins', sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.inkMid, textDecoration:"none" }}>For Thinkers</a>
            <a href="#ask" className="cta-primary" style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.78rem", color:"#fff", backgroundColor:C.accent, borderRadius:"4px", padding:"0.55rem 1.4rem", textDecoration:"none" }}>Ask now</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"10rem 3rem 6rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
              AI Tool for Founders · Built by Uncharted
            </p>
            <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"clamp(3rem, 7vw, 7rem)", lineHeight:1.0, color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.8s 0.2s forwards" }}>
              Ask a hard<br />question.<br /><em style={{ color:C.accent }}>Get a real<br />answer.</em>
            </h1>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"1rem", lineHeight:1.85, color:C.inkMid, maxWidth:"420px", marginBottom:"3rem", opacity:0, animation:"fadeUp 0.8s 0.35s forwards" }}>
              Divine gives founders direct, practical answers to their hardest business questions — drawn from real operator experience.
            </p>
            <div style={{ display:"flex", gap:"1rem", opacity:0, animation:"fadeUp 0.8s 0.5s forwards" }}>
              <a href="#ask" className="cta-primary" style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, borderRadius:"4px", padding:"0.9rem 2.25rem", textDecoration:"none" }}>Try it free</a>
              <a href="#thinkers" className="cta-ghost" style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.88rem", color:C.inkMid, border:`1.5px solid ${C.border}`, borderRadius:"4px", padding:"0.9rem 2.25rem", textDecoration:"none" }}>Become a Thinker →</a>
            </div>
          </div>
          {/* Use case grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", opacity:0, animation:"fadeUp 0.8s 0.3s forwards" }}>
            {USE_CASES.map((uc, i) => (
              <div key={i} className="use-card" style={{ padding:"1.25rem", border:`1px solid ${C.border}`, borderRadius:"6px", transition:"border-color 0.2s ease" }}>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.65rem", color:C.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>{uc.domain}</p>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, lineHeight:1.55, fontStyle:"italic" }}>"{uc.q}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} />

      {/* ── FOR FOUNDERS ── */}
      <section id="founders" style={{ padding:"8rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem" }}>For Founders</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"5rem", alignItems:"start" }}>
            <div>
              <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"clamp(2rem, 3.5vw, 3.2rem)", lineHeight:1.1, color:C.ink, marginBottom:"1.25rem" }}>
                Better answers than your smartest friend.
              </h2>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.9rem", lineHeight:1.85, color:C.inkMid, marginBottom:"1rem" }}>
                Every response is shaped by a real operator's thinking — not a generic language model. Pick the lens, ask your question, get a direct answer.
              </p>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.inkSoft }}>$0.05 per question. No subscription.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", backgroundColor:C.border }}>
              {[
                { n:"1", t:"Pick a thinker",    d:"Choose someone whose experience matches your problem." },
                { n:"2", t:"Ask your question", d:"Be specific. More context = sharper answer." },
                { n:"3", t:"Act on it",         d:"Direct, honest, operator-grade. No hedging." },
              ].map(s => (
                <div key={s.n} style={{ padding:"2rem 1.5rem", backgroundColor:C.bg }}>
                  <div style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"3rem", color:C.accent, lineHeight:1, marginBottom:"1.25rem" }}>{s.n}</div>
                  <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.9rem", color:C.ink, marginBottom:"0.5rem" }}>{s.t}</div>
                  <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid, lineHeight:1.7 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} />

      {/* ── LIVE QUERY ── */}
      <section id="ask" style={{ padding:"8rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1rem" }}>Try it now</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"clamp(2rem, 3.5vw, 3rem)", color:C.ink, marginBottom:"3rem" }}>
            Ask your first question.
          </h2>
          <QueryPortal />
        </div>
      </section>

      <div style={{ height:"1px", backgroundColor:C.border, margin:"0 3rem" }} />

      {/* ── FOR THINKERS ── */}
      <section id="thinkers" style={{ padding:"8rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem" }}>For Thinkers · Monetise your experience</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
            <div>
              <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"clamp(2rem, 3.5vw, 3.2rem)", lineHeight:1.1, color:C.ink, marginBottom:"1.25rem" }}>
                Your experience is<br />worth more than<br /><em style={{ color:C.accent }}>you're charging.</em>
              </h2>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.9rem", lineHeight:1.85, color:C.inkMid, marginBottom:"1rem" }}>
                Encode your thinking into Divine. Founders ask you questions. You earn 70% of every answer — without taking any calls or blocking calendar time.
              </p>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.85rem", color:C.inkSoft, marginBottom:"2rem" }}>
                Your rate is yours to set. Your knowledge compounds with every session.
              </p>
              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", backgroundColor:C.border, marginBottom:"2.5rem" }}>
                {[["70%","Your cut"],["$2.50","Max per answer"],["0","Calls required"]].map(([v,l]) => (
                  <div key={l} style={{ padding:"1.5rem 1.25rem", backgroundColor:C.bg }}>
                    <div style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"2.2rem", color:C.ink, lineHeight:1, marginBottom:"0.25rem" }}>{v}</div>
                    <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://divine.rootholdinc.com" target="_blank" rel="noopener noreferrer" className="cta-primary"
                style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, borderRadius:"4px", padding:"0.9rem 2.25rem", textDecoration:"none", display:"inline-block" }}>
                Become a Thinker →
              </a>
            </div>

            {/* Onboarding steps */}
            <div>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", color:C.inkSoft, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1rem" }}>How it works · 5 steps · ~10 min</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {ONBOARDING_STEPS.map((s, i) => (
                  <div key={s.num} className="step-row" onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)}
                    style={{ display:"flex", gap:"1.5rem", padding:"1.25rem 1.5rem", border:`1px solid ${hoveredStep===i ? C.ink : C.border}`, borderRadius:"6px", transition:"border-color 0.2s ease", alignItems:"flex-start" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"1.8rem", color:C.accent, lineHeight:1, flexShrink:0, marginTop:"-2px" }}>{s.num}</span>
                    <div>
                      <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.88rem", color:C.ink, marginBottom:"0.2rem" }}>{s.title}</div>
                      <div style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkMid, lineHeight:1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.95rem", color:C.ink }}>Divine</span>
            <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>by Uncharted Ventures</span>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            <a href="https://divine.rootholdinc.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkSoft, textDecoration:"none", transition:"color 0.15s" }}
              onMouseEnter={e => e.target.style.color=C.accent} onMouseLeave={e => e.target.style.color=C.inkSoft}>Full app →</a>
            <button onClick={onBack} style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkSoft, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.15s" }}
              onMouseEnter={e => e.target.style.color=C.ink} onMouseLeave={e => e.target.style.color=C.inkSoft}>← Back to Uncharted</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

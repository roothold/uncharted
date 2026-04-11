import { useState, useEffect } from "react";

// ── Light palette (matches main site) ─────────────────────────────────────
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
  green:        "#16a34a",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');`;

const THINKERS = [
  { id:"1", name:"Kshitij Patil", title:"Operations · Supply Chain · AI", domains:["Operations","Capital Allocation","AI Infrastructure"], tier:"Strategy", price:"$0.50" },
  { id:"2", name:"Michael Akindele", title:"Product · Brand · Venture Building", domains:["Product Strategy","Brand Building","Venture Design"], tier:"Prophecy", price:"$2.50" },
  { id:"3", name:"Divine Composite", title:"All domains · Cross-functional advice", domains:["Strategy","Operations","Fundraising","Growth"], tier:"Prophecy", price:"$2.50" },
];

const ONBOARDING_STEPS = [
  { num:"01", title:"Set your identity", desc:"Your name, title, and a two-sentence professional background. This is how founders see you." },
  { num:"02", title:"Define your framework", desc:"How do you approach a decision? What do you look for? The more precise, the sharper your AI model." },
  { num:"03", title:"Write your lens", desc:"One sentence that captures how you uniquely see the world. This appears on your public card." },
  { num:"04", title:"Choose your domains", desc:"3–8 topics where your thinking creates the most value. Founders filter by these." },
  { num:"05", title:"Set your tier & go live", desc:"Choose your price per insight ($0.05–$2.50). You earn 70% of every session. No ceiling." },
];

const USE_CASES = [
  { q:"Should I raise now or wait 6 months?", domain:"Fundraising" },
  { q:"My co-founder wants to pivot. How do I think about this?", domain:"Strategy" },
  { q:"When should I hire my first salesperson?", domain:"Hiring" },
  { q:"Our margins are compressing. What do I cut first?", domain:"Operations" },
  { q:"How do I price this for enterprise vs. SMB?", domain:"Pricing" },
  { q:"We have 3 months of runway. What are our real options?", domain:"Capital" },
];

// ── Portal (query tool) ────────────────────────────────────────────────────
function QueryPortal() {
  const [selectedThinker, setSelectedThinker] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");

  useEffect(() => {
    if (!response) return;
    setTypedResponse("");
    let i = 0;
    const t = setInterval(() => {
      setTypedResponse(response.slice(0, i));
      i++;
      if (i > response.length) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [response]);

  const handleQuery = async () => {
    if (!query.trim() || !selectedThinker) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are Divine — an AI tool built for founders. You are operating through the lens of "${selectedThinker.name}", ${selectedThinker.title}. Their domains: ${selectedThinker.domains.join(", ")}. Give a direct, practical answer. No fluff, no caveats, no generic advice. Think like an operator who has seen this exact problem before. Start with a one-sentence bottom line, then unpack it in 3–4 focused paragraphs. Be honest even if it's uncomfortable.`,
          messages:[{ role:"user", content:query }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Unable to retrieve a response. Please try again.";
      setResponse(text);
    } catch {
      setResponse("Connection error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:"1.5rem" }}>
      {/* Thinker selector */}
      <div>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", letterSpacing:"0.12em", color:C.inkDimmer, textTransform:"uppercase", marginBottom:"0.75rem" }}>Choose a Framework</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {THINKERS.map(t => (
            <div key={t.id} onClick={() => setSelectedThinker(t)}
              style={{ padding:"1rem", border:`1px solid ${selectedThinker?.id === t.id ? C.gold : C.border}`, borderRadius:"2px", backgroundColor: selectedThinker?.id === t.id ? C.goldDim : C.surface, cursor:"pointer", position:"relative", transition:"all 0.2s ease" }}>
              {selectedThinker?.id === t.id && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"2px", backgroundColor:C.gold }} />}
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.82rem", color:C.ink, marginBottom:"0.15rem" }}>{t.name}</div>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.54rem", color:C.inkDimmer, letterSpacing:"0.05em", marginBottom:"0.5rem" }}>{t.title}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.54rem", color:C.gold }}>{t.tier}</span>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.54rem", color:C.inkDimmer }}>{t.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        <div style={{ backgroundColor:C.surface, border:`1px solid ${C.borderStrong}`, borderRadius:"4px", overflow:"hidden", flex:1 }}>
          <div style={{ padding:"0.65rem 1rem", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:C.sectionAlt }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor: selectedThinker ? C.gold : C.inkDimmer, transition:"background 0.3s" }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color: selectedThinker ? C.gold : C.inkDimmer, letterSpacing:"0.1em" }}>
                {selectedThinker ? `FRAMEWORK: ${selectedThinker.name.toUpperCase()}` : "NO FRAMEWORK SELECTED"}
              </span>
            </div>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.inkDimmer }}>DIVINE · v1.4</span>
          </div>
          <div style={{ padding:"1.5rem", minHeight:"220px" }}>
            {!selectedThinker && (
              <div style={{ color:C.inkDimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem" }}>
                › Choose a framework on the left to get started...<span style={{ animation:"blink 0.9s step-end infinite" }}>_</span>
              </div>
            )}
            {selectedThinker && !loading && !response && (
              <div style={{ color:C.inkDimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem" }}>
                › <span style={{ color:C.gold }}>{selectedThinker.name}</span> is ready. Type your question below.<span style={{ animation:"blink 0.9s step-end infinite" }}>_</span>
              </div>
            )}
            {loading && (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <div style={{ color:C.gold, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem" }}>› Working on your answer<span style={{ animation:"blink 0.6s step-end infinite" }}>...</span></div>
                <div style={{ color:C.inkDimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", marginTop:"0.5rem" }}>› Applying {selectedThinker?.name} framework...</div>
                <div style={{ color:C.inkDimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem" }}>› Building your response...</div>
              </div>
            )}
            {response && !loading && (
              <div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.gold, letterSpacing:"0.1em", marginBottom:"0.75rem" }}>
                  ✦ ANSWER · {selectedThinker?.name?.toUpperCase()} · {new Date().toLocaleTimeString()}
                </div>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.ink, whiteSpace:"pre-wrap" }}>
                  {typedResponse}<span style={{ animation:"blink 0.7s step-end infinite", color:C.gold }}>{typedResponse.length < response.length ? "_" : ""}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.75rem" }}>
          <textarea
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="What decision are you working through? Ask anything — strategy, hiring, pricing, fundraising..."
            rows={3}
            onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleQuery(); }}
            style={{ flex:1, padding:"0.85rem 1rem", borderRadius:"2px", fontSize:"0.85rem", fontFamily:"'Inter Tight', sans-serif", resize:"none", lineHeight:1.6, border:`1px solid ${C.border}`, backgroundColor:C.surface, color:C.ink, outline:"none" }}
            onFocus={e => e.target.style.borderColor = C.gold}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <button onClick={handleQuery} disabled={!selectedThinker || !query.trim() || loading}
            style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", color:"#fff", backgroundColor: (!selectedThinker || !query.trim() || loading) ? C.inkDimmer : C.ink, border:"none", borderRadius:"2px", padding:"0 1.5rem", cursor: (!selectedThinker || !query.trim() || loading) ? "not-allowed" : "pointer", textTransform:"uppercase", transition:"all 0.2s ease", minWidth:"90px" }}
          >{loading ? "···" : "Ask ✦"}</button>
        </div>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.inkDimmer, letterSpacing:"0.06em" }}>
          ⌘ + Enter to submit · $0.05 per question · Powered by Anthropic Claude
        </div>
      </div>
    </div>
  );
}

// ── Main Divine landing page ───────────────────────────────────────────────
export default function DivinePage({ onBack }) {
  const [activeSection, setActiveSection] = useState("founders");
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.gold}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink { 50%{opacity:0;} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        .divine-usecase:hover { background:${C.goldDim} !important; border-color:${C.goldBorder} !important; }
        .divine-step { transition:all 0.25s ease; }
        .divine-step:hover { background:${C.goldDim} !important; border-color:${C.gold} !important; }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(250,250,250,0.95)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}`, padding:"0 2.5rem" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", letterSpacing:"0.08em", color:C.inkDimmer, padding:0, transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDimmer}>← Uncharted</button>
            <div style={{ width:"1px", height:"18px", backgroundColor:C.border }} />
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"1rem", color:C.ink, letterSpacing:"-0.01em" }}>Divine</span>
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, letterSpacing:"0.06em" }}>v1.4</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
            <a href="#founders" style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.78rem", color:C.inkDim, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDim}>For Founders</a>
            <a href="#thinkers" style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.78rem", color:C.inkDim, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDim}>For Thinkers</a>
            <a href="#ask" style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", color:"#fff", backgroundColor:C.ink, borderRadius:"2px", padding:"0.5rem 1.1rem", textDecoration:"none", textTransform:"uppercase", transition:"background 0.2s" }}
              onMouseEnter={e => e.target.style.backgroundColor="#333"} onMouseLeave={e => e.target.style.backgroundColor=C.ink}>Ask Now ✦</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 2.5rem 5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", width:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"2rem", opacity:0, animation:"fadeUp 0.7s 0.1s forwards" }}>
            <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>AI Tool for Founders · Built by Uncharted</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
            <div>
              <h1 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(2.8rem, 6vw, 6rem)", lineHeight:1.0, letterSpacing:"-0.04em", color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.8s 0.15s forwards" }}>
                Ask a hard<br />question.<br /><span style={{ color:C.gold }}>Get a real<br />answer.</span>
              </h1>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"1.05rem", lineHeight:1.75, color:C.inkDim, maxWidth:"420px", marginBottom:"2.5rem", opacity:0, animation:"fadeUp 0.8s 0.3s forwards" }}>
                Divine gives founders direct, practical answers to their hardest business questions — drawn from the real experience of operators who've built companies.
              </p>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", opacity:0, animation:"fadeUp 0.8s 0.45s forwards" }}>
                <a href="#ask" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.04em", textDecoration:"none", color:"#fff", backgroundColor:C.ink, padding:"0.85rem 2rem", borderRadius:"2px", textTransform:"uppercase", transition:"all 0.2s ease", display:"inline-block" }}
                  onMouseEnter={e => { e.target.style.backgroundColor="#333"; e.target.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.target.style.backgroundColor=C.ink; e.target.style.transform="translateY(0)"; }}>Try it free</a>
                <a href="#thinkers" style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500, fontSize:"0.85rem", letterSpacing:"0.04em", textDecoration:"none", color:C.gold, border:`1px solid ${C.goldBorder}`, padding:"0.85rem 2rem", borderRadius:"2px", transition:"all 0.2s ease", display:"inline-block" }}
                  onMouseEnter={e => { e.target.style.borderColor=C.gold; e.target.style.backgroundColor=C.goldDim; e.target.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.target.style.borderColor=C.goldBorder; e.target.style.backgroundColor="transparent"; e.target.style.transform="translateY(0)"; }}>Become a Thinker →</a>
              </div>
            </div>

            {/* Use case cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", opacity:0, animation:"fadeUp 0.8s 0.3s forwards" }}>
              {USE_CASES.map((uc, i) => (
                <div key={i} className="divine-usecase" style={{ padding:"1rem", border:`1px solid ${C.border}`, borderRadius:"2px", backgroundColor:C.surface, cursor:"default", transition:"all 0.2s ease" }}>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.54rem", color:C.gold, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.4rem" }}>{uc.domain}</div>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.8rem", color:C.inkDim, lineHeight:1.5, fontStyle:"italic" }}>"{uc.q}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (FOUNDERS) ── */}
      <section id="founders" style={{ padding:"6rem 2.5rem", backgroundColor:C.surface, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>For Founders</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"5rem", alignItems:"start" }}>
            <div>
              <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3vw, 2.75rem)", lineHeight:1.1, letterSpacing:"-0.03em", color:C.ink, marginBottom:"1.25rem" }}>
                Better answers than your smartest friend.
              </h2>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.8, color:C.inkDim, marginBottom:"1rem" }}>
                Every response is shaped by a real operator's thinking framework — not a generic language model. You pick the lens, you ask your question, you get a direct answer.
              </p>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.inkDimmer }}>
                $0.05 per question. No subscription. No fluff.
              </p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1px", backgroundColor:C.border }}>
              {[
                { step:"01", title:"Pick a thinker", desc:"Choose someone whose experience matches your problem." },
                { step:"02", title:"Ask your question", desc:"Be specific. The more context you give, the sharper the answer." },
                { step:"03", title:"Act on the answer", desc:"Direct, honest, operator-grade. No hedging, no generic advice." },
              ].map(s => (
                <div key={s.step} style={{ padding:"2rem 1.5rem", backgroundColor:C.surface }}>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color:C.gold, letterSpacing:"0.1em", marginBottom:"0.75rem" }}>{s.step}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.ink, marginBottom:"0.5rem" }}>{s.title}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkDim, lineHeight:1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE QUERY (ASK) ── */}
      <section id="ask" style={{ padding:"6rem 2.5rem", backgroundColor:C.bg, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>Try It Now · Live</span>
          </div>
          <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3vw, 2.5rem)", letterSpacing:"-0.03em", color:C.ink, marginBottom:"2.5rem" }}>
            Ask your first question.
          </h2>
          <QueryPortal />
        </div>
      </section>

      {/* ── FOR THINKERS ── */}
      <section id="thinkers" style={{ padding:"6rem 2.5rem", backgroundColor:C.surface, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"24px", height:"1px", backgroundColor:C.gold }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>For Thinkers · Monetize Your Experience</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
            <div>
              <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3vw, 2.75rem)", lineHeight:1.1, letterSpacing:"-0.03em", color:C.ink, marginBottom:"1.25rem" }}>
                Your experience is<br />worth more than<br /><span style={{ color:C.gold }}>you're charging.</span>
              </h2>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.8, color:C.inkDim, marginBottom:"1rem" }}>
                Encode your thinking into Divine. Founders ask you questions. You earn 70% of every answer — without taking any calls, without blocking time on your calendar.
              </p>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.inkDimmer, marginBottom:"2rem" }}>
                Your knowledge compounds. Every question answered makes your model sharper. Your rate is yours to set.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1px", backgroundColor:C.border, marginBottom:"2rem" }}>
                {[["70%","Your cut per answer"],["$2.50","Max per insight"],["0","Calls required"]].map(([v, l]) => (
                  <div key={l} style={{ padding:"1.5rem 1.25rem", backgroundColor:C.surface }}>
                    <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"1.8rem", color:C.ink, letterSpacing:"-0.03em", marginBottom:"0.25rem" }}>{v}</div>
                    <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.08em", textTransform:"uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://divine.rootholdinc.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.04em", textDecoration:"none", color:"#fff", backgroundColor:C.gold, padding:"0.85rem 2rem", borderRadius:"2px", textTransform:"uppercase", display:"inline-block", transition:"all 0.2s ease" }}
                onMouseEnter={e => { e.target.style.backgroundColor="#9a7c24"; e.target.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.backgroundColor=C.gold; e.target.style.transform="translateY(0)"; }}>Become a Thinker →</a>
            </div>

            {/* Onboarding steps */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>How it works · 5 steps · ~10 min</div>
              {ONBOARDING_STEPS.map((step, i) => (
                <div key={step.num} className="divine-step"
                  onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)}
                  style={{ padding:"1.25rem 1.5rem", border:`1px solid ${hoveredStep === i ? C.gold : C.border}`, borderRadius:"2px", backgroundColor: hoveredStep === i ? C.goldDim : C.surface, cursor:"default" }}>
                  <div style={{ display:"flex", gap:"1.25rem", alignItems:"flex-start" }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color:C.gold, letterSpacing:"0.1em", flexShrink:0, marginTop:"2px" }}>{step.num}</span>
                    <div>
                      <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.92rem", color:C.ink, marginBottom:"0.25rem" }}>{step.title}</div>
                      <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.8rem", color:C.inkDim, lineHeight:1.6 }}>{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"2.5rem 2.5rem", backgroundColor:C.surface, borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.95rem", color:C.ink }}>Divine</span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.inkDimmer }}>by Uncharted Ventures</span>
          </div>
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            <a href="https://divine.rootholdinc.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, textDecoration:"none", letterSpacing:"0.06em", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.inkDimmer}>Full App →</a>
            <button onClick={onBack} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.inkDimmer, background:"none", border:"none", cursor:"pointer", letterSpacing:"0.06em", padding:0, transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.inkDimmer}>← Back to Uncharted</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

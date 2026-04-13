import { useState } from "react";

const LOGO_SRC = "/logo.png";
const ICON_SRC = "/icon.png";

const C = {
  bg:       "#FFFFFF",
  ink:      "#0D0D0D",
  inkMid:   "#555555",
  inkSoft:  "#888888",
  accent:   "#C8512A",
  accentBg: "rgba(200,81,42,0.06)",
  gold:     "#B8962E",
  goldBg:   "rgba(184,150,46,0.07)",
  border:   "#E8E8E8",
  soft:     "#F7F7F7",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&family=Poppins:wght@400;700&display=swap');`;

const SOLUTIONS = [
  {
    id:"divine-ai", label:"Divine AI", tag:"Intelligence",
    tagStyle:{bg:"rgba(200,81,42,0.08)", color:"#C8512A"},
    headline:"Operator intelligence, on demand.",
    sub:"Divine is not a chatbot. It is the proprietary intelligence layer that powers every decision Uncharted makes — and makes it available to founders who need answers, not algorithms.",
    body:`Every question a founder asks carries weight. Should I raise now or wait? When do I hire sales? How do I price this for enterprise? These aren't data problems. They're judgment problems — and judgment comes from operators who've made these calls before, often the hard way.

Divine encodes that judgment. Verified Thinkers — operators with track records, not credentials — structure their decision frameworks inside Divine. Founders ask questions. The answers are shaped by real experience, not training data scraped from the internet.

The long-term play is infrastructure. Every session builds a proprietary knowledge graph of founder decision-making patterns. Every Thinker adds a framework that compounds in value over time.`,
    how:[
      {n:"1", t:"Choose a Thinker",   d:"Select the operator whose experience matches your problem — product strategy, fundraising, operations, capital allocation."},
      {n:"2", t:"Ask your question",  d:"Be specific. More context produces sharper answers. Divine surfaces the relevant framework from the Thinker's documented decision logic."},
      {n:"3", t:"Act on the answer",  d:"Direct, honest, operator-grade responses. No hedging. No generic advice. Accountability baked in."},
    ],
    metrics:[
      {v:"$0.05", l:"Per question"},
      {v:"70%",   l:"Thinker revenue share"},
      {v:"2",     l:"Expert frameworks"},
      {v:"v1.4",  l:"Current version"},
    ],
    ctaLabel:"Try Divine", ctaAction:"divine",
    secondaryLabel:"Become a Thinker →", secondaryAction:"become-thinker",
  },
  {
    id:"venture-foundry", label:"Venture Foundry", tag:"Co-Building",
    tagStyle:{bg:"rgba(184,150,46,0.10)", color:"#B8962E"},
    headline:"We don't just invest. We build alongside you.",
    sub:"The Venture Foundry is Uncharted's co-building arm. We identify practitioners and founders with genuine domain advantage, embed our infrastructure and AI tooling into their operation, and build companies that generate real revenue — fast.",
    body:`Most venture studios take equity and stay out of the way. The Foundry works differently. We are co-founders in the operational sense: we contribute infrastructure, capital, AI tools, and the pattern recognition of founders who have built and exited companies before.

The target is the practitioner who has hit their ceiling. A lawyer, accountant, designer, or consultant who has genuine credibility and client relationships but lacks the infrastructure to scale. We provide the engine. They provide the judgment. Together we build an AI-native firm that operates at margins traditional practices can't reach.

The playbook is deliberately repeatable. Year one: three firms across three verticals. Year two: eight to ten. Each firm proves the model, generates revenue, and feeds the knowledge graph that makes Divine more valuable.`,
    how:[
      {n:"1", t:"Practitioner selection",     d:"We identify operators with genuine domain credibility, existing client relationships, and the right profile for the AI-native model."},
      {n:"2", t:"Infrastructure deployment",  d:"Legal entity, brand, AI tooling, Divine integration, and operational systems — all pre-built and deployed within 30 days."},
      {n:"3", t:"Revenue within 90 days",     d:"The compressed delivery model means the first client engagement closes within 60 days. Revenue before year one is over."},
    ],
    metrics:[
      {v:"3",       l:"Portfolio companies"},
      {v:"30 days", l:"To operational"},
      {v:"25–35%",  l:"Uncharted equity"},
      {v:"90 days", l:"Target to first revenue"},
    ],
    ctaLabel:"Build with us", ctaAction:"contact",
    secondaryLabel:"See our industries →", secondaryAction:"industries",
  },
  {
    id:"capital-stewardship", label:"Capital Stewardship", tag:"Asset Strategy",
    tagStyle:{bg:"rgba(85,85,85,0.08)", color:"#555555"},
    headline:"Capital that compounds with the engine.",
    sub:"Most venture studios raise too early, dilute too much, and spend the rest of their existence serving investors instead of building. We don't do that.",
    body:`Capital Stewardship is the discipline that keeps the engine running on its own terms. We sequence capital the way we sequence everything else — proof first, scale second.

We enter every company with a clear view of how it gets to revenue, what it needs to grow, and when outside capital actually adds value versus extracting it. That clarity shapes every decision from initial commitment to exit.

The result is a portfolio that compounds quietly. Each company we build strengthens the infrastructure available to the next. Each dollar deployed does more than the last because the operating model gets sharper with every iteration.

We're not trying to build a fund. We're building a machine that generates institutional-quality returns as a byproduct of building great companies.`,
    how:[
      {n:"1", t:"Proof before scale",     d:"We establish real revenue and repeatable unit economics before we think about external capital. The model earns the right to grow."},
      {n:"2", t:"Strategic partnerships", d:"When we do bring in outside capital, it's surgical — partners who add genuine leverage, not just a cheque."},
      {n:"3", t:"Portfolio compounding",  d:"Every company we build strengthens the next. Infrastructure, intelligence, and relationships accumulate across the portfolio."},
    ],
    metrics:[
      {v:"Proof",     l:"Required before external raise"},
      {v:"Selective", l:"Capital partnership approach"},
      {v:"Long-term", l:"Return horizon"},
      {v:"Portfolio", l:"Value compounds across firms"},
    ],
    ctaLabel:"Talk capital", ctaAction:"contact",
    secondaryLabel:"See the Foundry →", secondaryAction:"solutions",
  },
];

export default function SolutionsPage({ onBack, onContact, onDivine, onBecomeThinker, onIndustries }) {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];

  const handleCTA = (action) => {
    if (action==="divine")         onDivine?.();
    else if (action==="contact")   onContact?.();
    else if (action==="become-thinker") onBecomeThinker?.();
    else if (action==="industries")onIndustries?.();
    else if (action==="solutions") setActive(1);
  };

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        h1, h2, h3 { -webkit-text-stroke: 0.3px currentColor; }
        .nav-outer { padding-left:3rem; padding-right:3rem; }
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .sol-tab { transition:all 0.18s ease; cursor:pointer; border:none; text-align:left; width:100%; }
        .sol-tab:hover { background:${C.soft} !important; }
        .step-row { border-bottom:1px solid ${C.border}; transition:background 0.15s; }
        .step-row:hover { background:${C.soft}; }
        .tab-scroll { display:none; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .tab-scroll::-webkit-scrollbar { display:none; }
        .tab-pill { white-space:nowrap; cursor:pointer; border:none; transition:all 0.15s; background:none; }
        .logo-full { display:block; } .logo-icon { display:none; }
        @media(max-width:768px){ .logo-full{display:none!important;} .logo-icon{display:block!important;} }
        @media(max-width:900px){ .sol-layout{ flex-direction:column !important; } .sol-sidebar{ display:none !important; } .tab-scroll{ display:flex !important; } }
        @media(max-width:600px){ .nav-outer{padding-left:1rem!important;padding-right:1rem!important;} nav{padding-left:1rem!important;padding-right:1rem!important;} .sol-metrics{grid-template-columns:1fr 1fr!important;} .sol-content{padding:2rem 1rem 4rem!important;} }
      `}</style>

      {/* Nav */}
      <nav className="nav-outer" style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
        backgroundColor:"#FFFFFF", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"56px",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <img src={LOGO_SRC} alt="Uncharted" className="logo-full" style={{ height:"40px", width:"auto", display:"block" }} />
            <img src={ICON_SRC} alt="Uncharted" className="logo-icon" style={{ height:"32px", width:"32px", display:"none" }} />
          </button>
          <button onClick={onBack}
            style={{ background:"none", border:"none", cursor:"pointer", padding:0,
              fontFamily:"'JetBrains Mono', monospace", fontSize:"0.72rem",
              color:C.inkSoft, letterSpacing:"0.06em", transition:"opacity 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.5"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            ← Back
          </button>
        </div>
      </nav>

      {/* Compact header */}
      <div style={{ borderBottom:`1px solid ${C.border}`, paddingTop:"56px" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"2rem 3rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexWrap:"wrap" }}>
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.68rem",
              color:C.accent, letterSpacing:"0.14em", textTransform:"uppercase" }}>Solutions</p>
            <span style={{ color:C.border, fontSize:"0.9rem" }}>—</span>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid }}>
              Three components of the Venture Engine. Each one feeds the next.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile tab scroll */}
      <div className="tab-scroll" style={{ borderBottom:`1px solid ${C.border}`,
        backgroundColor:C.bg, padding:"0 1rem", gap:"0" }}>
        {SOLUTIONS.map((s, i) => (
          <button key={s.id} className="tab-pill" onClick={() => setActive(i)}
            style={{ padding:"0.85rem 1rem",
              fontFamily:"'Inter Tight', sans-serif", fontSize:"0.82rem",
              fontWeight: active===i ? 600 : 400,
              color: active===i ? C.accent : C.inkMid,
              borderBottom: active===i ? `2px solid ${C.accent}` : "2px solid transparent",
              borderTop:"none", borderLeft:"none", borderRight:"none" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex" }} className="sol-layout">

        {/* Sidebar */}
        <div className="sol-sidebar" style={{ width:"280px", flexShrink:0,
          borderRight:`1px solid ${C.border}`, position:"sticky",
          top:"56px", height:"calc(100vh - 106px)", overflowY:"auto" }}>

          {SOLUTIONS.map((item, i) => {
            const isActive = active === i;
            const t = item.tagStyle;
            return (
              <button key={item.id} className="sol-tab" onClick={() => setActive(i)}
                style={{ padding:"1rem 1.5rem",
                  backgroundColor: isActive ? C.accentBg : "transparent",
                  borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                  borderTop:`1px solid ${C.border}`, borderBottom:"none",
                  borderRight:"none", width:"100%" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.3rem" }}>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.56rem",
                    letterSpacing:"0.1em", textTransform:"uppercase",
                    color: isActive ? C.accent : C.inkSoft }}>
                    {item.tag}
                  </div>
                  <span style={{ ...t, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.52rem",
                    letterSpacing:"0.06em", padding:"0.15rem 0.4rem", borderRadius:"2px" }}>
                    {["01","02","03"][i]}
                  </span>
                </div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif",
                  fontWeight: isActive ? 600 : 400, fontSize:"0.88rem",
                  color: isActive ? C.ink : C.inkMid, lineHeight:1.3 }}>
                  {item.label}
                </div>
              </button>
            );
          })}

          {/* System diagram */}
          <div style={{ margin:"1.5rem 0 0", padding:"1.25rem 1.5rem",
            borderTop:`1px solid ${C.border}` }}>
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem",
              color:C.inkSoft, letterSpacing:"0.12em", textTransform:"uppercase",
              marginBottom:"1.1rem" }}>The system</p>
            {[
              {l:"Foundry",  d:"Builds the firms",      color:C.accent},
              {l:"Divine",   d:"Powers the decisions",  color:C.gold},
              {l:"Capital",  d:"Compounds the returns", color:C.inkSoft},
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.75rem",
                marginBottom: i<2 ? "0.9rem" : 0 }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%",
                  backgroundColor:item.color, flexShrink:0 }} />
                <div style={{ display:"flex", alignItems:"baseline", gap:"0.4rem", minWidth:0 }}>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.68rem",
                    fontWeight:600, color:C.ink, whiteSpace:"nowrap" }}>{item.l}</span>
                  <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.72rem",
                    color:C.inkSoft, whiteSpace:"nowrap" }}>— {item.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div key={active} className="sol-content"
          style={{ flex:1, padding:"3rem 3rem 5rem", opacity:0, animation:"fadeIn 0.3s ease forwards" }}>

          {/* Tag + eyebrow */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
            <span style={{ ...sol.tagStyle, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem",
              letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.22rem 0.6rem", borderRadius:"2px" }}>
              {sol.tag}
            </span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
              color:C.inkSoft, letterSpacing:"0.06em" }}>
              {["01","02","03"][active]} / 03
            </span>
          </div>

          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
            fontSize:"clamp(1.8rem, 3.2vw, 2.6rem)", lineHeight:1.12, color:C.ink,
            marginBottom:"1rem", maxWidth:"520px" }}>
            {sol.headline}
          </h2>

          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400, fontSize:"0.92rem",
            lineHeight:1.8, color:C.inkMid, maxWidth:"520px", marginBottom:"1.5rem" }}>
            {sol.sub}
          </p>

          {sol.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
              fontSize:"0.88rem", lineHeight:1.9, color:C.inkMid, maxWidth:"560px",
              marginBottom:"1rem" }}>
              {para}
            </p>
          ))}

          {/* Metrics strip */}
          <div className="sol-metrics" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:"0", backgroundColor:C.border, marginTop:"2rem", marginBottom:"2.5rem" }}>
            {sol.metrics.map((m, i) => (
              <div key={i} style={{ padding:"1.25rem 1rem", backgroundColor:C.bg,
                margin:"1px", borderLeft: i===0 ? `3px solid ${C.accent}` : "none" }}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
                  fontSize:"1.6rem", color: i===0 ? C.accent : C.ink,
                  lineHeight:1, marginBottom:"0.3rem" }}>{m.v}</div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.7rem", color:C.inkSoft }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem",
            color:C.inkSoft, letterSpacing:"0.12em", textTransform:"uppercase",
            marginBottom:"1rem" }}>How it works</p>

          {sol.how.map((s, i) => (
            <div key={i} className="step-row"
              style={{ display:"flex", gap:"1.25rem", padding:"1.1rem 0" }}>
              <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
                fontSize:"1.6rem", color:C.accent, lineHeight:1, flexShrink:0, width:"24px" }}>{s.n}</div>
              <div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                  fontSize:"0.75rem", color:C.ink, marginBottom:"0.3rem",
                  letterSpacing:"0.04em" }}>{s.t}</div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.85rem", color:C.inkMid, lineHeight:1.7 }}>{s.d}</div>
              </div>
            </div>
          ))}

          {/* CTAs */}
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginTop:"2.5rem" }}>
            <button onClick={() => handleCTA(sol.ctaAction)}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:"#fff",
                backgroundColor:C.accent, border:"none", borderRadius:"4px",
                padding:"0.85rem 2rem", cursor:"pointer", transition:"opacity 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {sol.ctaLabel}
            </button>
            <button onClick={() => handleCTA(sol.secondaryAction)}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:C.inkMid,
                backgroundColor:"transparent", border:`1px solid ${C.border}`,
                borderRadius:"4px", padding:"0.85rem 2rem", cursor:"pointer", transition:"all 0.15s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.ink;e.currentTarget.style.color=C.ink;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.inkMid;}}>
              {sol.secondaryLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"1.5rem 3rem",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
            fontSize:"0.75rem", color:C.inkSoft }}>© 2026 Uncharted Ventures LLC</span>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem",
            color:C.inkSoft, letterSpacing:"0.08em" }}>uncharted.ventures</span>
        </div>
      </footer>
    </div>
  );
}

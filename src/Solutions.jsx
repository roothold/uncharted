import { useState } from "react";

const LOGO_SRC = "/logo.png";
const ICON_SRC = "/icon.png";


const C = {
  bg:      "#FFFFFF",
  ink:     "#0D0D0D",
  inkMid:  "#555555",
  inkSoft: "#888888",
  accent:  "#C8512A",
  gold:    "#B8962E",
  border:  "#E8E8E8",
  soft:    "#F7F7F7",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&family=Poppins:wght@400;700&display=swap');`;

const SOLUTIONS = [
  {
    id: "divine-ai",
    label: "Divine AI",
    tag: "Intelligence Protocol",
    headline: "Operator intelligence, on demand.",
    sub: "Divine is not a chatbot. It is the proprietary intelligence layer that powers every decision Uncharted makes — and makes it available to founders who need answers, not algorithms.",
    body: `Every question a founder asks carries weight. Should I raise now or wait? When do I hire sales? How do I price this for enterprise? These aren't data problems. They're judgment problems — and judgment comes from operators who've made these calls before, often the hard way.

Divine encodes that judgment. Verified Thinkers — operators with track records, not credentials — structure their decision frameworks inside Divine. Founders ask questions. The answers are shaped by real experience, not training data scraped from the internet.

The long-term play is infrastructure. Every session builds a proprietary knowledge graph of founder decision-making patterns. Every Thinker adds a framework that compounds in value over time. Divine is not competing with ChatGPT. It is building the institutional knowledge layer that ChatGPT cannot replicate.`,
    how: [
      { n:"1", t:"Choose a Thinker", d:"Select the operator whose experience matches your problem — product strategy, fundraising, operations, capital allocation." },
      { n:"2", t:"Ask your question", d:"Be specific. More context produces sharper answers. Divine surfaces the relevant framework from the Thinker's documented decision logic." },
      { n:"3", t:"Act on the answer", d:"Direct, honest, operator-grade responses. No hedging. No generic advice. Accountability baked in." },
    ],
    metrics: [
      { v:"$0.05", l:"Per question" },
      { v:"70%", l:"Thinker revenue share" },
      { v:"2", l:"Expert frameworks" },
      { v:"v1.4", l:"Current version" },
    ],
    ctaLabel: "Try Divine",
    ctaAction: "divine",
    secondaryLabel: "Become a Thinker →",
    secondaryAction: "become-thinker",
  },
  {
    id: "venture-foundry",
    label: "Venture Foundry",
    tag: "Studio & Co-Building",
    headline: "We don't just invest. We build alongside you.",
    sub: "The Venture Foundry is Uncharted's co-building arm. We identify practitioners and founders with genuine domain advantage, embed our infrastructure and AI tooling into their operation, and build companies that generate real revenue — fast.",
    body: `Most venture studios take equity and stay out of the way. The Foundry works differently. We are co-founders in the operational sense: we contribute infrastructure, capital, AI tools, and the pattern recognition of founders who have built and exited companies before.

The target is the practitioner who has hit their ceiling. A lawyer, accountant, designer, or consultant who has genuine credibility and client relationships but lacks the infrastructure to scale. We provide the engine. They provide the judgment. Together we build an AI-native firm that operates at margins traditional practices can't reach.

The playbook is deliberately repeatable. Year one: three firms across three verticals. Year two: eight to ten. Each firm proves the model, generates revenue, and feeds the knowledge graph that makes Divine more valuable. The Foundry and Divine are not separate products — they are the same compounding system.`,
    how: [
      { n:"1", t:"Practitioner selection", d:"We identify operators with genuine domain credibility, existing client relationships, and the right profile for the AI-native model." },
      { n:"2", t:"Infrastructure deployment", d:"Legal entity, brand, AI tooling, Divine integration, and operational systems — all pre-built and deployed within 30 days." },
      { n:"3", t:"Revenue within 90 days", d:"The compressed delivery model means the first client engagement closes within 60 days. Revenue before year one is over." },
    ],
    metrics: [
      { v:"3", l:"Portfolio companies" },
      { v:"30 days", l:"To operational" },
      { v:"25–35%", l:"Uncharted equity stake" },
      { v:"90 days", l:"Target to first revenue" },
    ],
    ctaLabel: "Build with us",
    ctaAction: "contact",
    secondaryLabel: "See our industries →",
    secondaryAction: "industries",
  },
  {
    id: "capital-stewardship",
    label: "Capital Stewardship",
    tag: "Asset & Fund Strategy",
    headline: "Capital that compounds with the engine.",
    sub: "Capital Stewardship is Uncharted's investment and portfolio management function. It ensures that the companies we build and back are capitalised correctly at every stage — and that Uncharted's own portfolio grows in value as the engine matures.",
    body: `The capital strategy is designed to avoid the mistake most studios make: raising external money before the model is proven, then diluting into irrelevance.

Phase one is internal capital and Foundry revenue. Three firms, each requiring $150K–$300K, generating revenue within 12 months. By the end of year one, the combined portfolio is covering Uncharted's operational costs. No institutional pressure. No premature positioning.

Phase two is the first external raise — a $3–5M seed round built on three proof points: at least one Foundry firm generating $500K+ annual revenue, a live AI product with real usage data, and a documented thesis that institutional investors can evaluate. The investor profile is not traditional VC. It is family offices, strategic angels who've built and sold professional services businesses, and operator-led funds that understand the model.

Phase three is the compounding. Eight to ten firms. Divine API revenue. A Thinker network of 50–100 verified operators. An equity portfolio appreciating as the firms scale. The Series A, if raised, reflects a system with proof — not a thesis.`,
    how: [
      { n:"1", t:"Internal capital first", d:"Foundry firms funded from Uncharted's balance sheet or a small friends-and-family round. No institutional dilution before proof." },
      { n:"2", t:"Revenue before raise", d:"Each firm is profitable within 12 months. The first external raise happens when the model is proven — not before." },
      { n:"3", t:"Strategic raise at proof", d:"$3–5M seed targeting family offices and operator angels. Use of funds: scale the Foundry, build the Divine API, hire head of product." },
    ],
    metrics: [
      { v:"$150K", l:"Minimum Foundry co-investment" },
      { v:"12 months", l:"Target to profitability per firm" },
      { v:"$3–5M", l:"Seed round target at proof" },
      { v:"Year 3", l:"When the compounding begins" },
    ],
    ctaLabel: "Talk capital",
    ctaAction: "contact",
    secondaryLabel: "See the Foundry →",
    secondaryAction: "solutions",
  },
];

export default function SolutionsPage({ onBack, onContact, onDivine, onBecomeThinker, onIndustries }) {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];

  const handleCTA = (action) => {
    if (action === "divine") onDivine?.();
    else if (action === "contact") onContact?.();
    else if (action === "become-thinker") onBecomeThinker?.();
    else if (action === "industries") onIndustries?.();
    else if (action === "solutions") setActive(1);
  };

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        .sol-tab { transition:all 0.2s ease; cursor:pointer; border:none; text-align:left; width:100%; }
        .sol-tab:hover { color:${C.ink} !important; }
        .back-btn { transition:opacity 0.2s; } .back-btn:hover { opacity:0.5; }
        .logo-full { display:block; } .logo-icon { display:none; }
        @media(max-width:768px){ .logo-full{display:none!important;} .logo-icon{display:block!important;} }
        @media(max-width:900px){ .sol-layout{ flex-direction:column !important; } .sol-sidebar{ width:100% !important; border-right:none !important; border-bottom:1px solid ${C.border} !important; position:static !important; height:auto !important; } }
        @media(max-width:600px){ .sol-px{ padding-left:1.5rem !important; padding-right:1.5rem !important; } .sol-metrics{ grid-template-columns:1fr 1fr !important; } }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
        backgroundColor:"#FFFFFF", borderBottom:`1px solid ${C.border}`, padding:"0 2.5rem" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", height:"56px",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <img src={LOGO_SRC} alt="Uncharted" className="logo-full" style={{ height:"40px", width:"auto", display:"block" }} />
            <img src={ICON_SRC} alt="Uncharted" className="logo-icon" style={{ height:"32px", width:"32px", display:"none" }} />
          </button>
          <button onClick={onBack} className="back-btn"
            style={{ background:"none", border:"none", cursor:"pointer", padding:0,
              fontFamily:"'JetBrains Mono', monospace", fontSize:"0.72rem",
              color:C.inkSoft, letterSpacing:"0.06em" }}>
            ← Back
          </button>
        </div>
      </nav>

      {/* Page header */}
      <div style={{ borderBottom:`1px solid ${C.border}`, paddingTop:"56px" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"5rem 0 3.5rem" }} className="sol-px">
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.72rem",
            color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1rem" }}>
            Solutions
          </p>
          <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
            fontSize:"clamp(2.2rem, 5vw, 4rem)", lineHeight:1.05, color:C.ink,
            maxWidth:"640px", marginBottom:"1.25rem" }}>
            The three components of the Venture Engine.
          </h1>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.95rem",
            lineHeight:1.85, color:C.inkMid, maxWidth:"560px" }}>
            Divine AI, the Venture Foundry, and Capital Stewardship are not separate products.
            They are one compounding system — each one feeding the next.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", minHeight:"calc(100vh - 220px)" }}
        className="sol-layout">

        {/* Sidebar */}
        <div className="sol-sidebar" style={{ width:"280px", flexShrink:0,
          borderRight:`1px solid ${C.border}`, padding:"2.5rem 0", position:"sticky",
          top:"56px", height:"calc(100vh - 56px)", overflowY:"auto" }}>
          {SOLUTIONS.map((s, i) => (
            <button key={s.id} className="sol-tab" onClick={() => setActive(i)}
              style={{ padding:"1.1rem 2.5rem", backgroundColor:"transparent",
                borderLeft: active===i ? `3px solid ${C.accent}` : "3px solid transparent",
                color: active===i ? C.ink : C.inkMid }}>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
                letterSpacing:"0.1em", textTransform:"uppercase",
                color: active===i ? C.accent : C.inkSoft, marginBottom:"0.25rem" }}>
                {s.tag}
              </div>
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight: active===i ? 600 : 400,
                fontSize:"0.88rem" }}>
                {s.label}
              </div>
            </button>
          ))}

          {/* System diagram */}
          <div style={{ margin:"2rem 1.5rem 0", padding:"1.25rem",
            border:`1px solid ${C.border}`, backgroundColor:C.soft }}>
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
              color:C.inkSoft, letterSpacing:"0.08em", textTransform:"uppercase",
              marginBottom:"1rem" }}>The system</p>
            {[
              { l:"Foundry", d:"Builds the firms" },
              { l:"Divine", d:"Powers the decisions" },
              { l:"Capital", d:"Compounds the returns" },
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem",
                marginBottom: i < 2 ? "0.6rem" : 0 }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%",
                  backgroundColor:C.accent, marginTop:"5px", flexShrink:0 }} />
                <div>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem",
                    fontWeight:600, color:C.ink }}>{item.l}</span>
                  <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.72rem",
                    color:C.inkSoft }}> — {item.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div key={active} style={{ flex:1, padding:"3.5rem 2.5rem 5rem", opacity:0,
          animation:"fadeUp 0.35s ease forwards" }} className="sol-px">

          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.68rem",
            color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.25rem" }}>
            {sol.tag}
          </p>
          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
            fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight:1.1, color:C.ink,
            marginBottom:"1rem", maxWidth:"560px" }}>
            {sol.headline}
          </h2>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400, fontSize:"0.95rem",
            lineHeight:1.8, color:C.inkMid, maxWidth:"560px", marginBottom:"2rem" }}>
            {sol.sub}
          </p>

          {/* Body copy */}
          {sol.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
              fontSize:"0.9rem", lineHeight:1.9, color:C.inkMid, maxWidth:"580px",
              marginBottom:"1.25rem" }}>
              {para}
            </p>
          ))}

          {/* Metrics */}
          <div className="sol-metrics" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            gap:"1px", backgroundColor:C.border, margin:"2.5rem 0" }}>
            {sol.metrics.map((m, i) => (
              <div key={i} style={{ padding:"1.25rem 1rem", backgroundColor:C.bg }}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
                  fontSize:"1.6rem", color:C.ink, lineHeight:1, marginBottom:"0.3rem" }}>{m.v}</div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.72rem", color:C.inkSoft }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem",
            color:C.inkSoft, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1.25rem" }}>
            How it works
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
            {sol.how.map((s, i) => (
              <div key={i} style={{ display:"flex", gap:"1.5rem", padding:"1.25rem 0",
                borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
                  fontSize:"1.8rem", color:C.accent, lineHeight:1, flexShrink:0, width:"28px" }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                    fontSize:"0.78rem", color:C.ink, marginBottom:"0.35rem" }}>{s.t}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                    fontSize:"0.85rem", color:C.inkMid, lineHeight:1.7 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginTop:"2.5rem" }}>
            <button onClick={() => handleCTA(sol.ctaAction)}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:"#fff",
                backgroundColor:C.accent, border:"none", padding:"0.85rem 2rem", cursor:"pointer" }}>
              {sol.ctaLabel}
            </button>
            <button onClick={() => handleCTA(sol.secondaryAction)}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:C.inkMid,
                backgroundColor:"transparent", border:`1px solid ${C.border}`,
                padding:"0.85rem 2rem", cursor:"pointer" }}>
              {sol.secondaryLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"1.75rem 0",
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

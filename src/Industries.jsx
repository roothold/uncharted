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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,600;1,400;1,600&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&family=Poppins:wght@400;700&display=swap');`;

const INDUSTRIES = [
  {
    id: "professional-services",
    label: "Professional Services",
    eyebrow: "Priority Vertical",
    headline: "The billable hour is ending. The judgment economy is beginning.",
    body: "Law firms, accounting practices, and consultancies built on hourly billing are structurally broken. AI can now do in hours what junior teams did in weeks. The practices that survive will be rebuilt from the ground up — lean, AI-native, and anchored to senior judgment rather than headcount. Uncharted co-builds these firms with experienced practitioners, providing the infrastructure they can't build alone.",
    signal: "Professional services firms lose 40–60% of billable hours to work AI now handles in minutes.",
    opportunities: [
      { title: "Immigration Law", desc: "Document processing, case preparation, and compliance monitoring at a fraction of traditional cost." },
      { title: "Tax Advisory", desc: "Real-time scenario modelling and proactive planning replacing reactive annual filing." },
      { title: "M&A Due Diligence", desc: "AI-accelerated document review compressing 8-week processes to days." },
      { title: "UX & Design Strategy", desc: "Senior design judgment delivered at startup speed — without agency overhead." },
    ],
    stat1: "60%", stat1l: "of professional work is automatable by 2027",
    stat2: "$2M–$20M", stat2l: "revenue firms most underserved by current AI tools",
  },
  {
    id: "specialty-consumer",
    label: "Specialty Consumer",
    eyebrow: "Proven Thesis",
    headline: "Brand endures. Supply chain doesn't.",
    body: "Consumer brands that win in the next five years will operate with AI-managed supply chains, demand forecasting, and direct customer relationships — without the overhead of traditional CPG structures. Large retailers are slow. Distributors are fragmented. The Foundry builds brands designed from day one around the lean, AI-native operating model that incumbents are struggling to retrofit.",
    signal: "Sweetkiwi and Surplus prove the model. The pattern is repeatable across categories.",
    opportunities: [
      { title: "Better-For-You Food & Beverage", desc: "Direct-to-consumer brands with AI-optimised supply chains and retention-first growth." },
      { title: "Wellness & Personal Care", desc: "High-margin, subscription-driven brands with personalisation at the core." },
      { title: "Specialty Retail", desc: "Category-defining products with strong community and low wholesale dependency." },
      { title: "Sustainable Goods", desc: "Brands built for the regulatory and consumer landscape of 2030, not 2015." },
    ],
    stat1: "3×", stat1l: "ARR growth demonstrated in Uncharted's portfolio",
    stat2: "Day 1", stat2l: "AI infrastructure baked in from founding",
  },
  {
    id: "b2b-transition",
    label: "B2B Infrastructure",
    eyebrow: "Emerging Opportunity",
    headline: "Every mid-market company is reorganising around AI. Most are failing.",
    body: "Between now and 2030, every finance team, healthcare administrator, and operations leader is trying to figure out how to restructure around tools they barely understand. They're buying software but not changing workflows. The category that wins is not a consultancy and not a SaaS company — it's a hybrid that co-invests in the outcome and has the operator experience to know what actually works.",
    signal: "The transition gap is open for 18–24 months before incumbents absorb it.",
    opportunities: [
      { title: "Finance Operations", desc: "Replacing manual close processes and FP&A workflows with AI-native systems that produce board-ready insight in real time." },
      { title: "Healthcare Administration", desc: "Predictive staffing, AI-driven compliance monitoring, and patient flow optimisation for mid-market health systems." },
      { title: "Legal Operations", desc: "Contract intelligence, matter management, and compliance automation for in-house legal teams." },
      { title: "HR & Talent", desc: "AI-powered workforce planning and performance management replacing spreadsheet-driven processes." },
    ],
    stat1: "72%", stat1l: "of CFOs now use AI — up from 35% in 2024",
    stat2: "18 months", stat2l: "before incumbents close the transition gap",
  },
  {
    id: "thinking-economy",
    label: "The Thinking Economy",
    eyebrow: "Long-Term Bet",
    headline: "When execution is automated, judgment becomes the product.",
    body: "At the top of the value chain sits something AI cannot replicate: the ability to ask the right question, read the room, make a call under genuine uncertainty, and be accountable for the outcome. This is the thinking economy — and it is the primary focus of Uncharted's long-term positioning. Divine is the infrastructure layer. The Foundry builds the firms. Capital Stewardship funds the compounding.",
    signal: "Research, specialised consulting, and senior advisory are the last mile of AI augmentation.",
    opportunities: [
      { title: "Operator Intelligence Networks", desc: "Platforms that encode and distribute senior operator judgment — the Divine thesis at scale." },
      { title: "Specialised Research", desc: "Domain-specific research firms that combine AI data synthesis with expert interpretation." },
      { title: "Executive Advisory", desc: "High-stakes decision support for founders and operators navigating AI-driven market transitions." },
      { title: "Education & Credentialing", desc: "New credentials for the skills that matter in an automated economy — judgment, adaptability, and cognitive leadership." },
    ],
    stat1: "Top 10%", stat1l: "of knowledge workers will see income rise significantly",
    stat2: "2030", stat2l: "when the thinking economy fully separates from execution",
  },
];

export default function IndustriesPage({ onBack, onContact, onSolutions }) {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`        .nav-outer { padding-left:3rem; padding-right:3rem; }

        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        .ind-tab { transition:all 0.2s ease; cursor:pointer; border:none; text-align:left; width:100%; }
        .ind-tab:hover { color:${C.ink} !important; }
        .opp-card { transition:border-color 0.2s ease; }
        .opp-card:hover { border-color:${C.ink} !important; }
        .back-btn { transition:opacity 0.2s; } .back-btn:hover { opacity:0.5; }
        .logo-full { display:block; } .logo-icon { display:none; }
        @media(max-width:768px){ .logo-full{display:none!important;} .logo-icon{display:block!important;} }
        @media(max-width:900px){ .ind-layout{ flex-direction:column !important; } .ind-sidebar{ width:100% !important; border-right:none !important; border-bottom:1px solid ${C.border} !important; } }
        @media(max-width:600px){ .nav-outer{padding-left:1rem!important;padding-right:1rem!important;} .ind-px{ padding-left:1rem !important; padding-right:1rem !important; } .opp-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:600px){ nav{ padding-left:1rem !important; padding-right:1rem !important; } }
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
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"5rem 3rem 3.5rem" }} className="ind-px">
          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.72rem",
            color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1rem" }}>
            Industries
          </p>
          <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
            fontSize:"clamp(2.2rem, 5vw, 4rem)", lineHeight:1.05, color:C.ink,
            maxWidth:"640px", marginBottom:"1.25rem" }}>
            Where Uncharted builds and backs.
          </h1>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.95rem",
            lineHeight:1.85, color:C.inkMid, maxWidth:"560px" }}>
            We focus on industries in the transition gap — mature enough for real revenue,
            not yet captured by AI incumbents. Each vertical is chosen because judgment,
            not execution, is the durable competitive advantage.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", minHeight:"calc(100vh - 220px)" }}
        className="ind-layout">

        {/* Sidebar */}
        <div className="ind-sidebar" style={{ width:"280px", flexShrink:0,
          borderRight:`1px solid ${C.border}`, padding:"2.5rem 0", position:"sticky",
          top:"56px", height:"calc(100vh - 56px)", overflowY:"auto" }}>
          {INDUSTRIES.map((ind, i) => (
            <button key={ind.id} className="ind-tab" onClick={() => setActive(i)}
              style={{ padding:"1.1rem 2.5rem", backgroundColor:"transparent",
                borderLeft: active===i ? `3px solid ${C.accent}` : "3px solid transparent",
                color: active===i ? C.ink : C.inkMid }}>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem",
                letterSpacing:"0.1em", textTransform:"uppercase",
                color: active===i ? C.accent : C.inkSoft, marginBottom:"0.25rem" }}>
                {ind.eyebrow}
              </div>
              <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight: active===i ? 600 : 400,
                fontSize:"0.88rem" }}>
                {ind.label}
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={active} style={{ flex:1, padding:"3.5rem 3rem 5rem", opacity:0,
          animation:"fadeUp 0.35s ease forwards" }} className="ind-px">

          <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.68rem",
            color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.25rem" }}>
            {ind.eyebrow}
          </p>
          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
            fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight:1.1, color:C.ink,
            marginBottom:"1.5rem", maxWidth:"580px" }}>
            {ind.headline}
          </h2>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem",
            lineHeight:1.9, color:C.inkMid, maxWidth:"580px", marginBottom:"2.5rem" }}>
            {ind.body}
          </p>

          {/* Signal */}
          <div style={{ padding:"1rem 1.25rem", borderLeft:`3px solid ${C.accent}`,
            backgroundColor:"rgba(200,81,42,0.04)", marginBottom:"3rem" }}>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400, fontSize:"0.85rem",
              color:C.inkMid, fontStyle:"italic" }}>{ind.signal}</p>
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"3rem" }}>
            {[{v:ind.stat1, l:ind.stat1l},{v:ind.stat2, l:ind.stat2l}].map((s,i) => (
              <div key={i} style={{ padding:"1.5rem", border:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600,
                  fontSize:"2rem", color:C.ink, lineHeight:1, marginBottom:"0.4rem" }}>{s.v}</div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.78rem", color:C.inkSoft, lineHeight:1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Opportunities */}
          <div style={{ marginBottom:"3rem" }}>
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem",
              color:C.inkSoft, letterSpacing:"0.1em", textTransform:"uppercase",
              marginBottom:"1.25rem" }}>Foundry Opportunities</p>
            <div className="opp-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
              {ind.opportunities.map((o, i) => (
                <div key={i} className="opp-card" style={{ padding:"1.25rem",
                  border:`1px solid ${C.border}` }}>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                    fontSize:"0.72rem", color:C.ink, marginBottom:"0.5rem" }}>{o.title}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                    fontSize:"0.82rem", color:C.inkMid, lineHeight:1.65 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <button onClick={onContact}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:"#fff",
                backgroundColor:C.accent, border:"none", padding:"0.85rem 2rem", cursor:"pointer" }}>
              Build with us
            </button>
            <button onClick={onSolutions}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:C.inkMid,
                backgroundColor:"transparent", border:`1px solid ${C.border}`,
                padding:"0.85rem 2rem", cursor:"pointer" }}>
              See our solutions →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"1.75rem 3rem",
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

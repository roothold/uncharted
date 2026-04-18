import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  border:   "#E8E8E8",
  soft:     "#F7F7F7",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=Poppins:wght@400;700&display=swap');`;

const INDUSTRIES = [
  {
    id:"professional-services", label:"Professional Services",
    eyebrow:"Priority Vertical", tag:"Tier 1",
    headline:"The billable hour is ending. The judgment economy is beginning.",
    body:"Law firms, accounting practices, and consultancies built on hourly billing are structurally broken. AI can now do in hours what junior teams did in weeks. The practices that survive will be rebuilt from the ground up — lean, AI-native, and anchored to senior judgment rather than headcount. Uncharted co-builds these firms with experienced practitioners, providing the infrastructure they can't build alone.",
    signal:"Professional services firms lose 40–60% of billable hours to work AI now handles in minutes.",
    opportunities:[
      {title:"Immigration Law",        desc:"Document processing, case preparation, and compliance monitoring at a fraction of traditional cost."},
      {title:"Tax Advisory",           desc:"Real-time scenario modelling and proactive planning replacing reactive annual filing."},
      {title:"M&A Due Diligence",      desc:"AI-accelerated document review compressing 8-week processes to days."},
      {title:"UX & Design Strategy",   desc:"Senior design judgment delivered at startup speed — without agency overhead."},
    ],
    stat1:"60%",      stat1l:"of professional work automatable by 2027",
    stat2:"$2M–$20M", stat2l:"revenue firms most underserved by AI",
  },
  {
    id:"specialty-consumer", label:"Specialty Consumer",
    eyebrow:"Proven Thesis", tag:"Tier 1",
    headline:"Brand endures. Supply chain doesn't.",
    body:"Consumer brands that win in the next five years will operate with AI-managed supply chains, demand forecasting, and direct customer relationships — without the overhead of traditional CPG structures. Large retailers are slow. Distributors are fragmented. The Foundry builds brands designed from day one around the lean, AI-native operating model that incumbents are struggling to retrofit.",
    signal:"Sweetkiwi and Surplus prove the model. The pattern is repeatable across categories.",
    opportunities:[
      {title:"Better-For-You Food & Beverage", desc:"Direct-to-consumer brands with AI-optimised supply chains and retention-first growth."},
      {title:"Wellness & Personal Care",       desc:"High-margin, subscription-driven brands with personalisation at the core."},
      {title:"Specialty Retail",               desc:"Category-defining products with strong community and low wholesale dependency."},
      {title:"Sustainable Goods",              desc:"Brands built for the regulatory and consumer landscape of 2030, not 2015."},
    ],
    stat1:"3×",    stat1l:"ARR growth in Uncharted portfolio",
    stat2:"Day 1", stat2l:"AI infrastructure baked in from founding",
  },
  {
    id:"b2b-transition", label:"B2B Infrastructure",
    eyebrow:"Emerging Opportunity", tag:"Tier 2",
    headline:"Every mid-market company is reorganising around AI. Most are failing.",
    body:"Between now and 2030, every finance team, healthcare administrator, and operations leader is trying to figure out how to restructure around tools they barely understand. They're buying software but not changing workflows. The category that wins is not a consultancy and not a SaaS company — it's a hybrid that co-invests in the outcome and has the operator experience to know what actually works.",
    signal:"The transition gap is open for 18–24 months before incumbents absorb it.",
    opportunities:[
      {title:"Finance Operations",       desc:"Replacing manual close processes and FP&A workflows with AI-native systems that produce board-ready insight in real time."},
      {title:"Healthcare Administration",desc:"Predictive staffing, AI-driven compliance monitoring, and patient flow optimisation for mid-market health systems."},
      {title:"Legal Operations",         desc:"Contract intelligence, matter management, and compliance automation for in-house legal teams."},
      {title:"HR & Talent",              desc:"AI-powered workforce planning and performance management replacing spreadsheet-driven processes."},
    ],
    stat1:"72%",        stat1l:"of CFOs now use AI — up from 35% in 2024",
    stat2:"18 months",  stat2l:"before incumbents close the gap",
  },
  {
    id:"thinking-economy", label:"Thinking Economy",
    eyebrow:"Long-Term Bet", tag:"Horizon",
    headline:"When execution is automated, judgment becomes the product.",
    body:"At the top of the value chain sits something AI cannot replicate: the ability to ask the right question, read the room, make a call under genuine uncertainty, and be accountable for the outcome. This is the thinking economy — and it is the primary focus of Uncharted's long-term positioning. Divine is the infrastructure layer. The Foundry builds the firms. Capital Stewardship funds the compounding.",
    signal:"Research, specialised consulting, and senior advisory are the last mile of AI augmentation.",
    opportunities:[
      {title:"Operator Intelligence Networks", desc:"Platforms that encode and distribute senior operator judgment — the Divine thesis at scale."},
      {title:"Specialised Research",           desc:"Domain-specific research firms that combine AI data synthesis with expert interpretation."},
      {title:"Executive Advisory",             desc:"High-stakes decision support for founders and operators navigating AI-driven market transitions."},
      {title:"Education & Credentialing",      desc:"New credentials for the skills that matter in an automated economy."},
    ],
    stat1:"Top 10%", stat1l:"of knowledge workers will see income rise",
    stat2:"2030",    stat2l:"when the thinking economy fully separates",
  },
];

const TAG_STYLE = {
  "Tier 1":  {bg:"rgba(200,81,42,0.08)",  color:"#C8512A"},
  "Tier 2":  {bg:"rgba(184,150,46,0.10)", color:"#B8962E"},
  "Horizon": {bg:"rgba(85,85,85,0.08)",   color:"#555555"},
};

export default function IndustriesPage({ onBack, onContact, onSolutions }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];
  const tc = TAG_STYLE[ind.tag] || {};

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        h1, h2, h3 { -webkit-text-stroke: 0.3px currentColor; }
        .nav-outer { padding-left:3rem; padding-right:3rem; }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .ind-tab { transition:all 0.18s ease; cursor:pointer; border:none; text-align:left; width:100%; }
        .ind-tab:hover { background:${C.soft} !important; }
        .opp-card { transition:all 0.18s ease; }
        .opp-card:hover { border-color:${C.accent} !important; background:${C.accentBg} !important; }
        .tab-scroll { display:none; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .tab-scroll::-webkit-scrollbar { display:none; }
        .tab-pill { white-space:nowrap; cursor:pointer; border:none; transition:all 0.15s; background:none; }
        .logo-full { display:block; } .logo-icon { display:none; }
        @media(max-width:768px){ .logo-full{display:none!important;} .logo-icon{display:block!important;} }
        @media(max-width:900px){ .ind-layout{ flex-direction:column !important; } .ind-sidebar{ display:none !important; } .tab-scroll{ display:flex !important; } }
        @media(max-width:600px){ .nav-outer{padding-left:1rem!important;padding-right:1rem!important;} nav{padding-left:1rem!important;padding-right:1rem!important;} .opp-grid{grid-template-columns:1fr!important;} .ind-content{padding:2rem 1rem 4rem!important;} .stat-grid{grid-template-columns:1fr!important;} }
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
              fontFamily:"'Inter Tight', sans-serif", fontSize:"0.72rem",
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
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500, fontSize:"0.68rem",
              color:C.accent, letterSpacing:"0.14em", textTransform:"uppercase" }}>Industries</p>
            <span style={{ color:C.border, fontSize:"0.9rem" }}>—</span>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.inkMid }}>
              Four verticals where judgment compounds faster than execution.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile tab scroll */}
      <div className="tab-scroll" style={{ borderBottom:`1px solid ${C.border}`,
        backgroundColor:C.bg, padding:"0 1rem", gap:"0" }}>
        {INDUSTRIES.map((item, i) => (
          <button key={item.id} className="tab-pill" onClick={() => setActive(i)}
            style={{ padding:"0.85rem 1rem",
              fontFamily:"'Inter Tight', sans-serif", fontSize:"0.82rem",
              fontWeight: active===i ? 600 : 400,
              color: active===i ? C.accent : C.inkMid,
              borderBottom: active===i ? `2px solid ${C.accent}` : "2px solid transparent",
              borderTop:"none", borderLeft:"none", borderRight:"none" }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex" }} className="ind-layout">

        {/* Sidebar */}
        <div className="ind-sidebar" style={{ width:"260px", flexShrink:0,
          borderRight:`1px solid ${C.border}`, position:"sticky",
          top:"56px", height:"calc(100vh - 106px)", overflowY:"auto" }}>
          {INDUSTRIES.map((item, i) => {
            const isActive = active === i;
            const t = TAG_STYLE[item.tag] || {};
            return (
              <button key={item.id} className="ind-tab" onClick={() => setActive(i)}
                style={{ padding:"1rem 1.5rem",
                  backgroundColor: isActive ? C.accentBg : "transparent",
                  borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                  borderTop:`1px solid ${C.border}`, borderBottom:"none",
                  borderRight:"none", width:"100%" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.3rem" }}>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.56rem",
                    letterSpacing:"0.1em", textTransform:"uppercase",
                    color: isActive ? C.accent : C.inkSoft }}>
                    {item.eyebrow}
                  </div>
                  <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.52rem",
                    letterSpacing:"0.06em", padding:"0.15rem 0.4rem", borderRadius:"20px",
                    backgroundColor:t.bg, color:t.color }}>
                    {item.tag}
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
        </div>

        {/* Content panel */}
        <div key={active} className="ind-content"
          style={{ flex:1, padding:"3rem 3rem 5rem", opacity:0, animation:"fadeIn 0.3s ease forwards" }}>

          {/* Eyebrow + tag */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.68rem",
              color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase" }}>
              {ind.eyebrow}
            </p>
            <span style={{ ...tc, fontFamily:"'Inter Tight', sans-serif", fontSize:"0.58rem",
              letterSpacing:"0.08em", padding:"0.18rem 0.5rem", borderRadius:"2px" }}>
              {ind.tag}
            </span>
          </div>

          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
            fontSize:"clamp(1.8rem, 3.2vw, 2.6rem)", lineHeight:1.12, color:C.ink,
            marginBottom:"1.25rem", maxWidth:"560px" }}>
            {ind.headline}
          </h2>

          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.9rem",
            lineHeight:1.9, color:C.inkMid, maxWidth:"560px", marginBottom:"2rem" }}>
            {ind.body}
          </p>

          {/* Signal */}
          <div style={{ padding:"0.9rem 1.1rem", borderLeft:`3px solid ${C.accent}`,
            backgroundColor:C.accentBg, marginBottom:"2.5rem" }}>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400, fontSize:"0.83rem",
              color:C.accent, fontStyle:"italic" }}>{ind.signal}</p>
          </div>

          {/* Opportunities first */}
          <div style={{ marginBottom:"2.5rem" }}>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.6rem",
              color:C.inkSoft, letterSpacing:"0.12em", textTransform:"uppercase",
              marginBottom:"1rem" }}>Foundry Opportunities</p>
            <div className="opp-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.65rem" }}>
              {ind.opportunities.map((o, i) => (
                <div key={i} className="opp-card" style={{ padding:"1.1rem 1.25rem",
                  border:`1px solid ${C.border}`, borderRadius:"4px" }}>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600,
                    fontSize:"0.68rem", color:C.ink, marginBottom:"0.4rem",
                    letterSpacing:"0.04em" }}>{o.title}</div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                    fontSize:"0.8rem", color:C.inkMid, lineHeight:1.65 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats after opportunities */}
          <div className="stat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:"0.65rem", marginBottom:"2.5rem" }}>
            {[{v:ind.stat1, l:ind.stat1l},{v:ind.stat2, l:ind.stat2l}].map((s,i) => (
              <div key={i} style={{ padding:"1.5rem 1.25rem",
                backgroundColor: i===0 ? C.accentBg : C.soft,
                borderLeft:`3px solid ${i===0 ? C.accent : C.border}` }}>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
                  fontSize:"2.2rem", color: i===0 ? C.accent : C.ink,
                  lineHeight:1, marginBottom:"0.35rem" }}>{s.v}</div>
                <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.75rem", color:C.inkMid, lineHeight:1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <button onClick={() => navigate("/contact")}
              style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:"#fff",
                backgroundColor:C.accent, border:"none", borderRadius:"20px",
                padding:"0.85rem 2rem", cursor:"pointer", transition:"opacity 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Build with us
            </button>
            <button onClick={() => navigate("/solutions")}
              style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
                fontSize:"0.72rem", letterSpacing:"0.06em", color:C.inkMid,
                backgroundColor:"transparent", border:`1px solid ${C.border}`,
                borderRadius:"20px", padding:"0.85rem 2rem", cursor:"pointer",
                transition:"all 0.15s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.ink;e.currentTarget.style.color=C.ink;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.inkMid;}}>
              See our solutions →
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
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.62rem",
            color:C.inkSoft, letterSpacing:"0.08em" }}>uncharted.ventures</span>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";

const QUESTIONS = [
  { q:"When do I replace myself as operator?",       chip:"Delegation"    },
  { q:"How do I price judgment, not hours?",         chip:"Pricing"       },
  { q:"What breaks first when we scale?",            chip:"Scaling"       },
  { q:"Should I raise or grow from revenue?",        chip:"Fundraising"   },
  { q:"How do I land the first enterprise client?",  chip:"Enterprise"    },
  { q:"When is the right time to bring in a COO?",   chip:"Hiring"        },
];

const go = (q) => {
  const url = q
    ? `https://divine.uncharted.ventures/?q=${encodeURIComponent(q)}`
    : "https://divine.uncharted.ventures/";
  window.open(url, "_blank", "noopener noreferrer");
};

export default function DivineHero() {
  const [query, setQuery] = useState("");

  return (
    <section style={{ paddingTop:"56px", backgroundColor:"#FFFFFF", borderBottom:"1px solid #FFFFFF" }}>
      <div style={{ maxWidth:"820px", margin:"0 auto", padding:"6rem 3rem 5rem", textAlign:"center" }}>

        {/* Eyebrow */}
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
          fontSize:"0.68rem", color:"#B8962E", letterSpacing:"0.14em",
          textTransform:"uppercase", marginBottom:"1.25rem",
          opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
          Divine · AI for Founders
        </p>

        {/* Headline */}
        <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
          fontSize:"clamp(2rem, 4.5vw, 3.8rem)", lineHeight:1.1, color:"#0D0D0D",
          marginBottom:"1rem", opacity:0, animation:"fadeUp 0.7s 0.2s forwards",
          whiteSpace:"pre-line" }}>
          {"What decision are you\nworking through?"}
        </h1>

        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
          fontSize:"0.95rem", lineHeight:1.8, color:"#888888",
          maxWidth:"460px", margin:"0 auto 2.5rem",
          opacity:0, animation:"fadeUp 0.7s 0.3s forwards" }}>
          Real answers from operator experience. No fluff.
        </p>

        {/* Custom input — above chips */}
        <div style={{ display:"flex", maxWidth:"540px", margin:"0 auto 1.25rem",
          gap:"0.5rem", opacity:0, animation:"fadeUp 0.7s 0.4s forwards" }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") go(query.trim() || undefined); }}
            placeholder="Ask your question..."
            style={{ flex:1, padding:"0.7rem 1.1rem", borderRadius:"20px",
              border:"1px solid #E8E8E8",
              fontFamily:"'Inter Tight', sans-serif", fontSize:"0.85rem",
              color:"#0D0D0D", outline:"none", backgroundColor:"#FAFAFA",
              transition:"border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = "#0D0D0D"}
            onBlur={e => e.target.style.borderColor = "#E8E8E8"}
          />
          <button onClick={() => go(query.trim() || undefined)}
            style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
              fontSize:"0.82rem", color:"#fff", backgroundColor:"#C8512A",
              border:"none", borderRadius:"20px", padding:"0.7rem 1.5rem",
              cursor:"pointer", whiteSpace:"nowrap", transition:"opacity 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Ask →
          </button>
        </div>

        {/* Question chips — short labels, below input */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center",
          gap:"0.5rem", marginBottom:"1.5rem",
          opacity:0, animation:"fadeUp 0.7s 0.5s forwards" }}>
          {QUESTIONS.map((item, i) => (
            <button key={i} onClick={() => go(item.q)}
              style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                fontSize:"0.78rem", color:"#555555",
                backgroundColor:"#F5F5F5", border:"1px solid #E0E0E0",
                borderRadius:"20px", padding:"0.4rem 0.9rem",
                cursor:"pointer", transition:"all 0.15s ease", lineHeight:1.4 }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#EAEAEA";e.currentTarget.style.borderColor="#BDBDBD";e.currentTarget.style.color="#0D0D0D";}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor="#F5F5F5";e.currentTarget.style.borderColor="#E0E0E0";e.currentTarget.style.color="#555555";}}>
              {item.chip}
            </button>
          ))}
        </div>

        {/* Attribution */}
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
          fontSize:"0.68rem", color:"#BBBBBB",
          opacity:0, animation:"fadeUp 0.7s 0.6s forwards" }}>
          Powered by Divine · Anthropic Claude · $0.05 per question
        </p>

      </div>
    </section>
  );
}

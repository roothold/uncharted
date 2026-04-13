import { useState } from "react";

const QUESTIONS = [
  { q:"Should I raise now or wait 6 months?",                  domain:"Fundraising" },
  { q:"My co-founder wants to pivot. How do I think about this?", domain:"Strategy" },
  { q:"When should I hire my first salesperson?",               domain:"Hiring" },
  { q:"Our margins are compressing. What do I cut first?",      domain:"Operations" },
  { q:"How do I price this for enterprise vs. SMB?",            domain:"Pricing" },
  { q:"We have 3 months of runway. What are our real options?", domain:"Capital" },
];

const DIVINE_COMPOSITE = {
  id:"3", name:"Divine Composite",
  title:"All domains · Cross-functional advice",
  domains:["Strategy","Operations","Fundraising","Growth"],
};

export default function DivineHero({ onAskMore }) {
  const [active, setActive]     = useState(null);   // active question index
  const [response, setResponse] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [typed, setTyped]       = useState("");

  const ask = async (question) => {
    if (loading) return;
    setActive(question);
    setResponse(null);
    setTyped("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:600,
          system:`You are Divine — an AI tool built for founders, operating through the lens of the Divine Composite framework (all domains, cross-functional). Give a direct, practical answer. No fluff, no caveats. Think like an experienced operator. Start with a one-sentence bottom line, then 2–3 short paragraphs. Be honest even if it's uncomfortable. Keep your total response under 200 words — this is a quick insight, not an essay.`,
          messages:[{ role:"user", content:question }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type==="text")?.text || "Unable to retrieve a response. Please try again.";
      setResponse(text);

      // Type out the response
      let i = 0;
      const t = setInterval(() => {
        setTyped(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(t);
      }, 14);
    } catch {
      setResponse("Connection error. Please try again.");
      setTyped("Connection error. Please try again.");
    }
    setLoading(false);
  };

  const reset = () => { setActive(null); setResponse(null); setTyped(""); };

  return (
    <section style={{
      paddingTop:"56px", // nav height
      backgroundColor:"#FFFFFF",
      borderBottom:"1px solid #E8E8E8",
    }}>
      <div style={{ maxWidth:"860px", margin:"0 auto", padding:"7rem 3rem 6rem", textAlign:"center" }}>

        {/* Eyebrow */}
        <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
          fontSize:"0.7rem", color:"#B8962E", letterSpacing:"0.14em",
          textTransform:"uppercase", marginBottom:"1.5rem",
          opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
          Divine · Ask anything
        </p>

        {/* Headline */}
        <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400,
          fontSize:"clamp(2.2rem, 5vw, 4.2rem)", lineHeight:1.1, color:"#0D0D0D",
          marginBottom:"1rem",
          opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
          {active
            ? <><em style={{ fontStyle:"italic", color:"#888" }}>"{active}"</em></>
            : "What decision are you\nworking through?"}
        </h1>

        {/* Sub */}
        {!active && (
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
            fontSize:"1rem", lineHeight:1.8, color:"#888888",
            marginBottom:"3rem", maxWidth:"500px", margin:"0 auto 3rem",
            opacity:0, animation:"fadeUp 0.7s 0.3s forwards" }}>
            Real answers from operator experience. Pick a question or type your own below.
          </p>
        )}

        {/* Response area */}
        {(loading || response) && (
          <div style={{ margin:"2rem auto", maxWidth:"640px", textAlign:"left",
            padding:"1.75rem 2rem", backgroundColor:"#FAFAFA",
            border:"1px solid #E8E8E8", borderRadius:"12px",
            animation:"fadeUp 0.3s ease" }}>
            {loading && !response && (
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%",
                  backgroundColor:"#C8512A", animation:"blink 0.8s step-end infinite" }} />
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.88rem", color:"#888" }}>Working on your answer...</p>
              </div>
            )}
            {typed && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1rem" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:"#C8512A" }} />
                  <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.62rem",
                    color:"#C8512A", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                    Divine Composite
                  </span>
                </div>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                  fontSize:"0.92rem", lineHeight:1.9, color:"#0D0D0D",
                  whiteSpace:"pre-wrap", marginBottom:"1.5rem" }}>
                  {typed}
                  {typed.length < (response?.length || 0) && (
                    <span style={{ color:"#C8512A", animation:"blink 0.7s step-end infinite" }}>▌</span>
                  )}
                </p>
                <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                  <button onClick={onAskMore}
                    style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
                      fontSize:"0.78rem", color:"#fff", backgroundColor:"#C8512A",
                      border:"none", borderRadius:"20px", padding:"0.55rem 1.25rem",
                      cursor:"pointer" }}>
                    Go deeper →
                  </button>
                  <button onClick={reset}
                    style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                      fontSize:"0.78rem", color:"#888", backgroundColor:"transparent",
                      border:"1px solid #E8E8E8", borderRadius:"20px",
                      padding:"0.55rem 1.25rem", cursor:"pointer" }}>
                    Ask another
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Question chips */}
        {!active && (
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center",
            gap:"0.5rem", marginBottom:"2rem",
            opacity:0, animation:"fadeUp 0.7s 0.4s forwards" }}>
            {QUESTIONS.map((item, i) => (
              <button key={i} onClick={() => ask(item.q)}
                style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                  fontSize:"0.82rem", color:"#555",
                  backgroundColor:"#F5F5F5", border:"1px solid #E0E0E0",
                  borderRadius:"20px", padding:"0.5rem 1.1rem",
                  cursor:"pointer", transition:"all 0.15s ease",
                  lineHeight:1.4 }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "#EDEDED";
                  e.currentTarget.style.borderColor = "#BDBDBD";
                  e.currentTarget.style.color = "#0D0D0D";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "#F5F5F5";
                  e.currentTarget.style.borderColor = "#E0E0E0";
                  e.currentTarget.style.color = "#555";
                }}>
                {item.q}
              </button>
            ))}
          </div>
        )}

        {/* Custom input */}
        {!active && (
          <div style={{ display:"flex", maxWidth:"560px", margin:"0 auto", gap:"0.5rem",
            opacity:0, animation:"fadeUp 0.7s 0.5s forwards" }}>
            <input
              type="text"
              placeholder="Or type your own question..."
              onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) ask(e.target.value.trim()); }}
              style={{ flex:1, padding:"0.7rem 1.1rem", borderRadius:"20px",
                border:"1px solid #E0E0E0", fontFamily:"'Inter Tight', sans-serif",
                fontSize:"0.85rem", color:"#0D0D0D", outline:"none",
                backgroundColor:"#FAFAFA", transition:"border-color 0.15s" }}
              onFocus={e => e.target.style.borderColor = "#0D0D0D"}
              onBlur={e => e.target.style.borderColor = "#E0E0E0"}
            />
            <button
              onClick={e => {
                const input = e.currentTarget.previousSibling;
                if (input.value.trim()) ask(input.value.trim());
              }}
              style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
                fontSize:"0.82rem", color:"#fff", backgroundColor:"#C8512A",
                border:"none", borderRadius:"20px", padding:"0.7rem 1.5rem",
                cursor:"pointer", whiteSpace:"nowrap", transition:"opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Ask →
            </button>
          </div>
        )}

        {/* Attribution */}
        {!active && (
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
            fontSize:"0.68rem", color:"#BBBBBB", marginTop:"1.5rem",
            opacity:0, animation:"fadeUp 0.7s 0.6s forwards" }}>
            Powered by Divine · Anthropic Claude · $0.05 per question
          </p>
        )}

      </div>
    </section>
  );
}

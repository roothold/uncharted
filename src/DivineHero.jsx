import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  { q:"Should I raise now or wait 6 months?",                   domain:"Fundraising" },
  { q:"My co-founder wants to pivot. How do I think about this?",domain:"Strategy"   },
  { q:"When should I hire my first salesperson?",                domain:"Hiring"      },
  { q:"Our margins are compressing. What do I cut first?",       domain:"Operations"  },
  { q:"How do I price this for enterprise vs. SMB?",             domain:"Pricing"     },
  { q:"We have 3 months of runway. What are our real options?",  domain:"Capital"     },
];

const COMPOSITE = {
  name:"Divine Composite",
  title:"All domains · Cross-functional advice",
  domains:["Strategy","Operations","Fundraising","Growth"],
};

const W = {
  card:"#FFFFFF", cardBorder:"#E8E8E8", cardHover:"#F7F7F7",
  ink:"#0D0D0D", inkMid:"#555555", inkSoft:"#888888",
  accent:"#C8512A",
};

export default function DivineHero({ onAskMore }) {
  const [query, setQuery]       = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [typed, setTyped]       = useState("");
  const inputRef = useRef(null);

  // Typewriter — identical to Divine.jsx (16ms)
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

  const ask = async (q) => {
    const question = q || query;
    if (!question.trim() || loading) return;
    if (q) setQuery(q);
    setLoading(true);
    setResponse(null);
    setTyped("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:600,
          system:`You are Divine — an AI tool built for founders. You're operating through the lens of "${COMPOSITE.name}", ${COMPOSITE.title}. Their domains: ${COMPOSITE.domains.join(", ")}. Give a direct, practical answer. No fluff, no caveats. Think like an operator who has seen this problem before. Start with a one-sentence bottom line, then unpack it in 2–3 short paragraphs. Be honest even if it's uncomfortable. Keep total response under 220 words.`,
          messages:[{ role:"user", content:question }]
        })
      });
      const data = await res.json();
      setResponse(data.content?.find(b => b.type==="text")?.text || "Unable to retrieve a response. Please try again.");
    } catch {
      setResponse("Connection error. Please try again.");
    }
    setLoading(false);
  };

  const reset = () => { setQuery(""); setResponse(null); setTyped(""); };

  const goToFull = () => {
    const url = query.trim()
      ? `https://divine.uncharted.ventures/?q=${encodeURIComponent(query)}`
      : "https://divine.uncharted.ventures/";
    window.open(url, "_blank", "noopener noreferrer");
  };

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
          {response || loading
            ? <><em style={{ fontStyle:"italic", color:"#AAAAAA" }}>"{query}"</em></>
            : "What decision are you\nworking through?"}
        </h1>

        {!response && !loading && (
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
            fontSize:"0.95rem", lineHeight:1.8, color:"#888888",
            maxWidth:"460px", margin:"0 auto 2.5rem",
            opacity:0, animation:"fadeUp 0.7s 0.3s forwards" }}>
            Real answers from operator experience. No fluff.
          </p>
        )}

        {/* ── Response panel — matches Divine.jsx exactly ── */}
        {(loading || response) && (
          <div style={{ margin:"1.75rem auto 1.75rem", maxWidth:"680px", textAlign:"left",
            border:`1px solid ${W.cardBorder}`, borderRadius:"8px",
            overflow:"hidden", backgroundColor:W.card,
            animation:"fadeUp 0.3s ease" }}>

            {/* Panel header — same as Divine */}
            <div style={{ padding:"0.7rem 1.25rem", borderBottom:`1px solid ${W.cardBorder}`,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              backgroundColor:"#F7F7F7" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%",
                  backgroundColor: loading ? "#CCCCCC" : W.accent,
                  transition:"background 0.3s",
                  animation: loading ? "blink 0.8s step-end infinite" : "none" }} />
                <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.68rem",
                  fontWeight:500, color: loading ? W.inkSoft : W.ink }}>
                  {loading ? "Working..." : COMPOSITE.name}
                </span>
              </div>
              <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.58rem",
                color:W.inkSoft }}>Divine · v1.4</span>
            </div>

            {/* Panel body — same states as Divine */}
            <div style={{ padding:"1.75rem", minHeight:"140px" }}>
              {loading && !response && (
                <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.82rem",
                    color:W.accent }}>Working on your answer...</p>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                    fontSize:"0.8rem", color:W.inkSoft }}>
                    Applying {COMPOSITE.name} framework.
                  </p>
                </div>
              )}
              {response && !loading && (
                <div>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.58rem",
                    color:W.accent, letterSpacing:"0.1em", marginBottom:"1rem" }}>
                    ✦ {COMPOSITE.name.toUpperCase()} · {new Date().toLocaleTimeString()}
                  </p>
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
                    fontSize:"0.9rem", lineHeight:1.9, color:W.ink, whiteSpace:"pre-wrap",
                    marginBottom:"1.5rem" }}>
                    {typed}
                    <span style={{ color:W.accent, animation:"blink 0.7s step-end infinite" }}>
                      {typed.length < response.length ? "▌" : ""}
                    </span>
                  </p>
                  {/* CTAs after full response typed */}
                  {typed.length >= response.length && (
                    <div style={{ display:"flex", gap:"0.65rem", flexWrap:"wrap",
                      paddingTop:"1rem", borderTop:`1px solid ${W.cardBorder}` }}>
                      <button onClick={goToFull}
                        style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
                          fontSize:"0.78rem", color:"#fff", backgroundColor:W.accent,
                          border:"none", borderRadius:"20px", padding:"0.55rem 1.25rem",
                          cursor:"pointer", transition:"opacity 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                        onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                        Go deeper on Divine →
                      </button>
                      <button onClick={reset}
                        style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                          fontSize:"0.78rem", color:W.inkMid, backgroundColor:"transparent",
                          border:`1px solid ${W.cardBorder}`, borderRadius:"20px",
                          padding:"0.55rem 1.25rem", cursor:"pointer", transition:"all 0.15s" }}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor="#888";e.currentTarget.style.color=W.ink;}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=W.cardBorder;e.currentTarget.style.color=W.inkMid;}}>
                        Ask another
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Question chips ── */}
        {!loading && !response && (
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center",
            gap:"0.5rem", marginBottom:"1.75rem",
            opacity:0, animation:"fadeUp 0.7s 0.4s forwards" }}>
            {QUESTIONS.map((item, i) => (
              <button key={i} onClick={() => ask(item.q)}
                style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:400,
                  fontSize:"0.82rem", color:"#555555",
                  backgroundColor:"#F5F5F5", border:"1px solid #E0E0E0",
                  borderRadius:"20px", padding:"0.5rem 1.1rem",
                  cursor:"pointer", transition:"all 0.15s ease", lineHeight:1.4 }}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor="#EAEAEA";e.currentTarget.style.borderColor="#BDBDBD";e.currentTarget.style.color="#0D0D0D";}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor="#F5F5F5";e.currentTarget.style.borderColor="#E0E0E0";e.currentTarget.style.color="#555555";}}>
                {item.q}
              </button>
            ))}
          </div>
        )}

        {/* ── Custom input — linked to divine.uncharted.ventures ── */}
        {!loading && !response && (
          <div style={{ display:"flex", maxWidth:"540px", margin:"0 auto",
            gap:"0.5rem", opacity:0, animation:"fadeUp 0.7s 0.5s forwards" }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && query.trim()) ask();
              }}
              placeholder="Or type your own question..."
              style={{ flex:1, padding:"0.7rem 1.1rem", borderRadius:"20px",
                border:`1px solid ${W.cardBorder}`,
                fontFamily:"'Inter Tight', sans-serif", fontSize:"0.85rem",
                color:W.ink, outline:"none", backgroundColor:"#FAFAFA",
                transition:"border-color 0.15s" }}
              onFocus={e => e.target.style.borderColor = W.ink}
              onBlur={e => e.target.style.borderColor = W.cardBorder}
            />
            <button onClick={() => query.trim() ? ask() : goToFull()}
              style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:500,
                fontSize:"0.82rem", color:"#fff", backgroundColor:W.accent,
                border:"none", borderRadius:"20px", padding:"0.7rem 1.5rem",
                cursor:"pointer", whiteSpace:"nowrap", transition:"opacity 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Ask →
            </button>
          </div>
        )}

        {/* Attribution */}
        {!loading && !response && (
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300,
            fontSize:"0.68rem", color:"#BBBBBB", marginTop:"1.25rem",
            opacity:0, animation:"fadeUp 0.7s 0.6s forwards" }}>
            Powered by Divine · Anthropic Claude · $0.05 per question
          </p>
        )}

      </div>
    </section>
  );
}

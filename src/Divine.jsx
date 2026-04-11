import { useState, useEffect, useRef } from "react";

const C = {
  charcoal: "#121212",
  deep: "#0a0a0a",
  paper: "#F5F5F5",
  gold: "#D4AF37",
  goldDim: "rgba(212,175,55,0.12)",
  goldBorder: "rgba(212,175,55,0.3)",
  dim: "rgba(245,245,245,0.5)",
  dimmer: "rgba(245,245,245,0.2)",
  border: "rgba(245,245,245,0.07)",
  green: "#4ade80",
};

const THINKERS = [
  { id:"1", name:"Kshitij Patil", title:"Operations · Supply Chain · AI", domains:["Operations","Capital Allocation","AI Infrastructure"], tier:"Strategy", price:"$0.50" },
  { id:"2", name:"Michael Akindele", title:"Product · Brand · Venture Building", domains:["Product Strategy","Brand Building","Venture Design"], tier:"Prophecy", price:"$2.50" },
  { id:"3", name:"Divine Composite", title:"All domains · Cross-functional advice", domains:["Strategy","Operations","Fundraising","Growth"], tier:"Prophecy", price:"$2.50" },
];

const INSIGHT_LOGS = [
  { time:"09:14:32", level:"INSIGHT", msg:"Sweetkiwi — retail pricing reviewed. Recommendation: hold margin, increase unit volume.", thinker:"Kshitij Patil" },
  { time:"09:14:45", level:"SIGNAL", msg:"Surplus — founder asked about hiring first salesperson. Direct answer delivered.", thinker:"Michael Akindele" },
  { time:"09:15:01", level:"INSIGHT", msg:"Anonymous — fundraising deck reviewed. Three issues flagged before investor meeting.", thinker:"Divine Composite" },
  { time:"09:15:34", level:"SIGNAL", msg:"Sweetkiwi — competitor entered market. Response strategy drafted and reviewed.", thinker:"Kshitij Patil" },
  { time:"09:15:52", level:"INSIGHT", msg:"Surplus — cash flow question answered. 30/60/90 day action plan generated.", thinker:"Michael Akindele" },
];

function LogLevel({ level }) {
  const colors = { INSIGHT: C.gold, PROTOCOL: "#60a5fa", SIGNAL: C.green, FOUNDRY: C.dimmer };
  return (
    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", letterSpacing:"0.1em", color: colors[level] || C.dim, backgroundColor:`${colors[level] || C.dim}18`, padding:"0.15rem 0.4rem", borderRadius:"2px" }}>
      {level}
    </span>
  );
}

export default function DivinePage({ onBack }) {
  const [activeTab, setActiveTab] = useState("portal");
  const [selectedThinker, setSelectedThinker] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logVisible, setLogVisible] = useState(0);
  const [typedResponse, setTypedResponse] = useState("");
  const termRef = useRef(null);

  useEffect(() => {
    if (logVisible < INSIGHT_LOGS.length) {
      const t = setTimeout(() => setLogVisible(n => n + 1), 600);
      return () => clearTimeout(t);
    }
  }, [logVisible]);

  useEffect(() => {
    if (!response) return;
    setTypedResponse("");
    let i = 0;
    const t = setInterval(() => {
      setTypedResponse(response.slice(0, i));
      i++;
      if (i > response.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [response]);

  const handleQuery = async () => {
    if (!query.trim() || !selectedThinker) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are the Divine Intelligence Protocol — a cognitive operating system for sovereign founders. You are operating as "${selectedThinker.name}", ${selectedThinker.title}. Your domains of mastery: ${selectedThinker.domains.join(", ")}. You are part of Uncharted Ventures' intelligence layer. Respond with precision, signal-over-noise, and institutional authority. Be direct, strategic, and decisive. Frame your response as a "Perspective" — not generic advice but encoded intelligence specific to this founder's decision. Keep responses to 3–5 focused paragraphs. Begin with a one-sentence "Signal Summary." Use the tone of a world-class operator who has seen the pattern before.`,
          messages: [{ role: "user", content: query }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Signal temporarily unavailable. Retry transmission.";
      setResponse(text);
    } catch {
      setResponse("Transmission error. Verify your connection to the Divine network and retry.");
    }
    setLoading(false);
  };

  const tabs = [
    { id:"portal", label:"Ask a Question" },
    { id:"logs", label:"Recent Sessions" },
    { id:"thinkers", label:"Thinking Frameworks" },
  ];

  return (
    <div style={{ backgroundColor:C.deep, color:C.paper, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::selection { background:${C.gold}; color:${C.charcoal}; }
        .divine-input { background:rgba(245,245,245,0.04); border:1px solid rgba(245,245,245,0.1); color:${C.paper}; transition:border-color 0.2s ease; }
        .divine-input:focus { outline:none; border-color:${C.gold}; }
        .divine-input::placeholder { color:${C.dimmer}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        @keyframes blink { 50%{opacity:0;} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.2;} }
        @keyframes scanDown { 0%{transform:translateY(-100%);}100%{transform:translateY(400%);} }
        .tab-btn { transition:all 0.2s ease; cursor:pointer; background:none; border:none; }
        .thinker-card { transition:all 0.3s ease; cursor:pointer; }
        .thinker-card:hover { border-color:${C.goldBorder} !important; background:rgba(212,175,55,0.04) !important; }
      `}</style>

      {/* Top bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(10,10,10,0.96)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.goldBorder}`, padding:"0 2.5rem" }}>
        <div style={{ maxWidth:"1360px", margin:"0 auto", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:C.dimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.08em", display:"flex", alignItems:"center", gap:"0.5rem", padding:0, transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.paper}
              onMouseLeave={e => e.target.style.color = C.dimmer}
            >← UNCHARTED</button>
            <div style={{ width:"1px", height:"20px", backgroundColor:C.border }} />
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
              <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase" }}>Divine Intelligence Protocol · v1.4 · Live</span>
            </div>
          </div>
          <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.dimmer, letterSpacing:"0.1em" }}>
            divine.uncharted.ventures
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1360px", margin:"0 auto", padding:"5rem 2.5rem 4rem" }}>

        {/* Page header */}
        <div style={{ marginBottom:"3rem", opacity:0, animation:"fadeUp 0.7s 0.1s forwards" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.14em", color:C.gold, textTransform:"uppercase" }}>✦ Divine · AI Tool for Founders</span>
          </div>
          <h1 style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:800, fontSize:"clamp(2rem, 4vw, 3.5rem)", lineHeight:1.05, letterSpacing:"-0.03em", color:C.paper, marginBottom:"0.75rem" }}>
            Ask a hard question.<br /><span style={{ color:C.gold }}>Get a real answer.</span>
          </h1>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", color:C.dim, maxWidth:"500px", lineHeight:1.7 }}>
            Select a thinking framework, type your question, and get a direct response shaped by real operator experience — not generic AI advice.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"0", borderBottom:`1px solid ${C.border}`, marginBottom:"2.5rem", opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
          {tabs.map(tab => (
            <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
              style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.75rem 1.5rem", color: activeTab === tab.id ? C.gold : C.dimmer, borderBottom: activeTab === tab.id ? `2px solid ${C.gold}` : "2px solid transparent", marginBottom:"-1px" }}
            >{tab.label}</button>
          ))}
        </div>

        {/* ── PORTAL TAB ── */}
        {activeTab === "portal" && (
          <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:"1.5rem", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>

            {/* Thinker selector */}
            <div>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", letterSpacing:"0.12em", color:C.dimmer, textTransform:"uppercase", marginBottom:"0.75rem" }}>Choose a Framework</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {THINKERS.map(t => (
                  <div key={t.id} className="thinker-card"
                    onClick={() => setSelectedThinker(t)}
                    style={{ padding:"1rem", border:`1px solid ${selectedThinker?.id === t.id ? C.gold : C.border}`, borderRadius:"2px", backgroundColor: selectedThinker?.id === t.id ? C.goldDim : "transparent", position:"relative" }}
                  >
                    {selectedThinker?.id === t.id && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"2px", backgroundColor:C.gold }} />}
                    <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"0.82rem", color:C.paper, marginBottom:"0.2rem" }}>{t.name}</div>
                    <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer, letterSpacing:"0.06em", marginBottom:"0.5rem" }}>{t.title}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.gold, letterSpacing:"0.06em" }}>{t.tier}</span>
                      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer }}>{t.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Proof of Intelligence box */}
              <div style={{ marginTop:"1.5rem", padding:"1rem", border:`1px solid ${C.goldBorder}`, borderRadius:"2px", backgroundColor:"rgba(212,175,55,0.04)" }}>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.gold, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Session Info</div>
                {[["Frameworks","3 Available"],["Version","v1.4"],["Uptime","99.97%"],["Cost","$0.05 / query"]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer }}>{k}</span>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.paper }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Query terminal */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div style={{ backgroundColor:"#0d0d0d", border:`1px solid ${C.border}`, borderRadius:"4px", overflow:"hidden", flex:1 }}>
                {/* Terminal header */}
                <div style={{ padding:"0.65rem 1rem", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:"rgba(212,175,55,0.03)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <div style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor: selectedThinker ? C.gold : C.dimmer, transition:"background 0.3s" }} />
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color: selectedThinker ? C.gold : C.dimmer, letterSpacing:"0.1em" }}>
                      {selectedThinker ? `FRAMEWORK: ${selectedThinker.name.toUpperCase()}` : "NO FRAMEWORK SELECTED"}
                    </span>
                  </div>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer }}>DIVINE · v1.4</span>
                </div>

                {/* Response area */}
                <div style={{ padding:"1.5rem", minHeight:"280px", position:"relative" }}>
                  {!selectedThinker && (
                    <div style={{ color:C.dimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.06em" }}>
                      › Choose a framework on the left to get started...<span style={{ animation:"blink 0.9s step-end infinite" }}>_</span>
                    </div>
                  )}
                  {selectedThinker && !loading && !response && (
                    <div style={{ color:C.dimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", letterSpacing:"0.06em" }}>
                      › <span style={{ color:C.gold }}>{selectedThinker.name}</span> is ready. Type your question below.<span style={{ animation:"blink 0.9s step-end infinite" }}>_</span>
                    </div>
                  )}
                  {loading && (
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                      <div style={{ color:C.gold, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem" }}>
                        › Working on your answer<span style={{ animation:"blink 0.6s step-end infinite" }}>...</span>
                      </div>
                      <div style={{ color:C.dimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", marginTop:"0.5rem" }}>
                        › Applying {selectedThinker?.name} framework...
                      </div>
                      <div style={{ color:C.dimmer, fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem" }}>
                        › Building your response...
                      </div>
                    </div>
                  )}
                  {response && !loading && (
                    <div>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.gold, letterSpacing:"0.1em", marginBottom:"0.75rem" }}>
                        ✦ ANSWER · {selectedThinker?.name?.toUpperCase()} · {new Date().toLocaleTimeString()}
                      </div>
                      <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", lineHeight:1.8, color:C.paper, whiteSpace:"pre-wrap" }}>
                        {typedResponse}<span style={{ animation:"blink 0.7s step-end infinite", color:C.gold }}>{typedResponse.length < response.length ? "_" : ""}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Query input */}
              <div style={{ display:"flex", gap:"0.75rem" }}>
                <textarea
                  className="divine-input"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="What decision are you working through? Ask anything — strategy, hiring, pricing, fundraising..."
                  rows={3}
                  style={{ flex:1, padding:"0.85rem 1rem", borderRadius:"2px", fontSize:"0.85rem", fontFamily:"'Inter Tight', sans-serif", resize:"none", lineHeight:1.6 }}
                  onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleQuery(); }}
                />
                <button onClick={handleQuery} disabled={!selectedThinker || !query.trim() || loading}
                  style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", color:C.charcoal, backgroundColor: (!selectedThinker || !query.trim() || loading) ? "rgba(212,175,55,0.4)" : C.gold, border:"none", borderRadius:"2px", padding:"0 1.5rem", cursor: (!selectedThinker || !query.trim() || loading) ? "not-allowed" : "pointer", textTransform:"uppercase", transition:"all 0.2s ease", minWidth:"100px" }}
                >
                  {loading ? "···" : "Ask ✦"}
                </button>
              </div>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer, letterSpacing:"0.06em" }}>
                ⌘ + Enter to submit · $0.05 per question · Powered by Anthropic Claude
              </div>
            </div>
          </div>
        )}

        {/* ── LOGS TAB ── */}
        {activeTab === "logs" && (
          <div style={{ opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
            <div style={{ backgroundColor:"#0d0d0d", border:`1px solid ${C.border}`, borderRadius:"4px", overflow:"hidden" }}>
              <div style={{ padding:"0.65rem 1rem", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:"rgba(212,175,55,0.03)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.gold, letterSpacing:"0.1em" }}>RECENT SESSIONS · LIVE</span>
                </div>
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer }}>{INSIGHT_LOGS.length} SESSIONS SHOWN</span>
              </div>
              <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                {INSIGHT_LOGS.slice(0, logVisible).map((log, i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"70px 80px 1fr 160px", gap:"1rem", alignItems:"start", padding:"0.75rem", borderBottom:`1px solid ${C.border}`, opacity:0, animation:`fadeUp 0.4s forwards` }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer }}>{log.time}</span>
                    <LogLevel level={log.level} />
                    <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.82rem", color:C.paper, lineHeight:1.5 }}>{log.msg}</span>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.dimmer, textAlign:"right", letterSpacing:"0.06em" }}>{log.thinker}</span>
                  </div>
                ))}
                {logVisible < INSIGHT_LOGS.length && (
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.gold }}>
                    › Loading sessions<span style={{ animation:"blink 0.5s step-end infinite" }}>...</span>
                  </div>
                )}
                {logVisible >= INSIGHT_LOGS.length && (
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.dimmer }}>
                    › All sessions shown.<span style={{ animation:"blink 1s step-end infinite" }}>_</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── THINKERS TAB ── */}
        {activeTab === "thinkers" && (
          <div style={{ opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
            <div style={{ marginBottom:"1.5rem", fontFamily:"'Inter Tight', sans-serif", fontSize:"0.88rem", color:C.dim, lineHeight:1.7, maxWidth:"560px" }}>
              Each framework is built from the real experience of a founder or operator. Pick one that fits your situation, then ask your question.
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1px", backgroundColor:C.border }}>
              {THINKERS.map(t => (
                <div key={t.id} className="thinker-card"
                  onClick={() => { setSelectedThinker(t); setActiveTab("portal"); }}
                  style={{ backgroundColor:C.charcoal, padding:"2rem", border:`1px solid transparent`, borderRadius:"0" }}
                >
                  <div style={{ width:"44px", height:"44px", borderRadius:"50%", border:`1.5px solid ${C.goldBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem" }}>
                    <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:700, fontSize:"0.9rem", color:C.gold }}>{t.name.charAt(0)}</span>
                  </div>
                  <div style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:600, fontSize:"1rem", color:C.paper, marginBottom:"0.25rem" }}>{t.name}</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.06em", marginBottom:"1rem" }}>{t.title}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginBottom:"1.25rem" }}>
                    {t.domains.map(d => (
                      <span key={d} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.52rem", color:C.dimmer, border:`1px solid ${C.border}`, padding:"0.2rem 0.5rem", borderRadius:"2px", letterSpacing:"0.06em" }}>{d}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.gold, letterSpacing:"0.08em" }}>{t.tier} · {t.price}</span>
                    <span style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:"0.75rem", color:C.gold }}>Use this →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Capital bar */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, backgroundColor:"rgba(10,10,10,0.97)", backdropFilter:"blur(12px)", borderTop:`1px solid ${C.goldBorder}`, padding:"0.4rem 2.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.gold, letterSpacing:"0.1em" }}>
          ✦ Divine · AI tool by Uncharted Ventures
        </span>
        <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.dimmer, letterSpacing:"0.08em" }}>
          divine.uncharted.ventures
        </span>
      </div>
    </div>
  );
}

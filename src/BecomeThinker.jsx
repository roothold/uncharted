import { useState } from "react";

const C = {
  bg:      "#FFFFFF",
  ink:     "#0D0D0D",
  inkMid:  "#555555",
  inkSoft: "#888888",
  accent:  "#C8512A",
  accentHover: "#A83E1E",
  gold:    "#B8962E",
  border:  "#E8E8E8",
  soft:    "#F7F7F7",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@400;500&display=swap');`;

const VERTICALS = [
  "Strategy","Design","Logistics","Philosophy",
  "Finance","Operations","Technology","Culture",
];

export default function BecomeThinker({ onBack }) {
  const [form, setForm]           = useState({ name:"", alias:"", lens:"", verticals:[] });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (v) =>
    setForm(f => ({
      ...f,
      verticals: f.verticals.includes(v) ? f.verticals.filter(x => x !== v) : [...f.verticals, v],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.lens || form.verticals.length === 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 600)); // brief pause for feel
    setSubmitting(false);
    setSubmitted(true);
  };

  const canSubmit = form.name && form.lens && form.verticals.length > 0;

  return (
    <div style={{ backgroundColor:C.bg, minHeight:"100vh", display:"flex", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }

        .bt-input {
          width:100%; padding:0.85rem 0; background:transparent;
          border:none; border-bottom:1px solid ${C.border};
          color:${C.ink}; font-family:'Inter Tight',sans-serif;
          font-size:0.9rem; outline:none; transition:border-color 0.2s;
        }
        .bt-input:focus { border-bottom-color:${C.ink}; }
        .bt-input::placeholder { color:${C.inkSoft}; }
        .bt-textarea {
          width:100%; padding:0.85rem 0; background:transparent;
          border:none; border-bottom:1px solid ${C.border};
          color:${C.ink}; font-family:'Inter Tight',sans-serif;
          font-size:0.9rem; outline:none; resize:none;
          line-height:1.7; transition:border-color 0.2s;
        }
        .bt-textarea:focus { border-bottom-color:${C.ink}; }
        .bt-textarea::placeholder { color:${C.inkSoft}; }

        .vert { 
          padding:0.45rem 1rem; border:1px solid ${C.border};
          background:transparent; color:${C.inkMid};
          font-family:'JetBrains Mono',monospace; font-size:0.65rem;
          letter-spacing:0.08em; text-transform:uppercase;
          cursor:pointer; transition:all 0.2s ease;
        }
        .vert:hover { border-color:${C.ink}; color:${C.ink}; }
        .vert.on { border-color:${C.accent}; color:${C.accent}; background:rgba(200,81,42,0.06); }

        .cta {
          width:100%; padding:1rem; background:${C.accent}; color:#fff;
          font-family:'JetBrains Mono',monospace; font-weight:500;
          font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase;
          border:none; cursor:pointer; transition:all 0.2s ease;
        }
        .cta:hover:not(:disabled) { background:${C.accentHover}; transform:translateY(-1px); }
        .cta:disabled { opacity:0.45; cursor:not-allowed; }

        .back-btn { transition:opacity 0.2s; } .back-btn:hover { opacity:0.5; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
        @keyframes pulse  { 0%,100%{opacity:1;}50%{opacity:0.3;} }

        /* ── Responsive ── */
        @media(max-width:900px){ .bt-left{ display:none !important; } .bt-right{ width:100% !important; } }
        @media(max-width:600px){ .bt-right{ padding:5rem 1.5rem 3rem !important; } }
      `}</style>

      {/* ── LEFT — Avant-Garde Image Panel ── */}
      <div className="bt-left" style={{
        width:"42%", flexShrink:0, position:"sticky", top:0, height:"100vh",
        backgroundImage:"url(/thinker-bg.jpg)", backgroundSize:"cover",
        backgroundPosition:"center", overflow:"hidden",
      }}>
        {/* Gradient overlay — darkens bottom for text */}
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Logo + back in top-left */}
        <div style={{ position:"absolute", top:"2.5rem", left:"2.5rem", zIndex:10,
          display:"flex", alignItems:"center", gap:"1rem" }}>
          <button onClick={onBack} className="back-btn" style={{ background:"none", border:"none",
            cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", padding:0 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem",
              color:"rgba(255,255,255,0.7)", letterSpacing:"0.08em" }}>← Uncharted</span>
          </button>
        </div>

        {/* Bottom caption */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"2.5rem", right:"2.5rem", zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.75rem" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%",
              backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
              color:"rgba(255,255,255,0.55)", letterSpacing:"0.12em", textTransform:"uppercase" }}>
              Divine · Thinker Network
            </span>
          </div>
          <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic",
            fontSize:"1.2rem", color:"rgba(255,255,255,0.85)", lineHeight:1.5, maxWidth:"280px" }}>
            "Your experience is worth more than you're charging."
          </p>
        </div>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="bt-right" style={{ flex:1, padding:"6rem 5rem 4rem",
        display:"flex", flexDirection:"column", justifyContent:"center",
        overflowY:"auto", minHeight:"100vh" }}>

        {submitted ? (

          /* ── Success ── */
          <div style={{ maxWidth:"440px", opacity:0, animation:"fadeUp 0.6s forwards" }}>
            <div style={{ width:"44px", height:"44px", border:`1.5px solid ${C.accent}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1rem", color:C.accent, marginBottom:"2rem" }}>✓</div>
            <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:600,
              fontSize:"2.5rem", color:C.ink, lineHeight:1.05, marginBottom:"1rem" }}>
              Request received.
            </h1>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300, fontSize:"0.92rem",
              lineHeight:1.85, color:C.inkMid, marginBottom:"2rem" }}>
              The Uncharted team will review your profile within 72 hours.
              If approved, you'll receive access to the Divine dashboard.
            </p>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              color:C.inkSoft, letterSpacing:"0.1em", textTransform:"uppercase" }}>
              Access to Divine is a privilege of the Uncharted Garrison
            </p>
          </div>

        ) : (

          /* ── Form ── */
          <div style={{ maxWidth:"440px", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>

            {/* Mobile back button */}
            <button onClick={onBack} className="back-btn" style={{ display:"none", background:"none",
              border:"none", cursor:"pointer", padding:0, marginBottom:"2rem",
              fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem",
              color:C.inkSoft, letterSpacing:"0.08em" }}
              id="mobile-back">← Back</button>

            {/* Header */}
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:500, fontSize:"0.65rem",
              color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1rem" }}>
              Divine · Become a Thinker
            </p>
            <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:600,
              fontSize:"clamp(2rem, 4vw, 3rem)", lineHeight:1.05, color:C.ink, marginBottom:"1rem" }}>
              Share your<br />perspective.
            </h1>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300, fontSize:"0.88rem",
              lineHeight:1.8, color:C.inkMid, marginBottom:"2.5rem" }}>
              Founders pay to think with you. Tell us who you are and how you see the world.
            </p>

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>

              {/* Name + Alias */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"0.58rem", color:C.inkSoft, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:"0.5rem" }}>Name *</label>
                  <input className="bt-input" type="text" placeholder="Your name"
                    value={form.name} required
                    onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                </div>
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"0.58rem", color:C.inkSoft, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:"0.5rem" }}>Alias</label>
                  <input className="bt-input" type="text" placeholder="Optional handle"
                    value={form.alias}
                    onChange={e => setForm(f => ({...f, alias:e.target.value}))} />
                </div>
              </div>

              {/* The Lens */}
              <div>
                <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                  fontSize:"0.58rem", color:C.inkSoft, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:"0.5rem" }}>
                  How do you filter signal from noise? *
                </label>
                <textarea className="bt-textarea" rows={4} required
                  placeholder="Describe how you think. What's your decision-making framework?"
                  value={form.lens}
                  onChange={e => setForm(f => ({...f, lens:e.target.value}))} />
              </div>

              {/* Verticals */}
              <div>
                <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                  fontSize:"0.58rem", color:C.inkSoft, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:"0.75rem" }}>
                  Your domains *
                </label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {VERTICALS.map(v => (
                    <button key={v} type="button"
                      className={`vert${form.verticals.includes(v) ? " on" : ""}`}
                      onClick={() => toggle(v)}>{v}</button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div style={{ paddingTop:"0.5rem" }}>
                <button type="submit" className="cta" disabled={!canSubmit || submitting}>
                  {submitting ? "Submitting..." : "Request Access →"}
                </button>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
                  color:C.inkSoft, letterSpacing:"0.06em", marginTop:"0.85rem",
                  textAlign:"center", lineHeight:1.7 }}>
                  Verification may take up to 72 hours.
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

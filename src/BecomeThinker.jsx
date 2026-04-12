import { useState } from "react";

const C = {
  ivory:       "#F9F8F6",
  onyx:        "#1A1A1A",
  onyxMid:     "#4A4A4A",
  onyxSoft:    "#8A8A8A",
  onyxDim:     "rgba(26,26,26,0.12)",
  rust:        "#C8512A",
  rustHover:   "#A83E1E",
  rustSoft:    "rgba(200,81,42,0.08)",
  gold:        "#D4AF37",
  goldSoft:    "rgba(212,175,55,0.12)",
  border:      "rgba(26,26,26,0.1)",
  borderStrong:"rgba(26,26,26,0.2)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');`;

const VERTICALS = ["Strategy","Design","Logistics","Philosophy","Finance","Operations","Technology","Culture"];

export default function BecomeThinker({ onBack }) {
  const [form, setForm] = useState({ name:"", alias:"", lens:"", verticals:[] });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const toggleVertical = (v) => {
    setForm(f => ({
      ...f,
      verticals: f.verticals.includes(v)
        ? f.verticals.filter(x => x !== v)
        : [...f.verticals, v]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.lens && form.verticals.length > 0) setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor:C.ivory, color:C.onyx, minHeight:"100vh", fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.rust}; color:#fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.4;} }
        @keyframes scanline { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }
        .field-input {
          width:100%; padding:0.9rem 1rem; background:${C.ivory}; border:1px solid ${C.border};
          color:${C.onyx}; font-family:'Inter Tight',sans-serif; font-size:0.88rem;
          outline:none; transition:border-color 0.2s ease; border-radius:0;
        }
        .field-input:focus { border-color:${C.rust}; }
        .field-input::placeholder { color:${C.onyxSoft}; }
        .vertical-btn {
          padding:0.55rem 1rem; border:1px solid ${C.border}; background:transparent;
          color:${C.onyxMid}; font-family:'JetBrains Mono',monospace; font-size:0.65rem;
          letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
          transition:all 0.2s ease;
        }
        .vertical-btn:hover { border-color:${C.rust}; color:${C.rust}; }
        .vertical-btn.active { border-color:${C.rust}; background:${C.rustSoft}; color:${C.rust}; }
        .transmit-btn {
          font-family:'JetBrains Mono',monospace; font-weight:600; font-size:0.78rem;
          letter-spacing:0.1em; text-transform:uppercase; color:#fff;
          background:${C.rust}; border:none; padding:1rem 2.5rem; cursor:pointer;
          transition:all 0.2s ease; width:100%;
        }
        .transmit-btn:hover { background:${C.rustHover}; transform:translateY(-1px); }
        .transmit-btn:disabled { background:${C.onyxSoft}; cursor:not-allowed; transform:none; }
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.5; }
        @media(max-width:900px) { .thinker-grid { grid-template-columns:1fr !important; } }
        @media(max-width:600px) { .thinker-px { padding-left:1.5rem !important; padding-right:1.5rem !important; } }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(249,248,246,0.95)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }} className="thinker-px">
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} className="nav-link" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", padding:0 }}>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color:C.onyxSoft, letterSpacing:"0.08em" }}>←</span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.65rem", color:C.onyxSoft, letterSpacing:"0.08em", textTransform:"uppercase" }}>Uncharted</span>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.68rem", color:C.onyx, letterSpacing:"0.1em", textTransform:"uppercase" }}>Divine · Vetting Protocol</span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"9rem 3rem 6rem" }} className="thinker-px">

        {submitted ? (
          /* ── SUCCESS STATE ── */
          <div style={{ maxWidth:"560px", margin:"0 auto", textAlign:"center", opacity:0, animation:"fadeUp 0.7s forwards" }}>
            <div style={{ width:"52px", height:"52px", border:`1.5px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2rem", fontSize:"1.1rem" }}>✦</div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2rem, 4vw, 3rem)", color:C.onyx, marginBottom:"1rem", lineHeight:1.1 }}>
              Logic transmitted.
            </h1>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.85, color:C.onyxMid, marginBottom:"2.5rem" }}>
              Your framework has entered the Uncharted vetting queue. The Garrison will review your audit logic within 72 hours.
            </p>
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.onyxSoft, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              Access to Divine is a privilege of the Uncharted Garrison
            </p>
          </div>
        ) : (
          /* ── MAIN LAYOUT ── */
          <div className="thinker-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.1fr", gap:"6rem", alignItems:"start" }}>

            {/* LEFT — Locked Identity Preview */}
            <div style={{ position:"sticky", top:"9rem", opacity:0, animation:"fadeUp 0.7s 0.1s forwards" }}>
              <p style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.65rem", color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2rem" }}>
                Identity Preview · Locked
              </p>

              {/* Profile card */}
              <div style={{ border:`1px solid ${C.border}`, backgroundColor:"#FFFFFF", position:"relative", overflow:"hidden" }}>

                {/* Locked overlay */}
                <div style={{ position:"absolute", inset:0, backgroundColor:"rgba(249,248,246,0.82)", backdropFilter:"blur(6px)", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.75rem" }}>
                  <div style={{ width:"40px", height:"40px", border:`1.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", color:C.onyxSoft }}>🔒</div>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.12em", textTransform:"uppercase", textAlign:"center" }}>Unlocks after<br />vetting approval</p>
                </div>

                {/* Card content (blurred behind) */}
                <div style={{ padding:"2rem", filter:"blur(2px)", userSelect:"none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem" }}>
                    <div style={{ width:"48px", height:"48px", backgroundColor:C.onyxDim, borderRadius:"50%", flexShrink:0 }} />
                    <div>
                      <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"1.2rem", color:C.onyx, marginBottom:"0.15rem" }}>Your Name</div>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.1em" }}>ALIAS · DIVINE NETWORK</div>
                    </div>
                  </div>
                  <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.25rem", marginBottom:"1.25rem" }}>
                    <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>Audit Framework</div>
                    <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:C.onyxMid, lineHeight:1.65 }}>Your lens for filtering signal from noise will appear here after approval.</p>
                  </div>
                  <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                    {["Strategy","Design","Philosophy"].map(v => (
                      <span key={v} style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.onyxSoft, border:`1px solid ${C.border}`, padding:"0.3rem 0.6rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>{v}</span>
                    ))}
                  </div>
                  <div style={{ borderTop:`1px solid ${C.border}`, marginTop:"1.5rem", paddingTop:"1rem", display:"flex", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.gold, letterSpacing:"0.1em" }}>Perspective</div>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.onyxSoft, letterSpacing:"0.08em" }}>TIER · VERIFIED</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.62rem", color:C.onyx }}>$2.50</div>
                      <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.55rem", color:C.onyxSoft, letterSpacing:"0.08em" }}>PER INSIGHT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div style={{ marginTop:"1rem", padding:"0.75rem 1rem", border:`1px solid ${C.border}`, borderLeft:`2px solid ${C.gold}`, backgroundColor:C.goldSoft, display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", backgroundColor:C.gold, animation:"pulse 2s infinite", flexShrink:0 }} />
                <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.gold, letterSpacing:"0.1em", textTransform:"uppercase" }}>Awaiting Garrison Verification · 72hr</span>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div style={{ opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
              <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2.2rem, 4vw, 3.5rem)", lineHeight:1.05, color:C.onyx, marginBottom:"0.75rem" }}>
                Request access<br />to Divine.
              </h1>
              <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.8, color:C.onyxMid, marginBottom:"3rem", maxWidth:"420px" }}>
                Divine is not a chatbot. Access is granted only to verified Thinkers whose frameworks meet Uncharted's institutional standard.
              </p>

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>

                {/* Field 1: Name & Alias */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"0.75rem" }}>
                    Identity · Name &amp; Secure Alias
                  </label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
                    <input className="field-input" type="text" placeholder="Full name" value={form.name}
                      onChange={e => setForm(f => ({...f, name:e.target.value}))} required />
                    <input className="field-input" type="text" placeholder="Alias (optional)"
                      value={form.alias} onChange={e => setForm(f => ({...f, alias:e.target.value}))} />
                  </div>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.56rem", color:C.onyxSoft, letterSpacing:"0.08em", marginTop:"0.5rem" }}>
                    Your alias appears on your public Divine profile in place of your name.
                  </p>
                </div>

                {/* Field 2: The Lens */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"0.75rem" }}>
                    The Lens · Audit Framework
                  </label>
                  <textarea className="field-input" rows={5}
                    placeholder="Define your Audit Framework. How do you filter noise from signal? What is the operating logic behind your decisions? Be precise."
                    value={form.lens} onChange={e => setForm(f => ({...f, lens:e.target.value}))}
                    required style={{ resize:"vertical", lineHeight:1.7 }} />
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.56rem", color:C.onyxSoft, letterSpacing:"0.08em", marginTop:"0.5rem" }}>
                    This becomes the core of your Divine intelligence model. Vague responses are rejected.
                  </p>
                </div>

                {/* Field 3: Cognitive Verticals */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:C.onyxSoft, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"0.75rem" }}>
                    Cognitive Verticals · Select all that apply
                  </label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {VERTICALS.map(v => (
                      <button key={v} type="button" className={`vertical-btn${form.verticals.includes(v) ? " active" : ""}`}
                        onClick={() => toggleVertical(v)}>{v}</button>
                    ))}
                  </div>
                  {form.verticals.length > 0 && (
                    <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.56rem", color:C.rust, letterSpacing:"0.08em", marginTop:"0.5rem" }}>
                      {form.verticals.length} vertical{form.verticals.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div style={{ height:"1px", backgroundColor:C.border }} />

                {/* Submit */}
                <div>
                  <button type="submit" className="transmit-btn"
                    disabled={!form.name || !form.lens || form.verticals.length === 0}>
                    Transmit Logic for Vetting ✦
                  </button>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.56rem", color:C.onyxSoft, letterSpacing:"0.08em", marginTop:"0.75rem", textAlign:"center", lineHeight:1.7 }}>
                    Access to Divine is a privilege of the Uncharted Garrison.<br />
                    Verification may take 72 hours.
                  </p>
                </div>

              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 3rem", marginTop:"4rem" }} className="thinker-px">
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.onyxSoft, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Divine · Intelligence Protocol · Uncharted Ventures
          </span>
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.58rem", color:C.onyxSoft, letterSpacing:"0.08em" }}>
            © 2026 Uncharted Ventures LLC
          </span>
        </div>
      </footer>
    </div>
  );
}

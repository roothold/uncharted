import { useState, useEffect } from "react";

const C = {
  bg:          "#1A1A1A",
  surface:     "#212121",
  surfaceHigh: "#2A2A2A",
  onyx:        "#F0EDE8",
  onyxMid:     "rgba(240,237,232,0.6)",
  onyxSoft:    "rgba(240,237,232,0.35)",
  onyxDim:     "rgba(240,237,232,0.08)",
  rust:        "#C8512A",
  rustGlow:    "rgba(200,81,42,0.35)",
  rustSoft:    "rgba(200,81,42,0.1)",
  gold:        "#D4AF37",
  goldSoft:    "rgba(212,175,55,0.15)",
  border:      "rgba(240,237,232,0.08)",
  borderMid:   "rgba(240,237,232,0.15)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');`;

const VERTICALS = ["Strategy","Design","Logistics","Philosophy","Finance","Operations","Technology","Culture"];

// Grid overlay background — 20px blueprint grid
const GRID_SVG = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(240,237,232,0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`;

export default function BecomeThinker({ onBack }) {
  const [form, setForm]           = useState({ name:"", alias:"", lens:"", verticals:[] });
  const [submitted, setSubmitted] = useState(false);
  const [lensActive, setLensActive] = useState(false);
  const [streamTick, setStreamTick] = useState(0);
  const [typingActive, setTypingActive] = useState(false);

  // Data-stream animation when typing in lens field
  useEffect(() => {
    if (!typingActive) return;
    const t = setInterval(() => setStreamTick(n => n + 1), 120);
    return () => clearInterval(t);
  }, [typingActive]);

  useEffect(() => {
    if (form.lens.length > 0) setTypingActive(true);
    else setTypingActive(false);
  }, [form.lens]);

  const toggleVertical = (v) =>
    setForm(f => ({
      ...f,
      verticals: f.verticals.includes(v) ? f.verticals.filter(x => x !== v) : [...f.verticals, v]
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.lens && form.verticals.length > 0) setSubmitted(true);
  };

  const streamChars = "01ABCDEF█▓░◈◉⬡⬢▲△".split("");
  const streamLine  = Array.from({length: 32}, (_, i) =>
    streamChars[(streamTick + i * 3) % streamChars.length]
  ).join(" ");

  return (
    <div style={{ backgroundColor:C.bg, color:C.onyx, minHeight:"100vh",
      fontFamily:"'Inter Tight', sans-serif",
      backgroundImage: GRID_SVG,
    }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.rust}; color:#fff; }

        /* ── CLI Fields ── */
        .cli-field {
          width:100%; padding:0.85rem 0; background:transparent; border:none;
          border-bottom:1px solid ${C.borderMid};
          color:${C.onyx}; font-family:'JetBrains Mono',monospace; font-size:0.85rem;
          outline:none; transition:border-color 0.25s ease, box-shadow 0.25s ease;
          caret-color:${C.rust};
        }
        .cli-field:focus {
          border-bottom-color:${C.rust};
          box-shadow:0 2px 12px -4px ${C.rustGlow};
        }
        .cli-field::placeholder { color:${C.onyxSoft}; font-family:'JetBrains Mono',monospace; }
        .cli-field-wrap { position:relative; }
        .cli-field-wrap::before {
          content:'›';
          position:absolute; left:0; top:50%; transform:translateY(-50%);
          color:${C.onyxSoft}; font-family:'JetBrains Mono',monospace;
          font-size:0.85rem; pointer-events:none; transition:color 0.2s;
        }
        .cli-field-wrap:focus-within::before { color:${C.rust}; }
        .cli-field-wrap .cli-field { padding-left:1.2rem; }
        textarea.cli-field { resize:none; line-height:1.75; padding-left:1.2rem; }
        textarea.cli-field-wrap-inner { padding-left:1.2rem; }

        /* ── Vertical toggle buttons ── */
        .vert-btn {
          padding:0.45rem 0.9rem; border:1px solid ${C.border}; background:transparent;
          color:${C.onyxSoft}; font-family:'JetBrains Mono',monospace; font-size:0.6rem;
          letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s ease;
        }
        .vert-btn:hover { border-color:${C.rust}; color:${C.rust}; background:${C.rustSoft}; }
        .vert-btn.active { border-color:${C.rust}; background:${C.rustSoft}; color:${C.rust};
          box-shadow:0 0 8px -2px ${C.rustGlow}; }

        /* ── Submit button ── */
        .transmit-btn {
          width:100%; padding:1.1rem 2rem;
          font-family:'JetBrains Mono',monospace; font-weight:700;
          font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase;
          color:#fff; background:${C.rust}; border:none; cursor:pointer;
          transition:all 0.25s ease; position:relative; overflow:hidden;
        }
        .transmit-btn:hover:not(:disabled) {
          background:#A83E1E;
          box-shadow:0 4px 24px -4px ${C.rustGlow};
          transform:translateY(-1px);
        }
        .transmit-btn:disabled { background:rgba(200,81,42,0.3); cursor:not-allowed; }
        .transmit-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);
          transform:translateX(-100%); transition:transform 0.5s ease;
        }
        .transmit-btn:hover:not(:disabled)::after { transform:translateX(100%); }

        .nav-back { transition:color 0.2s; }
        .nav-back:hover { color:${C.onyx} !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes pulse   { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        @keyframes blink   { 50%{opacity:0;} }
        @keyframes shimmer { 0%{transform:translateX(-100%);}100%{transform:translateX(100%);} }

        @media(max-width:900px) { .bt-grid { grid-template-columns:1fr !important; gap:4rem !important; } }
        @media(max-width:600px) { .bt-px { padding-left:1.5rem !important; padding-right:1.5rem !important; } }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
        backgroundColor:"rgba(26,26,26,0.92)", backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)", borderBottom:`1px solid ${C.border}`,
        padding:"0 3rem" }} className="bt-px">
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"64px",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} className="nav-back" style={{ background:"none", border:"none",
            cursor:"pointer", display:"flex", alignItems:"center", gap:"0.6rem", padding:0 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              color:C.onyxSoft, letterSpacing:"0.1em" }}>←</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              color:C.onyxSoft, letterSpacing:"0.1em", textTransform:"uppercase" }}>Uncharted</span>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%",
              backgroundColor:C.gold, animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
              color:C.onyxMid, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              Divine · Vetting Protocol · RESTRICTED
            </span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"9rem 3rem 6rem" }} className="bt-px">
        {submitted ? (

          /* ── SUCCESS ── */
          <div style={{ maxWidth:"520px", margin:"0 auto", textAlign:"center",
            opacity:0, animation:"fadeUp 0.7s forwards" }}>
            <div style={{ width:"56px", height:"56px", border:`1px solid ${C.gold}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 2.5rem", fontSize:"1.4rem", color:C.gold }}>✦</div>
            <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:600,
              fontSize:"clamp(2rem,4vw,3rem)", color:C.onyx, marginBottom:"1rem", lineHeight:1.05 }}>
              Logic transmitted.
            </h1>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300, fontSize:"0.9rem",
              lineHeight:1.85, color:C.onyxMid, marginBottom:"2.5rem" }}>
              Your intelligence signature has entered the Uncharted vetting queue.
              The Garrison will audit your framework within 72 hours.
            </p>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
              color:C.onyxSoft, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              Access to Divine is a privilege of the Uncharted Garrison
            </p>
          </div>

        ) : (

          /* ── MAIN LAYOUT ── */
          <div className="bt-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.15fr",
            gap:"7rem", alignItems:"start" }}>

            {/* ── LEFT: HIGH-SECURITY ID BADGE ── */}
            <div style={{ position:"sticky", top:"9rem", opacity:0, animation:"fadeUp 0.7s 0.1s forwards" }}>

              {/* Badge header label */}
              <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"1.5rem" }}>
                <div style={{ width:"20px", height:"1px", backgroundColor:C.gold }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
                  color:C.gold, letterSpacing:"0.14em", textTransform:"uppercase" }}>
                  Identity Preview · Clearance Pending
                </span>
              </div>

              {/* Badge card */}
              <div style={{ border:`1px solid ${C.borderMid}`, backgroundColor:C.surface,
                position:"relative", overflow:"hidden" }}>

                {/* Badge top bar — security tier */}
                <div style={{ backgroundColor:C.rust, padding:"0.55rem 1rem",
                  display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700,
                    fontSize:"0.58rem", color:"#fff", letterSpacing:"0.14em" }}>
                    UNCHARTED GARRISON
                  </span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.55rem",
                    color:"rgba(255,255,255,0.7)", letterSpacing:"0.1em" }}>
                    DIVINE NETWORK
                  </span>
                </div>

                {/* Security clearance stripe */}
                <div style={{ height:"3px", background:"repeating-linear-gradient(90deg,#D4AF37 0,#D4AF37 12px,transparent 12px,transparent 20px)" }} />

                {/* Locked overlay */}
                <div style={{ position:"absolute", top:"3px", left:0, right:0, bottom:0,
                  backgroundColor:"rgba(26,26,26,0.88)", backdropFilter:"blur(8px)",
                  WebkitBackdropFilter:"blur(8px)", zIndex:2,
                  display:"flex", flexDirection:"column", alignItems:"center",
                  justifyContent:"center", gap:"1rem" }}>
                  <div style={{ width:"44px", height:"44px", border:`1px solid ${C.borderMid}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:C.onyxSoft, fontSize:"1.1rem" }}>🔒</div>
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
                      color:C.onyxSoft, letterSpacing:"0.12em", textTransform:"uppercase",
                      lineHeight:1.8 }}>
                      CLEARANCE LEVEL: PENDING<br />
                      Unlocks upon<br />Garrison verification
                    </p>
                  </div>
                  <div style={{ padding:"0.35rem 1rem", border:`1px solid ${C.gold}`,
                    backgroundColor:C.goldSoft }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.55rem",
                      color:C.gold, letterSpacing:"0.14em" }}>VETTING IN QUEUE</span>
                  </div>
                </div>

                {/* Card body (blurred content behind) */}
                <div style={{ padding:"1.5rem", filter:"blur(3px)", userSelect:"none" }}>
                  <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", alignItems:"center" }}>
                    <div style={{ width:"52px", height:"52px", flexShrink:0,
                      backgroundColor:C.onyxDim, border:`1px solid ${C.border}` }} />
                    <div>
                      <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.15rem",
                        color:C.onyx, marginBottom:"0.2rem" }}>Your Name</div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
                        color:C.gold, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                        Alias · Perspective Tier
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1rem",
                    marginBottom:"1rem" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
                      color:C.onyxSoft, letterSpacing:"0.1em", textTransform:"uppercase",
                      marginBottom:"0.4rem" }}>Audit Framework</div>
                    <p style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.8rem",
                      color:C.onyxMid, lineHeight:1.65 }}>
                      Your signal-filter logic will be encoded here after approval.
                    </p>
                  </div>
                  <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap",
                    marginBottom:"1.25rem" }}>
                    {["Strategy","Design","Philosophy"].map(v => (
                      <span key={v} style={{ fontFamily:"'JetBrains Mono',monospace",
                        fontSize:"0.54rem", color:C.onyxSoft, border:`1px solid ${C.border}`,
                        padding:"0.25rem 0.5rem", letterSpacing:"0.08em",
                        textTransform:"uppercase" }}>{v}</span>
                    ))}
                  </div>
                  <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"0.85rem",
                    display:"flex", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
                        color:C.gold, letterSpacing:"0.08em" }}>$2.50</div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem",
                        color:C.onyxSoft, letterSpacing:"0.08em" }}>PER INSIGHT</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem",
                        color:C.onyxMid }}>Perspective</div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem",
                        color:C.onyxSoft, letterSpacing:"0.08em" }}>CLEARANCE: TIER I</div>
                    </div>
                  </div>
                </div>

                {/* Badge bottom bar */}
                <div style={{ backgroundColor:C.surfaceHigh, padding:"0.5rem 1rem",
                  borderTop:`1px solid ${C.border}`,
                  display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem",
                    color:C.onyxSoft, letterSpacing:"0.1em" }}>ID: ████████████</span>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                    <div style={{ width:"4px", height:"4px", borderRadius:"50%",
                      backgroundColor:C.gold, animation:"pulse 1.5s infinite" }} />
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.52rem",
                      color:C.gold, letterSpacing:"0.1em" }}>PENDING</span>
                  </div>
                </div>
              </div>

              {/* Garrison note */}
              <div style={{ marginTop:"1rem", padding:"0.75rem 1rem",
                borderLeft:`2px solid ${C.gold}`, backgroundColor:C.goldSoft,
                display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem",
                  color:C.gold, letterSpacing:"0" }}>✦</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
                  color:C.gold, letterSpacing:"0.06em", lineHeight:1.7 }}>
                  Access to Divine is a privilege of the Uncharted Garrison.<br />
                  Verification may take 72 hours.
                </span>
              </div>
            </div>

            {/* ── RIGHT: CLI FORM ── */}
            <div style={{ opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
              <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:600,
                fontSize:"clamp(2.2rem, 4vw, 3.8rem)", lineHeight:1.0, color:C.onyx,
                marginBottom:"0.75rem" }}>
                Submit Intelligence<br />Signature.
              </h1>
              <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300,
                fontSize:"0.9rem", lineHeight:1.85, color:C.onyxMid,
                marginBottom:"3rem", maxWidth:"400px" }}>
                Divine is not a chatbot. Access is granted only to verified Thinkers whose
                frameworks meet Uncharted's institutional standard.
              </p>

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2.5rem" }}>

                {/* Field 1 — Identity */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"0.58rem", color:C.onyxSoft, letterSpacing:"0.14em",
                    textTransform:"uppercase", marginBottom:"1rem" }}>
                    01 · Identity — Name &amp; Secure Alias
                  </label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                    <div className="cli-field-wrap">
                      <input className="cli-field" type="text" placeholder="Full name"
                        value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))}
                        required />
                    </div>
                    <div className="cli-field-wrap">
                      <input className="cli-field" type="text" placeholder="Alias (optional)"
                        value={form.alias} onChange={e => setForm(f => ({...f, alias:e.target.value}))} />
                    </div>
                  </div>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.54rem",
                    color:C.onyxSoft, letterSpacing:"0.06em", marginTop:"0.6rem" }}>
                    Your alias appears on your public Divine profile in place of your legal name.
                  </p>
                </div>

                {/* Field 2 — The Lens */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"0.58rem", color:C.onyxSoft, letterSpacing:"0.14em",
                    textTransform:"uppercase", marginBottom:"1rem" }}>
                    02 · The Lens — Audit Framework
                  </label>

                  {/* CLI textarea wrapper with › prefix on first line */}
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:0, top:"0.85rem",
                      fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem",
                      color: lensActive ? C.rust : C.onyxSoft,
                      pointerEvents:"none", transition:"color 0.2s", zIndex:1 }}>›</span>
                    <textarea className="cli-field" rows={6} required
                      style={{ paddingLeft:"1.2rem", borderBottom:`1px solid ${lensActive ? C.rust : C.borderMid}`,
                        boxShadow: lensActive ? `0 2px 14px -4px ${C.rustGlow}` : "none" }}
                      placeholder="Define your Audit Framework. How do you filter noise from signal? What is the operating logic behind your decisions? Be precise — vague submissions are rejected."
                      value={form.lens}
                      onFocus={() => setLensActive(true)}
                      onBlur={() => setLensActive(false)}
                      onChange={e => setForm(f => ({...f, lens:e.target.value}))} />
                  </div>

                  {/* Data-stream processing animation */}
                  {typingActive && (
                    <div style={{ marginTop:"0.5rem", padding:"0.4rem 0.75rem",
                      backgroundColor:C.onyxDim, overflow:"hidden" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                        <div style={{ width:"4px", height:"4px", borderRadius:"50%",
                          backgroundColor:C.rust, animation:"pulse 0.8s infinite", flexShrink:0 }} />
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.5rem",
                          color:C.rust, letterSpacing:"0.08em", whiteSpace:"nowrap",
                          overflow:"hidden", opacity:0.7 }}>
                          PROCESSING · {streamLine}
                        </span>
                      </div>
                    </div>
                  )}

                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.54rem",
                    color:C.onyxSoft, letterSpacing:"0.06em", marginTop:"0.6rem" }}>
                    This becomes the core of your Divine intelligence model.
                  </p>
                </div>

                {/* Field 3 — Cognitive Verticals */}
                <div>
                  <label style={{ display:"block", fontFamily:"'JetBrains Mono',monospace",
                    fontSize:"0.58rem", color:C.onyxSoft, letterSpacing:"0.14em",
                    textTransform:"uppercase", marginBottom:"0.4rem" }}>
                    03 · Cognitive Verticals
                  </label>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
                    color:C.onyxSoft, letterSpacing:"0.06em", marginBottom:"1rem" }}>
                    Map your Cognitive Verticals.
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {VERTICALS.map(v => (
                      <button key={v} type="button"
                        className={`vert-btn${form.verticals.includes(v) ? " active" : ""}`}
                        onClick={() => toggleVertical(v)}>{v}</button>
                    ))}
                  </div>
                  {form.verticals.length > 0 && (
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.54rem",
                      color:C.rust, letterSpacing:"0.08em", marginTop:"0.6rem" }}>
                      ✦ {form.verticals.length} vertical{form.verticals.length > 1 ? "s" : ""} mapped
                    </p>
                  )}
                </div>

                {/* Divider — scanline */}
                <div style={{ height:"1px", position:"relative", overflow:"hidden",
                  backgroundColor:C.border }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"100%",
                    background:`linear-gradient(90deg, transparent, ${C.rust}, transparent)`,
                    animation:"shimmer 2.5s ease-in-out infinite" }} />
                </div>

                {/* Submit */}
                <div>
                  <button type="submit" className="transmit-btn"
                    disabled={!form.name || !form.lens || form.verticals.length === 0}>
                    Transmit Logic for Vetting ✦
                  </button>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.54rem",
                    color:C.onyxSoft, letterSpacing:"0.08em", marginTop:"0.85rem",
                    textAlign:"center", lineHeight:1.75 }}>
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
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"1.75rem 3rem",
        marginTop:"4rem" }} className="bt-px">
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
            color:C.onyxSoft, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Divine · Intelligence Protocol · Uncharted Ventures
          </span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.56rem",
            color:C.onyxSoft, letterSpacing:"0.08em" }}>
            © 2026 Uncharted Ventures LLC
          </span>
        </div>
      </footer>
    </div>
  );
}

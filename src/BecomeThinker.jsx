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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@400;500&display=swap');`;

const VERTICALS = [
  "Strategy","Design","Logistics","Philosophy",
  "Finance","Operations","Technology","Culture",
];

export default function BecomeThinker({ onBack }) {
  const [form, setForm]           = useState({ name:"", alias:"", lens:"", verticals:[] });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState(null);

  const toggle = (v) =>
    setForm(f => ({
      ...f,
      verticals: f.verticals.includes(v) ? f.verticals.filter(x => x !== v) : [...f.verticals, v],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.lens || form.verticals.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xkokwred", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name:      form.name,
          alias:     form.alias || "—",
          framework: form.lens,
          verticals: form.verticals.join(", "),
          _subject:  `Thinker Application — ${form.name}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || "Submission failed. Email founders@uncharted.ventures directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  const canSubmit = form.name && form.lens && form.verticals.length > 0;

  return (
    <div style={{ backgroundColor:C.bg, minHeight:"100vh", display:"flex",
      fontFamily:"'Inter Tight', sans-serif" }}>
      <style>{`        h1, h2, h3 { -webkit-text-stroke: 0.3px currentColor; }

        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }

        /* Inputs — minimal underline style */
        .f-input {
          width:100%; padding:0.8rem 0;
          background:transparent; border:none; border-bottom:1px solid ${C.border};
          color:${C.ink}; font-family:'Inter Tight',sans-serif; font-size:0.88rem;
          outline:none; transition:border-color 0.2s;
        }
        .f-input:focus { border-bottom-color:${C.ink}; }
        .f-input::placeholder { color:#BBBBBB; }

        .f-textarea {
          width:100%; padding:0.8rem 0;
          background:transparent; border:none; border-bottom:1px solid ${C.border};
          color:${C.ink}; font-family:'Inter Tight',sans-serif; font-size:0.88rem;
          outline:none; resize:none; line-height:1.75; transition:border-color 0.2s;
        }
        .f-textarea:focus { border-bottom-color:${C.ink}; }
        .f-textarea::placeholder { color:#BBBBBB; }

        /* Vertical selector chips */
        .chip {
          padding:0.4rem 0.85rem;
          border:1px solid ${C.border};
          background:transparent; color:${C.inkSoft};
          font-family:'Inter Tight',sans-serif; font-size:0.6rem;
          letter-spacing:0.06em; text-transform:uppercase;
          cursor:pointer; transition:all 0.15s ease;
        }
        .chip:hover { border-color:${C.inkMid}; color:${C.ink}; }
        .chip.on { border-color:${C.accent}; color:${C.accent}; background:rgba(200,81,42,0.05); }

        /* Submit */
        .submit-btn {
          width:100%; padding:0.95rem;
          background:${C.accent}; color:#fff; border:none;
          font-family:'Inter Tight',sans-serif; font-weight:500;
          font-size:0.68rem; letter-spacing:0.12em; text-transform:uppercase;
          cursor:pointer; transition:all 0.2s ease;
        }
        .submit-btn:hover:not(:disabled) { background:${C.accentHover}; }
        .submit-btn:disabled { opacity:0.4; cursor:not-allowed; }

        .nav-back { transition:opacity 0.2s; } .nav-back:hover { opacity:0.45; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }

        /* Responsive */
        @media(max-width:860px){ .bt-left{ display:none !important; } .bt-right{ width:100% !important; } }
        @media(max-width:600px){ .bt-right{ padding:4rem 1.5rem 3rem !important; } }
      `}</style>

      {/* ── LEFT — Image Panel ── */}
      <div className="bt-left" style={{
        width:"44%", flexShrink:0, position:"sticky", top:0, height:"100vh",
        backgroundImage:"url(/thinker-bg.jpg)",
        backgroundSize:"cover", backgroundPosition:"center",
      }}>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)" }} />

        {/* Back */}
        <div style={{ position:"absolute", top:"2rem", left:"1rem", zIndex:10 }}>
          <button onClick={onBack} className="nav-back" style={{ background:"none", border:"none",
            cursor:"pointer", padding:0, fontFamily:"'Inter Tight',sans-serif",
            fontSize:"0.6rem", color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em" }}>
            ← Uncharted
          </button>
        </div>

        {/* Bottom text */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"1rem", right:"2.5rem", zIndex:10 }}>
          <div style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.56rem",
            color:"rgba(255,255,255,0.45)", letterSpacing:"0.12em", textTransform:"uppercase",
            marginBottom:"0.75rem" }}>Divine · Thinker Network</div>
          <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic",
            fontSize:"1.15rem", color:"rgba(255,255,255,0.8)", lineHeight:1.5, maxWidth:"260px" }}>
            "Your experience is worth more than you're charging."
          </p>
        </div>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="bt-right" style={{
        flex:1, padding:"5.5rem 4.5rem 4rem",
        display:"flex", flexDirection:"column", justifyContent:"center",
        overflowY:"auto",
      }}>
        {submitted ? (

          /* Success */
          <div style={{ maxWidth:"400px", opacity:0, animation:"fadeUp 0.5s forwards" }}>
            <div style={{ width:"36px", height:"36px", border:`1px solid ${C.accent}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:C.accent, fontSize:"0.9rem", marginBottom:"1.75rem" }}>✓</div>
            <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400,
              fontSize:"2.2rem", color:C.ink, lineHeight:1.05, marginBottom:"1rem" }}>
              Application received.
            </h1>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300,
              fontSize:"0.88rem", lineHeight:1.8, color:C.inkMid, marginBottom:"2rem" }}>
              The Uncharted team reviews applications personally.
              You will be contacted within 72 hours if approved.
            </p>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.56rem",
              color:C.inkSoft, letterSpacing:"0.08em", textTransform:"uppercase",
              borderTop:`1px solid ${C.border}`, paddingTop:"1.25rem" }}>
              Access to Divine is a privilege of the Uncharted Garrison
            </p>
          </div>

        ) : (

          /* Form */
          <div style={{ maxWidth:"400px", opacity:0, animation:"fadeUp 0.5s 0.05s forwards" }}>

            {/* Header */}
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.6rem",
              color:C.inkSoft, letterSpacing:"0.12em", textTransform:"uppercase",
              marginBottom:"1.5rem" }}>
              Divine · Thinker Application
            </p>
            <h1 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400,
              fontSize:"clamp(2rem, 3.5vw, 2.8rem)", lineHeight:1.05, color:C.ink,
              marginBottom:"0.85rem" }}>
              Apply for access.
            </h1>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:300,
              fontSize:"0.85rem", lineHeight:1.8, color:C.inkMid, marginBottom:"3rem" }}>
              Founders pay to access your thinking. Applications are reviewed manually.
            </p>

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.75rem" }}>

              {/* Name + Alias */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                <div>
                  <label style={{ display:"block", fontFamily:"'Inter Tight',sans-serif",
                    fontSize:"0.56rem", color:C.inkSoft, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:"0.5rem" }}>Full Name *</label>
                  <input className="f-input" type="text" placeholder="—"
                    value={form.name} required
                    onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                </div>
                <div>
                  <label style={{ display:"block", fontFamily:"'Inter Tight',sans-serif",
                    fontSize:"0.56rem", color:C.inkSoft, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:"0.5rem" }}>Public Alias</label>
                  <input className="f-input" type="text" placeholder="Optional"
                    value={form.alias}
                    onChange={e => setForm(f => ({...f, alias:e.target.value}))} />
                </div>
              </div>

              {/* Framework */}
              <div>
                <label style={{ display:"block", fontFamily:"'Inter Tight',sans-serif",
                  fontSize:"0.56rem", color:C.inkSoft, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:"0.5rem" }}>
                  Decision Framework *
                </label>
                <textarea className="f-textarea" rows={4} required
                  placeholder="How do you filter signal from noise? Describe your operating logic."
                  value={form.lens}
                  onChange={e => setForm(f => ({...f, lens:e.target.value}))} />
              </div>

              {/* Domains */}
              <div>
                <label style={{ display:"block", fontFamily:"'Inter Tight',sans-serif",
                  fontSize:"0.56rem", color:C.inkSoft, letterSpacing:"0.1em",
                  textTransform:"uppercase", marginBottom:"0.75rem" }}>
                  Domains of Expertise *
                </label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {VERTICALS.map(v => (
                    <button key={v} type="button"
                      className={`chip${form.verticals.includes(v) ? " on" : ""}`}
                      onClick={() => toggle(v)}>{v}</button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height:"1px", backgroundColor:C.border }} />

              {/* Error */}
              {error && (
                <p style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.8rem",
                  color:"#991b1b", backgroundColor:"#fef2f2", border:"1px solid #fecaca",
                  padding:"0.65rem 0.85rem" }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <div>
                <button type="submit" className="submit-btn"
                  disabled={!canSubmit || submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <p style={{ fontFamily:"'Inter Tight',sans-serif", fontSize:"0.54rem",
                  color:C.inkSoft, letterSpacing:"0.06em", marginTop:"0.75rem",
                  textAlign:"center" }}>
                  Verification may take 72 hours.
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

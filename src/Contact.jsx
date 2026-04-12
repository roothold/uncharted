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

const INQUIRY_TYPES = [
  { id:"founder",  label:"I'm a Founder" },
  { id:"investor", label:"I'm an Investor" },
  { id:"partner",  label:"Partnership" },
  { id:"press",    label:"Press / Media" },
  { id:"other",    label:"Other" },
];

export default function ContactPage({ onBack }) {
  const [form, setForm]           = useState({ name:"", email:"", type:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setError(null);
    try {
      // ── Replace YOUR_FORM_ID with your Formspree form ID ──────────────
      // 1. Go to formspree.io → New Form → set email to michael@uncharted.ventures
      // 2. Copy the 8-char ID from the form endpoint URL and paste below
      const FORMSPREE_ID = "mgopgdba";
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          type:    form.type || "Not specified",
          message: form.message,
          _subject: `New contact from ${form.name} — Uncharted.ventures`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please try again or email hello@uncharted.ventures directly.");
    }
    setSubmitting(false);
  };

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'JetBrains Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        .field { border:1px solid ${C.border}; border-radius:4px; background:${C.bg}; color:${C.ink}; font-family:'JetBrains Mono', monospace; transition:border-color 0.2s ease; width:100%; }
        .field:focus { outline:none; border-color:${C.ink}; }
        .field::placeholder { color:${C.inkSoft}; }
        .type-btn { transition:all 0.2s ease; border:1px solid ${C.border}; border-radius:4px; cursor:pointer; font-family:'JetBrains Mono', monospace; font-size:0.82rem; font-weight:500; padding:0.5rem 1rem; background:${C.bg}; color:${C.inkMid}; }
        .type-btn:hover { border-color:${C.ink}; color:${C.ink}; }
        .type-btn.active { border-color:${C.ink}; background:${C.ink}; color:#fff; }
        .nav-outer { padding-left:3rem; padding-right:3rem; }
        @media(max-width:600px){.nav-outer{padding-left:1.25rem!important;padding-right:1.25rem!important;}}
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }
        .submit-btn { transition:all 0.2s ease; }
        .submit-btn:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .contact-row { transition:border-color 0.2s, transform 0.2s; }
        .contact-row:hover { border-color:${C.ink} !important; }
        /* ── Responsive ── */
        .contact-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:7rem; align-items:start; }
        .name-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .submit-row { display:flex; align-items:center; justify-content:space-between; padding-top:0.5rem; }
        @media (max-width:900px) {
          .contact-grid { grid-template-columns:1fr !important; gap:3rem !important; }
          .sticky-left { position:static !important; top:auto !important; }
        }
        @media (max-width:600px) {
          .name-grid { grid-template-columns:1fr !important; }
          .submit-row { flex-direction:column !important; gap:1rem !important; align-items:stretch !important; }
          .submit-row p { text-align:center; }
          .submit-row button { width:100%; }
          .px-contact { padding-left:1.25rem !important; padding-right:1.25rem !important; }
          .type-pills { flex-wrap:wrap; }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }} className="nav-outer">
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"76px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACICAYAAAARQRmEAAAACXBIWXMAAHUwAAB1MAHdM3LNAAAN9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDMgNzkuMTY0NTI3LCAyMDIwLzEwLzE1LTE3OjQ4OjMyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDQtMTRUMjI6MjU6MDQtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTItMjBUMTk6MjY6MjItMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTEyLTIwVDE5OjI2OjIyLTA1OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0Njk0ZWM3LWRiNDQtNDY1Mi04NzZjLTc0YjQ2YTkyMjkxNiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjU3ZTM5OWNhLTc5N2MtYzU0Yi05MTY4LWYzYWZiOWZkNGFhMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFlMTVhMjcxLWM1ZTgtNDI1Ni1hMWQyLWNiM2ZlNTRjZTZlNCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzYyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzYyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgZXhpZjpDb2xvclNwYWNlPSIxIiBleGlmOlBpeGVsWERpbWVuc2lvbj0iNzYyMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249Ijc2MjAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFlMTVhMjcxLWM1ZTgtNDI1Ni1hMWQyLWNiM2ZlNTRjZTZlNCIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xNFQyMjoyNTowNC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmEzMWFiNmY3LWJkYjYtNDkzMS04MDA2LTBhOGRlNTQwZmIwMyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xNVQwODoyMDoyNi0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwMDZlMTRkLWYwZjItNDMyMi04MTIxLTBlMjA3MWYwOTg2OCIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xNVQwODoyOTo0MC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxMjNhN2I5LTBlNTgtNDczYS1iNDcwLWE2MzI2YTAyYzgzNCIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xNVQwODoyOTo0MC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgzNDg3NTQxLTA2NWYtNGI3YS05YjFhLWM1NTRjMzRjZTcwOSIgc3RFdnQ6d2hlbj0iMjAyMC0wNy0wOVQyMjoxNDowMS0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU1YTViMjhjLTcyZDQtNDhiYS05YWYwLTM4YzJhZDFjYzM2YSIgc3RFdnQ6d2hlbj0iMjAyMC0wNy0wOVQyMjoxNDowMS0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0Njk0ZWM3LWRiNDQtNDY1Mi04NzZjLTc0YjQ2YTkyMjkxNiIgc3RFdnQ6d2hlbj0iMjAyMS0xMi0yMFQxOToyNjoyMi0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgzNDg3NTQxLTA2NWYtNGI3YS05YjFhLWM1NTRjMzRjZTcwOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRkZjEyMjQ2LTg1MmItM2U0ZC1iMDYxLTNkMjBkYWM0Njc2YSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFlMTVhMjcxLWM1ZTgtNDI1Ni1hMWQyLWNiM2ZlNTRjZTZlNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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" alt="Uncharted Ventures" style={{ height:"45px", width:"auto", display:"block" }} />
          </button>
          <button onClick={onBack} className="nav-link" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.82rem", fontWeight:500, color:C.inkMid, padding:0 }}>
            ← Back
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"9rem 3rem 6rem" }} className="px-contact">
        <div className="contact-grid">

          {/* Left */}
          <div style={{ position:"sticky", top:"9rem" }} className="sticky-left">
            <p style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
              Get in touch
            </p>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"clamp(2.5rem, 5vw, 5rem)", lineHeight:1.0, color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
              Let's build<br />something<br />great.
            </h1>
            <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.9rem", lineHeight:1.9, color:C.inkMid, marginBottom:"3rem", maxWidth:"360px", opacity:0, animation:"fadeUp 0.7s 0.3s forwards" }}>
              Whether you have an idea, a company in motion, or expertise worth monetising — we want to hear from you.
            </p>

            {/* Contact rows */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", opacity:0, animation:"fadeUp 0.7s 0.4s forwards" }}>
              {[
                { label:"General",   value:"hello@uncharted.ventures",   href:"mailto:hello@uncharted.ventures" },
                { label:"Founders",  value:"founders@uncharted.ventures", href:"mailto:founders@uncharted.ventures" },
                { label:"Investors", value:"capital@uncharted.ventures",  href:"mailto:capital@uncharted.ventures" },
              ].map(item => (
                <div key={item.label} className="contact-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.25rem", border:`1px solid ${C.border}`, borderRadius:"4px" }}>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.75rem", color:C.inkSoft, letterSpacing:"0.06em", textTransform:"uppercase" }}>{item.label}</span>
                  <a href={item.href} style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:400, fontSize:"0.85rem", color:C.ink, textDecoration:"none", transition:"color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = C.accent} onMouseLeave={e => e.target.style.color = C.ink}>{item.value}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ opacity:0, animation:"fadeUp 0.7s 0.25s forwards" }}>
            {submitted ? (
              <div style={{ padding:"4rem 3rem", border:`1px solid ${C.border}`, borderRadius:"8px", textAlign:"center" }}>
                <div style={{ width:"52px", height:"52px", borderRadius:"50%", backgroundColor:C.accent, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", fontSize:"1.2rem", color:"#fff" }}>✓</div>
                <h3 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:600, fontSize:"2.2rem", color:C.ink, marginBottom:"0.75rem" }}>Message received.</h3>
                <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.88rem", color:C.inkMid, lineHeight:1.7, marginBottom:"2rem" }}>
                  We review every submission personally. You'll hear back within 2 business days.
                </p>
                <button onClick={onBack} style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.85rem", color:"#fff", backgroundColor:C.ink, border:"none", borderRadius:"4px", padding:"0.85rem 2rem", cursor:"pointer" }}>
                  Back to Uncharted
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

                {/* Inquiry type */}
                <div>
                  <label style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.75rem" }}>
                    I'm reaching out as...
                  </label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {INQUIRY_TYPES.map(t => (
                      <button key={t.id} type="button" className={`type-btn${form.type === t.id ? " active" : ""}`}
                        onClick={() => setForm(f => ({ ...f, type:t.id }))}>{t.label}</button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="name-grid">
                  <div>
                    <label style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Name *</label>
                    <input type="text" className="field" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} placeholder="Your name" required style={{ padding:"0.8rem 1rem", fontSize:"0.88rem" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Email *</label>
                    <input type="email" className="field" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} placeholder="your@email.com" required style={{ padding:"0.8rem 1rem", fontSize:"0.88rem" }} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Message *</label>
                  <textarea className="field" value={form.message} onChange={e => setForm(f => ({ ...f, message:e.target.value }))}
                    placeholder="Tell us what you're building, what you need, or what's on your mind..." required rows={6}
                    style={{ padding:"0.8rem 1rem", fontSize:"0.88rem", resize:"vertical", lineHeight:1.65 }} />
                </div>

                {/* Submit */}
                <div className="submit-row">
                  <p style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>
                    We respond within 2 business days.
                  </p>
                  <button type="submit" className="submit-btn" disabled={submitting}
                    style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor: submitting ? "#e07a55" : C.accent, border:"none", borderRadius:"4px", padding:"0.9rem 2rem", cursor: submitting ? "not-allowed" : "pointer", minWidth:"180px" }}>
                    {submitting ? "Sending..." : "Send message →"}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding:"0.85rem 1rem", backgroundColor:"#fef2f2", border:"1px solid #fecaca", borderRadius:"4px", fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.82rem", color:"#991b1b", marginTop:"0.5rem" }}>
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 3rem", marginTop:"4rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>© 2026 Uncharted Ventures LLC. All rights reserved.</span>
          <span style={{ fontFamily:"'Inter Tight', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>uncharted.ventures</span>
        </div>
      </footer>
    </div>
  );
}

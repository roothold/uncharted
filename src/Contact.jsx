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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor:C.bg, color:C.ink, minHeight:"100vh", fontFamily:"'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-font-smoothing:antialiased; }
        ::selection { background:${C.accent}; color:#fff; }
        .field { border:1px solid ${C.border}; border-radius:4px; background:${C.bg}; color:${C.ink}; font-family:'Poppins',sans-serif; transition:border-color 0.2s ease; width:100%; }
        .field:focus { outline:none; border-color:${C.ink}; }
        .field::placeholder { color:${C.inkSoft}; }
        .type-btn { transition:all 0.2s ease; border:1px solid ${C.border}; border-radius:4px; cursor:pointer; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:500; padding:0.5rem 1rem; background:${C.bg}; color:${C.inkMid}; }
        .type-btn:hover { border-color:${C.ink}; color:${C.ink}; }
        .type-btn.active { border-color:${C.ink}; background:${C.ink}; color:#fff; }
        .nav-link { transition:opacity 0.2s; } .nav-link:hover { opacity:0.45; }
        .submit-btn { transition:all 0.2s ease; }
        .submit-btn:hover { background:${C.accentHover} !important; transform:translateY(-2px); }
        .contact-row { transition:border-color 0.2s, transform 0.2s; }
        .contact-row:hover { border-color:${C.ink} !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backgroundColor:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"1.05rem", color:C.ink }}>Uncharted</span>
          </button>
          <button onClick={onBack} className="nav-link" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Poppins', sans-serif", fontSize:"0.82rem", fontWeight:500, color:C.inkMid, padding:0 }}>
            ← Back
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"9rem 3rem 6rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"7rem", alignItems:"start" }}>

          {/* Left */}
          <div style={{ position:"sticky", top:"9rem" }}>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.78rem", color:C.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"1.5rem", opacity:0, animation:"fadeUp 0.6s 0.1s forwards" }}>
              Get in touch
            </p>
            <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"clamp(2.5rem, 5vw, 5rem)", lineHeight:1.0, color:C.ink, marginBottom:"1.75rem", opacity:0, animation:"fadeUp 0.7s 0.2s forwards" }}>
              Let's build<br />something<br />great.
            </h1>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.92rem", lineHeight:1.85, color:C.inkMid, marginBottom:"3rem", maxWidth:"360px", opacity:0, animation:"fadeUp 0.7s 0.3s forwards" }}>
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
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.75rem", color:C.inkSoft, letterSpacing:"0.06em", textTransform:"uppercase" }}>{item.label}</span>
                  <a href={item.href} style={{ fontFamily:"'Poppins', sans-serif", fontWeight:400, fontSize:"0.85rem", color:C.ink, textDecoration:"none", transition:"color 0.15s" }}
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
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:600, fontSize:"2.2rem", color:C.ink, marginBottom:"0.75rem" }}>Message received.</h3>
                <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.88rem", color:C.inkMid, lineHeight:1.7, marginBottom:"2rem" }}>
                  We review every submission personally. You'll hear back within 2 business days.
                </p>
                <button onClick={onBack} style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.85rem", color:"#fff", backgroundColor:C.ink, border:"none", borderRadius:"4px", padding:"0.85rem 2rem", cursor:"pointer" }}>
                  Back to Uncharted
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

                {/* Inquiry type */}
                <div>
                  <label style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.75rem" }}>
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
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  <div>
                    <label style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Name *</label>
                    <input type="text" className="field" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} placeholder="Your name" required style={{ padding:"0.8rem 1rem", fontSize:"0.88rem" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Email *</label>
                    <input type="email" className="field" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} placeholder="your@email.com" required style={{ padding:"0.8rem 1rem", fontSize:"0.88rem" }} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily:"'Poppins', sans-serif", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkMid, display:"block", marginBottom:"0.5rem" }}>Message *</label>
                  <textarea className="field" value={form.message} onChange={e => setForm(f => ({ ...f, message:e.target.value }))}
                    placeholder="Tell us what you're building, what you need, or what's on your mind..." required rows={6}
                    style={{ padding:"0.8rem 1rem", fontSize:"0.88rem", resize:"vertical", lineHeight:1.65 }} />
                </div>

                {/* Submit */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"0.5rem" }}>
                  <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>
                    We respond within 2 business days.
                  </p>
                  <button type="submit" className="submit-btn" style={{ fontFamily:"'Poppins', sans-serif", fontWeight:600, fontSize:"0.88rem", color:"#fff", backgroundColor:C.accent, border:"none", borderRadius:"4px", padding:"0.9rem 2rem", cursor:"pointer" }}>
                    Send message →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"2rem 3rem", marginTop:"4rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>© 2026 Uncharted Ventures LLC. All rights reserved.</span>
          <span style={{ fontFamily:"'Poppins', sans-serif", fontWeight:300, fontSize:"0.75rem", color:C.inkSoft }}>uncharted.ventures</span>
        </div>
      </footer>
    </div>
  );
}

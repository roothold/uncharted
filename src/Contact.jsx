import { useState } from "react";

export default function ContactPage({ onBack }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  const INQUIRY_TYPES = [
    { id: "founder", label: "I'm a Founder" },
    { id: "investor", label: "I'm an Investor" },
    { id: "partner", label: "Partnership" },
    { id: "press", label: "Press / Media" },
    { id: "other", label: "Other" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#FAFAFA", color: "#1A1A1A", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #F4F482; color: #1A1A1A; }
        .mono { font-family: 'DM Mono', monospace; }
        .contact-input { transition: border-color 0.2s ease, box-shadow 0.2s ease; border: 1px solid rgba(26,26,26,0.18); background: #FAFAFA; }
        .contact-input:focus { outline: none; border-color: #1A1A1A; box-shadow: 0 0 0 3px rgba(244,244,130,0.2); }
        .type-btn { transition: all 0.2s ease; border: 1px solid rgba(26,26,26,0.18); cursor: pointer; }
        .type-btn:hover { border-color: #1A1A1A; }
        .type-btn.active { border-color: #1A1A1A; background: #1A1A1A; color: #FAFAFA; }
        .back-btn { transition: opacity 0.2s ease; }
        .back-btn:hover { opacity: 0.5; }
        .submit-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(244,244,130,0.35); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up-1 { opacity: 0; animation: fadeUp 0.7s 0.05s cubic-bezier(0.16,1,0.3,1) forwards; }
        .fade-up-2 { opacity: 0; animation: fadeUp 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) forwards; }
        .fade-up-3 { opacity: 0; animation: fadeUp 0.7s 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
        .fade-up-4 { opacity: 0; animation: fadeUp 0.7s 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        .contact-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .contact-card:hover { border-color: rgba(26,26,26,0.65); transform: translateY(-2px); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "rgba(250,250,250,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(26,26,26,0.08)", padding: "0 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} className="back-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", padding: 0 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.01em", color: "#1A1A1A" }}>Uncharted</span>
          </button>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <button onClick={onBack} className="back-btn" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em", color: "#1A1A1A", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              ← Back
            </button>
            <div className="mono" style={{ fontSize: "0.72rem", color: "rgba(26,26,26,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Contact
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "9rem 2.5rem 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "flex-start" }}>

          {/* LEFT — Info */}
          <div style={{ position: "sticky", top: "9rem" }}>
            <div className="fade-up-1 mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(26,26,26,0.7)", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "28px", height: "1px", backgroundColor: "rgba(26,26,26,0.65)", display: "inline-block" }} />
              Get In Touch
            </div>

            <h1 className="fade-up-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
              Let's build<br />something<br /><span style={{ color: "#1A1A1A", position: "relative" }}>extraordinary.<span style={{ position: "absolute", bottom: "-4px", left: 0, right: 0, height: "3px", background: "#F4F482", borderRadius: "2px" }} /></span>
            </h1>

            <p className="fade-up-3" style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(26,26,26,0.7)", marginBottom: "3rem", maxWidth: "380px" }}>
              Whether you're a founder with a bold idea, an investor looking to co-build, or a partner exploring the ecosystem — we want to hear from you.
            </p>

            {/* Contact details */}
            <div className="fade-up-4" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "General", value: "hello@uncharted.ventures", href: "mailto:hello@uncharted.ventures" },
                { label: "Founders", value: "founders@uncharted.ventures", href: "mailto:founders@uncharted.ventures" },
                { label: "Investors", value: "capital@uncharted.ventures", href: "mailto:capital@uncharted.ventures" },

              ].map(item => (
                <div key={item.label} className="contact-card" style={{ padding: "1.1rem 1.25rem", border: "1px solid rgba(26,26,26,0.08)", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: "0.65rem", color: "rgba(26,26,26,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: "0.83rem", color: "#1A1A1A", textDecoration: "none", fontWeight: 500, transition: "color 0.15s ease" }}
                      onMouseEnter={e => e.target.style.color = "#888"}
                      onMouseLeave={e => e.target.style.color = "#1A1A1A"}
                    >{item.value}</a>
                  ) : (
                    <span style={{ fontSize: "0.83rem", color: "#1A1A1A", fontWeight: 500 }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="fade-up-4" style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              {[
                { label: "LinkedIn", href: "https://linkedin.com/company/uncharted-ventures" },
                { label: "Twitter / X", href: "https://x.com/unchartedvntrs" },
                { label: "Instagram", href: "https://instagram.com/unchartedventures" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="mono"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,26,26,0.7)", textDecoration: "none", padding: "0.45rem 0.75rem", border: "1px solid rgba(26,26,26,0.16)", borderRadius: "2px", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.target.style.borderColor = "#1A1A1A"; e.target.style.color = "#1A1A1A"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(26,26,26,0.16)"; e.target.style.color = "rgba(26,26,26,0.7)"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="fade-up-3">
            {submitted ? (
              <div style={{ padding: "4rem 3rem", border: "1px solid rgba(26,26,26,0.16)", borderRadius: "4px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#F4F482", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.4rem" }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Message received.</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(26,26,26,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  We review every submission personally. You'll hear back from the Uncharted team within 2 business days.
                </p>
                <button onClick={onBack} style={{ backgroundColor: "#1A1A1A", color: "#FAFAFA", padding: "0.85rem 2rem", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.06em", border: "none", borderRadius: "2px", cursor: "pointer", textTransform: "uppercase" }}>
                  Back to Uncharted →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Inquiry type */}
                <div>
                  <label className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,26,26,0.65)", display: "block", marginBottom: "0.65rem" }}>
                    I'm reaching out as...
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {INQUIRY_TYPES.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        className={`type-btn${form.type === t.id ? " active" : ""}`}
                        onClick={() => setForm(f => ({ ...f, type: t.id }))}
                        style={{ padding: "0.45rem 0.9rem", borderRadius: "2px", fontSize: "0.8rem", fontWeight: 500, backgroundColor: form.type === t.id ? "#1A1A1A" : "#FAFAFA", color: form.type === t.id ? "#FAFAFA" : "#1A1A1A" }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,26,26,0.65)", display: "block", marginBottom: "0.5rem" }}>Name *</label>
                    <input
                      type="text"
                      className="contact-input"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      required
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "2px", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A" }}
                    />
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,26,26,0.65)", display: "block", marginBottom: "0.5rem" }}>Email *</label>
                    <input
                      type="email"
                      className="contact-input"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "2px", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A" }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,26,26,0.65)", display: "block", marginBottom: "0.5rem" }}>Message *</label>
                  <textarea
                    className="contact-input"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what you're building, what you need, or what's on your mind..."
                    required
                    rows={6}
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "2px", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A", resize: "vertical", lineHeight: 1.65 }}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem" }}>
                  <p className="mono" style={{ fontSize: "0.65rem", color: "rgba(26,26,26,0.65)", letterSpacing: "0.06em" }}>
                    We respond within 2 business days.
                  </p>
                  <button type="submit" className="submit-btn" style={{ backgroundColor: "#F4F482", color: "#1A1A1A", padding: "0.9rem 2rem", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", border: "none", borderRadius: "2px", cursor: "pointer", textTransform: "uppercase" }}>
                    Send Message →
                  </button>
                </div>
              </form>
            )}

            {/* Bottom note */}
            {!submitted && (
              <div style={{ marginTop: "2rem", padding: "1.25rem", backgroundColor: "rgba(226,243,245,0.4)", border: "1px solid rgba(226,243,245,0.8)", borderRadius: "4px", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#1A1A1A", marginTop: "5px", flexShrink: 0 }} />
                <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(26,26,26,0.7)" }}>
                  <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Founders applying to Change50</strong> — use the email form or reach out directly at <a href="mailto:founders@uncharted.ventures" style={{ color: "#1A1A1A", fontWeight: 500 }}>founders@uncharted.ventures</a> with a brief intro and your venture idea.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ borderTop: "1px solid rgba(26,26,26,0.06)", padding: "1.5rem 2.5rem", marginTop: "4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="mono" style={{ fontSize: "0.65rem", color: "rgba(26,26,26,0.65)", letterSpacing: "0.06em" }}>
            uncharted.ventures ~ $ contact
          </div>
          <div className="mono" style={{ fontSize: "0.65rem", color: "rgba(26,26,26,0.65)", letterSpacing: "0.06em" }}>
            © 2026 UNCHARTED VENTURES LLC
          </div>
        </div>
      </div>
    </div>
  );
}

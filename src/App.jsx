import { useState, useEffect, useRef } from "react";

const LOGO_URL = "https://storage.googleapis.com/uncharted-assets/logo-black.png";

// Animated squiggle SVG paths
function FloatingSquiggles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <path d="M-50 200 Q 100 150, 200 220 T 400 200 T 600 220 T 800 200 T 1000 220 T 1200 200 T 1440 220" stroke="#1A1A1A" strokeWidth="1.2" strokeOpacity="0.07" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-18;0,0" dur="8s" repeatCount="indefinite" />
        </path>
        <path d="M-50 350 Q 150 300, 300 370 T 600 350 T 900 370 T 1200 350 T 1500 370" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.05" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,14;0,0" dur="11s" repeatCount="indefinite" />
        </path>
        <path d="M200 -20 Q 250 100, 220 250 T 240 500 T 210 750 T 230 950" stroke="#1A1A1A" strokeWidth="1.2" strokeOpacity="0.06" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;12,0;0,0" dur="9s" repeatCount="indefinite" />
        </path>
        <path d="M800 -20 Q 820 200, 790 400 T 810 650 T 800 900" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.05" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;-10,0;0,0" dur="13s" repeatCount="indefinite" />
        </path>
        <path d="M1100 100 Q 1200 200 1150 350 T 1180 550 T 1150 750" stroke="#F4F482" strokeWidth="1.5" strokeOpacity="0.25" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;8,12;0,0" dur="7s" repeatCount="indefinite" />
        </path>
        <circle cx="1320" cy="180" r="120" stroke="#E2F3F5" strokeWidth="1" strokeOpacity="0.3" fill="none">
          <animate attributeName="r" values="120;135;120" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="700" r="80" stroke="#F4F482" strokeWidth="1" strokeOpacity="0.2" fill="none">
          <animate attributeName="r" values="80;95;80" dur="9s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function Change50Logo() {
  return (
    <div className="inline-flex items-center gap-2">
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", color: "#FAFAFA" }}>
        Change
        <span style={{ color: "#F4F482" }}>50</span>
      </div>
    </div>
  );
}

const LAUNCH_CARDS = [
  {
    id: "saas",
    number: "01",
    title: "Start a Consumer\nSaaS Business",
    tag: "Product Studio",
    accent: "#F4F482",
    description: "From zero to scalable. We co-build your product, tech stack, and GTM strategy.",
  },
  {
    id: "food",
    number: "02",
    title: "Launch a Food\nVenture",
    tag: "Consumer Brands",
    accent: "#E2F3F5",
    description: "Retail-ready CPG brands, supply chain architecture, and distribution networks.",
  },
  {
    id: "funding",
    number: "03",
    title: "Secure Early-Stage\nFunding",
    tag: "Capital Access",
    accent: "#1A1A1A",
    description: "Connect with our investor network, refine your pitch, and close your seed round.",
  },
];

const PORTFOLIO = [
  {
    id: "sweetkiwi",
    name: "Sweetkiwi",
    category: "Consumer / Retail",
    description: "Better-for-you frozen yogurt brand redefining the premium snack category.",
    stat: "ROC: 12.5%",
    status: "Active",
    accentColor: "#F4F482",
    letter: "S",
  },
  {
    id: "surplus",
    name: "Surplus",
    category: "Asset / Supply Chain",
    description: "Intelligent supply chain optimization platform for modern retail operations.",
    stat: "ARR: +2.3×",
    status: "Scaling",
    accentColor: "#E2F3F5",
    letter: "S",
  },
  {
    id: "cineastra",
    name: "Cineastra",
    category: "Entertainment / Tech",
    description: "Next-gen entertainment technology platform connecting creators and audiences.",
    stat: "Beta: Live",
    status: "Alpha",
    accentColor: "#1A1A1A",
    letter: "C",
  },
];

export default function UnchartedSite() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredPortfolio, setHoveredPortfolio] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#FAFAFA", color: "#1A1A1A", overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #F4F482; color: #1A1A1A; }
        .card-hover { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-hover:hover { transform: translateY(-4px); }
        .launch-card { cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid rgba(26,26,26,0.1); }
        .launch-card:hover { border-color: #1A1A1A; }
        .launch-card.selected { border-color: #1A1A1A; background: #1A1A1A; color: #FAFAFA; }
        .portfolio-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid rgba(26,26,26,0.1); }
        .portfolio-card:hover { border-color: #1A1A1A; transform: translateY(-6px); box-shadow: 0 20px 60px rgba(26,26,26,0.08); }
        .status-tag { opacity: 0; transform: translateY(8px); transition: all 0.25s ease; }
        .portfolio-card:hover .status-tag { opacity: 1; transform: translateY(0); }
        .nav-link { transition: opacity 0.2s ease; }
        .nav-link:hover { opacity: 0.5; }
        .input-field { transition: border-color 0.2s ease; border: 1px solid rgba(250,250,250,0.2); }
        .input-field:focus { outline: none; border-color: #F4F482; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-up-1 { opacity: 0; animation: fadeUp 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-up-2 { opacity: 0; animation: fadeUp 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-up-3 { opacity: 0; animation: fadeUp 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-up-4 { opacity: 0; animation: fadeUp 0.8s 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .squiggle-underline { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='8' viewBox='0 0 100 8'%3E%3Cpath d='M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4' stroke='%23F4F482' stroke-width='2.5' fill='none'/%3E%3C/svg%3E"); background-repeat: repeat-x; background-position: 0 100%; padding-bottom: 6px; background-size: 80px 8px; }
        .terminal-cursor::after { content: '_'; animation: blink 1.1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrollY > 50 ? "rgba(250,250,250,0.92)" : "transparent", backdropFilter: scrollY > 50 ? "blur(12px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(26,26,26,0.08)" : "none", transition: "all 0.4s ease", padding: "0 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
            UNCHARTED
          </div>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {["Studio", "Portfolio", "Network", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", color: "#1A1A1A", textTransform: "uppercase" }}>
                {item}
              </a>
            ))}
            <a href="#network" style={{ backgroundColor: "#1A1A1A", color: "#FAFAFA", padding: "0.5rem 1.2rem", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "background 0.2s ease" }}>
              Apply →
            </a>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section id="studio" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 2.5rem 5rem", position: "relative", overflow: "hidden" }}>
        <FloatingSquiggles />
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          
          {/* Eyebrow */}
          <div className="fade-up-1 mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: "#1A1A1A", opacity: 0.5, textTransform: "uppercase", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: "28px", height: "1px", backgroundColor: "#1A1A1A", display: "inline-block", opacity: 0.5 }}></span>
            Intelligence Layer · Venture Studio · Platform Builder
          </div>

          {/* Headline */}
          <h1 className="fade-up-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 6.5vw, 6rem)", lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "3.5rem", maxWidth: "860px" }}>
            What do you want<br />
            to <span className="squiggle-underline">launch</span> today?
          </h1>

          {/* Cards */}
          <div className="fade-up-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", maxWidth: "960px", marginBottom: "4rem" }}>
            {LAUNCH_CARDS.map((card) => (
              <div
                key={card.id}
                className={`launch-card${selectedCard === card.id ? " selected" : ""}`}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                style={{ padding: "2rem", borderRadius: "4px", backgroundColor: selectedCard === card.id ? "#1A1A1A" : "#FAFAFA", position: "relative", overflow: "hidden" }}
              >
                {selectedCard === card.id && (
                  <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", backgroundColor: card.accent, borderRadius: "0 4px 0 80px", opacity: 0.15 }} />
                )}
                <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: selectedCard === card.id ? card.accent : "#1A1A1A", opacity: selectedCard === card.id ? 1 : 0.45, marginBottom: "1.25rem", textTransform: "uppercase" }}>
                  {card.number} / {card.tag}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "0.75rem", whiteSpace: "pre-line", color: selectedCard === card.id ? "#FAFAFA" : "#1A1A1A" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: selectedCard === card.id ? "rgba(250,250,250,0.65)" : "rgba(26,26,26,0.55)", marginBottom: "1.5rem" }}>
                  {card.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 600, color: selectedCard === card.id ? card.id === "funding" ? "#F4F482" : card.accent : "#1A1A1A", letterSpacing: "0.02em" }}>
                  {selectedCard === card.id ? "Selected →" : "Explore →"}
                </div>
              </div>
            ))}
          </div>

          {/* Sub-copy */}
          <div className="fade-up-4" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <p style={{ fontSize: "0.85rem", color: "rgba(26,26,26,0.45)", maxWidth: "400px", lineHeight: 1.7 }}>
              Uncharted is the intelligence layer for founders and operators building the next generation of companies.
            </p>
            <div style={{ height: "40px", width: "1px", backgroundColor: "rgba(26,26,26,0.12)" }} />
            <div className="mono" style={{ fontSize: "0.72rem", color: "rgba(26,26,26,0.4)", letterSpacing: "0.06em" }}>
              EST. 2021 · BALTIMORE
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STUDIO THESIS */}
      <section style={{ padding: "7rem 2.5rem", backgroundColor: "#1A1A1A", position: "relative", overflow: "hidden" }}>
        {/* Mint accent blob */}
        <div style={{ position: "absolute", top: "-80px", right: "10%", width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "#E2F3F5", opacity: 0.04, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "#F4F482", opacity: 0.05, filter: "blur(50px)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(250,250,250,0.35)", textTransform: "uppercase", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ width: "28px", height: "1px", backgroundColor: "rgba(250,250,250,0.3)", display: "inline-block" }}></span>
                The Thesis
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#FAFAFA", marginBottom: "2rem" }}>
                Future-proofing starts<br />
                <span style={{ color: "#F4F482" }}>here.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(250,250,250,0.6)", marginBottom: "2.5rem", maxWidth: "480px" }}>
                Uncharted is a next-generation venture and platform studio empowering founders and technologies that shape the future.
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(250,250,250,0.4)", maxWidth: "440px" }}>
                We don't just fund — we co-build. As the intelligence layer of a broader institutional ecosystem, Uncharted brings capital, product expertise, and distribution to every venture we touch.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(250,250,250,0.06)", border: "1px solid rgba(250,250,250,0.06)" }}>
              {[
                { value: "3+", label: "Ventures Launched" },
                { value: "$2M+", label: "Capital Deployed" },
                { value: "50+", label: "Network Founders" },
                { value: "4", label: "Years Building" },
              ].map((stat) => (
                <div key={stat.label} style={{ padding: "2.5rem 2rem", backgroundColor: "#1A1A1A" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.4rem", letterSpacing: "-0.04em", color: "#FAFAFA", marginBottom: "0.4rem" }}>
                    {stat.value}
                  </div>
                  <div className="mono" style={{ fontSize: "0.7rem", color: "rgba(250,250,250,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PORTFOLIO */}
      <section id="portfolio" style={{ padding: "7rem 2.5rem", backgroundColor: "#FAFAFA" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(26,26,26,0.4)", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ width: "28px", height: "1px", backgroundColor: "rgba(26,26,26,0.3)", display: "inline-block" }}></span>
                Portfolio
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Launched Through<br />Uncharted
              </h2>
            </div>
            <div className="mono" style={{ fontSize: "0.72rem", color: "rgba(26,26,26,0.35)", letterSpacing: "0.06em", paddingBottom: "4px" }}>
              2021 — PRESENT
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {PORTFOLIO.map((item) => (
              <div
                key={item.id}
                className="portfolio-card card-hover"
                onMouseEnter={() => setHoveredPortfolio(item.id)}
                onMouseLeave={() => setHoveredPortfolio(null)}
                style={{ padding: "2.25rem", borderRadius: "4px", backgroundColor: "#FAFAFA", position: "relative", overflow: "hidden" }}
              >
                {/* Status tag */}
                <div className="status-tag mono" style={{ position: "absolute", top: "1.25rem", right: "1.25rem", backgroundColor: item.accentColor, color: item.id === "cineastra" ? "#FAFAFA" : "#1A1A1A", padding: "0.3rem 0.65rem", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", borderRadius: "2px", textTransform: "uppercase" }}>
                  {item.stat}
                </div>

                {/* Letter mark */}
                <div style={{ width: "52px", height: "52px", borderRadius: "4px", backgroundColor: item.accentColor, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.75rem", transition: "transform 0.3s ease", transform: hoveredPortfolio === item.id ? "rotate(-5deg)" : "rotate(0deg)" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: item.id === "cineastra" ? "#FAFAFA" : "#1A1A1A" }}>
                    {item.letter}
                  </span>
                </div>

                <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(26,26,26,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {item.category}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.65, color: "rgba(26,26,26,0.55)", marginBottom: "2rem" }}>
                  {item.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: item.status === "Active" ? "#22c55e" : item.status === "Scaling" ? "#3b82f6" : "#f59e0b" }} />
                    <span className="mono" style={{ fontSize: "0.68rem", color: "rgba(26,26,26,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {item.status}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1A1A1A", letterSpacing: "0.02em" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CHANGE50 / NETWORK */}
      <section id="network" style={{ padding: "7rem 2.5rem", backgroundColor: "#1A1A1A", position: "relative", overflow: "hidden" }}>
        {/* Background texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(244,244,130,0.04) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(226,243,245,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <Change50Logo />
              </div>
              <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(250,250,250,0.3)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Uncharted Network Initiative
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#FAFAFA", marginBottom: "1.5rem" }}>
                Empowering the Next Generation of Global Founders.
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(250,250,250,0.5)", marginBottom: "1.5rem" }}>
                Join a global network of founders, builders, and investors committed to creating change at scale. Change50 is Uncharted's flagship community initiative.
              </p>
              <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem" }}>
                {[["Global", "Network"], ["Exclusive", "Access"], ["Direct", "Capital"]].map(([top, bot]) => (
                  <div key={top}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#F4F482", marginBottom: "0.2rem" }}>{top}</div>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(250,250,250,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{bot}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Capture */}
            <div style={{ backgroundColor: "rgba(250,250,250,0.04)", border: "1px solid rgba(250,250,250,0.08)", borderRadius: "4px", padding: "3rem" }}>
              <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(250,250,250,0.3)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Join the Network
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", color: "#FAFAFA", marginBottom: "0.75rem" }}>
                Let's build something<br />extraordinary.
              </h3>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(250,250,250,0.4)", marginBottom: "2rem" }}>
                Applications for the Change50 cohort are now open. Drop your email and we'll be in touch.
              </p>
              {submitted ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1.25rem", backgroundColor: "rgba(244,244,130,0.08)", border: "1px solid rgba(244,244,130,0.2)", borderRadius: "2px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F4F482" }} />
                  <span className="mono" style={{ fontSize: "0.78rem", color: "#F4F482", letterSpacing: "0.06em" }}>
                    You're on the list. We'll be in touch.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <input
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{ backgroundColor: "rgba(250,250,250,0.05)", color: "#FAFAFA", padding: "0.85rem 1.1rem", borderRadius: "2px", fontSize: "0.9rem", width: "100%", fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button type="submit" style={{ backgroundColor: "#F4F482", color: "#1A1A1A", padding: "0.85rem 1.5rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", border: "none", borderRadius: "2px", cursor: "pointer", textTransform: "uppercase", transition: "transform 0.15s ease", textAlign: "center" }}
                    onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                    onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                  >
                    Let's Connect →
                  </button>
                </form>
              )}
              <p className="mono" style={{ marginTop: "1rem", fontSize: "0.65rem", color: "rgba(250,250,250,0.2)", letterSpacing: "0.06em" }}>
                No spam. Founders only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TERMINAL FOOTER */}
      <footer style={{ backgroundColor: "#111111", padding: "3rem 2.5rem 2rem", borderTop: "1px solid rgba(250,250,250,0.05)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#FAFAFA", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                UNCHARTED
              </div>
              <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(250,250,250,0.25)", letterSpacing: "0.08em" }}>
                VENTURES + STUDIO + INTELLIGENCE LAYER
              </div>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Studio", "Portfolio", "Change50", "Contact"].map(link => (
                <a key={link} href="#" style={{ fontSize: "0.78rem", color: "rgba(250,250,250,0.3)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.target.style.color = "#F4F482"}
                  onMouseLeave={e => e.target.style.color = "rgba(250,250,250,0.3)"}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Terminal line */}
          <div style={{ borderTop: "1px solid rgba(250,250,250,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="mono terminal-cursor" style={{ fontSize: "0.72rem", color: "rgba(250,250,250,0.2)", letterSpacing: "0.06em" }}>
              uncharted.ventures ~ $ ready to build
            </div>
            <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(250,250,250,0.2)", letterSpacing: "0.06em" }}>
              © 2025 UNCHARTED · ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

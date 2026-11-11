"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ===== Small pill icons ===== */
const PI = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const PWifi = () => (
  <PI>
    <path d="M5 12.55a11 11 0 0114.08 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" />
  </PI>
);
const PShield = () => (
  <PI>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </PI>
);
const PServer = () => (
  <PI>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <circle cx="6" cy="6" r="1" />
    <circle cx="6" cy="18" r="1" />
  </PI>
);
const PCloud = () => (
  <PI>
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
  </PI>
);
const PCpu = () => (
  <PI>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </PI>
);

const ArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginLeft: 4, transition: "transform 0.2s" }}
  >
    <line x1="1" y1="7" x2="13" y2="7" />
    <polyline points="9,3 13,7 9,11" />
  </svg>
);

/* ===== Animated grid background ===== */
function PatternGrid() {
  const nodes = [
    { x: 80, y: 55 }, { x: 220, y: 35 }, { x: 380, y: 65 }, { x: 520, y: 25 },
    { x: 660, y: 60 }, { x: 800, y: 40 }, { x: 940, y: 55 }, { x: 1080, y: 30 },
    { x: 150, y: 155 }, { x: 310, y: 175 }, { x: 470, y: 145 }, { x: 630, y: 165 },
    { x: 790, y: 140 }, { x: 950, y: 160 }, { x: 1100, y: 150 },
    { x: 100, y: 275 }, { x: 260, y: 255 }, { x: 420, y: 285 }, { x: 580, y: 265 },
    { x: 740, y: 280 }, { x: 900, y: 255 }, { x: 1060, y: 270 },
    { x: 180, y: 375 }, { x: 350, y: 355 }, { x: 500, y: 385 }, { x: 700, y: 365 },
    { x: 850, y: 380 }, { x: 1020, y: 360 },
  ];
  const conns: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [1, 9], [2, 10],
    [3, 11], [4, 12], [5, 13], [6, 14], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [13, 14], [8, 15], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20], [14, 21],
    [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [15, 22], [16, 23],
    [17, 24], [18, 25], [19, 26], [20, 27], [22, 23], [23, 24], [24, 25], [25, 26], [26, 27],
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, opacity: 0.5 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {conns.map(([a, b], i) => (
        <line
          key={`l${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-brand)"
          strokeWidth="0.6"
          opacity="0.25"
        >
          <animate attributeName="opacity" values="0.12;0.35;0.12" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" begin={`${(i * 0.15) % 3}s`} />
        </line>
      ))}
      {conns
        .filter((_, i) => i % 3 === 0)
        .map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          return (
            <circle key={`p${i}`} r="3" fill="var(--color-brand)" opacity="0" filter="url(#glow)">
              <animateMotion dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} path={`M${na.x},${na.y} L${nb.x},${nb.y}`} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
            </circle>
          );
        })}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="10" fill="url(#ng)">
            <animate attributeName="r" values="7;13;7" dur={`${4 + (i % 3)}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 4}s`} />
          </circle>
          <circle cx={n.x} cy={n.y} r="2" fill="var(--color-brand)" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" begin={`${(i * 0.4) % 3}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ===== Floating decorative elements ===== */
function FloatingElements() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }} aria-hidden="true">
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", top: "12%", left: "8%", opacity: 0.2, animation: "float1 12s ease-in-out infinite" }}>
        <polygon points="30,2 56,17 56,43 30,58 4,43 4,17" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
      </svg>
      <svg width="40" height="40" viewBox="0 0 60 60" style={{ position: "absolute", top: "60%", left: "5%", opacity: 0.14, animation: "float2 15s ease-in-out infinite" }}>
        <polygon points="30,2 56,17 56,43 30,58 4,43 4,17" fill="none" stroke="var(--color-accent-sky)" strokeWidth="1.5" />
      </svg>
      <svg width="50" height="50" viewBox="0 0 60 60" style={{ position: "absolute", top: "20%", right: "6%", opacity: 0.16, animation: "float3 14s ease-in-out infinite" }}>
        <polygon points="30,2 56,17 56,43 30,58 4,43 4,17" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
      </svg>
      <div style={{ position: "absolute", bottom: "18%", right: "12%", width: 70, height: 70, borderRadius: "50%", border: "1.5px solid rgba(47, 107, 79,0.2)", animation: "float2 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "35%", right: "15%", width: 30, height: 30, borderRadius: "50%", background: "rgba(47, 107, 79,0.04)", animation: "float1 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "25%", left: "18%", width: 6, height: 6, borderRadius: "50%", background: "var(--color-brand)", opacity: 0.15, animation: "float3 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "30%", left: "22%", width: 4, height: 4, borderRadius: "50%", background: "var(--color-accent-sky)", opacity: 0.2, animation: "float1 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "45%", right: "20%", width: 5, height: 5, borderRadius: "50%", background: "var(--color-brand)", opacity: 0.12, animation: "float2 11s ease-in-out infinite" }} />
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute", bottom: "25%", left: "15%", opacity: 0.07, animation: "float3 16s ease-in-out infinite" }}>
        <circle cx="20" cy="20" r="3" fill="var(--color-brand)" />
        <circle cx="60" cy="20" r="3" fill="var(--color-brand)" />
        <circle cx="40" cy="60" r="3" fill="var(--color-brand)" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="var(--color-brand)" strokeWidth="1" />
        <line x1="60" y1="20" x2="40" y2="60" stroke="var(--color-brand)" strokeWidth="1" />
        <line x1="40" y1="60" x2="20" y2="20" stroke="var(--color-brand)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ===== Pill data ===== */
const pills = [
  { label: "Workplace", Icon: PServer },
  { label: "Restaurants", Icon: PWifi },
  { label: "Healthcare", Icon: PShield },
  { label: "Retail", Icon: PCloud },
  { label: "Hospitality", Icon: PCpu },
];

/* ===== Hero component ===== */
export default function Hero() {
  const [activePill, setActivePill] = useState("Workplace");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="ui-hero">
      <PatternGrid />
      <FloatingElements />
      <div className="ui-hero-inner">
        {loaded && (
          <h1 className="ui-hero-headline">
            <span className="ui-clip-reveal">
              <span className="ui-clip-reveal-inner" style={{ animationDelay: "0.15s" }}>
                Commercial Interiors —
              </span>
            </span>
            <span className="ui-clip-reveal">
              <span className="ui-clip-reveal-inner ui-gradient-text" style={{ animationDelay: "0.35s" }}>
                Designed and Built
              </span>
            </span>
            <span className="ui-clip-reveal">
              <span className="ui-clip-reveal-inner" style={{ animationDelay: "0.55s" }}>
                by One Team
              </span>
            </span>
          </h1>
        )}
        {loaded && (
          <p className="ui-hero-sub" style={{ animationDelay: "0.8s" }}>
            Workplaces, restaurants, clinics and stores — from first sketch to{" "}
            <strong>final walkthrough</strong>. 200+ spaces delivered.
          </p>
        )}
        {loaded && (
          <div className="ui-hero-pills">
            {pills.map((p, i) => (
              <button
                key={p.label}
                className={`ui-pill ${activePill === p.label ? "active" : ""}`}
                onClick={() => setActivePill(p.label)}
                style={{ animationDelay: `${1.0 + i * 0.1}s` }}
              >
                <p.Icon />
                {p.label}
              </button>
            ))}
          </div>
        )}
        {loaded && (
          <div className="ui-hero-ctas" style={{ animationDelay: "1.5s" }}>
            <Link href="/solutions" className="ui-btn-primary">
              Explore Services <ArrowRight />
            </Link>
            <Link href="/case-studies" className="ui-btn-secondary">View Projects</Link>
          </div>
        )}
      </div>
      {loaded && (
        <div className="ui-scroll-hint" style={{ animationDelay: "2.5s" }}>
          <div className="ui-scroll-mouse" />
          <span>Scroll</span>
        </div>
      )}
    </section>
  );
}

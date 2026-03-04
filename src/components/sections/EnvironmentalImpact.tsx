"use client";

import React from "react";

interface Props {
  videoContainerRef: React.RefObject<HTMLDivElement | null>;
  videoRef?: React.RefObject<HTMLVideoElement | null>; // optional — kept for compat
  impactRef: React.RefObject<HTMLDivElement | null>;
}

const NEURAL = "#0A4D8C";
const TEXT = "#0A2A4A";

// ── Shared autoplay video slot ────────────────────────────────────────────────
// src: place your file at /public/environmental_impact.webp
// Falls back to .mp4 if the browser can't play animated WebP
function ImpactVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={`w-full h-full object-cover ${className}`}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      {/* Primary: animated WebP — smallest file, best quality for short loops */}
      <source src="/videos/grid.webp" type="image/webp" />
      {/* Fallback: MP4 for browsers that don't support animated WebP in <video> */}
      <source src="/videos/grid.mp4" type="video/mp4" />
    </video>
  );
}

export default function EnvironmentalImpact({
  videoContainerRef,
  impactRef,
}: Props) {
  return (
    <div
      ref={impactRef}
      className="absolute inset-0 z-10 hidden w-full h-full"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* ── Grid lines md+ ── */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {[0, 1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i / 5) * 100}%`,
              backgroundColor: `${NEURAL}18`,
            }}
          />
        ))}
        {[0, 1, 2, 3].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute left-0 right-0 h-1px"
            style={{ top: `${(i / 3) * 100}%`, backgroundColor: `${NEURAL}18` }}
          />
        ))}
      </div>

      {/* ── Grid lines mobile ── */}
      <div className="absolute inset-0 pointer-events-none z-0 block md:hidden">
        {[0, 1, 2].map((_, i) => (
          <div
            key={`mv${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i / 2) * 100}%`,
              backgroundColor: `${NEURAL}18`,
            }}
          />
        ))}
        {[0, 1, 2, 3].map((_, i) => (
          <div
            key={`mh${i}`}
            className="absolute left-0 right-0 h-1px"
            style={{ top: `${(i / 3) * 100}%`, backgroundColor: `${NEURAL}18` }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════
          MOBILE  (< 768px)
          Order: headline → VIDEO → description
      ════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col justify-center h-full pr-5 py-8 gap-0 relative z-10">
        {/* TOP: "Most damage" headline */}
        <div
          style={{ overflow: "hidden", paddingBottom: "0.15em" }}
          className="mb-4"
        >
          <h2
            className="impact-clip-left font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(26px, 7.5vw, 38px)", color: TEXT }}
          >
            Most damage
          </h2>
        </div>

        {/* MIDDLE: autoplay video, full-width */}
        <div
          className="relative w-full overflow-hidden mb-4"
          style={{ aspectRatio: "3/2" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <ImpactVideo />
            <div
              className="absolute inset-0 mix-blend-multiply pointer-events-none"
              style={{ backgroundColor: `${NEURAL}14` }}
            />
          </div>
        </div>

        {/* BOTTOM: "never make it" + description */}
        <div
          style={{ overflow: "hidden", paddingBottom: "0.15em" }}
          className="mb-4"
        >
          <h2
            className="impact-clip-right font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(26px, 7.5vw, 38px)", color: TEXT }}
          >
            never gets
            <br />
            reported
          </h2>
        </div>

        <div
          style={{ overflow: "hidden", paddingBottom: "0.15em" }}
          className="mb-4"
        >
          <div
            className="w-8 h-[1.5px] mb-3"
            style={{ backgroundColor: NEURAL, opacity: 0.35 }}
          />
          <p
            className="impact-clip-right font-medium leading-relaxed"
            style={{
              fontSize: "13px",
              color: TEXT,
              opacity: 0.82,
              maxWidth: "100%",
            }}
          >
            Most pollution events, illegal dumping, infrastructure failures, and
            early climate signals go undocumented. PlanetMind turns everyday
            observations into permanent, verifiable reports — creating
            visibility where silence used to win.
          </p>
        </div>

        {/* Accent dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: NEURAL, opacity: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          TABLET  (768px – 1023px)
      ════════════════════════════════════════ */}
      <div className="hidden md:flex lg:hidden flex-col justify-center h-full px-8 py-10 gap-0 relative z-10">
        <div
          style={{ overflow: "hidden", paddingBottom: "0.2em" }}
          className="mb-6"
        >
          <h2
            className="impact-clip-left font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(30px, 4vw, 48px)", color: TEXT }}
          >
            Most damage
          </h2>
        </div>

        {/* Middle row: video RIGHT + overlapping text */}
        <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
          {/* Video — right 52% */}
          <div
            className="absolute right-0 top-0 bottom-0 overflow-hidden"
            style={{ width: "52%" }}
          >
            <div
              ref={videoContainerRef}
              className="absolute inset-0 overflow-hidden"
              style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
            >
              <ImpactVideo />
              <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
                style={{ backgroundColor: `${NEURAL}14` }}
              />
            </div>
          </div>

          {/* Headline — overlaps from left into video */}
          <div
            className="absolute inset-0 flex items-center"
            style={{ zIndex: 10, pointerEvents: "none" }}
          >
            <div style={{ overflow: "hidden", paddingBottom: "0.3em" }}>
              <h2
                className="impact-clip-right font-bold leading-[1.05] tracking-tight"
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  color: TEXT,
                  whiteSpace: "nowrap",
                }}
              >
                never gets
                <br />
                reported
              </h2>
            </div>
          </div>
        </div>

        {/* Description bottom right */}
        <div className="flex justify-end mt-6">
          <div
            style={{
              overflow: "hidden",
              paddingBottom: "0.2em",
              maxWidth: "50%",
            }}
          >
            <p
              className="impact-clip-right font-medium leading-relaxed"
              style={{ fontSize: "15px", color: TEXT, opacity: 0.85 }}
            >
              Most pollution events, illegal dumping, infrastructure failures,
              and early climate signals go undocumented. PlanetMind turns
              everyday observations into permanent, verifiable reports —
              creating visibility where silence used to win.
            </p>
          </div>
        </div>

        {[
          { top: "52%", left: "47%" },
          { top: "57%", left: "47%" },
          { bottom: "20%", right: "8%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none z-20"
            style={{
              ...(pos as React.CSSProperties),
              backgroundColor: NEURAL,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════
          DESKTOP  (≥ 1024px)
          Original 5-col × 3-row grid, preserved exactly
      ════════════════════════════════════════ */}
      <div
        className="hidden lg:grid relative z-10 w-full h-full"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {/* "Most damage" — col 1, row 2 */}
        <div
          style={{ gridColumn: "1", gridRow: "2" }}
          className="flex items-center pl-8 xl:pl-12"
        >
          <div style={{ overflow: "hidden", paddingBottom: "0.3em" }}>
            <h2
              className="impact-clip-left font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(32px, 3.2vw, 58px)", color: TEXT }}
            >
              Most
              <br />
              damage
            </h2>
          </div>
        </div>

        {/* Video — col 2, row 2 */}
        <div
          style={{ gridColumn: "2", gridRow: "2" }}
          className="relative overflow-hidden"
        >
          <div
            ref={videoContainerRef}
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          >
            <ImpactVideo />
            <div
              className="absolute inset-0 mix-blend-multiply pointer-events-none"
              style={{ backgroundColor: `${NEURAL}14` }}
            />
          </div>
        </div>

        {/* "never make it to your plants" — col 2/5, row 2, over video */}
        <div
          style={{
            gridColumn: "2 / 5",
            gridRow: "2",
            zIndex: 10,
            pointerEvents: "none",
          }}
          className="flex items-center"
        >
          <div
            style={{
              overflow: "hidden",
              paddingBottom: "0.3em",
              paddingLeft: "52%",
            }}
          >
            <h2
              className="impact-clip-right font-bold leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(32px, 3.2vw, 58px)",
                color: TEXT,
                whiteSpace: "nowrap",
              }}
            >
              never gets
              <br />
              reported
            </h2>
          </div>
        </div>

        {/* Description — col 4, row 3 */}
        <div
          style={{ gridColumn: "4", gridRow: "3" }}
          className="flex items-start pt-4 pl-4"
        >
          <div style={{ overflow: "hidden", paddingBottom: "0.3em" }}>
            <p
              className="impact-clip-right font-medium leading-relaxed"
              style={{
                fontSize: "clamp(14px, 1.1vw, 17px)",
                color: TEXT,
                maxWidth: "240px",
                opacity: 0.85,
              }}
            >
              Most pollution events, illegal dumping, infrastructure failures,
              and early climate signals go undocumented. PlanetMind turns
              everyday observations into permanent, verifiable reports —
              creating visibility where silence used to win.
            </p>
          </div>
        </div>

        {/* Empty grid cells */}
        <div style={{ gridColumn: "1", gridRow: "1" }} />
        <div style={{ gridColumn: "1", gridRow: "3" }} />
        <div style={{ gridColumn: "2", gridRow: "1" }} />
        <div style={{ gridColumn: "2", gridRow: "3" }} />
        <div style={{ gridColumn: "3 / 6", gridRow: "1" }} />
        <div style={{ gridColumn: "5", gridRow: "2 / 4" }} />
      </div>

      {/* Desktop accent dots */}
      <div className="hidden lg:block">
        {[
          { top: "42%", left: "55%" },
          { top: "57%", left: "55%" },
          { top: "35%", right: "6%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none z-20"
            style={{
              ...(pos as React.CSSProperties),
              backgroundColor: NEURAL,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

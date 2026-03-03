"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceHolderImages } from "@/lib/placeholder-images";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    num: "01",
    cat: "POLLUTION EVENT",
    user: "Amara Osei",
    handle: "@amaraosei · Accra, Ghana",
    quote:
      "I reported an industrial discharge into the Densu River on a Tuesday morning. By Friday it was in the national environmental database. I earned 22 B3TR. But honestly — the fact that it's now a permanent record is what matters.",
    reward: "+22 B3TR",
    imgId: "avatar-1",
    accent: "#3DDBA8",
  },
  {
    num: "02",
    cat: "ILLEGAL ACTIVITIES",
    user: "Lucas Ferreira",
    handle: "@lucasf · Manaus, Brazil",
    quote:
      "I was hiking near a protected forest boundary and found fresh deforestation — chainsaw marks, tracks, cleared sections. Filed the report with coordinates. PlanetMind verified it within 6 hours. I just needed my phone.",
    reward: "+40 B3TR",
    imgId: "avatar-2",
    accent: "#F59E0B",
  },
  {
    num: "03",
    cat: "CLIMATE INDICATORS",
    user: "Yuna Park",
    handle: "@yunapark · Busan, South Korea",
    quote:
      "The cherry blossoms near the harbor bloomed 19 days earlier than last year. I've been tracking this for three seasons now. PlanetMind's seasonal change category is the only place this observation gets recorded.",
    reward: "+12 B3TR",
    imgId: "avatar-3",
    accent: "#6AACDD",
  },
  {
    num: "04",
    cat: "INFRASTRUCTURE",
    user: "Priya Nair",
    handle: "@priyanair · Mumbai, India",
    quote:
      "Three broken air quality monitors in my neighborhood. None reported. I filed all three in under 10 minutes. Two were repaired within the month. The data existed. That's the point.",
    reward: "+15 B3TR",
    imgId: "avatar-1",
    accent: "#3DDBA8",
  },
];

function Barcode({ color = "#0A2A4A" }: { color?: string }) {
  const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1];
  let x = 0;
  return (
    <svg width="56" height="24" viewBox="0 0 72 32" fill="none">
      {bars.map((w, i) => {
        const el = (
          <rect
            key={i}
            x={x}
            y={0}
            width={w}
            height={32}
            fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.3}
          />
        );
        x += w + 1.2;
        return el;
      })}
    </svg>
  );
}

// ── Shared badge ──
function WallBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-mint/30 w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(61,219,168,0.8)]" />
      <span className="text-mintt text-[9px] font-black uppercase tracking-[0.28em]">
        Wall of Reports
      </span>
    </div>
  );
}

// ── Shared card ──
function ReviewCard({
  review,
  clipCard = false,
}: {
  review: (typeof REVIEWS)[0];
  clipCard?: boolean;
}) {
  const avatar = PlaceHolderImages.find((img) => img.id === review.imgId);
  return (
    <div
      className={`bg-white flex flex-col justify-between h-full ${clipCard ? "card-cut" : ""}`}
      style={{
        padding: clipCard ? "2rem 2.5rem 1.8rem" : "1.5rem 1.25rem 1.25rem",
      }}
    >
      <div>
        {/* Index + category tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#0A2A4A]/30 text-[10px] font-black uppercase tracking-[0.28em] font-mono">
            AI ——— {review.num}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 border"
            style={{
              color: review.accent,
              borderColor: review.accent + "60",
              backgroundColor: review.accent + "12",
            }}
          >
            {review.cat}
          </span>
        </div>

        {/* Stacked headline */}
        <h3
          className="text-[#0A2A4A] font-black uppercase mb-4"
          style={{
            fontSize: clipCard
              ? "clamp(1.8rem, 3.2vw, 3rem)"
              : "clamp(1.3rem, 5vw, 2rem)",
            lineHeight: "0.92",
            letterSpacing: "-0.03em",
          }}
        >
          {review.cat.split(" ").map((word, wi) => (
            <React.Fragment key={wi}>
              {word}
              <br />
            </React.Fragment>
          ))}
        </h3>

        {/* User */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-full overflow-hidden bg-[#0A2A4A]/10 relative shrink-0 border-2"
            style={{ borderColor: review.accent + "60" }}
          >
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt={review.user}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="text-[#0A2A4A] font-black tracking-[-0.02em] text-sm">
              {review.user}
            </div>
            <div className="text-[#0A2A4A]/40 mt-0.5 tracking-wide text-[11px]">
              {review.handle}
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="text-[#0A2A4A]/65 leading-[1.65] font-light italic text-sm">
          "{review.quote}"
        </p>
      </div>

      {/* Reward + barcode */}
      <div
        className="flex items-end justify-between mt-4 pt-4"
        style={{ borderTop: `1px solid ${review.accent}30` }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[#0A2A4A]/35 text-[9px] font-bold uppercase tracking-[0.25em]">
            Reward Earned
          </span>
          <span
            className="text-lg font-black tracking-[-0.02em]"
            style={{ color: review.accent }}
          >
            {review.reward}
          </span>
        </div>
        <Barcode color="#0A2A4A" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// MOBILE  (< 640px) — normal doc flow, no GSAP
// ════════════════════════════════════════
function MobileTestimonials() {
  return (
    <section className="w-full bg-[#0A2A4A]">
      <div className="px-5 pt-12 pb-8">
        <WallBadge />
        <h2
          className="text-white font-black uppercase mt-5 mb-5"
          style={{
            fontSize: "clamp(2.6rem, 12vw, 4rem)",
            lineHeight: "0.87",
            letterSpacing: "-0.05em",
          }}
        >
          TRUSTED
          <br />
          <span className="text-[#6AACDD]">BY</span>
          <br />
          CITIZENS
        </h2>
        <p className="text-white/45 text-sm leading-relaxed font-light mb-6">
          PlanetMind is built for the people who see environmental damage and
          refuse to look away.
        </p>
        <button className="w-full px-6 py-3 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#0A2A4A] transition-all duration-200">
          · START REPORTING ·
        </button>
      </div>
      <div className="flex flex-col gap-4 px-5 pb-12">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-white">
            <ReviewCard review={review} clipCard={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// TABLET  (640px–1023px) — 2-col grid, no GSAP
// ════════════════════════════════════════
function TabletTestimonials() {
  return (
    <section className="w-full bg-[#0A2A4A]">
      {/* Header */}
      <div className="px-8 pt-14 pb-10 flex items-end justify-between gap-8">
        <div>
          <WallBadge />
          <h2
            className="text-white font-black uppercase mt-5"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.05em",
            }}
          >
            TRUSTED
            <br />
            <span className="text-[#6AACDD]">BY</span>
            <br />
            CITIZENS
          </h2>
        </div>
        <div className="flex flex-col items-end gap-4 shrink-0 max-w-65">
          <p className="text-white/45 text-sm leading-relaxed font-light text-right">
            PlanetMind is built for the people who see environmental damage and
            refuse to look away.
          </p>
          <button className="px-7 py-3 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#0A2A4A] transition-all duration-200 whitespace-nowrap">
            · START REPORTING ·
          </button>
        </div>
      </div>
      {/* 2-col grid */}
      <div className="grid grid-cols-2 gap-4 px-8 pb-14">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-white min-h-105 flex flex-col">
            <ReviewCard review={review} clipCard={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// DESKTOP  (≥ 1024px) — original pinned carousel
// ════════════════════════════════════════
function DesktopTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(carouselRef.current, {
        x: "-58%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0A2A4A] flex overflow-hidden"
    >
      {/* LEFT fixed panel */}
      <div
        className="w-[44%] shrink-0 h-full flex flex-col justify-between py-14 px-16 z-10 bg-[#0A2A4A]"
        style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <WallBadge />
        <div>
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(4rem, 7.5vw, 7rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.05em",
            }}
          >
            TRUSTED
            <br />
            <span className="text-[#6AACDD]">BY</span>
            <br />
            CITIZENS
          </h2>
          <p className="mt-8 text-white/45 text-base leading-relaxed max-w-90 font-light">
            PlanetMind is built for the people who see environmental damage and
            refuse to look away.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 px-5 py-3 border border-white/15 text-white text-[10px] font-black uppercase tracking-[0.22em] w-fit cursor-grab">
            ← DRAG →
          </div>
          <button className="px-10 py-4 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#0A2A4A] transition-all duration-200 w-fit">
            · START REPORTING ·
          </button>
        </div>
      </div>

      {/* RIGHT carousel */}
      <div className="flex-1 h-full flex items-center overflow-visible relative">
        <div
          ref={carouselRef}
          className="flex items-stretch"
          style={{
            gap: "40px",
            paddingRight: "8rem",
            height: "78%",
            width: "max-content",
          }}
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="card-cut bg-white flex flex-col justify-between"
              style={{
                width: "calc(50vw - 20px)",
                minWidth: "360px",
                maxWidth: "600px",
              }}
            >
              <ReviewCard review={review} clipCard={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// ROOT — picks layout after hydration
// ════════════════════════════════════════
export default function Testimonials() {
  const [breakpoint, setBreakpoint] = useState<
    "mobile" | "tablet" | "desktop" | null
  >(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBreakpoint(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Prevent SSR mismatch — render nothing until client knows screen size
  if (breakpoint === null) return null;

  return (
    <>
      <style>{`
        .card-cut {
          clip-path: polygon(0% 0%, 82% 0%, 100% 8%, 100% 100%, 18% 100%, 0% 92%);
        }
      `}</style>
      {breakpoint === "mobile" && <MobileTestimonials />}
      {breakpoint === "tablet" && <TabletTestimonials />}
      {breakpoint === "desktop" && <DesktopTestimonials />}
    </>
  );
}

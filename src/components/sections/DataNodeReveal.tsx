"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CARDS = [
  {
    title: "Smaller than a single report",
    desc: "Engineered to capture the precise moment of environmental damage — location, category, severity, timestamp. All from your pocket.",
  },
  {
    title: "Effortlessly deployable",
    desc: "No training. No equipment. No expertise required. Open the app, document what you see, and submit. The intelligence layer does the rest.",
  },
  {
    title: "Zero institutional dependency",
    desc: "We completely bypass government monitoring gaps — no budget cycles, no political delays, no compromised data. Zero compromise.",
  },
];

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line
        x1="9"
        y1="0"
        x2="9"
        y2="18"
        stroke="rgba(13,32,64,0.35)"
        strokeWidth="1.2"
      />
      <line
        x1="0"
        y1="9"
        x2="18"
        y2="9"
        stroke="rgba(13,32,64,0.35)"
        strokeWidth="1.2"
      />
      <line
        x1="2"
        y1="2"
        x2="16"
        y2="16"
        stroke="rgba(13,32,64,0.35)"
        strokeWidth="1.2"
      />
      <line
        x1="16"
        y1="2"
        x2="2"
        y2="16"
        stroke="rgba(13,32,64,0.35)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function DataNodeReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rawP = useRef(0);
  const smoothP = useRef(0);
  const rafRef = useRef<number>(0);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      rawP.current = Math.min(Math.max(scrolled / total, 0), 1);
    };
    const tick = () => {
      smoothP.current += (rawP.current - smoothP.current) * 0.06;
      setP(smoothP.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const remap = (v: number, a: number, b: number) =>
    Math.min(Math.max((v - a) / (b - a), 0), 1);

  const questionOpacity = 1 - remap(p, 0.05, 0.2);
  const questionY = -remap(p, 0.05, 0.2) * 24;
  const witnessOpacity = 1 - remap(p, 0.2, 0.42);
  const witnessPushY = remap(p, 0.12, 0.44) * -52;

  const meetOpacity = remap(p, 0.68, 0.82);
  const statsOpacity = remap(p, 0.78, 0.92);

  const staggerStart = [0, 22, 48];
  const staggerVh = (i: number) => staggerStart[i] * (1 - remap(p, 0.04, 0.72));

  return (
    <div ref={wrapperRef} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden z-0 bg-[linear-gradient(135deg,_#020810_0%,_#040f22_15%,_#071830_28%,_#0a2040_42%,_#0d2a54_56%,_#103260_68%,_#163a72_80%,_#1e4890_100%)]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(100,160,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,160,255,0.03)_1px,transparent_1px)] bg-size-[72px_72px]" />

        <div
          className="absolute top-16 left-6 md:top-20 md:left-16 max-w-120 z-20 pointer-events-none"
          style={{
            opacity: questionOpacity,
            transform: `translateY(${questionY}px)`,
          }}
        >
          <p className="font-mono font-bold text-[10px] tracking-[0.22em] uppercase text-white/40 mb-4">
            The Problem
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white/90 leading-tight tracking-tight">
            How much environmental damage goes unrecorded —{" "}
            <span className="italic text-white/60">
              because no one was watching?
            </span>
          </h2>
        </div>

        <div
          className="absolute bottom-20 right-6 md:right-16 max-w-105 text-right z-20"
          style={{
            opacity: witnessOpacity,
            transform: `translateY(${witnessPushY}vh)`,
            pointerEvents: witnessOpacity > 0.05 ? "auto" : "none",
          }}
        >
          <p className="font-mono font-bold text-[10px] tracking-[0.22em] uppercase text-white/40 mb-3">
            The Solution
          </p>
          <h3 className="text-3xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight">
            We built a better witness
          </h3>
          <p className="font-mono text-white/50 text-xs md:text-sm leading-relaxed mb-8 tracking-wide">
            Meet PlanetMind — powered by billions of citizen scientists, the
            first real-time environmental intelligence database.
          </p>
          <Button
            variant="outline"
            className="font-mono font-bold uppercase tracking-widest text-white/80 border-white/20 rounded-none hover:bg-white/10 h-12 px-8 text-xs"
          >
            · Learn how it works ·
          </Button>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 pointer-events-none">
          <div
            style={{
              opacity: meetOpacity,
              transform: `translateY(${(1 - meetOpacity) * 30}px)`,
            }}
          >
            <p className="font-mono font-bold text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
              The Platform
            </p>
            <h2 className="text-5xl md:text-9xl font-light text-white/95 leading-none mb-8 tracking-tighter">
              Meet PlanetMind™
            </h2>
            <p className="font-mono text-white/50 text-lg md:text-2xl leading-relaxed max-w-2xl tracking-wide">
              Every verified submission enters the global database. Every entry
              creates a permanent record.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-12 md:gap-24 mt-14"
            style={{
              opacity: statsOpacity,
              transform: `translateY(${(1 - statsOpacity) * 20}px)`,
            }}
          >
            {[
              { value: "0", label: "Reports ignored" },
              { value: "∞", label: "Data points possible" },
              { value: "B3TR", label: "Token rewards" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-7xl font-light text-white leading-none mb-3 tracking-tighter">
                  {stat.value}
                </div>
                <div className="w-10 h-px bg-white/20 mb-3" />
                <div className="font-mono font-bold text-[10px] tracking-[0.25em] uppercase text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative -mt-[100vh] z-10 pt-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="will-change-transform"
              style={{ transform: `translateY(${staggerVh(i)}vh)` }}
            >
              <Card className="bg-[#E4E0D5] border-none rounded-none p-10 flex flex-col h-[40vh] md:h-[45vh] min-h-80">
                <div className="mb-auto">
                  <CrossIcon />
                </div>
                <div className="mt-auto">
                  <div className="w-full h-px bg-black/10 mb-6" />
                  <h4 className="text-xl md:text-2xl font-bold text-navy mb-3 tracking-tight">
                    {card.title}
                  </h4>
                  <p className="font-mono text-navy/60 text-sm leading-relaxed tracking-wide">
                    {card.desc}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="h-screen" />
      </div>
    </div>
  );
}

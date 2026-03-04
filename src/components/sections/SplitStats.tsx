"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { val: "2026", label: "PUBLIC\nLAUNCH" },
  { val: "Phase 1", label: "COMMUNITY\nPILOT" },
  { val: "0", label: "REPORTS THAT\nDISAPPEAR" },
  { val: "Open", label: "GLOBAL\nPARTICIPATION" },
];

export default function SplitStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax only on md+ where sticky image exists
      if (window.innerWidth >= 768) {
        gsap.to(".visual-content", {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".pm-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pm-stats-list",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const videoImg = PlaceHolderImages.find(
    (img) => img.id === "river-pollution-video",
  );

  return (
    <div className="bg-[#FAFAF8] font-sans">
      {/* ════════════════════════════════════════════
          SECTION 1 — Stats
          Mobile: single column, no sticky image
          Tablet: image top banner + stats below
          Desktop: original 50/50 sticky split
      ════════════════════════════════════════════ */}
      <section ref={containerRef} className="relative w-full">
        {/* ── Mobile video banner (< md) ── */}
        <div
          className="block md:hidden w-full relative overflow-hidden"
          style={{ height: "45vw", minHeight: "200px", maxHeight: "320px" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/bad.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/20 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(27,58,92,0.4)_100%)] z-10" />
        </div>

        {/* ── Desktop sticky + scroll wrapper ── */}
        <div className="md:flex md:min-h-[200vh]">
          {/* Sticky visual — desktop only */}
          <div className="hidden md:flex flex-[0_0_50%] sticky top-0 h-screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src="/videos/bad.mp4" type="video/mp4" />
            </video>
          </div>

          {/* ── Scrolling stats panel ── */}
          <div
            className="w-full md:flex-[0_0_50%] bg-[#FAFAF8] flex flex-col"
            style={{ padding: "clamp(32px, 6vw, 96px) clamp(20px, 5vw, 96px)" }}
          >
            {/* Header */}
            <div className="mb-10 md:mb-20">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-navy flex items-center justify-center text-white text-[9px] md:text-[10px] font-black mb-6 md:mb-8">
                PM
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-navy/40 mb-3 md:mb-4">
                Global Impact Network
              </p>
              <h2
                className="font-extrabold text-navy leading-none tracking-tighter mb-8 md:mb-12"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                Citizen-Verified &{" "}
                <span className="font-light italic">Planet-Approved</span>
              </h2>

              {/* Stats list */}
              <div className="pm-stats-list border-t border-navy/10">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="pm-row group relative flex items-center justify-between border-b border-navy/10 overflow-hidden"
                    style={{
                      paddingTop: "clamp(16px, 3vw, 40px)",
                      paddingBottom: "clamp(16px, 3vw, 40px)",
                    }}
                  >
                    <span
                      className="font-light text-navy leading-none tracking-tighter group-hover:text-mint transition-colors duration-300 z-10"
                      style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                    >
                      {s.val}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-bold text-navy/40 tracking-[0.2em] uppercase text-right whitespace-pre-line group-hover:text-navy/80 transition-colors duration-300 z-10 leading-relaxed">
                      {s.label}
                    </span>
                    <div className="absolute inset-0 bg-navy/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6 md:mt-8">
                <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_12px_rgba(61,219,168,0.6)]" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/40">
                  *Based on verified category reward rates.
                </p>
              </div>
            </div>

            {/* Secondary copy — pushed down on desktop, flows naturally on mobile */}
            <div className="md:mt-[50vh] max-w-xl">
              <div className="w-10 h-0.5 bg-mint mb-5 md:mb-6 shadow-[0_0_12px_rgba(61,219,168,0.6)]" />
              <h3
                className="font-extrabold text-navy leading-tight tracking-tight mb-6 md:mb-8"
                style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)" }}
              >
                Cleaner Data —{" "}
                <span className="font-light italic">
                  Zero Institutional Cost
                </span>
              </h3>
              <p
                className="text-navy/50 leading-relaxed mb-6 md:mb-8"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.375rem)" }}
              >
                Traditional monitoring costs millions and takes years.
                PlanetMind captures environmental intelligence in real-time,
                directly from the field.
              </p>
              <p
                className="text-navy/50 leading-relaxed mb-8 md:mb-12"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.375rem)" }}
              >
                Every report is clean, verified, and permanently recorded on the
                blockchain — providing an immutable record of our planet's
                changing state.
              </p>
              <Button
                variant="outline"
                className="border-navy text-navy font-bold uppercase tracking-widest rounded-none hover:bg-navy hover:text-white transition-all w-full sm:w-auto"
                style={{
                  padding: "0 clamp(24px, 4vw, 40px)",
                  height: "clamp(48px, 6vw, 56px)",
                  fontSize: "clamp(10px, 1.2vw, 13px)",
                }}
              >
                • Start Reporting •
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — Bypassing the Compliance Cycle
          Mobile: stacked, image below text
          Tablet+: side by side
      ════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FAFAF8]">
        <div className="flex flex-col md:flex-row md:min-h-[90vh]">
          {/* Text side */}
          <div
            className="w-full md:w-1/2 flex flex-col justify-between"
            style={{ padding: "clamp(32px, 6vw, 96px) clamp(20px, 5vw, 96px)" }}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-navy/40 mb-3 md:mb-4">
                Environmental Intelligence
              </p>
              <h2
                className="font-extrabold text-navy leading-none tracking-tighter"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                Bypassing the{" "}
                <span className="font-light italic">Compliance Cycle</span>
              </h2>
            </div>

            {/* Mobile image between headline and copy */}
            {videoImg && (
              <div
                className="block md:hidden w-full relative overflow-hidden my-8"
                style={{
                  height: "55vw",
                  minHeight: "220px",
                  maxHeight: "360px",
                }}
              >
                <Image
                  src={videoImg.imageUrl}
                  alt="Impact"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/15 mix-blend-multiply z-10" />
              </div>
            )}

            <div className="mt-8 md:mt-20">
              <div className="w-10 h-0.5 bg-mint mb-5 md:mb-6 shadow-[0_0_12px_rgba(61,219,168,0.6)]" />
              <p
                className="font-medium text-navy/50 leading-relaxed mb-8 md:mb-10"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.625rem)" }}
              >
                Stop paying for offsets. Start creating real impact. Every
                observation you submit provides the high-fidelity data needed to
                protect and restore ecosystems.
              </p>
              <Button
                className="bg-navy text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
                style={{
                  padding: "0 clamp(28px, 4vw, 48px)",
                  height: "clamp(48px, 6vw, 56px)",
                  fontSize: "clamp(10px, 1.2vw, 13px)",
                }}
              >
                • Join the Network •
              </Button>
            </div>
          </div>

          {/* Image side — desktop only */}
          {videoImg && (
            <div className="hidden md:block w-full md:w-1/2 min-h-[55vh] relative overflow-hidden group">
              <Image
                src={videoImg.imageUrl}
                alt="Impact"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/15 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,transparent_45%,rgba(27,58,92,0.3)_100%)] z-10" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

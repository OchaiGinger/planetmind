"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const SEG_A = "FOR A BETTER PLANET.\u00A0\u00A0FOR HEALTHIER ECOSYSTEMS.";
const SEG_B =
  "\u00A0\u00A0FOR A BETTER PLANET.\u00A0\u00A0FOR HEALTHIER ECOSYSTEMS.\u00A0\u00A0";

function TreeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22v-5" />
      <path d="M9 17h6" />
      <path d="M12 17c-3.5 0-6-2.5-6-6s2.5-6 6-6 6 2.5 6 6-2.5 6-6 6z" />
      <path d="M12 5c-1.5 0-3-1-3-2.5S10.5 0 12 0s3 1 3 2.5S13.5 5 12 5z" />
    </svg>
  );
}

// ── Mobile version: static marquee + hero reveal without GSAP pin ──
function MobileScrollReveal() {
  const heroImg =
    PlaceHolderImages.find((img) => img.id === "hero-landscape") ??
    PlaceHolderImages[0];
  const leafImg =
    PlaceHolderImages.find((img) => img.id === "farm-aerial") ??
    PlaceHolderImages[1];

  return (
    <div className="w-full font-sans">
      {/* Marquee strip */}
      <div className="w-full overflow-hidden bg-[#F5F0E8] py-8">
        <div className="whitespace-nowrap animate-[marquee_18s_linear_infinite] inline-flex items-center">
          <span className="text-[clamp(2.2rem,8vw,4rem)] font-black text-navy tracking-tighter leading-none inline-flex items-center font-mono">
            {SEG_A}
            <span
              className="inline-flex items-center shrink-0 mx-[0.18em] text-mint"
              style={{ height: "0.82em", width: "0.82em" }}
            >
              <TreeIcon className="w-full h-full" />
            </span>
            {SEG_B}
          </span>
        </div>
      </div>

      {/* Hero reveal — static, full bleed */}
      <div className="relative w-full" style={{ minHeight: "85vh" }}>
        {heroImg && (
          <>
            <Image
              src={heroImg.imageUrl}
              alt="final landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/75" />
          </>
        )}

        {/* Copy */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-8">
          <div className="flex flex-col gap-3 max-w-full">
            <Badge
              variant="outline"
              className="w-fit border-white/30 text-white bg-white/10 backdrop-blur-sm text-[0.65rem] tracking-[0.25em] uppercase font-black px-3 py-1"
            >
              PlanetMind · Early Access
            </Badge>
            <h2
              className="font-black text-white leading-[0.9] tracking-tighter uppercase font-mono"
              style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
            >
              You don't get many
              <br />
              <span className="text-mint">chances to act first</span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 mt-6">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50 font-mono">
                Our Mission
              </p>
              <p className="text-base font-medium text-white/80 leading-relaxed">
                To shape what the planet becomes — not just document its
                decline. PlanetMind is already in the hands of citizens
                rewriting the rules.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3
                className="font-black text-white leading-none tracking-tighter uppercase font-mono"
                style={{ fontSize: "clamp(1.6rem, 6vw, 2.5rem)" }}
              >
                To lead,
                <br />
                not follow
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-white text-navy font-black uppercase tracking-[0.15em] rounded-none hover:bg-mint hover:text-navy transition-all h-12 w-full sm:w-auto"
                  style={{ fontSize: "clamp(9px, 2.5vw, 12px)" }}
                >
                  · Start Reporting ·
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/40 font-black uppercase tracking-[0.15em] rounded-none hover:bg-white/10 transition-all backdrop-blur-sm h-12 w-full sm:w-auto"
                  style={{ fontSize: "clamp(9px, 2.5vw, 12px)" }}
                >
                  · Our Mission ·
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ── Desktop version: full GSAP pinned scroll reveal ──
function DesktopScrollReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const marqRef = useRef<HTMLDivElement>(null);
  const marqTextRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const imgMaskRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  const heroImg =
    PlaceHolderImages.find((img) => img.id === "hero-landscape") ??
    PlaceHolderImages[0];
  const leafImg =
    PlaceHolderImages.find((img) => img.id === "farm-aerial") ??
    PlaceHolderImages[1];

  useEffect(() => {
    if (!wrapRef.current) return;

    // Small wait to ensure DOM is fully painted before GSAP measures
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            // Force ScrollTrigger to recalc after mount
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 — Marquee drifts (0 → 4.0)
        tl.fromTo(
          marqRef.current,
          { x: "0%" },
          { x: "-45%", ease: "none", duration: 4.0 },
          0,
        );

        // Phase 2 — Swap icon → portal (at 4.0, instant)
        tl.to(
          iconRef.current,
          { opacity: 0, ease: "none", duration: 0.02 },
          4.0,
        );
        tl.fromTo(
          portalRef.current,
          { opacity: 0, scale: 1 },
          { opacity: 1, scale: 1, ease: "none", duration: 0.02 },
          4.0,
        );

        // Phase 3 — BG darkens, text → white (4.0 → 4.6)
        tl.to(
          bgRef.current,
          { backgroundColor: "#0B1F3B", ease: "none", duration: 0.6 },
          4.0,
        );
        tl.to(
          marqTextRef.current,
          { color: "#ffffff", ease: "none", duration: 0.5 },
          4.0,
        );

        // Phase 4 — Portal zooms (4.0 → 6.2)
        tl.to(
          portalRef.current,
          { scale: 22, ease: "power2.in", duration: 2.2 },
          4.0,
        );

        // Phase 5 — Image fades in mid-zoom (5.2 → 5.6)
        tl.to(
          imgMaskRef.current,
          { opacity: 1, ease: "power1.in", duration: 0.4 },
          5.2,
        );

        // Phase 6 — Portal out, hero in (6.2 → 6.6)
        tl.to(
          portalRef.current,
          { opacity: 0, ease: "power1.out", duration: 0.3 },
          6.2,
        );
        tl.to(
          heroRef.current,
          { opacity: 1, ease: "power2.out", duration: 0.4 },
          6.2,
        );

        // Phase 7 — Hero copy slides up (6.4 → 7.0)
        tl.fromTo(
          heroCopyRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
          6.4,
        );
      }, wrapRef);

      // Force a refresh after context is set up
      ScrollTrigger.refresh();

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-[800vh] font-sans">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background */}
        <div ref={bgRef} className="absolute inset-0 bg-[#F5F0E8] z-0" />

        {/* Marquee */}
        <div
          ref={marqRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap will-change-transform z-20 pointer-events-none flex items-center"
        >
          <span
            ref={marqTextRef}
            className="text-[clamp(5rem,10vw,9rem)] font-black text-navy tracking-tighter leading-none inline-flex items-center will-change-[color] font-mono"
          >
            {SEG_A}
            <span
              ref={iconRef}
              className="inline-flex items-center shrink-0 will-change-opacity mx-[0.18em] text-mint"
              style={{ height: "0.82em", width: "0.82em" }}
            >
              <TreeIcon className="w-full h-full" />
            </span>
            {SEG_B}
            {SEG_A}
          </span>
        </div>

        {/* Portal */}
        <div
          ref={portalRef}
          className="absolute top-1/2 left-1/2 origin-center will-change-transform z-30 opacity-0 text-mint"
          style={{
            height: "calc(clamp(5rem, 10vw, 9rem) * 0.82)",
            width: "calc(clamp(5rem, 10vw, 9rem) * 0.82)",
            marginTop: "calc(clamp(5rem, 10vw, 9rem) * -0.41)",
            marginLeft: "calc(clamp(5rem, 10vw, 9rem) * -0.41)",
          }}
        >
          <TreeIcon className="absolute inset-0 w-full h-full z-1" />
          <div
            ref={imgMaskRef}
            className="absolute inset-0 opacity-0 will-change-opacity z-2 overflow-hidden rounded-full"
          >
            {leafImg && (
              <Image
                src={leafImg.imageUrl}
                alt="observation"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Hero image */}
        <div
          ref={heroRef}
          className="absolute inset-0 opacity-0 will-change-opacity z-40"
        >
          {heroImg && (
            <>
              <Image
                src={heroImg.imageUrl}
                alt="final landscape"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/75" />
            </>
          )}
        </div>

        {/* Hero copy */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 z-50 flex flex-col justify-between p-12 md:p-16 pointer-events-none"
        >
          <div className="flex flex-col gap-4 max-w-2xl">
            <Badge
              variant="outline"
              className="w-fit border-white/30 text-white bg-white/10 backdrop-blur-sm text-[0.7rem] tracking-[0.3em] uppercase font-black px-4 py-1.5"
            >
              PlanetMind · Early Access
            </Badge>
            <h2 className="text-6xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase font-mono">
              You don't get many
              <br />
              <span className="text-mint">chances to act first</span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-12 flex-wrap">
            <div className="flex flex-col gap-4 max-w-md">
              <p className="text-[11px] font-black tracking-[0.3em] uppercase text-white/50 font-mono">
                Our Mission
              </p>
              <p className="text-xl font-medium text-white/80 leading-relaxed">
                To shape what the planet becomes — not just document its
                decline. PlanetMind is already in the hands of citizens
                rewriting the rules.
              </p>
            </div>

            <div className="flex flex-col items-end gap-8">
              <h3 className="text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter text-right uppercase font-mono">
                To lead,
                <br />
                not follow
              </h3>
              <div className="flex gap-4 pointer-events-auto">
                <Button
                  size="lg"
                  className="bg-white text-navy font-black uppercase tracking-[0.2em] px-10 h-14 rounded-none hover:bg-mint hover:text-navy transition-all"
                >
                  · Start Reporting ·
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/40 font-black uppercase tracking-[0.2em] px-10 h-14 rounded-none hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  · Our Mission ·
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root — picks layout after hydration ──
export default function ScrollReveal() {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "desktop" | null>(
    null,
  );

  useEffect(() => {
    const check = () =>
      setBreakpoint(window.innerWidth < 1024 ? "mobile" : "desktop");
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (breakpoint === null) return null;

  return breakpoint === "desktop" ? (
    <DesktopScrollReveal />
  ) : (
    <MobileScrollReveal />
  );
}

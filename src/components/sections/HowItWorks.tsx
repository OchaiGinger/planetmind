"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnvironmentalImpact from "./EnvironmentalImpact";
import GridPanels from "./GridPanels";
import HowItWorksSteps from "./HowItWorksSteps";

gsap.registerPlugin(ScrollTrigger);

// ─── How many "screens" of scroll the section occupies ───────────────────────
// GSAP pin uses +=700% → 8× screen height = wrapperHeight must match
const SCROLL_MULTIPLIER = 8;

export default function HowItWorks() {
  // ── Layout refs ──
  const wrapperRef = useRef<HTMLDivElement>(null); // outer scroll height div
  const stickyRef = useRef<HTMLDivElement>(null); // sticky viewport
  const contentRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // ── Video scrub refs (Hero pattern) ──
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const smoothedRef = useRef(0);

  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Breakpoint detection ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Video: pause on first play, mark ready ──
  const handleVideoPlay = () => {
    const v = bgVideoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setVideoReady(true);
  };

  // ── Scroll → raw progress stored in ref (no setState = no re-render) ──
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      progressRef.current = Math.min(Math.max(-top / total, 0), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── RAF scrub loop — adaptive lerp, fastSeek, visibility guard ──
  useEffect(() => {
    if (!videoReady) return;
    const v = bgVideoRef.current;
    if (!v) return;

    type ScrubVideo = HTMLVideoElement & { fastSeek?: (t: number) => void };
    const vid = v as ScrubVideo;

    let lastTarget = 0;
    let lastTimestamp = 0;

    const tick = (timestamp: number) => {
      const duration = vid.duration;
      if (duration && !isNaN(duration)) {
        const target = progressRef.current * duration;

        // Adaptive LERP — faster when far away (fast scroll), slower when close (idle)
        const dist = Math.abs(target - smoothedRef.current);
        const lerp = dist > 0.5 ? 0.45 : dist > 0.1 ? 0.28 : 0.14;

        smoothedRef.current += (target - smoothedRef.current) * lerp;

        // Only seek if meaningfully different from current position
        // AND the section is visible (skip seeks when off-screen)
        const wrapper = wrapperRef.current;
        const isVisible = wrapper
          ? wrapper.getBoundingClientRect().bottom > 0 &&
            wrapper.getBoundingClientRect().top < window.innerHeight
          : true;

        if (
          isVisible &&
          Math.abs(vid.currentTime - smoothedRef.current) > 0.016
        ) {
          if (typeof vid.fastSeek === "function") {
            vid.fastSeek(smoothedRef.current);
          } else if (!vid.seeking) {
            vid.currentTime = smoothedRef.current;
          }
        }

        lastTarget = target;
      }
      lastTimestamp = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  // ── GSAP step transitions + grid panel wipe ──
  useEffect(() => {
    // Wait a tick so wrapperRef has correct height after mount
    const init = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".step-content");
        const bottomPanels = gsap.utils.toArray(".grid-panel-r2");
        const centerPanels = gsap.utils.toArray(".grid-panel-r1");
        const topPanels = gsap.utils.toArray(".grid-panel-r0");

        const scrollEnd = `+=${SCROLL_MULTIPLIER * 100 - 50}%`;
        const scrubVal = isMobile ? 1.5 : 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current, // ← wrapperRef, not stickyRef
            start: "top top",
            end: scrollEnd,
            scrub: scrubVal,
            pin: stickyRef.current, // ← pin the sticky child, not the wrapper
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 1.5 });

        sections.forEach((section: any, i) => {
          if (i === 0) return;
          tl.to(sections[i - 1] as any, {
            opacity: 0,
            duration: isMobile ? 1 : 1.5,
            ease: "power1.inOut",
          });
          tl.to({}, { duration: isMobile ? 1 : 2 });
          tl.fromTo(
            section,
            { opacity: 0 },
            { opacity: 1, duration: isMobile ? 1 : 1.5, ease: "power1.out" },
            "<",
          );
          tl.to({}, { duration: isMobile ? 2.5 : 4 });
        });

        tl.to({}, { duration: 1.5 });
        tl.to(sections[sections.length - 1] as any, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
        });

        tl.to(
          bottomPanels,
          {
            y: 0,
            duration: isMobile ? 0.6 : 0.9,
            ease: "power3.inOut",
            stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
          },
          "<0.15",
        );
        tl.to(
          centerPanels,
          {
            y: 0,
            duration: isMobile ? 0.6 : 0.9,
            ease: "power3.inOut",
            stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
          },
          "<0.25",
        );
        tl.to(
          topPanels,
          {
            y: 0,
            duration: isMobile ? 0.6 : 0.9,
            ease: "power3.inOut",
            stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
          },
          "<0.25",
        );
        tl.to({}, { duration: isMobile ? 0.5 : 1 });

        tl.set(impactRef.current, { display: "block" });
        tl.set(".impact-clip-left", { yPercent: 100 });
        tl.set(".impact-clip-right", { yPercent: 100 });
        tl.set(".grid-panel", { backgroundColor: "#0A2A4A" });

        tl.to(bottomPanels, {
          y: "-100%",
          duration: isMobile ? 0.6 : 0.9,
          ease: "power3.inOut",
          stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
        });
        tl.to(
          centerPanels,
          {
            y: "-100%",
            duration: isMobile ? 0.6 : 0.9,
            ease: "power3.inOut",
            stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
          },
          "<0.25",
        );
        tl.to(
          topPanels,
          {
            y: "-100%",
            duration: isMobile ? 0.6 : 0.9,
            ease: "power3.inOut",
            stagger: { each: isMobile ? 0.04 : 0.06, from: "end" },
          },
          "<0.25",
        );

        tl.to(
          ".impact-clip-left",
          { yPercent: 0, duration: 0.7, ease: "power3.out" },
          "<0.25",
        );
        tl.to(
          ".impact-clip-right",
          { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 },
          "<0.1",
        );

        if (!isMobile && videoContainerRef.current) {
          tl.fromTo(
            videoContainerRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
            "<0.2",
          );
        }

        tl.to({}, { duration: 1.5 });

        ScrollTrigger.refresh();
      }, wrapperRef);

      return () => ctx.revert();
    }, 120);

    return () => clearTimeout(init);
  }, [isMobile]);

  return (
    /*
      wrapperRef — tall outer div that gives scroll distance.
      stickyRef  — the actual h-screen sticky viewport (GSAP pins this).
      GSAP trigger = wrapperRef, pin target = stickyRef.
      Video progress reads from wrapperRef scroll position too.
    */
    <div
      ref={wrapperRef}
      className="relative w-full bg-navy"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* ── Background video (scroll-scrubbed) ── */}
        <video
          ref={bgVideoRef}
          src="/how_it_works.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          muted
          playsInline
          preload="auto"
          autoPlay // triggers onPlay → paused immediately
          loop
          onPlay={handleVideoPlay}
        />

        {/* Navy fallback (shown until video ready) */}
        <div
          className="absolute inset-0 z-0 bg-navy pointer-events-none"
          style={{
            opacity: videoReady ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Overlay — keeps text readable over any video frame */}
        <div className="absolute inset-0 z-1 bg-navy/50 pointer-events-none" />

        {/* Paper texture */}
        <div className="absolute inset-0 pointer-events-none z-2 opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        {/* Steps content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div ref={contentRef} className="relative w-full h-full">
            <HowItWorksSteps />
          </div>
        </div>

        <EnvironmentalImpact
          impactRef={impactRef}
          videoContainerRef={videoContainerRef}
        />

        <GridPanels />
      </div>
    </div>
  );
}

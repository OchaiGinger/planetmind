"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    badge: "EARN B3TR TOKENS",
    title: "REPORT.",
    subtitle: "EARN PLANET.",
    body: "Turn your environmental observations into real rewards. Every report you submit helps build Earth's most transparent, real-time environmental intelligence layer — powered by citizen scientists like you.",
    showLine: false,
  },
  {
    badge: "POLLUTION EVENTS",
    title: "SPOT IT.",
    subtitle: "REPORT IT.",
    body: "Document air quality issues, water contamination, soil pollution and noise events. From industrial smoke to algae blooms — your eyes on the ground make the invisible visible.",
    showLine: true,
  },
  {
    badge: "ILLEGAL ACTIVITIES",
    title: "WITNESS.",
    subtitle: "EXPOSE IT.",
    body: "Catch illegal dumping, unauthorized deforestation, poaching evidence and protected area violations before they disappear. Your report is the evidence that holds polluters accountable.",
    showLine: true,
  },
  {
    badge: "CLIMATE INDICATORS", // ← typo fixed
    title: "TRACK THE",
    subtitle: "PLANET'S PULSE.",
    body: "Log unusual weather patterns, early blooms, shifting migrations, ice coverage changes and sea level observations. Every data point sharpens the world's picture of a changing climate.",
    showLine: true,
  },
  {
    badge: "INFRASTRUCTURE",
    title: "FLAG IT.",
    subtitle: "FIX IT.",
    body: "Report broken recycling bins, damaged green spaces, non-functioning pollution monitors and environmental hazard warnings. Small reports create the pressure that drives real change.",
    showLine: true,
  },
];

const N = SLIDES.length;
const SCROLL_MULTIPLIER = 1.1;
const LERP = 0.28;
const FADE = 0.055;

// ── Scroll-reactive particle canvas ──────────────────────────────────────────
function ParticleCanvas({ scrollSpeed }: { scrollSpeed: number }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollSpeedRef = useRef(scrollSpeed);

  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    if (!canvasRef.current) return;
    canvasRef.current.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVy: number;
      size: number;
      alpha: number;
      color: string;
      type: "dot" | "ring" | "cross";
      pulse: number;
    };

    const COLORS = [
      "rgba(61,219,168,",
      "rgba(106,172,221,",
      "rgba(255,255,255,",
      "rgba(13,53,112,",
    ];

    const randomSize = () => {
      const r = Math.random();
      if (r < 0.15) return 1 + Math.random() * 1.5;
      if (r < 0.55) return 3.5 + Math.random() * 4;
      if (r < 0.82) return 7.5 + Math.random() * 6;
      return 14 + Math.random() * 10;
    };

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.15 + Math.random() * 0.35),
      baseVy: -(0.15 + Math.random() * 0.35),
      size: randomSize(),
      alpha: 0.12 + Math.random() * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: (["dot", "dot", "dot", "ring", "cross"] as const)[
        Math.floor(Math.random() * 5)
      ],
      pulse: Math.random() * Math.PI * 2,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speedMult = 1 + Math.min(scrollSpeedRef.current * 6, 3.5);

      particles.forEach((p) => {
        p.vy = p.baseVy * speedMult;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.018;
        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + 20) {
          p.y = -20;
        }
        if (p.x < -20) {
          p.x = canvas.width + 20;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        }

        ctx.save();
        ctx.globalAlpha = pulseAlpha;

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "1)";
          ctx.fill();
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = p.color + "0.8)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          const s = p.size * 1.4;
          ctx.strokeStyle = p.color + "0.7)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (canvasRef.current && canvas.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div ref={canvasRef} className="absolute inset-0 z-4 pointer-events-none" />
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Scroll speed for particles
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const decayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  // ── Video: pause on first play (forces decode into memory) ──
  const handleVideoPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setVideoReady(true);
  };

  // ── Scroll → progress ref + scroll speed for particles ──
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const top = el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-top / total, 0), 1);
      progressRef.current = p;
      setProgress(p);

      const now = Date.now();
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      const dt = Math.max(now - lastScrollTime.current, 1);
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;
      setScrollSpeed(dy / dt);

      if (decayRef.current) clearTimeout(decayRef.current);
      decayRef.current = setTimeout(() => setScrollSpeed(0), 75);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── RAF scrub loop — fastSeek, no seeking lock ──
  useEffect(() => {
    if (!videoReady) return;

    const tick = () => {
      const v = videoRef.current as
        | (HTMLVideoElement & { fastSeek?: (t: number) => void })
        | null;
      if (!v) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const duration = v.duration;
      if (duration && !isNaN(duration)) {
        const target = progressRef.current * duration;
        smoothedRef.current += (target - smoothedRef.current) * LERP;

        if (Math.abs(v.currentTime - smoothedRef.current) > 0.016) {
          if (typeof v.fastSeek === "function") {
            v.fastSeek(smoothedRef.current);
          } else if (!v.seeking) {
            v.currentTime = smoothedRef.current;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  // ── Slide opacity calculation ──
  const slideProgress = progress * N;
  const activeIndex = Math.min(Math.floor(slideProgress), N - 1);
  const frac = slideProgress - Math.floor(slideProgress);

  const getOpacity = (i: number): number => {
    if (i === activeIndex) {
      return frac > 1 - FADE ? 1 - (frac - (1 - FADE)) / FADE : 1;
    }
    if (i === activeIndex + 1) {
      return frac > 1 - FADE ? (frac - (1 - FADE)) / FADE : 0;
    }
    return 0;
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${N * SCROLL_MULTIPLIER * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/hero_background.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlay={handleVideoPlay}
        />

        {/* linear overlays — strong enough to work over any video frame colour */}
        <div className="absolute inset-0 z-2 pointer-events-none">
          {/* Full base darkening so even light videos stay usable */}
          <div className="absolute inset-0 bg-navy/70" />
          {/* Desktop: extra left-side weight so text column is crisp */}
          <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-navy/50 via-transparent to-transparent" />
          {/* Mobile: heavier bottom weight for text legibility */}
          <div className="block lg:hidden absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
        </div>

        {/* Particles */}
        <ParticleCanvas scrollSpeed={scrollSpeed} />

        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 z-10"
            style={{ opacity: getOpacity(i), willChange: "opacity" }}
          >
            <div className="flex flex-col justify-end h-full px-5 sm:px-8 lg:px-16 pb-12 lg:pb-20">
              {/* Badge row */}
              <div className="flex items-center mb-4 lg:mb-5">
                <div className="bg-white text-navy font-mono font-bold text-[9px] sm:text-[10px] tracking-widest uppercase px-3 sm:px-4 py-2">
                  {slide.badge}
                </div>
                <div className="flex gap-1 ml-3">
                  <div className="w-0.5 h-4 bg-white opacity-80" />
                  <div className="w-0.5 h-4 bg-white opacity-80" />
                </div>
              </div>

              {/* Bottom split: headline left, body right */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
                {/* LEFT — headline, max 55% width on desktop */}
                <div className="lg:max-w-[55%]">
                  {slide.showLine ? (
                    <div className="flex flex-col items-start">
                      <h1
                        className="font-mono font-black leading-[0.88] uppercase text-white drop-shadow-2xl"
                        style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
                      >
                        {slide.title}
                      </h1>
                      <div className="flex items-center">
                        <div
                          className="h-0.75 bg-linear-to-r from-transparent to-white shrink-0"
                          style={{ width: "clamp(30px, 4vw, 80px)" }}
                        />
                        <h1
                          className="font-mono font-black leading-[0.88] uppercase text-white drop-shadow-2xl"
                          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
                        >
                          {slide.subtitle}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <h1
                      className="font-mono font-black leading-[0.88] uppercase text-white drop-shadow-2xl"
                      style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
                    >
                      {slide.title}
                      <br />
                      {slide.subtitle}
                    </h1>
                  )}
                </div>

                {/* RIGHT — body + CTAs, max 36% on desktop */}
                <div className="flex flex-col gap-4 lg:max-w-[36%] shrink-0">
                  <div className="w-10 h-0.5 bg-mint" />
                  <p
                    className="font-mono leading-relaxed text-white/80"
                    style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)" }}
                  >
                    {slide.body}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <Button
                      size="lg"
                      className="bg-white text-navy font-black uppercase tracking-widest h-11 px-6 rounded-none hover:bg-mint hover:text-navy transition-all"
                      style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                    >
                      START EARNING
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-white border-white/30 font-black uppercase tracking-widest h-11 px-6 rounded-none hover:bg-white/10"
                      style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                    >
                      OUR MISSION
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

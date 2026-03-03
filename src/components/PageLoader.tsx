"use client";

import React, { useEffect, useState, useRef } from "react";
import { Logo } from "./Navigation";

const SEQUENCE = [
  { text: "INITIALIZING PLANETMIND", delay: 0 },
  { text: "ESTABLISHING SECURE CONNECTION", delay: 400 },
  { text: "SYNCING ENVIRONMENTAL INTELLIGENCE", delay: 900 },
  { text: "DECRYPTING BLOCKCHAIN RECORDS", delay: 1400 },
  { text: "ACCESS GRANTED.", delay: 1900 },
];

const MAIN_PHRASE = "A VISION FOR THE PLANET.";

function useTypewriter(text: string, speed = 40, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { displayed: mainText } = useTypewriter(MAIN_PHRASE, 40, 100);
  const currentStatus = SEQUENCE[statusIdx]?.text ?? "";
  const { displayed: statusText } = useTypewriter(currentStatus, 20, 0);

  useEffect(() => {
    const iv = setInterval(() => setShowCursor((p) => !p), 400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const timers = SEQUENCE.map((s, i) =>
      setTimeout(() => setStatusIdx(i), s.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return Math.min(p + Math.random() * 20, 100);
      });
    }, 100);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    };
    const iv = setInterval(fire, 1500 + Math.random() * 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setVisible(false), 800);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#3DDBA8", "#6AACDD", "#ffffff"];
    const count = window.innerWidth < 640 ? 35 : 60;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -0.4 - Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha -= 0.001;
        if (p.y < 0 || p.alpha <= 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.5 + 0.1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-9999 overflow-hidden flex flex-col items-center justify-center bg-navy-deep"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(61,219,168,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(61,219,168,0.03)_1px,transparent_1px)] bg-size-[32px_32px] sm:bg-size-[48px_48px] opacity-20" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 text-center w-full px-6 max-w-225">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Logo className="opacity-100 scale-110 sm:scale-125" />
        </div>

        <div className="relative">
          <h1
            className="font-sans font-black text-white uppercase text-2xl sm:text-4xl md:text-6xl tracking-widest"
            style={{
              textShadow: glitch
                ? "3px 0 #3DDBA8, -3px 0 #6AACDD, 0 0 30px rgba(61,219,168,0.8)"
                : "0 0 40px rgba(61,219,168,0.2)",
              transform: glitch
                ? `translate(${(Math.random() - 0.5) * 8}px, 0)`
                : "none",
            }}
          >
            {mainText}
            <span
              className="text-mint ml-1"
              style={{ opacity: showCursor ? 1 : 0 }}
            >
              ▮
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-105">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_10px_rgba(61,219,168,1)] shrink-0" />
            <p className="font-mono font-bold tracking-[0.3em] sm:tracking-[0.4em] text-mint uppercase text-[8px] sm:text-[10px] md:text-[12px]">
              {statusText}
            </p>
          </div>

          <div className="w-full h-0.5 sm:h-0.75 bg-white/5 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-navy via-mint to-white"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 20px rgba(61,219,168,0.6)",
                transition: "width 0.3s ease-out",
              }}
            />
          </div>

          <div className="flex justify-between w-full">
            <span className="font-mono text-white/20 uppercase tracking-widest text-[8px] sm:text-[10px]">
              Initializing Node
            </span>
            <span className="font-mono text-mint/60 tracking-widest text-[8px] sm:text-[10px]">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

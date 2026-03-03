"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "../Navigation";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_LINKS = [
  "About",
  "How It Works",
  "The Database",
  "Industries",
  "Earn B3TR",
];

const SOCIALS = [
  {
    label: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Discord",
    path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.044.03.06a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cols = [col1Ref.current, col2Ref.current, col3Ref.current];
    const panels = panelsRef.current
      ? (Array.from(panelsRef.current.children) as HTMLElement[])
      : [];

    gsap.set(panels, { yPercent: -100 });
    gsap.set(cols, { y: 100, opacity: 0 });
    gsap.set(bottomRef.current, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 90%",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(panels, {
          yPercent: 0,
          duration: 0.35, // reduced by half
          ease: "power3.inOut",
          stagger: { each: 0.035, from: "start" },
        });
        tl.to({}, { duration: 0.075 });
        tl.to(panels, {
          yPercent: 100,
          duration: 0.35, // reduced by half
          ease: "power3.inOut",
          stagger: { each: 0.035, from: "end" },
        });
        tl.to(
          cols,
          {
            y: 0,
            opacity: 1,
            duration: 0.45, // reduced by half
            ease: "power3.out",
            stagger: 0.09,
          },
          "-=0.1",
        );
        tl.to(
          bottomRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.35, // reduced by half
            ease: "power3.out",
          },
          "-=0.2",
        );
      },
      onLeaveBack: () => {
        gsap.set(panels, { yPercent: -100 });
        gsap.set(cols, { y: 100, opacity: 0 });
        gsap.set(bottomRef.current, { y: 30, opacity: 0 });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-screen bg-white font-sans flex flex-col border-t-4 border-navy"
    >
      <div
        ref={panelsRef}
        className="absolute inset-0 grid grid-cols-5 pointer-events-none z-50 overflow-hidden"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-full bg-navy"
            style={{
              borderRight: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          />
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 border-b border-navy/10">
        <div
          ref={col1Ref}
          className="flex flex-col justify-between p-14 lg:p-16 border-r-2 border-navy/10"
        >
          <div className="flex flex-col gap-10">
            <Logo textColor="text-navy" />
            <p className="text-navy/55 text-xl leading-relaxed max-w-xs">
              People don't observe the planet the way they used to. They report
              in real time, and the network verifies.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-10">
            {SOCIALS.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center text-white hover:bg-mint hover:text-navy transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div
          ref={col2Ref}
          className="flex flex-col p-14 lg:p-16 gap-10 border-r-2 border-navy/10"
        >
          <h4 className="text-navy font-black text-base uppercase tracking-[0.3em]">
            Explore
          </h4>
          <nav className="flex flex-col gap-7">
            {EXPLORE_LINKS.map((label) => (
              <Link
                key={label}
                href="#"
                className="text-navy/55 text-2xl uppercase tracking-widest font-medium hover:text-navy hover:translate-x-1 transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div ref={col3Ref} className="flex flex-col p-14 lg:p-16 gap-10">
          <h4 className="text-navy font-black text-base uppercase tracking-[0.3em]">
            Get Started
          </h4>

          <form
            className="flex flex-col gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1 py-5 border-b border-navy/15">
              <Label className="text-navy/40 text-xs font-bold uppercase tracking-[0.25em]">
                First name <span className="text-navy">*</span>
              </Label>
              <Input
                placeholder="First name"
                className="bg-transparent border-0 rounded-none px-0 h-10 text-navy placeholder:text-navy/20 text-2xl font-medium focus-visible:ring-0 shadow-none"
              />
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-navy/15">
              <Label className="text-navy/40 text-xs font-bold uppercase tracking-[0.25em]">
                Last name <span className="text-navy">*</span>
              </Label>
              <Input
                placeholder="Last name"
                className="bg-transparent border-0 rounded-none px-0 h-10 text-navy placeholder:text-navy/20 text-2xl font-medium focus-visible:ring-0 shadow-none"
              />
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-navy/15">
              <Label className="text-navy/40 text-xs font-bold uppercase tracking-[0.25em]">
                Email <span className="text-navy">*</span>
              </Label>
              <Input
                type="email"
                placeholder="name@email.com"
                className="bg-transparent border-0 rounded-none px-0 h-10 text-navy placeholder:text-navy/20 text-2xl font-medium focus-visible:ring-0 shadow-none"
              />
            </div>

            <Button
              type="submit"
              className="self-start mt-8 bg-navy text-white font-bold uppercase text-sm tracking-[0.2em] px-14 h-14 rounded-none hover:bg-mint hover:text-navy transition-all duration-200"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>

      <div ref={bottomRef} className="px-14 lg:px-16">
        <div className="py-7 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-navy/35 text-sm uppercase tracking-[0.2em]">
            © 2026. PlanetMind Inc. All Rights Reserved.
          </span>
          <div className="flex items-center gap-5 text-navy/35 text-sm uppercase tracking-[0.15em]">
            <Link href="#" className="hover:text-navy transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-navy/15">|</span>
            <Link href="#" className="hover:text-navy transition-colors">
              Privacy Policy
            </Link>
          </div>
          <span className="text-navy/25 text-sm uppercase tracking-[0.15em]">
            Built on VeChain
          </span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Logo = ({
  className = "",
  textColor = "text-white",
}: {
  className?: string;
  textColor?: string;
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative w-8 h-8 sm:w-9 sm:h-9">
      <Image
        src="/logo.png"
        alt="PlanetMind Icon"
        fill
        className="object-contain"
      />
    </div>
    <span
      className={`font-black text-lg sm:text-xl tracking-tighter ${textColor}`}
    >
      PlanetMind.
    </span>
  </div>
);

const MENU_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Mission", href: "#how-it-works" },
  { label: "Earn", href: "#earn" },
  { label: "Data", href: "#database" },
  {
    label: "Explore",
    children: [
      { label: "People", href: "#people" },
      { label: "Journal", href: "#journal" },
      { label: "Projects", href: "#projects" },
      { label: "Forum", href: "#forum" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Taxa Info", href: "#taxa" },
      { label: "Guides", href: "#guides" },
      { label: "Places", href: "#places" },
      { label: "Site Stats", href: "#stats" },
      { label: "Help", href: "#help" },
      { label: "Getting Started", href: "#getting-started" },
      { label: "Understanding Projects", href: "#projects-guide" },
      { label: "Educator's Guide", href: "#educators" },
      { label: "Video Tutorials", href: "#videos" },
      { label: "Curator Guide", href: "#curator" },
      { label: "Donate", href: "#donate" },
    ],
  },
];

type Item = {
  label: string;
  href?: string;
  children?: { label: string; href?: string }[];
};

function NavItem({
  item,
  anyHovered,
  onHover,
  onLeave,
  isHovered,
  onClose,
  isMobile,
}: {
  item: Item;
  anyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
  onClose: () => void;
  isMobile: boolean;
}) {
  const muted = anyHovered && !isHovered;
  const [tapped, setTapped] = useState(false);
  const expanded = isMobile ? tapped : isHovered;

  const labelSize = isMobile
    ? "clamp(2rem, 8vw, 3rem)"
    : "clamp(2.2rem, 5vw, 5.5rem)";

  const handleTap = () => {
    if (item.children) {
      setTapped((t) => !t);
      return;
    }
    onClose();
  };

  return (
    <div
      className="group"
      onMouseEnter={isMobile ? undefined : onHover}
      onMouseLeave={isMobile ? undefined : onLeave}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className="font-mono text-xl sm:text-2xl leading-none transition-all duration-300 select-none text-mint"
          style={{
            opacity: expanded && item.children ? 1 : 0,
            transform:
              expanded && item.children
                ? "scale(1) rotate(0deg)"
                : "scale(0.5) rotate(-45deg)",
            width: isMobile ? "1.2rem" : "1.5rem",
            display: "inline-block",
          }}
        >
          ×
        </span>

        {item.href ? (
          <Link
            href={item.href}
            onClick={onClose}
            className={`block leading-none transition-all duration-300 ${muted ? "text-white/25" : "text-white/90"}`}
            style={{
              fontSize: labelSize,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              transform: expanded ? "translateX(6px)" : "translateX(0)",
            }}
          >
            {item.label}
          </Link>
        ) : (
          <button
            onClick={handleTap}
            className={`block leading-none transition-all duration-300 text-left ${muted ? "text-white/25" : "text-white/90"}`}
            style={{
              fontSize: labelSize,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              transform: expanded ? "translateX(6px)" : "translateX(0)",
            }}
          >
            {item.label}
          </button>
        )}
      </div>

      {item.children && (
        <div
          className="overflow-hidden"
          style={{
            maxHeight: expanded ? `${item.children.length * 48}px` : "0px",
            opacity: expanded ? 1 : 0,
            transition:
              "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
            paddingLeft: isMobile ? "1.5rem" : "2.5rem",
            marginTop: expanded ? "0.4rem" : "0",
          }}
        >
          {item.children.map((child, ci) => (
            <Link
              key={ci}
              href={child.href ?? "#"}
              onClick={onClose}
              className="block py-1 sm:py-1.5 transition-all duration-200 text-white/50 hover:text-white/95 hover:translate-x-1.5"
              style={{
                fontSize: isMobile
                  ? "clamp(0.9rem, 3.5vw, 1.2rem)"
                  : "clamp(1rem, 1.8vw, 1.5rem)",
                fontWeight: 300,
                letterSpacing: "0.01em",
                transitionDelay: `${ci * 25}ms`,
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) setHoveredItem(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleClose = () => {
    setMenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 h-15 sm:h-17 flex items-center justify-between px-4 sm:px-6 md:px-10 border-b ${scrolled || menuOpen ? "bg-navy/90 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"}`}
      >
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 sm:gap-3 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase hidden sm:block">
            {menuOpen ? "CLOSE" : "MENU"}
          </span>
        </button>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </Link>

        <Button
          variant="outline"
          className="bg-transparent border-white/20 hover:bg-white hover:text-navy text-white rounded-none h-8 sm:h-10 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] transition-all px-4 sm:px-8"
        >
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </Button>
      </nav>

      <div
        className="fixed inset-0 z-99 flex overflow-hidden transition-opacity duration-400 ease-in-out"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div
          className={`relative h-full flex flex-col justify-between overflow-y-auto bg-navy/98 backdrop-blur-2xl transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "translate-x-0" : "-translate-x-10"}`}
          style={{
            width: isMobile ? "100%" : "clamp(340px, 46%, 620px)",
            paddingTop: isMobile ? "80px" : "96px",
            paddingBottom: "40px",
            paddingLeft: isMobile
              ? "clamp(20px, 5vw, 40px)"
              : "clamp(32px, 5vw, 64px)",
            paddingRight: isMobile ? "clamp(20px, 5vw, 40px)" : "32px",
          }}
          onMouseLeave={() => !isMobile && setHoveredItem(null)}
        >
          <div className="flex flex-col gap-0">
            {MENU_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`transition-all duration-400 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${0.06 * i + 0.1}s` }}
              >
                <NavItem
                  item={item}
                  anyHovered={hoveredItem !== null}
                  isHovered={hoveredItem === item.label}
                  onHover={() => !isMobile && setHoveredItem(item.label)}
                  onLeave={() => {}}
                  onClose={handleClose}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          <div
            className={`pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap justify-between items-end gap-4 mt-6 transition-opacity duration-400 delay-550 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.35em] text-white/25 uppercase">
                PlanetMind
              </span>
              <a
                href="mailto:hello@planetmind.xyz"
                className="font-mono text-[11px] text-white/35 hover:text-white transition-colors uppercase tracking-widest"
              >
                hello@planetmind.xyz
              </a>
            </div>
            <a
              href="#"
              className="font-mono text-[10px] text-white/25 hover:text-white transition-colors uppercase tracking-widest"
            >
              Twitter
            </a>
          </div>
        </div>

        <div
          className={`hidden md:flex flex-1 h-full flex-col justify-between p-10 lg:p-14 relative overflow-hidden bg-navy/97 backdrop-blur-2xl transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "translate-x-0" : "translate-x-10"}`}
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_55%_45%,rgba(61,219,168,0.055)_0%,rgba(106,172,221,0.03)_40%,transparent_65%)]" />

          <div
            className={`relative z-10 flex items-center justify-between transition-opacity duration-400 delay-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          >
            <Logo />
            <button
              onClick={handleClose}
              className="font-mono text-[11px] text-white/30 hover:text-white uppercase tracking-[0.35em] transition-colors flex items-center gap-2"
            >
              <X className="w-3.5 h-3.5" /> CLOSE
            </button>
          </div>

          <div
            className={`relative z-10 flex flex-col gap-5 transition-all duration-500 delay-350 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <div className="w-full h-px bg-white/10 mb-2" />
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">
              · Request Access ·
            </p>
            <p className="text-white/30 text-base lg:text-lg font-light leading-relaxed max-w-sm">
              Earth's largest real-time environmental intelligence network —
              powered by citizens like you.
            </p>
          </div>

          <div
            className={`relative z-10 text-right transition-opacity duration-400 delay-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          >
            <p className="font-mono text-[10px] text-white/15 uppercase tracking-[0.3em] leading-loose">
              BILLIONS OF DATA POINTS —<br />
              REPORTED BY CITIZENS LIKE YOU.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

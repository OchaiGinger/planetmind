"use client";

import React from "react";

const STEPS = [
  {
    badge: "HOW IT WORKS",
    headline: "OBSERVING THE PLANET",
    body: "Rather than waiting for governments to act, you get a structured role: define what you see, document what changes, and earn rewards for intelligence.",
    showLine: true,
  },
  {
    num: "01",
    badge: "REPORTING",
    headline: "REPORT YOUR OBSERVATION",
    body: "Open the app and document what you witness — pollution, illegal activities, or climate indicators. Every verified category matters.",
    showLine: false,
  },
  {
    num: "02",
    badge: "ANALYSING",
    headline: "INTELLIGENCE VERIFIED",
    body: "PlanetMind runs your observation through its verification layer, cross-referencing with satellite data and community reports.",
    showLine: false,
  },
  {
    num: "03",
    badge: "REWARDING",
    headline: "EARN B3TR REWARDS",
    body: "Verified reports release B3TR tokens directly to your wallet, turning citizen science into a robust environmental database.",
    showLine: false,
  },
];

export default function HowItWorksSteps() {
  return (
    <>
      {STEPS.map((step, i) => (
        <div
          key={i}
          className={`step-content absolute inset-0 flex items-center justify-center ${
            i === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full flex flex-col gap-0 box-border ${
              i === 0 ? "items-start text-left" : "items-center text-center"
            }`}
            style={{
              maxWidth: "100%",
              paddingLeft: "max(20px, env(safe-area-inset-left, 20px))",
              paddingRight: "max(20px, env(safe-area-inset-right, 20px))",
            }}
          >
            {/* ── Badge row ── */}
            <div
              className={`flex items-stretch mb-6 md:mb-10 min-w-0 max-w-full ${
                i === 0 ? "justify-start" : "justify-center"
              }`}
              style={{ gap: 0, height: "40px" }}
            >
              {step.num && (
                <div
                  className="flex shrink-0 items-center justify-center font-mono font-bold bg-white border-2 border-neural text-neural px-3 md:px-5 tracking-tight min-w-11 md:min-w-15"
                  style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
                >
                  {step.num}
                </div>
              )}
              <div
                className="flex shrink items-center font-mono font-bold uppercase bg-white text-neural px-3 md:px-6 tracking-widest overflow-hidden"
                style={{ fontSize: "clamp(0.65rem, 1.8vw, 1rem)" }}
              >
                <span className="truncate">{step.badge}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 ml-2 md:ml-3">
                <div className="bg-white w-1 h-5 opacity-80" />
                <div className="bg-white w-1 h-5 opacity-80" />
              </div>
            </div>

            {/* ── Headline ── */}
            <div className="mb-6 md:mb-10 w-full min-w-0">
              {step.showLine ? (
                // Two-line split: word 0 on top, line decorator + rest below
                // Each line is its own block element so they never overlap
                <div className="flex flex-col items-start" style={{ gap: 0 }}>
                  <h2
                    className="font-mono font-black uppercase text-[#F2F0EC] block"
                    style={{
                      fontSize: "clamp(1.8rem, 7vw, 4.375rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.headline.split(" ").slice(0, 1).join(" ")}
                  </h2>
                  <div
                    className="flex items-center"
                    style={{ marginTop: "4px" }}
                  >
                    <div
                      className="shrink-0"
                      style={{
                        width: "clamp(32px, 8vw, 160px)",
                        height: "6px",
                        background:
                          "linear-gradient(to right, transparent, #F2F0EC)",
                      }}
                    />
                    <h2
                      className="font-mono font-black uppercase text-[#F2F0EC]"
                      style={{
                        fontSize: "clamp(1.8rem, 7vw, 4.375rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.headline.split(" ").slice(1).join(" ")}
                    </h2>
                  </div>
                </div>
              ) : (
                <h2
                  className="font-mono font-black uppercase text-[#F2F0EC]"
                  style={{
                    fontSize: "clamp(1.8rem, 6.5vw, 4.375rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {step.headline}
                </h2>
              )}
            </div>

            {/* ── Body ── */}
            <p
              className="font-mono leading-relaxed text-[#F2F0EC]/90"
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.375rem)",
                maxWidth: "600px",
              }}
            >
              {step.body}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

"use client";

import React from "react";

const ROWS = [0, 1, 2];
const COLS = [0, 1, 2, 3, 4];

export default function GridPanels() {
  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none"
      style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}
    >
      {ROWS.map((rowIdx) => (
        <div
          key={rowIdx}
          className="relative flex w-full h-full overflow-hidden"
        >
          {COLS.map((colIdx) => (
            <div
              key={colIdx}
              className="relative flex-1 h-full overflow-hidden"
              style={{
                borderLeft:
                  colIdx === 0 ? "none" : "1px solid rgba(100,170,255,0.25)",
                borderRight:
                  colIdx === 4 ? "none" : "1px solid rgba(100,170,255,0.25)",
              }}
            >
              {/* ✅ class uses hyphen: grid-panel-r0-c0 for clean GSAP selection */}
              <div
                className={`grid-panel-r${rowIdx} grid-panel w-full h-full absolute top-0 left-0`}
                style={{
                  backgroundColor: "#ffffff", // ✅ white coming down
                  transform: "translateY(-100%)",
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

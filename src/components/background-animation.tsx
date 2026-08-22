"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".bg-orb-1", {
        x: 120,
        y: -80,
        scale: 1.15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-orb-2", {
        x: -100,
        y: 100,
        scale: 1.2,
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-orb-3", {
        x: 70,
        y: 80,
        scale: 1.1,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-grid", {
        backgroundPosition: "56px 56px",
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    const handleMouseMove = (event: MouseEvent) => {
      if (!glowRef.current) return;

      gsap.to(glowRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Animated Grid */}
      <div
        className="bg-grid absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Green Orb */}
      <div
        className="
          bg-orb-1
          absolute
          left-[-180px]
          top-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-500/[0.10]
          blur-[120px]
        "
      />

      {/* Purple Orb */}
      <div
        className="
          bg-orb-2
          absolute
          right-[-180px]
          top-[25%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-violet-600/[0.09]
          blur-[140px]
        "
      />

      {/* Cyan Orb */}
      <div
        className="
          bg-orb-3
          absolute
          bottom-[-220px]
          left-[35%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/[0.06]
          blur-[140px]
        "
      />

      {/* Mouse Glow */}
      <div
        ref={glowRef}
        className="
          absolute
          left-0
          top-0
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400/[0.045]
          blur-[90px]
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]
        "
      />

      {/* Noise */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
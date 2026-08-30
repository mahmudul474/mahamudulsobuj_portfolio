"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   VIDEO CONFIG
============================================================ */

const VIDEO_URL =
  "https://www.youtube.com/watch?v=pChsm0h-ol4";

const VIDEO_POSTER =
  "/images/about-video-thumb.webp";

/* ============================================================
   DATA
============================================================ */

const values = [
  "Innovation",
  "Excellence",
  "Creativity",
  "Experience",
  "Precision",
  "Passion",
];

const expertise = [
  "Shopify Development",
  "UI / UX",
  "Theme Customization",
  "CRO",
  "Performance",
  "E-commerce",
];

/* ============================================================
   VIDEO SOURCE TYPE
============================================================ */

type VideoSource =
  | {
      type: "youtube";
      url: string;
    }
  | {
      type: "drive";
      url: string;
    }
  | {
      type: "vimeo";
      url: string;
    }
  | {
      type: "direct";
      url: string;
    };

/* ============================================================
   VIDEO URL PARSER
============================================================ */

function getVideoSource(
  url: string,
): VideoSource {
  try {
    const parsedUrl = new URL(url);

    const hostname =
      parsedUrl.hostname
        .toLowerCase()
        .replace("www.", "");

    /* YOUTUBE */

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com"
    ) {
      const videoId =
        parsedUrl.searchParams.get("v");

      if (videoId) {
        return {
          type: "youtube",
          url: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
        };
      }

      if (
        parsedUrl.pathname.startsWith(
          "/shorts/",
        )
      ) {
        const videoId =
          parsedUrl.pathname.split(
            "/shorts/",
          )[1];

        return {
          type: "youtube",
          url: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
        };
      }
    }

    /* YOUTUBE SHORT URL */

    if (
      hostname === "youtu.be"
    ) {
      const videoId =
        parsedUrl.pathname.replace(
          "/",
          "",
        );

      return {
        type: "youtube",
        url: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
      };
    }

    /* GOOGLE DRIVE */

    if (
      hostname === "drive.google.com"
    ) {
      const match =
        parsedUrl.pathname.match(
          /\/file\/d\/([^/]+)/,
        );

      if (match?.[1]) {
        return {
          type: "drive",
          url: `https://drive.google.com/file/d/${match[1]}/preview`,
        };
      }
    }

    /* VIMEO */

    if (
      hostname === "vimeo.com"
    ) {
      const videoId =
        parsedUrl.pathname
          .split("/")
          .filter(Boolean)
          .pop();

      if (videoId) {
        return {
          type: "vimeo",
          url: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }

    /* DIRECT VIDEO */

    return {
      type: "direct",
      url,
    };
  } catch {
    return {
      type: "direct",
      url,
    };
  }
}

/* ============================================================
   ABOUT SECTION
============================================================ */

export default function About() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  const videoRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const videoElementRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const [isPlaying, setIsPlaying] =
    useState(false);

  const videoSource =
    getVideoSource(VIDEO_URL);

  /* ============================================================
     VIDEO PLAY / PAUSE
  ============================================================ */

  const toggleVideo = () => {
    if (
      videoSource.type !==
      "direct"
    ) {
      return;
    }

    const video =
      videoElementRef.current;

    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /* ============================================================
     GSAP + LENIS
============================================================ */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(
      () => {
        /* ======================================================
           LENIS
        ====================================================== */

        const lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          syncTouch: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.05,
        });

        const raf = (
          time: number,
        ) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);

        gsap.ticker.lagSmoothing(
          0,
        );

        /* ======================================================
           LENIS → SCROLLTRIGGER
        ====================================================== */

        lenis.on(
          "scroll",
          ScrollTrigger.update,
        );

        const mm =
          gsap.matchMedia();

        mm.add(
          {
            desktop:
              "(min-width: 1024px)",

            tablet:
              "(min-width: 768px) and (max-width: 1023px)",

            mobile:
              "(max-width: 767px)",

            reducedMotion:
              "(prefers-reduced-motion: reduce)",
          },

          (context) => {
            const conditions =
              context.conditions as {
                desktop: boolean;
                tablet: boolean;
                mobile: boolean;
                reducedMotion: boolean;
              };

            /* ==================================================
               REDUCED MOTION
            ================================================== */

            if (
              conditions.reducedMotion
            ) {
              gsap.set(
                [
                  ".about-video",
                  ".about-glass-back",
                  ".about-glass-border",
                  ".about-label",
                  ".about-heading-line",
                  ".about-description",
                  ".about-list-title",
                  ".about-value",
                  ".about-expertise",
                  ".about-cta",
                  ".about-footer",
                ],
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                },
              );

              return;
            }

            /* ==================================================
               INITIAL VIDEO STATE
            ================================================== */

            gsap.set(
              ".about-video",
              {
                opacity: 0,

                y:
                  conditions.mobile
                    ? 35
                    : 75,

                scale:
                  conditions.mobile
                    ? 0.97
                    : 0.93,

                rotateX:
                  conditions.mobile
                    ? 0
                    : 4,
              },
            );

            gsap.set(
              ".about-glass-back",
              {
                opacity: 0,

                scale:
                  conditions.mobile
                    ? 0.95
                    : 0.9,
              },
            );

            gsap.set(
              ".about-glass-border",
              {
                opacity: 0,
                scale: 0.97,
              },
            );

            /* ==================================================
               INITIAL CONTENT STATE
            ================================================== */

            gsap.set(
              ".about-label",
              {
                opacity: 0,

                y:
                  conditions.mobile
                    ? 18
                    : 30,
              },
            );

            gsap.set(
              ".about-heading-line",
              {
                opacity: 0,

                y:
                  conditions.mobile
                    ? 50
                    : 85,
              },
            );

            gsap.set(
              ".about-description",
              {
                opacity: 0,

                y:
                  conditions.mobile
                    ? 22
                    : 38,
              },
            );

            gsap.set(
              ".about-list-title",
              {
                opacity: 0,
                y: 18,
              },
            );

            gsap.set(
              [
                ".about-value",
                ".about-expertise",
              ],
              {
                opacity: 0,
                y: 20,
              },
            );

            /*
             * IMPORTANT FIX
             *
             * CTA opacity is NOT hidden anymore.
             * This prevents the buttons from disappearing
             * because of the long scrub timeline.
             */

            gsap.set(
              ".about-cta",
              {
                opacity: 1,
                y: 22,
              },
            );

            gsap.set(
              ".about-footer",
              {
                opacity: 0,
                y: 18,
              },
            );

            /* ==================================================
               VIDEO SCROLL ANIMATION
            ================================================== */

            if (
              videoRef.current
            ) {
              const videoTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      videoRef.current,

                    start:
                      conditions.mobile
                        ? "top 92%"
                        : "top 88%",

                    end:
                      conditions.mobile
                        ? "bottom 42%"
                        : "bottom 32%",

                    scrub: 1.15,

                    invalidateOnRefresh:
                      true,
                  },
                });

              /* GLASS BACK */

              videoTimeline.to(
                ".about-glass-back",
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1,
                  ease: "power3.out",
                },
              );

              /* VIDEO */

              videoTimeline.to(
                ".about-video",
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  duration: 1.3,
                  ease: "power4.out",
                },
                "-=0.65",
              );

              /* BORDER */

              videoTimeline.to(
                ".about-glass-border",
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.7,
                  ease: "power3.out",
                },
                "-=0.7",
              );

              /* VIDEO PARALLAX */

              gsap.to(
                ".about-video-inner",
                {
                  yPercent:
                    conditions.desktop
                      ? -5
                      : conditions.tablet
                        ? -3
                        : -1.5,

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      videoRef.current,

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1.5,

                    invalidateOnRefresh:
                      true,
                  },
                },
              );
            }

            /* ==================================================
               GLASS FLOAT
            ================================================== */

            gsap.to(
              ".about-glass-back",
              {
                y:
                  conditions.mobile
                    ? -2
                    : -4,

                duration: 4,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,
              },
            );

            /* ==================================================
               BORDER LIGHT
            ================================================== */

            gsap.to(
              ".about-border-light",
              {
                x:
                  conditions.desktop
                    ? 150
                    : 60,

                opacity: 0.8,

                duration: 5,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,
              },
            );

            /* ==================================================
               CONTENT SCROLL ANIMATION
            ================================================== */

            const contentTimeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    ".about-content",

                  start:
                    conditions.mobile
                      ? "top 88%"
                      : "top 82%",

                  end:
                    conditions.mobile
                      ? "bottom 48%"
                      : "bottom 34%",

                  scrub: 1.1,

                  invalidateOnRefresh:
                    true,
                },
              });

            /* LABEL */

            contentTimeline.to(
              ".about-label",
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
              },
            );

            /* HEADING */

            contentTimeline.to(
              ".about-heading-line",
              {
                opacity: 1,
                y: 0,

                duration:
                  conditions.mobile
                    ? 0.7
                    : 0.9,

                stagger:
                  conditions.mobile
                    ? 0.09
                    : 0.13,

                ease: "power4.out",
              },
              "-=0.2",
            );

            /* DESCRIPTION */

            contentTimeline.to(
              ".about-description",
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.25",
            );

            /* LIST TITLES */

            contentTimeline.to(
              ".about-list-title",
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.25",
            );

            /* APPROACH */

            contentTimeline.to(
              ".about-value",
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.055,
                ease: "power2.out",
              },
              "-=0.25",
            );

            /* EXPERTISE */

            contentTimeline.to(
              ".about-expertise",
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.055,
                ease: "power2.out",
              },
              "-=0.4",
            );

            /*
             * CTA
             *
             * opacity remains 1.
             * Only vertical movement is animated.
             *
             * This keeps buttons permanently visible.
             */

            contentTimeline.to(
              ".about-cta",
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.2",
            );

            /* FOOTER */

            contentTimeline.to(
              ".about-footer",
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.15",
            );

            /* ==================================================
               MARQUEE
            ================================================== */

            gsap.to(
              ".about-marquee-track",
              {
                xPercent: -25,

                duration:
                  conditions.mobile
                    ? 16
                    : 23,

                ease: "none",

                repeat: -1,
              },
            );

            gsap.to(
              ".about-marquee-track",
              {
                y:
                  conditions.mobile
                    ? -2
                    : -4,

                duration: 3.5,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,
              },
            );

            /* ==================================================
               BACKGROUND GLOW ONE
            ================================================== */

            gsap.to(
              ".about-glow-one",
              {
                x:
                  conditions.desktop
                    ? 120
                    : 45,

                y:
                  conditions.desktop
                    ? -45
                    : -15,

                scale: 1.15,

                duration: 8,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,
              },
            );

            /* ==================================================
               BACKGROUND GLOW TWO
            ================================================== */

            gsap.to(
              ".about-glow-two",
              {
                x:
                  conditions.desktop
                    ? -110
                    : -40,

                y:
                  conditions.desktop
                    ? 55
                    : 20,

                scale: 1.1,

                duration: 10,

                ease: "sine.inOut",

                repeat: -1,

                yoyo: true,
              },
            );

            /* ==================================================
               REFRESH
            ================================================== */

            requestAnimationFrame(
              () => {
                ScrollTrigger.refresh();
              },
            );
          },
        );

        /* ======================================================
           CLEANUP
        ====================================================== */

        return () => {
          mm.revert();

          gsap.ticker.remove(
            raf,
          );

          lenis.destroy();
        };
      },
      section,
    );

    return () => {
      ctx.revert();
    };
  }, []);

  /* ============================================================
     JSX
  ============================================================ */

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#050505]
        px-4
        py-14
        text-white

        sm:px-6
        sm:py-16

        md:px-8
        md:py-20

        lg:py-24

        xl:py-28
      "
    >
      {/* ========================================================
          BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            about-glow-one
            absolute
            left-[-12%]
            top-[8%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#B7FF00]/[0.055]
            blur-[120px]

            sm:h-[380px]
            sm:w-[380px]

            lg:h-[600px]
            lg:w-[600px]
          "
        />

        <div
          className="
            about-glow-two
            absolute
            bottom-[8%]
            right-[-12%]
            h-[240px]
            w-[240px]
            rounded-full
            bg-[#8EFF00]/[0.025]
            blur-[120px]

            sm:h-[360px]
            sm:w-[360px]

            lg:h-[540px]
            lg:w-[540px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]

            bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]

            bg-[size:80px_80px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,.45)_100%)]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
        "
      >
        {/* ======================================================
            VIDEO
        ======================================================= */}

        <div
          ref={videoRef}
          className="
            about-video
            relative
            overflow-visible
            [perspective:1200px]
          "
        >
          {/* GLASS BACK */}

          <div
            className="
              about-glass-back
              pointer-events-none
              absolute
              -inset-[10px]
              z-0
              rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.025]
              shadow-[0_0_80px_rgba(183,255,0,.04)]
              backdrop-blur-[16px]

              sm:-inset-[14px]
              sm:rounded-[32px]

              lg:-inset-[18px]
              lg:rounded-[38px]
            "
          />

          {/* VIDEO FRAME */}

          <div
            className="
              relative
              z-10
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.10]
              bg-black
              shadow-[0_30px_100px_rgba(0,0,0,.55)]

              sm:rounded-[22px]

              lg:rounded-[28px]
            "
          >
            <div
              className="
                about-video-inner
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                bg-black

                sm:aspect-[16/8]

                lg:aspect-[16/7]
              "
            >
              {/* DIRECT VIDEO */}

              {videoSource.type ===
                "direct" && (
                <video
                  ref={
                    videoElementRef
                  }
                  src={
                    videoSource.url
                  }
                  poster={
                    VIDEO_POSTER
                  }
                  preload="metadata"
                  playsInline
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    cursor-pointer
                    select-none
                    object-cover
                  "
                  onClick={
                    toggleVideo
                  }
                  onPlay={() =>
                    setIsPlaying(
                      true,
                    )
                  }
                  onPause={() =>
                    setIsPlaying(
                      false,
                    )
                  }
                  onEnded={() =>
                    setIsPlaying(
                      false,
                    )
                  }
                />
              )}

              {/* YOUTUBE */}

              {videoSource.type ===
                "youtube" && (
                <iframe
                  src={
                    videoSource.url
                  }
                  title="Shopify Specialist Showreel"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    border-0
                  "
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                  "
                  allowFullScreen
                />
              )}

              {/* GOOGLE DRIVE */}

              {videoSource.type ===
                "drive" && (
                <iframe
                  src={
                    videoSource.url
                  }
                  title="Shopify Specialist Showreel"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    border-0
                  "
                  allow="
                    autoplay;
                    fullscreen
                  "
                  allowFullScreen
                />
              )}

              {/* VIMEO */}

              {videoSource.type ===
                "vimeo" && (
                <iframe
                  src={
                    videoSource.url
                  }
                  title="Shopify Specialist Showreel"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    border-0
                  "
                  allow="
                    autoplay;
                    fullscreen;
                    picture-in-picture
                  "
                  allowFullScreen
                />
              )}

              {/* EDGE */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-20
                  bg-gradient-to-t
                  from-black/[0.18]
                  via-transparent
                  to-transparent
                "
              />

              {/* DIRECT VIDEO CONTROL */}

              {videoSource.type ===
                "direct" && (
                <button
                  type="button"
                  onClick={
                    toggleVideo
                  }
                  aria-label={
                    isPlaying
                      ? "Pause video"
                      : "Play video"
                  }
                  className="
                    group
                    absolute
                    left-1/2
                    top-1/2
                    z-50
                    flex
                    h-16
                    w-16
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.25]
                    bg-black/[0.3]
                    text-white
                    backdrop-blur-md
                    shadow-[0_15px_50px_rgba(0,0,0,.35)]
                    transition-all
                    duration-500
                    hover:scale-110
                    hover:border-[#B7FF00]/60
                    hover:bg-black/[0.42]

                    sm:h-[72px]
                    sm:w-[72px]

                    lg:h-20
                    lg:w-20
                  "
                >
                  {isPlaying ? (
                    <Pause
                      size={19}
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={20}
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                  )}
                </button>
              )}

              {/* TOP LABEL */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-50
                  rounded-full
                  border
                  border-white/[0.18]
                  bg-black/[0.38]
                  px-3
                  py-1.5
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white/[0.82]
                  backdrop-blur-md

                  sm:right-6
                  sm:top-6

                  lg:right-8
                  lg:top-8
                  lg:px-4
                  lg:py-2
                "
              >
                Shopify Specialist
              </div>

              {/* VIDEO INFO */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-50
                  flex
                  items-center
                  gap-3

                  sm:bottom-7
                  sm:left-7

                  lg:bottom-8
                  lg:left-8
                "
              >
                {videoSource.type ===
                  "direct" && (
                  <button
                    type="button"
                    onClick={
                      toggleVideo
                    }
                    aria-label={
                      isPlaying
                        ? "Pause video"
                        : "Play video"
                    }
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.2]
                      bg-black/[0.3]
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:border-[#B7FF00]/60
                      hover:bg-black/[0.45]

                      sm:h-12
                      sm:w-12
                    "
                  >
                    {isPlaying ? (
                      <Pause
                        size={13}
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        size={13}
                        fill="currentColor"
                      />
                    )}
                  </button>
                )}

                <div
                  className="
                    rounded-xl
                    border
                    border-white/[0.1]
                    bg-black/[0.28]
                    px-3
                    py-2
                    backdrop-blur-md
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-white
                    "
                  >
                    My Showreel
                  </p>

                  <p
                    className="
                      mt-1
                      text-[7px]
                      text-white/50
                    "
                  >
                    {videoSource.type ===
                    "direct"
                      ? isPlaying
                        ? "Click to pause"
                        : "Click to play"
                      : "Watch my work"}
                  </p>
                </div>
              </div>

              {/* GLASS BORDER */}

              <div
                className="
                  about-glass-border
                  pointer-events-none
                  absolute
                  inset-0
                  z-[60]
                  rounded-[18px]
                  border
                  border-white/[0.16]
                  shadow-[inset_0_1px_0_rgba(255,255,255,.18),inset_0_-1px_0_rgba(183,255,0,.06)]

                  sm:rounded-[22px]

                  lg:rounded-[28px]
                "
              />

              {/* BORDER LIGHT */}

              <div
                className="
                  about-border-light
                  pointer-events-none
                  absolute
                  left-[-20%]
                  top-[-30%]
                  z-[70]
                  h-[160%]
                  w-[3px]
                  rotate-[18deg]
                  rounded-full
                  bg-gradient-to-b
                  from-transparent
                  via-[#B7FF00]/[0.45]
                  to-transparent
                  opacity-0
                  blur-[4px]
                "
              />
            </div>
          </div>
        </div>

        {/* ======================================================
            MARQUEE
        ======================================================= */}

        <div
          className="
            relative
            my-7
            overflow-hidden
            border-y
            border-white/[0.08]
            py-4

            sm:my-9
            sm:py-6

            lg:my-11
            lg:py-7
          "
        >
          <div
            className="
              about-marquee-track
              flex
              w-max
              items-center
              gap-7
              whitespace-nowrap
              will-change-transform

              sm:gap-10

              lg:gap-14
            "
          >
            {Array.from({
              length: 8,
            }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-7

                    sm:gap-10

                    lg:gap-14
                  "
                >
                  <span
                    className="
                      bg-gradient-to-r
                      from-white/[0.2]
                      via-white/[0.08]
                      to-[#B7FF00]/[0.3]
                      bg-clip-text
                      text-transparent
                      text-[clamp(3.2rem,8vw,7.5rem)]
                      font-medium
                      leading-none
                      tracking-[-0.075em]
                    "
                  >
                    About Me
                  </span>

                  <span
                    className="
                      bg-gradient-to-r
                      from-[#B7FF00]
                      via-[#D7FF70]
                      to-[#7EA900]
                      bg-clip-text
                      text-transparent
                      text-[20px]

                      sm:text-[26px]

                      lg:text-[32px]
                    "
                  >
                    ✦
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* ======================================================
            CONTENT
        ======================================================= */}

        <div
          className="
            about-content
            grid
            grid-cols-1
            gap-9

            md:gap-11

            lg:grid-cols-[0.82fr_1.18fr]
            lg:gap-16

            xl:gap-24
          "
        >
          {/* ====================================================
              LEFT
          ===================================================== */}

          <div>
            {/* LABEL */}

            <div
              className="
                about-label
                mb-4
                flex
                items-center
                gap-2.5
              "
            >
              <span
                className="
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[#B7FF00]
                  shadow-[0_0_14px_rgba(183,255,0,.6)]
                "
              />

              <span
                className="
                  bg-gradient-to-r
                  from-[#B7FF00]
                  via-[#D7FF70]
                  to-white/[0.45]
                  bg-clip-text
                  text-transparent
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  sm:text-[11px]
                "
              >
                About Me
              </span>
            </div>

            {/* HEADING */}

            <div className="overflow-hidden">
              <h2
                className="
                  text-[clamp(3.2rem,7vw,6.4rem)]
                  font-medium
                  leading-[0.84]
                  tracking-[-0.075em]
                "
              >
                <span
                  className="
                    about-heading-line
                    block
                    bg-gradient-to-r
                    from-white
                    via-white/[0.82]
                    to-white/[0.4]
                    bg-clip-text
                    text-transparent
                  "
                >
                  Approach
                </span>

                <span
                  className="
                    about-heading-line
                    block
                    bg-gradient-to-r
                    from-white/[0.92]
                    via-white/[0.55]
                    to-white/[0.25]
                    bg-clip-text
                    text-transparent
                  "
                >
                  &
                </span>

                <span
                  className="
                    about-heading-line
                    block
                    bg-gradient-to-r
                    from-white/[0.9]
                    via-[#B7FF00]
                    to-[#7FA900]
                    bg-clip-text
                    text-transparent
                  "
                >
                  philosophy
                </span>
              </h2>
            </div>

            {/* STAR */}

            <div className="mt-7 hidden lg:block">
              <span
                className="
                  bg-gradient-to-br
                  from-[#B7FF00]
                  via-[#A7D600]
                  to-white/[0.08]
                  bg-clip-text
                  text-transparent
                  text-[58px]
                  font-light
                  leading-none
                "
              >
                ✦
              </span>
            </div>
          </div>

          {/* ====================================================
              RIGHT
          ===================================================== */}

          <div className="max-w-[850px]">
            {/* DESCRIPTION */}

            <p
              className="
                about-description
                max-w-[800px]

                bg-gradient-to-r
                from-white/[0.92]
                via-white/[0.65]
                to-white/[0.35]

                bg-clip-text
                text-transparent

                text-[clamp(1.25rem,2.2vw,2rem)]

                font-medium

                leading-[1.43]

                tracking-[-0.035em]
              "
            >
              I build Shopify experiences that
              combine pixel-perfect design,
              clean development and
              conversion-focused thinking.
              Every store I work on is built to
              look exceptional, feel effortless
              and perform better.
            </p>

            {/* ==================================================
                LISTS
            ================================================== */}

            <div
              className="
                mt-8

                grid
                grid-cols-2

                gap-x-7
                gap-y-7

                sm:mt-10
                sm:gap-x-12
                sm:gap-y-8

                lg:mt-12
                lg:gap-x-20
                lg:gap-y-9
              "
            >
              {/* MY APPROACH */}

              <div>
                <p
                  className="
                    about-list-title
                    mb-5
                    bg-gradient-to-r
                    from-white/[0.65]
                    to-white/[0.3]
                    bg-clip-text
                    text-transparent
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  My Approach
                </p>

                <div
                  className="
                    space-y-3.5

                    sm:space-y-4

                    lg:space-y-[18px]
                  "
                >
                  {values.map(
                    (item) => (
                      <div
                        key={item}
                        className="
                          about-value
                          flex
                          items-center
                          gap-3

                          sm:gap-3.5
                        "
                      >
                        <span
                          className="
                            shrink-0
                            text-[14px]
                            leading-none
                            text-[#B7FF00]
                            drop-shadow-[0_0_10px_rgba(183,255,0,.4)]

                            sm:text-[15px]

                            lg:text-[16px]
                          "
                        >
                          ✦
                        </span>

                        <span
                          className="
                            bg-gradient-to-r
                            from-white/[0.9]
                            via-white/[0.68]
                            to-white/[0.4]
                            bg-clip-text
                            text-transparent
                            text-[17px]
                            font-medium
                            leading-[1.25]
                            tracking-[-0.02em]

                            sm:text-[18px]

                            lg:text-[20px]
                          "
                        >
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* WHAT I DO */}

              <div>
                <p
                  className="
                    about-list-title
                    mb-5
                    bg-gradient-to-r
                    from-white/[0.65]
                    to-white/[0.3]
                    bg-clip-text
                    text-transparent
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  What I Do
                </p>

                <div
                  className="
                    space-y-3.5

                    sm:space-y-4

                    lg:space-y-[18px]
                  "
                >
                  {expertise.map(
                    (item) => (
                      <div
                        key={item}
                        className="
                          about-expertise
                          flex
                          items-center
                          gap-3

                          sm:gap-3.5
                        "
                      >
                        <span
                          className="
                            shrink-0
                            text-[14px]
                            leading-none
                            text-[#B7FF00]
                            drop-shadow-[0_0_10px_rgba(183,255,0,.4)]

                            sm:text-[15px]

                            lg:text-[16px]
                          "
                        >
                          ✦
                        </span>

                        <span
                          className="
                            bg-gradient-to-r
                            from-white/[0.9]
                            via-white/[0.68]
                            to-white/[0.4]
                            bg-clip-text
                            text-transparent
                            text-[17px]
                            font-medium
                            leading-[1.25]
                            tracking-[-0.02em]

                            sm:text-[18px]

                            lg:text-[20px]
                          "
                        >
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* ==================================================
                CTA BUTTONS
            ================================================== */}

            <div
              className="
                about-cta
                relative
                z-20
                mt-9
                flex
                flex-wrap
                items-center
                gap-3

                sm:mt-11

                lg:mt-12
              "
            >
              {/* VIEW MY SERVICES */}

              <Link
                href="#services"
                className="
                  group

                  inline-flex
                  items-center
                  justify-center
                  gap-4

                  rounded-full

                  bg-gradient-to-r
                  from-[#B7FF00]
                  via-[#D7FF70]
                  to-[#8DBE00]

                  px-7
                  py-4

                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  text-black

                  shadow-[0_10px_35px_rgba(183,255,0,.12)]

                  transition-all
                  duration-500

                  hover:-translate-y-1

                  hover:shadow-[0_15px_45px_rgba(183,255,0,.2)]

                  sm:px-8
                "
              >
                <span>
                  View My Services
                </span>

                <ArrowDown
                  size={15}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-500
                    group-hover:translate-y-1
                  "
                />
              </Link>

              {/* LET'S WORK TOGETHER */}

              <Link
                href="/contact"
                className="
                  group

                  inline-flex
                  items-center
                  justify-center
                  gap-4

                  rounded-full

                  border
                  border-white/[0.22]

                  bg-white/[0.025]

                  px-7
                  py-4

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]

                  text-white/[0.78]

                  transition-all
                  duration-500

                  hover:-translate-y-1

                  hover:border-[#B7FF00]/50

                  hover:bg-[#B7FF00]

                  hover:text-black

                  sm:px-8
                "
              >
                <span>
                  Let&apos;s Work Together
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-500
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================
            FOOTER
        ======================================================= */}

        <div
          className="
            about-footer
            mt-10
            flex
            items-center
            justify-between
            gap-5
            border-t
            border-white/[0.08]
            pt-4

            sm:mt-12
            sm:pt-5

            lg:mt-14
            lg:pt-6
          "
        >
          <span
            className="
              bg-gradient-to-r
              from-white/[0.48]
              to-white/[0.18]
              bg-clip-text
              text-transparent
              text-[8px]
              font-medium
              uppercase
              tracking-[0.18em]

              sm:text-[9px]
            "
          >
            Shopify Specialist
          </span>

          <span
            className="
              bg-gradient-to-r
              from-white/[0.48]
              to-white/[0.18]
              bg-clip-text
              text-transparent
              text-[8px]
              font-medium
              uppercase
              tracking-[0.18em]

              sm:text-[9px]
            "
          >
            Design · Develop · Grow
          </span>
        </div>
      </div>
    </section>
  );
}
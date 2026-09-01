"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Sparkles,
} from "lucide-react";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import services from "@/data/services.json";

gsap.registerPlugin(ScrollTrigger);

type Service = (typeof services)[number];

export default function ServicesSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const stageRef =
    useRef<HTMLDivElement | null>(null);

  const cardsRef =
    useRef<(HTMLDivElement | null)[]>([]);

  const activeRef = useRef(0);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const total = services.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage || total === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet:
            "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduced:
            "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions =
            context.conditions as {
              desktop: boolean;
              tablet: boolean;
              mobile: boolean;
              reduced: boolean;
            };

          /* ======================================================
             REDUCED MOTION
          ====================================================== */

          if (conditions.reduced) {
            gsap.set(
              [
                ".services-eyebrow",
                ".services-heading-line",
                ".services-description",
                ".services-card",
                ".services-bottom",
              ],
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotate: 0,
              },
            );

            return;
          }

          /* ======================================================
             CARD INITIAL POSITION

             Every card except first starts ABOVE the viewport.

             This means:
             Card 01 → visible
             Card 02 → above
             Card 03 → above
             Card 04 → above
          ====================================================== */

          cardsRef.current.forEach(
            (card, index) => {
              if (!card) return;

              gsap.set(card, {
                yPercent:
                  index === 0
                    ? 0
                    : -108,

                opacity:
                  index === 0 ? 1 : 0,

                scale:
                  index === 0 ? 1 : 0.985,

                rotate: 0,

                zIndex:
                  total - index,

                pointerEvents:
                  index === 0
                    ? "auto"
                    : "none",
              });

              /* ----------------------------------------------
                 CONTENT INITIAL STATE
              ---------------------------------------------- */

              const number =
                card.querySelector(
                  ".service-number",
                );

              const title =
                card.querySelector(
                  ".service-title",
                );

              const description =
                card.querySelector(
                  ".service-description",
                );

              const tags =
                card.querySelector(
                  ".service-tags",
                );

              const meta =
                card.querySelector(
                  ".service-meta",
                );

              const arrow =
                card.querySelector(
                  ".service-arrow",
                );

              if (index !== 0) {
                gsap.set(
                  [
                    number,
                    title,
                    description,
                    tags,
                    meta,
                    arrow,
                  ],
                  {
                    opacity: 0,
                    y: 24,
                  },
                );
              }
            },
          );

          /* ======================================================
             HEADER INITIAL STATE
          ====================================================== */

          gsap.set(
            ".services-eyebrow",
            {
              opacity: 0,
              y: 25,
            },
          );

          gsap.set(
            ".services-heading-line",
            {
              opacity: 0,
              y: 80,
            },
          );

          gsap.set(
            ".services-description",
            {
              opacity: 0,
              y: 30,
            },
          );

          /* ======================================================
             HEADER REVEAL
          ====================================================== */

          const headerTimeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start:
                  conditions.mobile
                    ? "top 85%"
                    : "top 80%",

                end:
                  conditions.mobile
                    ? "top 55%"
                    : "top 48%",

                scrub: 1,

                invalidateOnRefresh: true,
              },
            });

          headerTimeline.to(
            ".services-eyebrow",
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
          );

          headerTimeline.to(
            ".services-heading-line",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger:
                conditions.mobile
                  ? 0.08
                  : 0.12,
              ease: "power4.out",
            },
            "-=0.15",
          );

          headerTimeline.to(
            ".services-description",
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.2",
          );

          /* ======================================================
             CARD SCROLL SYSTEM

             IMPORTANT:

             This is a vertical card replacement system.

             Current card:
                 yPercent 0 → -108

             Next card:
                 yPercent -108 → 0

             So the next card literally enters
             from the TOP.
          ====================================================== */

          const cardDuration =
            conditions.mobile
              ? 1
              : 1.05;

          const stepDistance =
            conditions.mobile
              ? 620
              : conditions.tablet
                ? 700
                : 760;

          const cardTimeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: stage,

                start:
                  conditions.mobile
                    ? "top 72%"
                    : "top 68%",

                end: `+=${Math.max(
                  stepDistance *
                    Math.max(total - 1, 1),
                  conditions.mobile
                    ? 3200
                    : 3800,
                )}`,

                scrub: 1.05,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true,

                onUpdate: (self) => {
                  const progress =
                    self.progress;

                  const index = Math.min(
                    total - 1,
                    Math.floor(
                      progress * total,
                    ),
                  );

                  if (
                    index !==
                    activeRef.current
                  ) {
                    activeRef.current =
                      index;

                    setActiveIndex(index);
                  }
                },
              },
            });

          /* ======================================================
             EACH CARD TRANSITION
          ====================================================== */

          for (
            let index = 0;
            index < total - 1;
            index++
          ) {
            const current =
              cardsRef.current[index];

            const next =
              cardsRef.current[index + 1];

            if (!current || !next) {
              continue;
            }

            const currentContent =
              current.querySelector(
                ".service-card-content",
              );

            const nextContent =
              next.querySelector(
                ".service-card-content",
              );

            const currentNumber =
              current.querySelector(
                ".service-number",
              );

            const currentTitle =
              current.querySelector(
                ".service-title",
              );

            const currentDescription =
              current.querySelector(
                ".service-description",
              );

            const currentTags =
              current.querySelector(
                ".service-tags",
              );

            const currentMeta =
              current.querySelector(
                ".service-meta",
              );

            const currentArrow =
              current.querySelector(
                ".service-arrow",
              );

            const nextNumber =
              next.querySelector(
                ".service-number",
              );

            const nextTitle =
              next.querySelector(
                ".service-title",
              );

            const nextDescription =
              next.querySelector(
                ".service-description",
              );

            const nextTags =
              next.querySelector(
                ".service-tags",
              );

            const nextMeta =
              next.querySelector(
                ".service-meta",
              );

            const nextArrow =
              next.querySelector(
                ".service-arrow",
              );

            /* ==================================================
               NEXT CARD READY ABOVE
            ================================================== */

            gsap.set(next, {
              yPercent: -108,
              opacity: 0,
              scale: 0.985,
              zIndex: total - index - 1,
              pointerEvents: "none",
            });

            /* ==================================================
               CURRENT CARD CONTENT EXIT
            ================================================== */

            cardTimeline.to(
              [
                currentNumber,
                currentTitle,
                currentDescription,
                currentTags,
                currentMeta,
                currentArrow,
              ],
              {
                opacity: 0,
                y: -24,

                duration:
                  cardDuration * 0.28,

                stagger: 0.018,

                ease: "power2.in",
              },
            );

            /* ==================================================
               CURRENT CARD LEAVES UP
            ================================================== */

            cardTimeline.to(
              current,
              {
                yPercent: -108,
                opacity: 0,
                scale: 0.985,

                duration:
                  cardDuration * 0.72,

                ease:
                  "power3.inOut",

                onStart: () => {
                  gsap.set(current, {
                    pointerEvents:
                      "none",
                  });

                  gsap.set(next, {
                    pointerEvents:
                      "auto",
                  });
                },
              },
              "<+=0.12",
            );

            /* ==================================================
               NEXT CARD ENTERS FROM TOP
            ================================================== */

            cardTimeline.to(
              next,
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,

                duration:
                  cardDuration,

                ease:
                  "power3.inOut",
              },
              "<+=0.12",
            );

            /* ==================================================
               NEXT CARD CONTENT REVEAL
            ================================================== */

            cardTimeline.to(
              [
                nextNumber,
                nextTitle,
                nextDescription,
                nextTags,
                nextMeta,
                nextArrow,
              ],
              {
                opacity: 1,
                y: 0,

                duration: 0.48,

                stagger: 0.055,

                ease:
                  "power3.out",
              },
              "<+=0.35",
            );

            /* ==================================================
               CONTENT MICRO MOVEMENT
            ================================================== */

            if (currentContent) {
              cardTimeline.to(
                currentContent,
                {
                  y: -8,
                  duration: 0.25,
                  ease: "power2.out",
                },
                "<",
              );
            }

            if (nextContent) {
              cardTimeline.fromTo(
                nextContent,
                {
                  y: 18,
                },
                {
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                },
                "<",
              );
            }
          }

          /* ======================================================
             BACKGROUND ANIMATION
          ====================================================== */

          gsap.to(
            ".services-glow-one",
            {
              x:
                conditions.desktop
                  ? 100
                  : 45,

              y:
                conditions.desktop
                  ? -60
                  : -30,

              scale: 1.12,

              duration: 8,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          gsap.to(
            ".services-glow-two",
            {
              x:
                conditions.desktop
                  ? -100
                  : -40,

              y:
                conditions.desktop
                  ? 55
                  : 25,

              scale: 1.1,

              duration: 10,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          /* ======================================================
             BOTTOM CTA
          ====================================================== */

          gsap.fromTo(
            ".services-bottom",
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,

              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  ".services-bottom",

                start:
                  conditions.mobile
                    ? "top 95%"
                    : "top 90%",

                end:
                  conditions.mobile
                    ? "top 75%"
                    : "top 70%",

                scrub: 1,

                invalidateOnRefresh: true,
              },
            },
          );

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      );

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#050505]
        px-4
        py-24
        text-white

        sm:px-6
        sm:py-28

        md:px-8

        lg:py-32

        xl:py-36
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
            services-glow-one
            absolute
            left-[-15%]
            top-[10%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#B7FF00]/[0.045]
            blur-[120px]

            sm:h-[420px]
            sm:w-[420px]

            lg:h-[620px]
            lg:w-[620px]
          "
        />

        <div
          className="
            services-glow-two
            absolute
            bottom-[8%]
            right-[-15%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#8EFF00]/[0.025]
            blur-[120px]

            sm:h-[420px]
            sm:w-[420px]

            lg:h-[600px]
            lg:w-[600px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
            bg-[size:90px_90px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,.58)_100%)]
          "
        />
      </div>

      {/* ========================================================
          MAIN
      ========================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1450px]
        "
      >
        {/* ======================================================
            HEADER
        ======================================================= */}

        <div
          className="
            mx-auto
            max-w-[900px]
            text-center
          "
        >
          {/* EYEBROW */}

          <div
            className="
              services-eyebrow
              mb-5
              flex
              items-center
              justify-center
              gap-2.5
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]
                rounded-full
                bg-[#B7FF00]
                shadow-[0_0_14px_rgba(183,255,0,.55)]
              "
            />

            <span
              className="
                bg-gradient-to-r
                from-[#B7FF00]
                via-[#D7FF70]
                to-white/[0.4]
                bg-clip-text
                text-transparent
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]

                sm:text-[10px]
              "
            >
              What I Do
            </span>
          </div>

          {/* HEADING */}

          <div className="overflow-hidden">
            <h2
              className="
                font-sans
                font-medium
                leading-[0.87]
                tracking-[-0.075em]

                text-[clamp(3.4rem,10vw,8rem)]
              "
            >
              <span
                className="
                  services-heading-line
                  block
                  bg-gradient-to-r
                  from-white
                  via-white/[0.86]
                  to-white/[0.32]
                  bg-clip-text
                  text-transparent
                "
              >
                Services
              </span>

              <span
                className="
                  services-heading-line
                  block
                  bg-gradient-to-r
                  from-white/[0.72]
                  via-[#B7FF00]
                  to-white/[0.32]
                  bg-clip-text
                  text-transparent
                "
              >
                that move
              </span>

              <span
                className="
                  services-heading-line
                  block
                  bg-gradient-to-r
                  from-[#B7FF00]
                  via-[#D7FF70]
                  to-white/[0.35]
                  bg-clip-text
                  text-transparent
                "
              >
                brands forward.
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              services-description
              mx-auto
              mt-6
              max-w-[650px]
              text-[12px]
              leading-[1.75]
              text-white/[0.42]

              sm:mt-7
              sm:text-[13px]

              lg:text-[14px]
            "
          >
            From Shopify development to
            conversion optimization, I build
            digital experiences that look
            exceptional, work effortlessly,
            and are designed for growth.
          </p>
        </div>

        {/* ======================================================
            CARD STAGE

            The stage itself is pinned by GSAP.
        ======================================================= */}

        <div
          ref={stageRef}
          className="
            services-card-stage
            relative
            mx-auto
            mt-14
            h-[510px]
            max-w-[1120px]

            sm:mt-16
            sm:h-[550px]

            md:h-[590px]

            lg:mt-20
            lg:h-[640px]
          "
        >
          {/* ====================================================
              CARDS
          ===================================================== */}

          {services.map(
            (service, index) => {
              const active =
                index === activeIndex;

              return (
                <div
                  key={service.id}
                  ref={(element) => {
                    cardsRef.current[
                      index
                    ] = element;
                  }}
                  className="
                    services-card
                    absolute
                    inset-0
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/[0.11]
                    bg-[#090D08]
                    shadow-[0_35px_100px_rgba(0,0,0,.58)]

                    sm:rounded-[28px]

                    lg:rounded-[32px]
                  "
                  style={{
                    zIndex:
                      total - index,
                  }}
                >
                  {/* =================================================
                      CARD BACKGROUND
                  ================================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                    "
                  >
                    <div
                      className="
                        absolute
                        right-[-12%]
                        top-[-18%]
                        h-[65%]
                        w-[48%]
                        rounded-full
                        bg-[#B7FF00]/[0.045]
                        blur-[110px]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_82%_28%,rgba(183,255,0,.065),transparent_34%)]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/[0.035]
                        via-transparent
                        to-black/[0.5]
                      "
                    />
                  </div>

                  {/* =================================================
                      TOP BORDER DETAIL
                  ================================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-6
                      right-6
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#B7FF00]/30
                      to-transparent

                      sm:left-8
                      sm:right-8

                      lg:left-12
                      lg:right-12
                    "
                  />

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div
                    className="
                      service-card-content
                      relative
                      flex
                      h-full
                      flex-col
                      justify-between
                      p-6

                      sm:p-8

                      md:p-10

                      lg:p-12

                      xl:p-14
                    "
                  >
                    {/* =================================================
                        TOP
                    ================================================== */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-5
                      "
                    >
                      {/* NUMBER */}

                      <div
                        className="
                          service-number
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#B7FF00]/25
                            bg-[#B7FF00]/[0.035]
                            font-mono
                            text-[10px]
                            text-[#B7FF00]

                            sm:h-11
                            sm:w-11
                          "
                        >
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.22em]
                            text-white/25

                            sm:text-[9px]
                          "
                        >
                          Service
                        </span>
                      </div>

                      {/* DETAIL */}

                      <Link
                        href={`/services/${service.slug}`}
                        aria-label={`View ${service.title} details`}
                        className="
                          service-arrow
                          group
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/[0.13]
                          bg-white/[0.025]
                          text-white/60
                          backdrop-blur-md
                          transition-all
                          duration-500

                          hover:border-[#B7FF00]/50
                          hover:bg-[#B7FF00]
                          hover:text-black

                          sm:h-12
                          sm:w-12

                          lg:h-14
                          lg:w-14
                        "
                      >
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.2}
                          className="
                            transition-transform
                            duration-500
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </Link>
                    </div>

                    {/* =================================================
                        MAIN
                    ================================================== */}

                    <div
                      className="
                        max-w-[850px]
                      "
                    >
                      {/* ICON */}

                      <div
                        className="
                          mb-5
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-[#B7FF00]/20
                          bg-[#B7FF00]/[0.035]
                          text-[#B7FF00]

                          sm:mb-6
                          sm:h-14
                          sm:w-14

                          lg:mb-7
                          lg:h-16
                          lg:w-16
                        "
                      >
                        <Sparkles
                          size={21}
                          strokeWidth={1.15}
                        />
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                          service-title
                          max-w-[900px]
                          bg-gradient-to-r
                          from-white
                          via-white/[0.88]
                          to-white/[0.35]
                          bg-clip-text
                          text-transparent
                          font-medium
                          leading-[0.86]
                          tracking-[-0.07em]

                          text-[clamp(2.5rem,7vw,6.5rem)]
                        "
                      >
                        {service.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          service-description
                          mt-5
                          max-w-[680px]
                          text-[12px]
                          leading-[1.72]
                          text-white/[0.45]

                          sm:mt-6
                          sm:text-[13px]

                          lg:mt-7
                          lg:text-[14px]
                          lg:leading-[1.8]
                        "
                      >
                        {
                          service.description
                        }
                      </p>

                      {/* TAGS */}

                      <div
                        className="
                          service-tags
                          mt-6
                          flex
                          flex-wrap
                          gap-2

                          sm:mt-7
                        "
                      >
                        {service.tags
                          .slice(0, 4)
                          .map(
                            (tag) => (
                              <span
                                key={tag}
                                className="
                                  rounded-full
                                  border
                                  border-white/[0.09]
                                  bg-white/[0.025]
                                  px-3
                                  py-1.5
                                  text-[7px]
                                  uppercase
                                  tracking-[0.1em]
                                  text-white/[0.42]

                                  sm:px-3.5
                                  sm:py-2
                                  sm:text-[8px]
                                "
                              >
                                {tag}
                              </span>
                            ),
                          )}
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM
                    ================================================== */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-5

                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                      "
                    >
                      {/* META */}

                      <div
                        className="
                          service-meta
                          flex
                          flex-wrap
                          items-center
                          gap-x-6
                          gap-y-3

                          sm:gap-x-8
                        "
                      >
                        {/* TIMELINE */}

                        <div>
                          <p
                            className="
                              mb-1.5
                              text-[7px]
                              uppercase
                              tracking-[0.17em]
                              text-white/25
                            "
                          >
                            Timeline
                          </p>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-[10px]
                              text-white/70

                              sm:text-[11px]
                            "
                          >
                            <Clock3
                              size={12}
                              strokeWidth={1.2}
                              className="
                                text-[#B7FF00]
                              "
                            />

                            {
                              service.timeline
                            }
                          </div>
                        </div>

                        {/* INVESTMENT */}

                        <div>
                          <p
                            className="
                              mb-1.5
                              text-[7px]
                              uppercase
                              tracking-[0.17em]
                              text-white/25
                            "
                          >
                            Investment
                          </p>

                          <p
                            className="
                              text-[10px]
                              font-medium
                              text-white/75

                              sm:text-[11px]
                            "
                          >
                            {
                              service.startingPrice
                            }
                          </p>
                        </div>

                        {/* PLATFORM */}

                        <div>
                          <p
                            className="
                              mb-1.5
                              text-[7px]
                              uppercase
                              tracking-[0.17em]
                              text-white/25
                            "
                          >
                            Platform
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-white/70

                              sm:text-[11px]
                            "
                          >
                            {
                              service.meta
                                .platform
                            }
                          </p>
                        </div>
                      </div>

                      {/* BOOK */}

                      {service.booking
                        .available && (
                        <Link
                          href={`/contact?service=${service.slug}`}
                          className="
                            group
                            inline-flex
                            w-fit
                            shrink-0
                            items-center
                            gap-4
                            rounded-full
                            bg-gradient-to-r
                            from-[#B7FF00]
                            via-[#D7FF70]
                            to-[#8DBE00]
                            px-5
                            py-3
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-black
                            transition-all
                            duration-500

                            hover:-translate-y-1
                            hover:shadow-[0_15px_45px_rgba(183,255,0,.18)]

                            sm:px-6
                            sm:py-3.5
                          "
                        >
                          <span>
                            {
                              service
                                .booking
                                .buttonText
                            }
                          </span>

                          <ArrowUpRight
                            size={13}
                            strokeWidth={1.4}
                            className="
                              transition-transform
                              duration-500
                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      ACTIVE BORDER
                  ================================================== */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[24px]
                      border
                      transition-opacity
                      duration-700

                      sm:rounded-[28px]

                      lg:rounded-[32px]

                      ${
                        active
                          ? "border-[#B7FF00]/[0.22] opacity-100"
                          : "border-transparent opacity-0"
                      }
                    `}
                  />
                </div>
              );
            },
          )}

          {/* ====================================================
              PROGRESS
          ===================================================== */}

          <div
            className="
              absolute
              bottom-[-38px]
              left-1/2
              z-[600]
              flex
              -translate-x-1/2
              items-center
              gap-2
            "
          >
            {services.map(
              (_, index) => {
                const active =
                  index === activeIndex;

                return (
                  <span
                    key={index}
                    className="
                      h-[3px]
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width: active
                        ? 28
                        : 7,

                      background:
                        active
                          ? "#B7FF00"
                          : "rgba(255,255,255,.14)",
                    }}
                  />
                );
              },
            )}
          </div>
        </div>

        {/* ======================================================
            BOTTOM CTA
        ======================================================= */}

        <div
          className="
            services-bottom
            mt-20
            flex
            flex-col
            items-center
            justify-center
            gap-5
            text-center

            sm:mt-24
          "
        >
          <p
            className="
              max-w-[450px]
              text-[10px]
              leading-[1.7]
              text-white/30

              sm:text-[11px]
            "
          >
            Have a project in mind?
            Let&apos;s build something
            exceptional together.
          </p>

          <Link
            href="/services"
            className="
              group
              inline-flex
              items-center
              gap-4
              rounded-full
              border
              border-white/[0.15]
              bg-white/[0.025]
              px-6
              py-3.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/70
              backdrop-blur-md
              transition-all
              duration-500

              hover:-translate-y-1
              hover:border-[#B7FF00]/45
              hover:bg-[#B7FF00]
              hover:text-black
            "
          >
            <span>
              View All Services
            </span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.2}
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
    </section>
  );
}
"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import projects from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  /*
   * =========================================================
   * FEATURED PROJECTS
   * =========================================================
   */

  const featuredProjects = useMemo(() => {
    return projects
      .filter((project) => project.featured === true)
      .slice(0, 6);
  }, []);

  /*
   * =========================================================
   * ANIMATION
   * =========================================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage || !featuredProjects.length) {
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>(
      ".project-stack-card",
    );

    if (!cards.length) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ------------------------------------------------------
       * AMBIENT LIGHT
       *
       * Very slow and lightweight.
       * ------------------------------------------------------
       */

      const ambient = ambientRef.current;

      if (ambient) {
        gsap.to(ambient, {
          x: 70,
          y: -25,
          scale: 1.08,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /*
       * ------------------------------------------------------
       * RESPONSIVE
       * ------------------------------------------------------
       */

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet:
            "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reducedMotion:
            "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean;
            tablet: boolean;
            mobile: boolean;
            reducedMotion: boolean;
          };

          const {
            desktop,
            tablet,
            mobile,
            reducedMotion,
          } = conditions;

          /*
           * ---------------------------------------------------
           * REDUCED MOTION
           * ---------------------------------------------------
           */

          if (reducedMotion) {
            gsap.set(cards, {
              clearProps: "all",
            });

            return;
          }

          /*
           * ---------------------------------------------------
           * STACK VALUES
           * ---------------------------------------------------
           */

          const stackOffset = desktop
            ? 15
            : tablet
              ? 10
              : 6;

          const stackScale = desktop
            ? 0.017
            : tablet
              ? 0.014
              : 0.008;

          /*
           * ---------------------------------------------------
           * EXIT VALUES
           * ---------------------------------------------------
           */

          const exitY = desktop
            ? -103
            : tablet
              ? -101
              : -100;

          const exitScale = desktop
            ? 0.96
            : tablet
              ? 0.968
              : 0.975;

          /*
           * ---------------------------------------------------
           * INITIAL STATE
           * ---------------------------------------------------
           */

          cards.forEach((card, index) => {
            const image =
              card.querySelector<HTMLElement>(
                ".project-card-image",
              );

            const content =
              card.querySelector<HTMLElement>(
                ".project-card-content",
              );

            const title =
              card.querySelector<HTMLElement>(
                ".project-card-title",
              );

            /*
             * Only transform / opacity / filter.
             *
             * No heavy shadows or complex animation here.
             */

            gsap.set(card, {
              y: index * stackOffset,
              scale: 1 - index * stackScale,

              opacity:
                index === 0
                  ? 1
                  : 0.97,

              filter:
                index === 0
                  ? "blur(0px)"
                  : "blur(2.5px)",

              zIndex:
                cards.length - index,

              force3D: true,
            });

            /*
             * Image.
             */

            if (image) {
              gsap.set(image, {
                scale: 1.035,
                yPercent: 0,
                force3D: true,
              });
            }

            /*
             * Background card content is slightly hidden.
             */

            if (index > 0) {
              if (content) {
                gsap.set(content, {
                  opacity: 0.45,
                  y: 6,
                });
              }

              if (title) {
                gsap.set(title, {
                  opacity: 0.55,
                  y: 5,
                });
              }
            }
          });

          /*
           * ---------------------------------------------------
           * MAIN TIMELINE
           *
           * IMPORTANT:
           *
           * scrub is intentionally LOW.
           *
           * High scrub values make mouse-wheel scrolling
           * feel delayed / heavy.
           * ---------------------------------------------------
           */

          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto",
            },

            scrollTrigger: {
              trigger: stage,

              start: "top top",

              end: `+=${cards.length * (
                desktop
                  ? 74
                  : tablet
                    ? 68
                    : 58
              )}%`,

              pin: true,

              /*
               * Smooth but responsive.
               */

              scrub: desktop
                ? 0.35
                : 0.28,

              anticipatePin: 1,

              invalidateOnRefresh: true,

              fastScrollEnd: false,

              preventOverlaps: true,

              onUpdate: (self) => {
                if (!progressRef.current) {
                  return;
                }

                const total = cards.length;

                const current = Math.min(
                  total,
                  Math.max(
                    1,
                    Math.floor(
                      self.progress * total,
                    ) + 1,
                  ),
                );

                progressRef.current.textContent =
                  String(current).padStart(
                    2,
                    "0",
                  );
              },
            },
          });

          /*
           * ---------------------------------------------------
           * CARD TRANSITIONS
           * ---------------------------------------------------
           */

          cards.forEach((card, index) => {
            if (index === cards.length - 1) {
              return;
            }

            const nextCard = cards[index + 1];

            const currentImage =
              card.querySelector<HTMLElement>(
                ".project-card-image",
              );

            const nextImage =
              nextCard.querySelector<HTMLElement>(
                ".project-card-image",
              );

            const currentContent =
              card.querySelector<HTMLElement>(
                ".project-card-content",
              );

            const nextContent =
              nextCard.querySelector<HTMLElement>(
                ".project-card-content",
              );

            const currentTitle =
              card.querySelector<HTMLElement>(
                ".project-card-title",
              );

            const nextTitle =
              nextCard.querySelector<HTMLElement>(
                ".project-card-title",
              );

            /*
             * =================================================
             * CURRENT CARD
             *
             * Smooth upward movement.
             *
             * NO heavy blur.
             * =================================================
             */

            timeline.to(
              card,
              {
                yPercent: exitY,
                scale: exitScale,
                opacity: 0.08,

                /*
                 * Almost zero blur.
                 * This prevents GPU-heavy blur animation.
                 */

                filter: "blur(0.2px)",

                duration: 1,

                ease: "power2.inOut",
              },
              index,
            );

            /*
             * Current image.
             */

            if (currentImage) {
              timeline.to(
                currentImage,
                {
                  scale: 1.065,
                  yPercent: -1,

                  duration: 1,

                  ease: "power2.inOut",
                },
                index,
              );
            }

            /*
             * Current content exits.
             */

            if (currentContent) {
              timeline.to(
                currentContent,
                {
                  y: -10,
                  opacity: 0,

                  duration: 0.42,

                  ease: "power2.out",
                },
                index + 0.25,
              );
            }

            if (currentTitle) {
              timeline.to(
                currentTitle,
                {
                  y: -8,
                  opacity: 0,

                  duration: 0.35,

                  ease: "power2.out",
                },
                index + 0.28,
              );
            }

            /*
             * =================================================
             * NEXT CARD
             *
             * This is the important part.
             *
             * Underlying card:
             *
             * blur 2.5px → 0px
             * scale → 1
             * y → 0
             * =================================================
             */

            timeline.to(
              nextCard,
              {
                y: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",

                duration: 1,

                ease: "power2.inOut",
              },
              index + 0.02,
            );

            /*
             * Next image.
             */

            if (nextImage) {
              timeline.to(
                nextImage,
                {
                  scale: 1,
                  yPercent: 0,

                  duration: 1,

                  ease: "power2.inOut",
                },
                index + 0.02,
              );
            }

            /*
             * Next content.
             */

            if (nextContent) {
              timeline.to(
                nextContent,
                {
                  y: 0,
                  opacity: 1,

                  duration: 0.4,

                  ease: "power2.out",
                },
                index + 0.45,
              );
            }

            if (nextTitle) {
              timeline.to(
                nextTitle,
                {
                  y: 0,
                  opacity: 1,

                  duration: 0.35,

                  ease: "power2.out",
                },
                index + 0.48,
              );
            }
          });
        },
      );
    }, section);

    /*
     * --------------------------------------------------------
     * CLEANUP
     * --------------------------------------------------------
     */

    return () => {
      ctx.revert();
    };
  }, [featuredProjects.length]);

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="
        relative
        mx-[10px]
        overflow-hidden
        bg-transparent
        text-white
      "
    >
      {/* =====================================================
          AMBIENT LIGHT
      ====================================================== */}

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
          ref={ambientRef}
          className="
            absolute
            left-[-160px]
            top-[10%]

            h-[340px]
            w-[340px]

            rounded-full

            bg-[#B7FF00]/[0.022]

            blur-[110px]

            will-change-transform
          "
        />

        <div
          className="
            absolute
            bottom-[-160px]
            right-[-160px]

            h-[400px]
            w-[400px]

            rounded-full

            bg-[#B7FF00]/[0.014]

            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1400px]

          px-0

          pb-6
          pt-14

          sm:pb-7
          sm:pt-16

          lg:pb-8
          lg:pt-20
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Title */}

          <div>
            <div
              className="
                mb-3

                flex
                items-center
                gap-2.5
              "
            >
              <span
                className="
                  h-[5px]
                  w-[5px]

                  rounded-full

                  bg-[#B7FF00]

                  shadow-[0_0_12px_rgba(183,255,0,0.35)]
                "
              />

              <span
                className="
                  text-[8px]

                  font-medium

                  uppercase

                  tracking-[0.3em]

                  text-white/35
                "
              >
                Selected Work
              </span>
            </div>

            <h2
              className="
                font-[var(--font-space)]

                text-[clamp(3rem,6.7vw,7rem)]

                font-medium

                leading-[0.82]

                tracking-[-0.075em]

                bg-gradient-to-r

                from-white
                via-white/75
                to-[#B7FF00]/65

                bg-clip-text

                text-transparent
              "
            >
              Selected
              <br />
              work.
            </h2>
          </div>

          {/* Description */}

          <p
            className="
              max-w-[320px]

              text-[11px]

              leading-5.5

              text-white/30

              sm:text-xs
              sm:leading-6
            "
          >
            A curated selection of Shopify experiences
            focused on design, development and ecommerce
            performance.
          </p>
        </div>
      </div>

      {/* =====================================================
          PINNED PROJECT STAGE
      ====================================================== */}

      <div
        ref={stageRef}
        className="
          relative
          z-10

          h-[100svh]

          w-full
        "
      >
        <div
          className="
            relative

            flex
            h-full
            w-full

            items-center
            justify-center

            px-0
          "
        >
          {/* =================================================
              STACK
          ================================================== */}

          <div
            className="
              relative

              h-[67svh]

              w-full

              sm:h-[70svh]

              lg:h-[73svh]
            "
          >
            {featuredProjects.map(
              (project, index) => (
                <article
                  key={project.id}
                  className="
                    project-stack-card

                    absolute
                    inset-0

                    overflow-hidden

                    rounded-[16px]

                    border
                    border-white/[0.085]

                    bg-[#080808]

                    shadow-[0_20px_65px_rgba(0,0,0,0.48)]

                    will-change-transform

                    sm:rounded-[20px]

                    lg:rounded-[24px]
                  "
                >
                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      overflow-hidden
                    "
                  >
                    <img
                      src={project.thumbnail}
                      alt={`${project.projectName} Shopify project`}
                      className="
                        project-card-image

                        h-full
                        w-full

                        object-cover

                        brightness-[0.86]
                        contrast-[1.03]

                        will-change-transform

                        select-none
                      "
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                      draggable={false}
                    />

                    {/* =================================================
                        DARK GRADIENT
                    ================================================== */}

                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        bg-gradient-to-t

                        from-black/[0.94]
                        via-black/[0.3]
                        to-black/[0.02]
                      "
                    />

                    {/* =================================================
                        LOGO LIME GLOW
                    ================================================== */}

                    <div
                      className="
                        pointer-events-none

                        absolute

                        bottom-[-20%]
                        left-[12%]

                        h-[45%]
                        w-[76%]

                        rounded-full

                        bg-[#B7FF00]/[0.018]

                        blur-[90px]
                      "
                    />

                    {/* Vignette */}

                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        bg-gradient-to-r

                        from-black/[0.12]
                        via-transparent
                        to-black/[0.08]
                      "
                    />
                  </div>

                  {/* =================================================
                      TOP META
                  ================================================== */}

                  <div
                    className="
                      project-card-meta

                      absolute

                      left-4
                      right-4
                      top-4

                      z-20

                      flex
                      items-center
                      justify-between

                      sm:left-6
                      sm:right-6
                      sm:top-6

                      lg:left-7
                      lg:right-7
                      lg:top-7
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2.5
                      "
                    >
                      <span
                        className="
                          text-[9px]

                          font-medium

                          tracking-[0.2em]

                          text-white/65
                        "
                      >
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          h-px
                          w-5

                          bg-white/20
                        "
                      />

                      <span
                        className="
                          text-[9px]

                          tracking-[0.18em]

                          text-white/25
                        "
                      >
                        {String(
                          featuredProjects.length,
                        ).padStart(2, "0")}
                      </span>
                    </div>

                    <span
                      className="
                        rounded-full

                        border
                        border-white/[0.11]

                        bg-black/[0.18]

                        px-3
                        py-1.5

                        text-[8px]

                        uppercase

                        tracking-[0.15em]

                        text-white/50

                        backdrop-blur-sm
                      "
                    >
                      {project.industry}
                    </span>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div
                    className="
                      project-card-content

                      absolute

                      bottom-4
                      left-4
                      right-4

                      z-20

                      sm:bottom-6
                      sm:left-6
                      sm:right-6

                      lg:bottom-7
                      lg:left-7
                      lg:right-7
                    "
                  >
                    <div
                      className="
                        flex

                        flex-col

                        gap-3

                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                      "
                    >
                      {/* Left */}

                      <div
                        className="
                          max-w-[820px]
                        "
                      >
                        <p
                          className="
                            mb-1.5

                            text-[8px]

                            font-medium

                            uppercase

                            tracking-[0.22em]

                            text-[#B7FF00]/70
                          "
                        >
                          {project.projectType}
                        </p>

                        <h3
                          className="
                            project-card-title

                            font-[var(--font-space)]

                            text-[clamp(2.15rem,5.5vw,6rem)]

                            font-medium

                            leading-[0.85]

                            tracking-[-0.07em]

                            bg-gradient-to-r

                            from-white
                            via-white/80
                            to-white/25

                            bg-clip-text

                            text-transparent
                          "
                        >
                          {project.projectName}
                        </h3>

                        <p
                          className="
                            mt-2

                            text-[10px]

                            text-white/30

                            sm:text-xs
                          "
                        >
                          {project.brand}
                        </p>
                      </div>

                      {/* Right */}

                      <div
                        className="
                          flex
                          shrink-0
                          flex-col

                          items-start

                          gap-2.5

                          lg:items-end
                        "
                      >
                        {/* Roles */}

                        <div
                          className="
                            project-card-tags

                            flex
                            flex-wrap

                            gap-1

                            lg:justify-end
                          "
                        >
                          {project.myRole
                            .slice(0, 3)
                            .map((role) => (
                              <span
                                key={role}
                                className="
                                  rounded-full

                                  border
                                  border-white/[0.1]

                                  bg-black/[0.16]

                                  px-2.5
                                  py-1.5

                                  text-[8px]

                                  uppercase

                                  tracking-[0.08em]

                                  text-white/45

                                  backdrop-blur-sm
                                "
                              >
                                {role}
                              </span>
                            ))}
                        </div>

                        {/* CTA */}

                        <Link
                          href={`/projects/${project.slug}`}
                          className="
                            project-card-cta

                            group

                            inline-flex

                            items-center

                            gap-2

                            text-[10px]

                            font-medium

                            text-white/65

                            sm:text-xs
                          "
                        >
                          <span
                            className="
                              transition-colors
                              duration-300

                              group-hover:text-white
                            "
                          >
                            View Case Study
                          </span>

                          <span
                            className="
                              flex

                              h-8
                              w-8

                              items-center
                              justify-center

                              rounded-full

                              border
                              border-white/[0.13]

                              bg-white/[0.035]

                              transition-all
                              duration-500

                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5

                              group-hover:border-[#B7FF00]/40

                              group-hover:bg-[#B7FF00]

                              group-hover:text-black
                            "
                          >
                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.5}
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>

          {/* =================================================
              PROGRESS
          ================================================== */}

          <div
            className="
              absolute

              bottom-3
              left-4

              z-30

              flex
              items-center
              gap-1.5

              sm:bottom-5
              sm:left-6

              lg:bottom-6
              lg:left-7
            "
          >
            <span
              ref={progressRef}
              className="
                text-[9px]

                font-medium

                tracking-[0.2em]

                text-[#B7FF00]/80
              "
            >
              01
            </span>

            <span
              className="
                text-[9px]

                tracking-[0.2em]

                text-white/22
              "
            >
              /
              {String(
                featuredProjects.length,
              ).padStart(2, "0")}
            </span>
          </div>

          {/* Scroll hint */}

          <div
            className="
              absolute

              bottom-4
              left-1/2

              z-30

              hidden

              -translate-x-1/2

              md:block
            "
          >
            <span
              className="
                text-[8px]

                uppercase

                tracking-[0.28em]

                text-white/18
              "
            >
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          VIEW ALL
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          w-full
          max-w-[1400px]

          flex-col
          items-center

          px-0

          pb-12
          pt-5

          text-center

          sm:pb-16
          sm:pt-6

          lg:pb-20
          lg:pt-7
        "
      >
        <p
          className="
            mb-2

            text-[8px]

            uppercase

            tracking-[0.25em]

            text-white/20
          "
        >
          Explore more work
        </p>

        <Link
          href="/projects"
          className="
            group

            relative

            inline-flex

            items-center

            gap-2.5

            font-[var(--font-space)]

            text-[clamp(1.8rem,4.2vw,4.2rem)]

            font-medium

            leading-none

            tracking-[-0.065em]

            bg-gradient-to-r

            from-white
            via-white/70
            to-[#B7FF00]/60

            bg-clip-text

            text-transparent
          "
        >
          <span>
            View All Projects
          </span>

          <span
            className="
              flex

              h-9
              w-9

              shrink-0

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.11]

              text-white/55

              transition-all
              duration-500

              group-hover:-translate-y-1
              group-hover:translate-x-1

              group-hover:border-[#B7FF00]/40

              group-hover:bg-[#B7FF00]

              group-hover:text-black

              sm:h-11
              sm:w-11

              lg:h-13
              lg:w-13
            "
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
            />
          </span>

          <span
            className="
              absolute

              -bottom-1.5
              left-0

              h-px

              w-0

              bg-[#B7FF00]/70

              transition-all
              duration-700

              group-hover:w-[calc(100%-2.75rem)]
            "
          />
        </Link>
      </div>
    </section>
  );
}
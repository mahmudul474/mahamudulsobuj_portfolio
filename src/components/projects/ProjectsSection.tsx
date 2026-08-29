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
   * PROJECT STACK ANIMATION
   * =========================================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage || featuredProjects.length === 0) {
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
           * ===================================================
           * ACCESSIBILITY
           * ===================================================
           */

          if (reducedMotion) {
            gsap.set(cards, {
              clearProps: "all",
            });

            return;
          }

          /*
           * ===================================================
           * RESPONSIVE VALUES
           * ===================================================
           */

          const stackOffset = desktop
            ? 14
            : tablet
              ? 9
              : 5;

          const stackScale = desktop
            ? 0.014
            : tablet
              ? 0.011
              : 0.006;

          const exitScale = desktop
            ? 0.97
            : tablet
              ? 0.975
              : 0.98;

          const exitY = desktop
            ? -105
            : tablet
              ? -103
              : -101;

          /*
           * ===================================================
           * INITIAL STACK STATE
           * ===================================================
           */

          cards.forEach((card, index) => {
            gsap.set(card, {
              y: index * stackOffset,

              scale:
                1 - index * stackScale,

              opacity:
                index === 0
                  ? 1
                  : 0.95,

              zIndex:
                cards.length - index,

              force3D: true,

              willChange:
                "transform, opacity",

              backfaceVisibility:
                "hidden",
            });
          });

          /*
           * ===================================================
           * MAIN TIMELINE
           * ===================================================
           *
           * IMPORTANT:
           *
           * The animation DOES NOT start while the section
           * is still below the viewport.
           *
           * Section reaches the top first.
           *
           * Then it pins.
           *
           * Then cards begin moving.
           * ===================================================
           */

          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto",
            },

            scrollTrigger: {
              trigger: stage,

              /*
               * FIX:
               *
               * Do NOT use top 70%.
               *
               * Wait until the actual section reaches
               * the viewport top.
               */

              start: "top top",

              /*
               * Long enough scroll distance for six cards.
               */

              end: `+=${cards.length * (
                desktop
                  ? 85
                  : tablet
                    ? 78
                    : 72
              )}%`,

              /*
               * Pin the project stage while cards change.
               */

              pin: true,

              pinSpacing: true,

              /*
               * Smooth but responsive.
               */

              scrub: desktop
                ? 0.12
                : mobile
                  ? 0.07
                  : 0.1,

              anticipatePin: 1,

              invalidateOnRefresh: true,

              fastScrollEnd: false,

              /*
               * Update project counter.
               */

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
           * ===================================================
           * CARD TRANSITIONS
           * ===================================================
           */

          cards.forEach((card, index) => {
            if (index >= cards.length - 1) {
              return;
            }

            const nextCard = cards[index + 1];

            /*
             * =================================================
             * CURRENT CARD
             * =================================================
             *
             * Smooth upward movement.
             *
             * No blur.
             * No rotation.
             * No filter.
             */

            timeline.to(
              card,
              {
                yPercent: exitY,

                scale: exitScale,

                opacity: 0,

                duration: 1,

                ease: "power2.inOut",
              },
              index,
            );

            /*
             * =================================================
             * NEXT CARD
             * =================================================
             */

            timeline.to(
              nextCard,
              {
                y: 0,

                scale: 1,

                opacity: 1,

                duration: 1,

                ease: "power2.inOut",
              },
              index,
            );
          });

          /*
           * ===================================================
           * REFRESH AFTER LAYOUT
           * ===================================================
           */

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      );
    }, section);

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
          SECTION HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1400px]

          px-0

          pb-5
          pt-12

          sm:pb-6
          sm:pt-14

          lg:pb-7
          lg:pt-18
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
          {/* =================================================
              TITLE
          ================================================== */}

          <div>
            <div
              className="
                mb-2.5

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

                  shadow-[0_0_10px_rgba(183,255,0,0.3)]
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

                text-[clamp(3rem,6.6vw,7rem)]

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

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              max-w-[315px]

              text-[11px]

              leading-5

              text-white/28

              sm:text-xs
              sm:leading-5.5
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
          "
        >
          {/* =================================================
              PROJECT CARD STACK
          ================================================== */}

          <div
            className="
              relative

              h-[66svh]

              w-full

              sm:h-[69svh]

              lg:h-[72svh]
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
                    border-white/[0.09]

                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]

                    will-change-transform

                    sm:rounded-[20px]

                    lg:rounded-[24px]
                  "
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        ${project.cardBg ?? "#0A0A0A"} 0%,
                        rgba(255,255,255,0.028) 48%,
                        rgba(183,255,0,0.025) 100%
                      )
                    `,
                  }}
                >
                  {/* =================================================
                      GLASS SURFACE
                  ================================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none

                      absolute
                      inset-0

                      z-[1]

                      bg-gradient-to-br

                      from-white/[0.045]

                      via-transparent

                      to-[#B7FF00]/[0.018]
                    "
                  />

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0

                      flex

                      items-center
                      justify-center

                      overflow-hidden
                    "
                  >
                    <img
                      src={project.thumbnail}
                      alt={`${project.projectName} Shopify project`}
                      className="
                        project-card-image

                        block

                        h-full
                        w-full

                        object-cover
                        object-center

                        max-md:object-contain

                        select-none

                        [backface-visibility:hidden]

                        will-change-transform
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
                        BOTTOM GRADIENT
                    ================================================== */}

                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        z-[2]

                        bg-gradient-to-t

                        from-black/[0.94]

                        via-black/[0.25]

                        to-transparent
                      "
                    />

                    {/* =================================================
                        SIDE VIGNETTE
                    ================================================== */}

                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        z-[2]

                        bg-gradient-to-r

                        from-black/[0.08]

                        via-transparent

                        to-black/[0.06]
                      "
                    />
                  </div>

                  {/* =================================================
                      TOP META
                  ================================================== */}

                  <div
                    className="
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
                    {/* Counter */}

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

                          tracking-[0.2em]

                          text-white/25
                        "
                      >
                        {String(
                          featuredProjects.length,
                        ).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Industry */}

                    <span
                      className="
                        rounded-full

                        border
                        border-white/[0.11]

                        bg-white/[0.035]

                        px-3
                        py-1.5

                        text-[8px]

                        uppercase

                        tracking-[0.15em]

                        text-white/50

                        backdrop-blur-md
                      "
                    >
                      {project.industry}
                    </span>
                  </div>

                  {/* =================================================
                      PROJECT CONTENT
                  ================================================== */}

                  <div
                    className="
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
                      {/* =================================================
                          LEFT CONTENT
                      ================================================== */}

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
                            font-[var(--font-space)]

                            text-[clamp(2rem,5.4vw,6rem)]

                            font-medium

                            leading-[0.86]

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

                      {/* =================================================
                          RIGHT CONTENT
                      ================================================== */}

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

                                  bg-white/[0.03]

                                  px-2.5
                                  py-1.5

                                  text-[8px]

                                  uppercase

                                  tracking-[0.08em]

                                  text-white/45

                                  backdrop-blur-md
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
              PROJECT COUNTER
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

          {/* =================================================
              SCROLL HINT
          ================================================== */}

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
          VIEW ALL PROJECTS
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
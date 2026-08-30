"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import projects from "@/data/projects.json";

type Project = (typeof projects)[number] & {
  cardBg?: string;
};

const MAX_STACK_CARDS = 3;

const clamp = (
  value: number,
  min: number,
  max: number,
) => Math.min(Math.max(value, min), max);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ============================================================
     FEATURED PROJECTS
  ============================================================ */

  const featuredProjects = useMemo<Project[]>(() => {
    return (projects as Project[])
      .filter((project) => project.featured === true)
      .slice(0, 6);
  }, []);

  const total = featuredProjects.length;

  /* ============================================================
     RESPONSIVE
  ============================================================ */

  useEffect(() => {
    const updateScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, []);

  /* ============================================================
     SCROLL → PROJECT
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || total <= 0) return;

    const updateFromScroll = () => {
      rafRef.current = null;

      const rect = section.getBoundingClientRect();

      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );

      const progress = clamp(
        -rect.top / scrollDistance,
        0,
        1,
      );

      const rawIndex =
        progress * Math.max(total - 1, 1);

      const nextIndex = clamp(
        Math.round(rawIndex),
        0,
        total - 1,
      );

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current =
        window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [total]);

  /* ============================================================
     GO TO PROJECT
  ============================================================ */

  const goToProject = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;

      const section = sectionRef.current;

      if (!section) return;

      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );

      const targetProgress =
        total <= 1 ? 0 : index / (total - 1);

      const targetTop =
        window.scrollY +
        section.getBoundingClientRect().top +
        scrollDistance * targetProgress;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    },
    [total],
  );

  /* ============================================================
     LEFT LIST AUTO SCROLL
  ============================================================ */

  useEffect(() => {
    const list = document.querySelector(
      "[data-project-list]",
    );

    if (!list) return;

    const activeItem =
      list.querySelector<HTMLElement>(
        `[data-project-index="${activeIndex}"]`,
      );

    if (!activeItem) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    const outsideTop = itemRect.top < listRect.top;
    const outsideBottom =
      itemRect.bottom > listRect.bottom;

    if (outsideTop || outsideBottom) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  /* ============================================================
     EMPTY
  ============================================================ */

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative mx-[10px]"
      style={{
        height: `${Math.max(total, 1) * 100}svh`,
      }}
    >
      {/* ========================================================
          STICKY FRAME
      ======================================================== */}

      <div
        className="
          sticky
          top-[90px]
          h-[calc(100svh-20px)]
          overflow-hidden
          rounded-[20px]
          border
          border-white/[0.09]
          bg-[#030504]
        "
      >
        {/* ======================================================
            SUBTLE BACKGROUND
        ======================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -right-[15%]
              top-[15%]
              h-[45%]
              w-[45%]
              rounded-full
              bg-[#B7FF00]/[0.025]
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              -bottom-[20%]
              left-[20%]
              h-[40%]
              w-[40%]
              rounded-full
              bg-[#B7FF00]/[0.018]
              blur-[100px]
            "
          />
        </div>

        {/* ======================================================
            MAIN CONTENT

            IMPORTANT:
            Mobile = absolute layers
            Desktop = grid
        ======================================================= */}

        <div
          className="
            relative
            z-10
            h-full
            min-h-0

            lg:grid
            lg:grid-cols-[285px_minmax(0,1fr)]

            xl:grid-cols-[310px_minmax(0,1fr)]
          "
        >
          {/* ====================================================
              LEFT / TITLE PANEL

              MOBILE:
              Absolute overlay — DOES NOT CREATE COLUMN GAP

              DESKTOP:
              Normal grid column
          ===================================================== */}

          <aside
            className="
              absolute
              left-0
              right-0
              top-0
              z-[100]
              h-[185px]
              min-h-0
              px-5
              pb-0
              pt-6

              sm:h-[215px]
              sm:px-7
              sm:pt-7

              lg:relative
              lg:h-full
              lg:px-7
              lg:py-8

              xl:px-8
            "
          >
            <div
              className="
                flex
                h-full
                min-h-0
                flex-col
              "
            >
              {/* =================================================
                  EYEBROW
              ================================================== */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-[5px]
                    w-[5px]
                    rounded-full
                    bg-[#B7FF00]
                    shadow-[0_0_12px_rgba(183,255,0,.5)]
                  "
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.22em]
                    text-white/75

                    sm:text-[10px]
                  "
                >
                  Our Work
                </span>
              </div>

              {/* =================================================
                  TITLE
              ================================================== */}

              <h2
                className="
                  mt-5
                  shrink-0
                  font-serif
                  font-normal
                  leading-[0.84]
                  tracking-[-0.065em]

                  text-[clamp(3rem,8vw,5.2rem)]

                  sm:mt-6
                  sm:text-[clamp(3.5rem,8vw,5.4rem)]

                  lg:mt-6
                  lg:text-[clamp(3.2rem,4.7vw,5.1rem)]

                  xl:text-[clamp(3.5rem,4.5vw,5.3rem)]
                "
              >
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-white
                    via-white
                    to-white/45
                    bg-clip-text
                    text-transparent
                  "
                >
                  Selected
                </span>

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-[#B7FF00]
                    via-[#D7FF68]
                    to-white/40
                    bg-clip-text
                    text-transparent
                  "
                >
                  Work
                </span>
              </h2>

              {/* =================================================
                  DESCRIPTION

                  MOBILE:
                  Compact so card can start earlier
              ================================================== */}

              <p
                className="
                  mt-3
                  max-w-[255px]
                  shrink-0
                  text-[9px]
                  leading-[1.65]
                  text-white/42

                  sm:mt-4
                  sm:text-[10px]

                  lg:mt-6
                  lg:text-[11px]
                  lg:leading-[1.8]
                "
              >
                We partner with ambitious
                brands to design and build
                Shopify stores that not only
                look stunning but perform at
                their best.
              </p>

              {/* =================================================
                  VIEW ALL — DESKTOP ONLY
              ================================================== */}

              <Link
                href="/projects"
                className="
                  group
                  mt-6
                  hidden
                  w-fit
                  shrink-0
                  items-center
                  gap-3
                  lg:flex
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
                    border-white/[0.14]
                    text-white/65
                    transition-all
                    duration-500
                    group-hover:border-[#B7FF00]/50
                    group-hover:bg-[#B7FF00]
                    group-hover:text-black
                  "
                >
                  <ArrowRight
                    size={15}
                    strokeWidth={1.2}
                  />
                </span>

                <span
                  className="
                    border-b
                    border-[#B7FF00]/45
                    pb-1
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-white/70
                  "
                >
                  View All Projects
                </span>
              </Link>

              {/* =================================================
                  PROJECT LIST — DESKTOP
              ================================================== */}

              <div
                data-project-list
                className="
                  mt-8
                  hidden
                  min-h-0
                  w-full
                  flex-1
                  overflow-x-hidden
                  overflow-y-auto
                  pr-2
                  lg:block
                  [scrollbar-color:rgba(255,255,255,.12)_transparent]
                  [scrollbar-width:thin]
                "
              >
                <div
                  className="
                    relative
                    space-y-5
                    pb-5
                  "
                >
                  <span
                    className="
                      absolute
                      bottom-2
                      left-[3px]
                      top-2
                      w-px
                      bg-white/[0.08]
                    "
                  />

                  {featuredProjects.map(
                    (project, index) => {
                      const active =
                        index === activeIndex;

                      return (
                        <button
                          key={project.id}
                          type="button"
                          data-project-index={index}
                          onClick={() =>
                            goToProject(index)
                          }
                          className="
                            group
                            relative
                            flex
                            w-full
                            items-start
                            gap-3
                            text-left
                          "
                        >
                          <span
                            className={`
                              relative
                              z-10
                              mt-[5px]
                              h-[7px]
                              w-[7px]
                              shrink-0
                              rounded-full
                              transition-all
                              duration-500

                              ${
                                active
                                  ? "bg-[#B7FF00] shadow-[0_0_11px_rgba(183,255,0,.55)]"
                                  : "bg-white/15"
                              }
                            `}
                          />

                          <span
                            className={`
                              w-[28px]
                              shrink-0
                              font-mono
                              text-[18px]
                              leading-none
                              tracking-[-0.05em]
                              transition-colors
                              duration-500

                              ${
                                active
                                  ? "text-[#B7FF00]"
                                  : "text-white/35"
                              }
                            `}
                          >
                            {String(index + 1).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <span className="min-w-0">
                            <span
                              className={`
                                block
                                truncate
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.1em]
                                transition-colors
                                duration-500

                                ${
                                  active
                                    ? "text-white/90"
                                    : "text-white/45"
                                }
                              `}
                            >
                              {project.projectName}
                            </span>

                            <span
                              className="
                                mt-1
                                block
                                truncate
                                text-[8px]
                                text-white/30
                              "
                            >
                              {project.projectType}
                            </span>
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* =================================================
                  DESKTOP ARROWS
              ================================================== */}

              <div
                className="
                  mt-auto
                  hidden
                  shrink-0
                  gap-3
                  pt-5
                  lg:flex
                "
              >
                <button
                  type="button"
                  aria-label="Previous project"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    goToProject(activeIndex - 1)
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.12]
                    text-white/50
                    transition-all
                    duration-500
                    hover:border-white/30
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-25
                  "
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={1.2}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Next project"
                  disabled={
                    activeIndex === total - 1
                  }
                  onClick={() =>
                    goToProject(activeIndex + 1)
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#B7FF00]/45
                    text-[#B7FF00]
                    transition-all
                    duration-500
                    hover:bg-[#B7FF00]
                    hover:text-black
                    disabled:cursor-not-allowed
                    disabled:opacity-25
                  "
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={1.2}
                  />
                </button>
              </div>
            </div>
          </aside>

          {/* ====================================================
              PROJECT AREA

              MOBILE:
              Absolute full frame

              DESKTOP:
              Normal grid column
          ===================================================== */}

          <div
            className="
              absolute
              inset-0
              min-h-0
              min-w-0
              px-4
              pb-7

              sm:px-6

              lg:relative
              lg:inset-auto
              lg:px-0
              lg:pr-7

              xl:pr-8
            "
          >
            <div
              className="
                relative
                h-full
                min-h-0
              "
            >
              {/* =================================================
                  COUNTER
              ================================================== */}

              <div
                className="
                  absolute
                  right-1
                  top-4
                  z-[300]
                  flex
                  items-baseline
                  gap-2

                  lg:right-1
                  lg:top-7
                "
              >
                <span
                  className="
                    font-mono
                    text-[27px]
                    leading-none
                    tracking-[-0.06em]
                    text-[#B7FF00]

                    sm:text-[32px]

                    lg:text-[38px]
                  "
                >
                  {String(activeIndex + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span
                  className="
                    text-[10px]
                    text-white/25
                  "
                >
                  /
                </span>

                <span
                  className="
                    text-[11px]
                    text-white/40
                  "
                >
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* =================================================
                  CARD STAGE

                  THIS FIXES THE MOBILE GAP

                  Mobile card starts immediately below
                  the title/description area.

                  No normal-flow column is created.
              ================================================== */}

              <div
                className="
                  absolute
                  left-0
                  right-0

                  top-[185px]
                  bottom-[4.5rem]

                  min-[390px]:top-[190px]
                  min-[430px]:top-[198px]

                  sm:top-[215px]
                  sm:bottom-[5rem]

                  lg:bottom-[6%]
                  lg:left-[1%]
                  lg:right-[3%]
                  lg:top-[9%]
                "
              >
                {featuredProjects.map(
                  (project, index) => {
                    const depth =
                      index - activeIndex;

                    if (
                      depth < 0 ||
                      depth > MAX_STACK_CARDS
                    ) {
                      return null;
                    }

                    const isActive = depth === 0;

                    /* =================================================
                       STACK POSITION
                    ================================================== */

                    const translateX = isMobile
                      ? depth * 8
                      : depth * 20;

                    const translateY = isMobile
                      ? depth * 7
                      : depth * 11;

                    /* =================================================
                       SCALE
                    ================================================== */

                    const scale = isMobile
                      ? 1 - depth * 0.018
                      : 1 - depth * 0.027;

                    /* =================================================
                       ANGLE
                    ================================================== */

                    const rotate = isActive
                      ? 0
                      : depth === 1
                        ? 0.65
                        : depth === 2
                          ? 1.1
                          : 1.45;

                    /* =================================================
                       OPACITY
                    ================================================== */

                    const opacity = isActive
                      ? 1
                      : depth === 1
                        ? 0.9
                        : depth === 2
                          ? 0.7
                          : 0.5;

                    return (
                      <article
                        key={project.id}
                        className="
                          absolute
                          inset-0
                          overflow-hidden
                          rounded-[18px]
                          border
                          border-white/[0.14]
                          shadow-[0_28px_75px_rgba(0,0,0,.58)]

                          transition-[transform,opacity]
                          duration-[720ms]
                          ease-[cubic-bezier(.22,.75,.18,1)]

                          will-change-transform

                          sm:rounded-[20px]

                          lg:rounded-[23px]
                        "
                        style={{
                          /*
                           * IMPORTANT:
                           * cardBg comes directly
                           * from projects.json
                           */
                          backgroundColor:
                            project.cardBg ||
                            "#10140A",

                          transform: `
                            translate3d(
                              ${translateX}px,
                              ${translateY}px,
                              0
                            )
                            scale(${scale})
                            rotate(${rotate}deg)
                          `,

                          opacity,

                          zIndex: 100 - depth,
                        }}
                      >
                        {/* =================================================
                            IMAGE
                        ================================================== */}

                        <div
                          className="
                            absolute
                            inset-0
                            overflow-hidden
                            bg-black
                          "
                        >
                          <img
                            src={project.thumbnail}
                            alt={project.projectName}
                            draggable={false}
                            loading={
                              index === 0
                                ? "eager"
                                : "lazy"
                            }
                            decoding="async"
                            className="
                              h-full
                              w-full
                              select-none
                              object-cover
                              object-center

                              max-[767px]:object-contain
                              max-[767px]:object-center
                            "
                          />

                          {/* =================================================
                              BOTTOM SHADOW
                          ================================================== */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-x-0
                              bottom-0
                              h-[54%]
                              bg-gradient-to-t
                              from-black/[0.96]
                              via-black/[0.48]
                              to-transparent
                            "
                          />
                        </div>

                        {/* =================================================
                            CARD NUMBER
                        ================================================== */}

                        <span
                          className="
                            absolute
                            left-5
                            top-5
                            z-30
                            text-[9px]
                            tracking-[0.14em]
                            text-white/85

                            sm:left-7
                            sm:top-7

                            lg:left-8
                            lg:top-8
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        {/* =================================================
                            VIEW CASE STUDY
                        ================================================== */}

                        <Link
                          href={`/projects/${project.slug}`}
                          className="
                            group/case
                            absolute
                            right-4
                            top-4
                            z-40

                            inline-flex
                            min-h-[36px]
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-white/[0.38]

                            bg-gradient-to-r
                            from-white/[0.28]
                            via-white/[0.16]
                            to-[#D9FF73]/[0.28]

                            px-3.5
                            py-2

                            text-[7px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-white

                            shadow-[0_8px_25px_rgba(0,0,0,.2)]

                            backdrop-blur-sm

                            transition-all
                            duration-500

                            hover:border-[#B7FF00]/60
                            hover:from-[#B7FF00]/35
                            hover:via-white/[0.18]
                            hover:to-white/[0.2]

                            sm:right-6
                            sm:top-6
                            sm:min-h-[40px]
                            sm:px-4

                            lg:right-8
                            lg:top-8
                            lg:min-h-[42px]
                            lg:px-4
                            lg:text-[8px]
                          "
                        >
                          <span>
                            View Case Study
                          </span>

                          <ArrowUpRight
                            size={13}
                            strokeWidth={1.2}
                            className="
                              transition-transform
                              duration-500
                              group-hover/case:translate-x-0.5
                              group-hover/case:-translate-y-0.5
                            "
                          />
                        </Link>

                        {/* =================================================
                            PROJECT DETAILS
                        ================================================== */}

                        <div
                          className="
                            absolute
                            bottom-5
                            left-5
                            right-5
                            z-30

                            sm:bottom-7
                            sm:left-7
                            sm:right-7

                            lg:bottom-8
                            lg:left-8
                            lg:right-8
                          "
                        >
                          {/* PROJECT TYPE */}

                          <p
                            className="
                              mb-2
                              text-[7px]
                              font-medium
                              uppercase
                              tracking-[0.18em]
                              text-[#B7FF00]

                              sm:text-[8px]

                              lg:text-[9px]
                            "
                          >
                            {project.projectType}
                          </p>

                          {/* PROJECT NAME */}

                          <h3
                            className="
                              max-w-full
                              overflow-hidden
                              text-ellipsis
                              whitespace-nowrap

                              font-sans
                              font-medium
                              leading-[0.86]
                              tracking-[-0.075em]
                              text-white

                              text-[clamp(2rem,6vw,5.5rem)]

                              sm:text-[clamp(2.5rem,6vw,5rem)]

                              lg:text-[clamp(3rem,5.4vw,5.5rem)]
                            "
                          >
                            {project.projectName}
                          </h3>

                          {/* BRAND */}

                          {project.brand && (
                            <p
                              className="
                                mt-3
                                font-serif
                                text-[11px]
                                italic
                                text-[#B7FF00]/85

                                sm:text-[13px]

                                lg:text-[15px]
                              "
                            >
                              — {project.brand}
                            </p>
                          )}

                          {/* ROLES */}

                          {project.myRole?.length > 0 && (
                            <div
                              className="
                                mt-4
                                flex
                                flex-wrap
                                gap-x-4
                                gap-y-1.5

                                sm:gap-x-5
                              "
                            >
                              {project.myRole
                                .slice(0, 4)
                                .map((role) => (
                                  <span
                                    key={role}
                                    className="
                                      text-[6px]
                                      uppercase
                                      tracking-[0.12em]
                                      text-white/50

                                      sm:text-[7px]

                                      lg:text-[8px]
                                    "
                                  >
                                    {role}
                                  </span>
                                ))}
                            </div>
                          )}

                          {/* INDUSTRY */}

                          {project.industry && (
                            <div
                              className="
                                mt-2
                                text-[7px]
                                uppercase
                                tracking-[0.12em]
                                text-white/25

                                lg:text-[8px]
                              "
                            >
                              {project.industry}
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  },
                )}
              </div>

              {/* =================================================
                  MOBILE PROGRESS
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-[250]

                  flex
                  items-center
                  justify-between

                  lg:hidden
                "
              >
                {/* DOTS */}

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  {featuredProjects.map(
                    (_, index) => {
                      const active =
                        index === activeIndex;

                      return (
                        <button
                          key={index}
                          type="button"
                          aria-label={`Go to project ${
                            index + 1
                          }`}
                          onClick={() =>
                            goToProject(index)
                          }
                          className="
                            h-[3px]
                            rounded-full
                            transition-all
                            duration-500
                          "
                          style={{
                            width: active ? 28 : 7,
                            backgroundColor:
                              active
                                ? "#B7FF00"
                                : "rgba(255,255,255,.14)",
                          }}
                        />
                      );
                    },
                  )}
                </div>

                {/* SCROLL LABEL */}

                <span
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.16em]
                    text-white/30
                  "
                >
                  {activeIndex === total - 1
                    ? "End"
                    : "Scroll to explore"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
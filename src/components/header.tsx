 "use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Case Studies",
    href: "#case-studies",
  },
  {
    label: "Blog",
    href: "#blog",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const reduceMotion = useReducedMotion();

  /* =========================================================
     SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;

    setDarkMode(nextDarkMode);

    if (nextDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(
        "portfolio-theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(
        "portfolio-theme",
        "light"
      );
    }
  };

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  /* =========================================================
     LOCK PAGE SCROLL WHEN MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  /* =========================================================
     ESC TO CLOSE MOBILE MENU
  ========================================================= */

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [menuOpen]);

  return (
    <>
      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <motion.header
        initial={
          reduceMotion
            ? false
            : {
                y: -30,
                opacity: 0,
              }
        }
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          inset-x-0
          top-0
          z-[100]
          w-full
        "
      >
        <div
          className="
            px-3
            pt-3

            sm:px-5
            sm:pt-4

            lg:px-7
          "
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: scrolled
                ? "rgba(5, 5, 10, 0.72)"
                : "rgba(5, 5, 10, 0.20)",

              borderColor: scrolled
                ? "rgba(255,255,255,0.14)"
                : "rgba(255,255,255,0.08)",

              boxShadow: scrolled
                ? "0 20px 70px rgba(0,0,0,0.30)"
                : "0 0 0 rgba(0,0,0,0)",

              backdropFilter: scrolled
                ? "blur(28px) saturate(160%)"
                : "blur(18px) saturate(140%)",
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              relative
              mx-auto
              flex
              h-[62px]
              w-full
              max-w-[1440px]
              items-center
              rounded-[18px]
              border
              px-3.5

              sm:h-[68px]
              sm:rounded-2xl
              sm:px-5

              lg:h-[72px]
              lg:px-6

              xl:h-[74px]
            "
          >
            {/* =================================================
                LOGO
            ================================================== */}

            <motion.a
              href="/"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.035,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.96,
                    }
              }
              className="
                relative
                z-20
                flex
                shrink-0
                items-center
                outline-none
              "
              aria-label="Mahamudul Hasan Home"
            >
              <span
                className="
                  font-[var(--font-space)]
                  text-[24px]
                  font-bold
                  leading-none
                  tracking-[-0.075em]
                  text-white

                  sm:text-[27px]

                  lg:text-[28px]
                "
              >
                MH
                <span className="text-cyan-400">
                  .
                </span>
              </span>
            </motion.a>

            {/* =================================================
                DESKTOP CENTER NAVIGATION

                Absolute positioning guarantees exact center.
            ================================================== */}

            <nav
              className="
                absolute
                left-1/2
                top-1/2
                hidden
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                gap-6

                lg:flex

                xl:gap-8
              "
              aria-label="Main navigation"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: -12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.55,
                    delay: reduceMotion
                      ? 0
                      : 0.18 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    relative
                    whitespace-nowrap
                    py-2
                    text-[13px]
                    font-medium
                    tracking-[-0.01em]
                    text-white/60
                    outline-none
                    transition-colors
                    duration-300
                    hover:text-white
                    focus-visible:text-white

                    xl:text-[14px]
                  "
                >
                  <span>
                    {item.label}
                  </span>

                  {/* Animated underline */}

                  <span
                    className="
                      absolute
                      -bottom-0.5
                      left-1/2
                      h-px
                      w-0
                      -translate-x-1/2
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-violet-500
                      opacity-80
                      transition-all
                      duration-300
                      group-hover:w-full
                      group-focus-visible:w-full
                    "
                  />

                  {/* Small glow */}

                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-cyan-400
                      opacity-0
                      blur-[2px]
                      transition-opacity
                      duration-300
                      group-hover:opacity-80
                      group-focus-visible:opacity-80
                    "
                  />
                </motion.a>
              ))}
            </nav>

            {/* =================================================
                RIGHT CONTROLS
            ================================================== */}

            <div
              className="
                relative
                z-20
                ml-auto
                flex
                shrink-0
                items-center
                gap-1.5

                sm:gap-2
              "
            >
              {/* =================================================
                  THEME BUTTON
              ================================================== */}

              <motion.button
                type="button"
                onClick={toggleTheme}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.06,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.9,
                      }
                }
                aria-label={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.045]
                  text-white/75
                  outline-none
                  transition-colors
                  duration-300
                  hover:bg-white/[0.09]
                  hover:text-white
                  focus-visible:ring-2
                  focus-visible:ring-cyan-400/60

                  sm:h-10
                  sm:w-10
                "
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {darkMode ? (
                    <motion.span
                      key="sun"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              rotate: -90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: 90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.25,
                      }}
                    >
                      <Sun
                        size={16}
                        strokeWidth={1.7}
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              rotate: 90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: -90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.25,
                      }}
                    >
                      <Moon
                        size={16}
                        strokeWidth={1.7}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* =================================================
                  HIRE ME BUTTON
                  Desktop + Tablet + Mobile
              ================================================== */}

              <motion.a
                href="#contact"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.025,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className="
                  group
                  flex
                  h-9
                  shrink-0
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.045]
                  px-3
                  text-[11px]
                  font-medium
                  text-white
                  outline-none
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/30
                  hover:bg-white/[0.08]
                  focus-visible:ring-2
                  focus-visible:ring-cyan-400/60

                  sm:h-10
                  sm:gap-1.5
                  sm:px-4
                  sm:text-[12px]

                  lg:gap-2
                  lg:px-5
                  lg:text-[13px]
                "
              >
                {/* Mobile */}

                <span className="sm:hidden">
                  Hire
                </span>

                {/* Tablet/Desktop */}

                <span className="hidden sm:inline">
                  Hire Me
                </span>

                <motion.span
                  initial={{
                    x: 0,
                    y: 0,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 3,
                          y: -3,
                        }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                  />
                </motion.span>
              </motion.a>

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================== */}

              <motion.button
                type="button"
                onClick={toggleMenu}
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.9,
                      }
                }
                aria-label={
                  menuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white
                  outline-none
                  transition-colors
                  duration-300
                  hover:bg-white/[0.09]
                  focus-visible:ring-2
                  focus-visible:ring-cyan-400/60

                  sm:h-10
                  sm:w-10

                  lg:hidden
                "
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              rotate: -90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: 90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.22,
                      }}
                    >
                      <X size={19} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              rotate: 90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: -90,
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.22,
                      }}
                    >
                      <Menu size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* =====================================================
          MOBILE FULLSCREEN MENU
      ====================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="
              fixed
              inset-0
              z-[90]
              lg:hidden
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
            }}
          >
            {/* =================================================
                BACKDROP
            ================================================== */}

            <motion.div
              className="
                absolute
                inset-0
                bg-black/70
                backdrop-blur-2xl
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
              }}
              onClick={closeMenu}
            />

            {/* =================================================
                GLASS PANEL
            ================================================== */}

            <motion.div
              className="
                absolute
                inset-2
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.10]
                bg-[#07070c]/90
                shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                backdrop-blur-3xl

                sm:inset-3
                sm:rounded-[28px]
              "
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
                      scale: 0.97,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 24,
                      scale: 0.97,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* =================================================
                  DECORATIVE GLOW 01
              ================================================== */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-violet-600/15
                  blur-[90px]
                "
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, -25, 0],
                        y: [0, 25, 0],
                        scale: [1, 1.12, 1],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* =================================================
                  DECORATIVE GLOW 02
              ================================================== */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  -bottom-28
                  -left-24
                  h-60
                  w-60
                  rounded-full
                  bg-cyan-500/10
                  blur-[90px]
                "
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                      }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* =================================================
                  PANEL CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  flex
                  h-full
                  min-h-0
                  flex-col
                  overflow-y-auto
                  px-5
                  pb-5
                  pt-5

                  sm:px-8
                  sm:pb-8
                  sm:pt-6
                "
              >
                {/* =================================================
                    MOBILE MENU TOP
                ================================================== */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      font-[var(--font-space)]
                      text-xl
                      font-bold
                      leading-none
                      tracking-[-0.07em]
                      text-white

                      sm:text-2xl
                    "
                  >
                    MH
                    <span className="text-cyan-400">
                      .
                    </span>
                  </span>

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-white/30

                      sm:text-[10px]
                    "
                  >
                    Navigation
                  </span>
                </div>

                {/* =================================================
                    MOBILE NAVIGATION LINKS
                ================================================== */}

                <nav
                  className="
                    mt-8
                    flex
                    flex-col

                    sm:mt-12
                  "
                  aria-label="Mobile navigation"
                >
                  {navItems.map(
                    (item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -25,
                                filter:
                                  "blur(8px)",
                              }
                        }
                        animate={{
                          opacity: 1,
                          x: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: reduceMotion
                            ? 0
                            : 0.6,
                          delay: reduceMotion
                            ? 0
                            : 0.12 +
                              index * 0.075,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="
                          group
                          flex
                          min-h-[58px]
                          items-center
                          gap-3
                          border-b
                          border-white/[0.08]
                          py-3
                          outline-none

                          sm:min-h-[70px]
                        "
                      >
                        {/* Number */}

                        <span
                          className="
                            w-7
                            shrink-0
                            text-[10px]
                            font-medium
                            tracking-[0.08em]
                            text-white/25

                            sm:w-9
                            sm:text-[11px]
                          "
                        >
                          0{index + 1}
                        </span>

                        {/* Label */}

                        <span
                          className="
                            font-[var(--font-space)]
                            text-[27px]
                            font-medium
                            leading-none
                            tracking-[-0.045em]
                            text-white/75
                            transition-colors
                            duration-300
                            group-hover:text-white
                            group-focus-visible:text-white

                            sm:text-[38px]
                          "
                        >
                          {item.label}
                        </span>

                        {/* Arrow */}

                        <motion.span
                          className="
                            ml-auto
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            text-white/30
                            transition-colors
                            duration-300
                            group-hover:border-cyan-400/30
                            group-hover:text-cyan-400
                          "
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  x: 3,
                                  y: -3,
                                }
                          }
                        >
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.7}
                          />
                        </motion.span>
                      </motion.a>
                    )
                  )}
                </nav>

                {/* =================================================
                    MOBILE HIRE ME CTA
                ================================================== */}

                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 22,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: reduceMotion
                      ? 0
                      : 0.55,
                    duration: reduceMotion
                      ? 0
                      : 0.55,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    mt-auto
                    shrink-0
                    pt-8

                    sm:pt-10
                  "
                >
                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.015,
                          }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                    className="
                      flex
                      min-h-[54px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-violet-500
                      px-6
                      text-sm
                      font-semibold
                      text-black
                      outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-300

                      sm:min-h-[58px]
                      sm:text-base
                    "
                  >
                    <span>
                      Hire Me
                    </span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                    />
                  </motion.a>

                  {/* Status */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      text-white/25

                      sm:text-[10px]
                    "
                  >
                    <span>
                      Available for projects
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-emerald-400
                          shadow-[0_0_10px_rgba(52,211,153,0.7)]
                        "
                      />

                      Online
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
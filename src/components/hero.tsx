 "use client";

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Play,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "#",
    icon: Facebook,
  },
  {
    name: "Dribbble",
    href: "#",
    text: "Dr",
  },
  {
    name: "Behance",
    href: "#",
    text: "Bē",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="
        relative
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-[#050507]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Emerald ambient glow */}

        <motion.div
          className="
            absolute
            left-[25%]
            top-[18%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-emerald-500/[0.07]
            blur-[130px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 35, -20, 0],
                  y: [0, -25, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Violet glow */}

        <motion.div
          className="
            absolute
            right-[4%]
            top-[8%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-violet-600/[0.07]
            blur-[140px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -30, 20, 0],
                  y: [0, 25, -20, 0],
                  scale: [1, 0.92, 1.08, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cyan glow */}

        <motion.div
          className="
            absolute
            bottom-[-180px]
            left-[45%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-500/[0.06]
            blur-[140px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:80px_80px]
            [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]
          "
        />

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.48)_100%)]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1440px]
          flex-col
          px-5
          pb-10
          pt-[125px]

          sm:px-8
          sm:pt-[140px]

          lg:px-12
          lg:pb-12
          lg:pt-[145px]

          xl:px-16
        "
      >
        {/* ===================================================
            MAIN 60 / 40 GRID
        ==================================================== */}

        <div
          className="
            grid
            flex-1
            items-center
            gap-12

            lg:grid-cols-[3fr_2fr]
            lg:gap-8

            xl:gap-14
          "
        >
          {/* =================================================
              LEFT — 60%
          ================================================== */}

          <div className="relative z-20">
            {/* Eyebrow */}

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                      filter: "blur(6px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mb-5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-emerald-300/70
              "
            >
              Shopify Specialist · Developer · CRO
            </motion.p>

            {/* Main heading */}

            <motion.h1
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: reduceMotion ? 0 : 1,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-[850px]
                font-display
                text-[clamp(43px,6vw,86px)]
                font-semibold
                leading-[0.95]
                tracking-[-0.065em]
              "
            >
              I build

              <span
                className="
                  mx-2
                  bg-gradient-to-r
                  from-emerald-300
                  via-cyan-300
                  to-violet-400
                  bg-clip-text
                  text-transparent
                "
              >
                Shopify
              </span>

              stores

              <br />

              that look better,

              <br />

              <span className="text-white/35">
                convert better.
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-7
                max-w-[650px]
                text-[15px]
                leading-7
                text-white/45

                sm:text-[16px]
              "
            >
              I design and develop premium Shopify
              experiences focused on performance,
              user experience and conversion — from
              custom storefronts to advanced theme
              development and CRO.
            </motion.p>

            {/* =================================================
                CLIENT PROOF
            ================================================== */}

            <motion.a
              href="#testimonials"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: 0.62,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              className="
                group
                mt-8
                flex
                w-fit
                items-center
                gap-4
                outline-none
              "
            >
              <div
                className="
                  relative
                  h-[48px]
                  w-[175px]
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  group-hover:border-white/20
                  group-hover:bg-white/[0.06]
                "
              >
                <img
                  src="/images/client-proof.webp"
                  alt="Clients and brands"
                  className="
                    h-full
                    w-full
                    object-contain
                    opacity-75
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.13em]
                    text-white/25
                  "
                >
                  Trusted by
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-white/55
                  "
                >
                  Clients worldwide ↗
                </p>
              </div>
            </motion.a>

            {/* =================================================
                CTA
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.75,
              }}
              className="
                mt-7
                flex
                flex-wrap
                gap-2.5
              "
            >
              {/* Primary */}

              <motion.a
                href="#contact"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
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
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-[14px]
                  bg-white
                  px-4
                  text-[12px]
                  font-semibold
                  text-black
                  transition-colors
                  duration-300
                  hover:bg-emerald-300
                "
              >
                Let's Talk

                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                />
              </motion.a>

              {/* Secondary */}

              <motion.a
                href="#work"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
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
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-[14px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  text-[12px]
                  font-medium
                  text-white/75
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white
                "
              >
                <Play
                  size={12}
                  fill="currentColor"
                />

                View My Work
              </motion.a>
            </motion.div>

            {/* =================================================
                SOCIALS
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.88,
              }}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <span
                className="
                  mr-1
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/25
                "
              >
                Connect
              </span>

              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.04,
                          }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 0.94,
                          }
                    }
                    className="
                      flex
                      h-8
                      min-w-8
                      items-center
                      justify-center
                      rounded-[10px]
                      border
                      border-white/10
                      bg-white/[0.025]
                      px-2
                      text-[9px]
                      font-medium
                      text-white/40
                      transition-all
                      duration-300
                      hover:border-emerald-400/20
                      hover:bg-white/[0.07]
                      hover:text-white
                    "
                    aria-label={social.name}
                    title={social.name}
                  >
                    {Icon ? (
                      <Icon
                        size={14}
                        strokeWidth={1.6}
                      />
                    ) : (
                      social.text
                    )}
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* =================================================
              RIGHT — 40%
              EVERYTHING HERE IS ANIMATED
          ================================================== */}

          <div
            className="
              relative
              mx-auto
              flex
              min-h-[520px]
              w-full
              max-w-[500px]
              items-center
              justify-center

              sm:min-h-[570px]

              lg:min-h-[620px]
            "
          >
            {/* =================================================
                OUTER ROTATING ORBIT
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[300px]
                w-[300px]
                rounded-full
                border
                border-emerald-400/15

                sm:h-[390px]
                sm:w-[390px]

                lg:h-[470px]
                lg:w-[470px]
              "
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Orbit dot */}

              <motion.span
                className="
                  absolute
                  left-1/2
                  top-0
                  h-2
                  w-2
                  -translate-x-1/2
                  rounded-full
                  bg-emerald-300
                  shadow-[0_0_18px_rgba(110,231,183,.9)]
                "
              />
            </motion.div>

            {/* =================================================
                SECOND ORBIT
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[250px]
                w-[390px]
                rotate-[25deg]
                rounded-[50%]
                border
                border-cyan-400/15

                sm:h-[300px]
                sm:w-[470px]

                lg:h-[360px]
                lg:w-[570px]
              "
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [25, 385],
                    }
              }
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* =================================================
                THIRD ORBIT
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[220px]
                w-[350px]
                -rotate-[38deg]
                rounded-[50%]
                border
                border-violet-400/10

                sm:h-[270px]
                sm:w-[430px]

                lg:h-[320px]
                lg:w-[520px]
              "
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [-38, 322],
                    }
              }
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* =================================================
                CENTRAL ANIMATED GLOW
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[300px]
                w-[300px]
                rounded-full
                bg-gradient-to-br
                from-emerald-400/15
                via-cyan-400/10
                to-violet-500/15
                blur-[80px]

                sm:h-[360px]
                sm:w-[360px]

                lg:h-[430px]
                lg:w-[430px]
              "
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.12, 1],
                      opacity: [0.55, 0.9, 0.55],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                ANIMATED SHOPIFY BADGE
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.5,
                      y: -20,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-[4%]
                top-[4%]
                z-40
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -8, 0],
                        rotate: [0, 2, -2, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-[#95BF47]/20
                  bg-[#95BF47]/[0.07]
                  px-3
                  py-2.5
                  shadow-[0_20px_50px_rgba(0,0,0,.35)]
                  backdrop-blur-2xl
                "
              >
                {/* Shopify icon */}

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [0, 360],
                        }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#95BF47]/10
                    text-sm
                    font-black
                    text-[#a8d05c]
                    shadow-[0_0_25px_rgba(149,191,71,.12)]
                  "
                >
                  S
                </motion.div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      text-white
                    "
                  >
                    Shopify
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-white/35
                    "
                  >
                    Specialist
                  </p>
                </div>

                {/* tiny animated dot */}

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-2
                    w-2
                    rounded-full
                    bg-[#95BF47]
                    shadow-[0_0_12px_rgba(149,191,71,.9)]
                  "
                />
              </motion.div>
            </motion.div>

            {/* =================================================
                PERSONAL PHOTO
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.82,
                      y: 40,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                h-[460px]
                w-[315px]

                sm:h-[530px]
                sm:w-[370px]

                lg:h-[590px]
                lg:w-[400px]
              "
            >
              {/* Photo glow */}

              <motion.div
                className="
                  absolute
                  inset-x-[15%]
                  bottom-[5%]
                  top-[15%]
                  rounded-full
                  bg-gradient-to-b
                  from-emerald-400/15
                  via-cyan-400/10
                  to-violet-500/15
                  blur-[65px]
                "
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.55, 0.9, 0.55],
                        scale: [1, 1.06, 1],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating image */}

              <motion.img
                src="/images/profile.webp"
                alt="Mahamudul Hasan - Shopify Specialist"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -9, 0],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  object-contain
                  object-bottom
                  drop-shadow-[0_35px_70px_rgba(0,0,0,.7)]
                "
              />
            </motion.div>

            {/* =================================================
                GLASS CARD — 3+ YEARS
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 35,
                      y: -15,
                      scale: 0.85,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-[-1%]
                top-[15%]
                z-30
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                        rotate: [0, 0.8, 0],
                      }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.055]
                  px-5
                  py-4
                  shadow-[0_25px_70px_rgba(0,0,0,.4)]
                  backdrop-blur-2xl
                "
              >
                {/* animated glow */}

                <motion.div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-20
                    w-20
                    rounded-full
                    bg-emerald-400/10
                    blur-2xl
                  "
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 0.8, 0.4],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <div className="relative">
                  <p
                    className="
                      font-display
                      text-3xl
                      font-semibold
                      tracking-[-0.04em]
                    "
                  >
                    3+
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-white/40
                    "
                  >
                    Years Experience
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                GLASS CARD — 70+ PROJECTS
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -35,
                      y: 15,
                      scale: 0.85,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-[19%]
                left-[-2%]
                z-30
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 7, 0],
                        rotate: [0, -0.8, 0],
                      }
                }
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.055]
                  px-5
                  py-4
                  shadow-[0_25px_70px_rgba(0,0,0,.4)]
                  backdrop-blur-2xl
                "
              >
                <motion.div
                  className="
                    absolute
                    -bottom-8
                    -left-8
                    h-20
                    w-20
                    rounded-full
                    bg-cyan-400/10
                    blur-2xl
                  "
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.35, 1],
                          opacity: [0.4, 0.8, 0.4],
                        }
                  }
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                  }}
                />

                <div className="relative">
                  <p
                    className="
                      font-display
                      text-3xl
                      font-semibold
                      tracking-[-0.04em]
                    "
                  >
                    70+
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-white/40
                    "
                  >
                    Projects Completed
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                GLASS CARD — CRO
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 25,
                      y: 20,
                      scale: 0.8,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-[7%]
                right-[-1%]
                z-30
                hidden

                sm:block
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        x: [0, 3, 0],
                      }
                }
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.045]
                  px-4
                  py-3
                  shadow-[0_20px_55px_rgba(0,0,0,.35)]
                  backdrop-blur-2xl
                "
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: [
                              0,
                              -8,
                              8,
                              0,
                            ],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                    }}
                    className="
                      text-base
                    "
                  >
                    ⚡
                  </motion.span>

                  <div>
                    <p className="text-[10px] font-semibold">
                      CRO Focused
                    </p>

                    <p className="text-[9px] text-white/35">
                      Conversion First
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                GLASS CARD — PERFORMANCE
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -25,
                      y: -10,
                      scale: 0.8,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 1.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                left-[0%]
                top-[29%]
                z-30
                hidden

                xl:block
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 5, 0],
                        x: [0, -3, 0],
                      }
                }
                transition={{
                  duration: 5.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.045]
                  px-4
                  py-3
                  shadow-[0_20px_55px_rgba(0,0,0,.35)]
                  backdrop-blur-2xl
                "
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [
                              1,
                              1.12,
                              1,
                            ],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="
                      text-base
                    "
                  >
                    ◉
                  </motion.span>

                  <div>
                    <p className="text-[10px] font-semibold">
                      Performance First
                    </p>

                    <p className="text-[9px] text-white/35">
                      Fast & Scalable
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
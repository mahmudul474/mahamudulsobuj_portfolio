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

const entrance = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

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
        {/* Emerald Glow */}

        <motion.div
          className="
            absolute
            -left-[20%]
            top-[5%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-emerald-500/[0.075]
            blur-[150px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 160, 60, 0],
                  y: [0, 80, -50, 0],
                  scale: [1, 1.25, 0.92, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Violet Glow */}

        <motion.div
          className="
            absolute
            right-[-15%]
            top-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/[0.07]
            blur-[150px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -130, -40, 0],
                  y: [0, 90, -30, 0],
                  scale: [1, 0.9, 1.2, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cyan Glow */}

        <motion.div
          className="
            absolute
            bottom-[-220px]
            left-[25%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-cyan-500/[0.055]
            blur-[160px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 130, -80, 0],
                  y: [0, -80, -20, 0],
                  scale: [1, 1.15, 0.9, 1],
                }
          }
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Central Glow */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gradient-to-r
            from-emerald-500/[0.04]
            via-cyan-500/[0.035]
            to-violet-500/[0.04]
            blur-[100px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.18, 0.95, 1],
                  rotate: [0, 120, 240, 360],
                  opacity: [0.5, 0.9, 0.55, 0.5],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.028]
            [background-image:linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)]
            [background-size:70px_70px]
            [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_80%)]
          "
        />

        {/* Vignette */}

        <motion.div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_12%,rgba(0,0,0,.55)_100%)]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.7, 0.85, 0.7],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
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
          pt-[100px]

          sm:px-8
          sm:pt-[130px]

          lg:px-12
          lg:pb-12
          lg:pt-[110px]

          xl:px-16
        "
      >
        <div
          className="
            grid
            flex-1
            items-center
            gap-4

            sm:gap-4

            lg:grid-cols-[3fr_2fr]
            lg:gap-8

            xl:gap-12
          "
        >
          {/* =================================================
              LEFT COLUMN
          ================================================== */}

          <div className="relative z-20">
            {/* Eyebrow */}

            <motion.p
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.15,
              }}
              className="
                mb-4
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-emerald-300/70

                sm:text-[11px]
              "
            >
              Shopify Specialist · Developer · CRO
            </motion.p>

            {/* =================================================
                MAIN TITLE
            ================================================== */}

            <motion.h1
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-[700px]
                font-display
                text-[38px]
                font-semibold
                leading-[0.98]
                tracking-[-0.055em]

                min-[375px]:text-[41px]

                sm:text-[50px]

                md:text-[56px]

                lg:text-[60px]

                xl:text-[66px]
              "
            >
              I build{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-emerald-300
                  via-cyan-300
                  to-violet-400
                  bg-clip-text
                  text-transparent
                "
              >
                Shopify
              </span>{" "}
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
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.43,
              }}
              className="
                mt-6
                max-w-[620px]
                text-[14px]
                leading-6
                text-white/45

                sm:mt-7
                sm:text-[15px]
                sm:leading-7
              "
            >
              I design and develop premium Shopify experiences
              focused on performance, user experience and
              conversion — from custom storefronts to advanced
              theme development and CRO.
            </motion.p>

            {/* Client Proof */}

            <motion.a
              href="#testimonials"
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.57,
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
                mt-7
                flex
                w-fit
                max-w-full
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-[44px]
                  w-[150px]
                  shrink-0
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

                  sm:h-[48px]
                  sm:w-[175px]
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

              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-white/25

                    sm:text-[10px]
                  "
                >
                  Trusted by
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    font-medium
                    text-white/55

                    sm:text-xs
                  "
                >
                  Clients worldwide ↗
                </p>
              </div>
            </motion.a>

            {/* CTA */}

            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.7,
              }}
              className="
                mt-6
                flex
                flex-wrap
                gap-2.5
              "
            >
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
                  h-10
                  items-center
                  gap-2
                  rounded-[13px]
                  bg-white
                  px-4
                  text-[11px]
                  font-semibold
                  text-black
                  transition-colors
                  duration-300
                  hover:bg-emerald-300

                  sm:h-11
                  sm:text-[12px]
                "
              >
                Let's Talk
                <ArrowUpRight size={14} />
              </motion.a>

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
                  h-10
                  items-center
                  gap-2
                  rounded-[13px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  text-[11px]
                  font-medium
                  text-white/75
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white

                  sm:h-11
                  sm:text-[12px]
                "
              >
                <Play
                  size={11}
                  fill="currentColor"
                />
                View My Work
              </motion.a>
            </motion.div>

            {/* Social */}

            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: 0.82,
              }}
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-1.5
              "
            >
              <span
                className="
                  mr-1
                  text-[9px]
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
                            y: -3,
                            scale: 1.05,
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
                      rounded-[9px]
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
                    title={social.name}
                    aria-label={social.name}
                  >
                    {Icon ? (
                      <Icon
                        size={13}
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
              RIGHT COLUMN
          ================================================== */}

          <div
            className="
              relative
              mx-auto
              flex
              min-h-[510px]
              w-full
              max-w-[500px]
              items-start
              justify-center

              min-[375px]:min-h-[540px]

              sm:min-h-[580px]

              lg:min-h-[660px]

              xl:min-h-[710px]
            "
          >
            {/* ORBIT 1 */}

            <motion.div
              className="
                absolute
                h-[255px]
                w-[255px]
                rounded-full
                border
                border-emerald-400/15

                min-[375px]:h-[285px]
                min-[375px]:w-[285px]

                sm:h-[370px]
                sm:w-[370px]

                lg:h-[450px]
                lg:w-[450px]

                xl:h-[520px]
                xl:w-[520px]
              "
              style={{ y: 40 }}
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
              <motion.span
                className="
                  absolute
                  left-1/2
                  top-0
                  h-1.5
                  w-1.5
                  -translate-x-1/2
                  rounded-full
                  bg-emerald-300
                  shadow-[0_0_16px_rgba(110,231,183,.9)]
                "
              />
            </motion.div>

            {/* ORBIT 2 */}

            <motion.div
              className="
                absolute
                h-[205px]
                w-[300px]
                rotate-[25deg]
                rounded-[50%]
                border
                border-cyan-400/12

                min-[375px]:h-[225px]
                min-[375px]:w-[340px]

                sm:h-[290px]
                sm:w-[450px]

                lg:h-[350px]
                lg:w-[540px]

                xl:h-[390px]
                xl:w-[590px]
              "
              style={{ y: 40 }}
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

            {/* ORBIT 3 */}

            <motion.div
              className="
                absolute
                h-[180px]
                w-[270px]
                -rotate-[38deg]
                rounded-[50%]
                border
                border-violet-400/10

                min-[375px]:h-[200px]
                min-[375px]:w-[300px]

                sm:h-[250px]
                sm:w-[390px]

                lg:h-[310px]
                lg:w-[500px]

                xl:h-[340px]
                xl:w-[550px]
              "
              style={{ y: 40 }}
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

            {/* CENTRAL GLOW */}

            <motion.div
              className="
                absolute
                h-[220px]
                w-[220px]
                rounded-full
                bg-gradient-to-br
                from-emerald-400/15
                via-cyan-400/10
                to-violet-500/15
                blur-[65px]

                sm:h-[330px]
                sm:w-[330px]

                lg:h-[410px]
                lg:w-[410px]

                xl:h-[470px]
                xl:w-[470px]
              "
              style={{ y: 40 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.12, 0.96, 1],
                      opacity: [0.45, 0.85, 0.5, 0.45],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* SHOPIFY BADGE — DESKTOP ONLY */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 0.5,
              }}
              className="
                absolute
                right-[2%]
                top-[4%]
                z-40
                hidden

                sm:block
                sm:right-[3%]
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                        rotate: [0, 2, -2, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  items-center
                  gap-2
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
                <span className="text-xs font-semibold text-[#95BF47]">
                  Shopify
                </span>

                <span className="text-[10px] text-white/40">
                  Expert
                </span>
              </motion.div>
            </motion.div>

            {/* =================================================
                MAHAMUDUL IMAGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                h-[420px]
                w-[290px]

                min-[375px]:h-[450px]
                min-[375px]:w-[310px]

                sm:h-[540px]
                sm:w-[380px]

                md:h-[590px]
                md:w-[420px]

                lg:h-[660px]
                lg:w-[470px]

                xl:h-[710px]
                xl:w-[500px]
              "
            >
              {/* Image Glow */}

              <motion.div
                className="
                  absolute
                  left-1/2
                  top-[18%]
                  h-[65%]
                  w-[72%]
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-b
                  from-emerald-400/18
                  via-cyan-400/10
                  to-violet-500/12
                  blur-[70px]
                "
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.4, 0.75, 0.4],
                        scale: [1, 1.06, 1],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* MAHAMUDUL HERO IMAGE */}

              <motion.img
                src="/images/mahamudulhero.png"
                alt="Mahamudul Hasan - Shopify Specialist"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  -top-[110px]
                  z-10
                  h-full
                  w-full
                  object-contain
                  object-bottom
                  drop-shadow-[0_35px_75px_rgba(0,0,0,.72)]

                  sm:-top-[125px]
                  sm:drop-shadow-[0_40px_90px_rgba(0,0,0,.78)]
                "
              />

              {/* Bottom Shadow */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  bottom-[1%]
                  left-1/2
                  z-20
                  h-[95px]
                  w-[92%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-black/70
                  blur-[28px]

                  sm:h-[105px]
                  sm:w-[94%]

                  md:h-[115px]

                  lg:h-[125px]
                "
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.55, 0.75, 0.55],
                        scaleX: [0.94, 1, 0.94],
                      }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floor Light */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[2%]
                  left-1/2
                  z-[5]
                  h-[45px]
                  w-[78%]
                  -translate-x-1/2
                  rounded-full
                  bg-white/[0.035]
                  blur-[22px]

                  lg:h-[55px]
                "
              />
            </motion.div>

            {/* =================================================
                CARD 1 — EXPERIENCE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 0.75,
              }}
              className="
                absolute
                right-[2%]
                top-[10%]
                z-30

                min-[375px]:right-[3%]
                min-[375px]:top-[11%]

                sm:right-[1%]
                sm:top-[16%]
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                        rotate: [0, 0.7, 0],
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
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.055]
                  px-3
                  py-2.5
                  shadow-[0_20px_60px_rgba(0,0,0,.4)]
                  backdrop-blur-2xl

                  min-[375px]:px-3.5

                  sm:rounded-2xl
                  sm:px-5
                  sm:py-4
                "
              >
                <p className="font-display text-2xl font-semibold sm:text-3xl">
                  3+
                </p>

                <p className="mt-0.5 max-w-[90px] text-[8px] leading-4 text-white/40 sm:max-w-none sm:text-[10px]">
                  Years Experience
                </p>
              </motion.div>
            </motion.div>

            {/* =================================================
                CARD 2 — PROJECTS
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 0.9,
              }}
              className="
                absolute
                left-[2%]
                bottom-[14%]
                z-30

                min-[375px]:left-[3%]
                min-[375px]:bottom-[14%]

                sm:left-[0%]
                sm:bottom-[17%]
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 7, 0],
                        rotate: [0, -0.7, 0],
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
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.055]
                  px-3
                  py-2.5
                  shadow-[0_20px_60px_rgba(0,0,0,.4)]
                  backdrop-blur-2xl

                  min-[375px]:px-3.5

                  sm:rounded-2xl
                  sm:px-5
                  sm:py-4
                "
              >
                <p className="font-display text-2xl font-semibold sm:text-3xl">
                  70+
                </p>

                <p className="mt-0.5 max-w-[100px] text-[8px] leading-4 text-white/40 sm:max-w-none sm:text-[10px]">
                  Projects Completed
                </p>
              </motion.div>
            </motion.div>

            {/* =================================================
                CARD 3 — CRO
                MOBILE MOVED UP
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: 18,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 1.05,
              }}
              className="
                absolute
                right-[2%]
                bottom-[18%]
                z-30

                min-[375px]:right-[3%]
                min-[375px]:bottom-[17%]

                sm:right-[0%]
                sm:bottom-[5%]
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
                  px-2.5
                  py-2
                  shadow-[0_18px_50px_rgba(0,0,0,.35)]
                  backdrop-blur-2xl

                  min-[375px]:px-3

                  sm:px-4
                  sm:py-3
                "
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: [0, -8, 8, 0],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                    }}
                    className="text-sm sm:text-base"
                  >
                    ⚡
                  </motion.span>

                  <div>
                    <p className="text-[8px] font-semibold sm:text-[10px]">
                      CRO Focused
                    </p>

                    <p className="text-[7px] text-white/35 sm:text-[9px]">
                      Conversion First
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                CARD 4 — PERFORMANCE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -18,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 1.18,
              }}
              className="
                absolute
                left-[2%]
                top-[23%]
                z-30

                min-[375px]:left-[3%]
                min-[375px]:top-[24%]

                sm:left-[0%]
                sm:top-[29%]
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
                  px-2.5
                  py-2
                  shadow-[0_18px_50px_rgba(0,0,0,.35)]
                  backdrop-blur-2xl

                  min-[375px]:px-3

                  sm:px-4
                  sm:py-3
                "
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.12, 1],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="text-sm sm:text-base"
                  >
                    ◉
                  </motion.span>

                  <div>
                    <p className="whitespace-nowrap text-[8px] font-semibold sm:text-[10px]">
                      Performance First
                    </p>

                    <p className="text-[7px] text-white/35 sm:text-[9px]">
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
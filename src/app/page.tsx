import { db } from "@/lib/prisma";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Cursor } from "@/components/cursor";
import Hero from "@/components/hero";
import { Reveal, Magnetic } from "@/components/motion";
import Link from "next/link";
import ProjectsSection from "@/components/projects/ProjectsSection";

export default async function Home() {
  const [s, w, t] = await Promise.all([
    db.service.findMany({
      where: {
        published: true,
        featured: true,
      },
      take: 3,
    }),

    db.portfolio.findMany({
      where: {
        published: true,
        featured: true,
      },
      take: 3,
    }),

    db.testimonial.findMany({
      where: {
        featured: true,
      },
      take: 3,
    }),
  ]);

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header />

      {/* =====================================================
          CUSTOM CURSOR
      ====================================================== */}

      <Cursor />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}

        <Hero />

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section
          id="services"
          className="
            mx-auto
            max-w-7xl
            px-5
            py-24
            sm:px-8
            lg:px-12
          "
        >
          <Reveal>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[var(--primary)]
              "
            >
              Capabilities
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="
                mt-3
                font-display
                text-4xl
                font-bold
                tracking-tight
                md:text-5xl
              "
            >
              Shopify solutions
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              className="
                mt-4
                max-w-2xl
                text-zinc-400
              "
            >
              From custom Shopify stores and theme
              development to CRO, performance
              optimization and advanced Shopify
              solutions.
            </p>
          </Reveal>

          <div
            className="
              mt-10
              grid
              gap-4
              md:grid-cols-3
            "
          >
            {s.map((x, i) => (
              <Reveal
                key={x.id}
                delay={i * 0.08}
              >
                <Link
                  href={`/services/${x.slug}`}
                  className="
                    group
                    block
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-7
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-emerald-400/20
                    hover:bg-white/[0.055]
                  "
                >
                  <span className="text-xs text-zinc-500">
                    0{i + 1}
                  </span>

                  <h3
                    className="
                      mt-12
                      font-display
                      text-2xl
                      font-semibold
                      transition-colors
                      duration-300
                      group-hover:text-emerald-300
                    "
                  >
                    {x.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-zinc-400
                    "
                  >
                    {x.excerpt}
                  </p>

                  <span
                    className="
                      mt-7
                      inline-flex
                      text-xs
                      font-medium
                      text-white/40
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                  >
                    Explore service ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =====================================================
            SELECTED WORK
        ====================================================== */}

        <ProjectsSection />
        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}

        <section
          id="testimonials"
          className="
            mx-auto
            max-w-7xl
            px-5
            py-24
            sm:px-8
            lg:px-12
          "
        >
          <Reveal>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[var(--primary)]
              "
            >
              Client testimonials
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="
                mt-3
                font-display
                text-4xl
                font-bold
                tracking-tight
                md:text-5xl
              "
            >
              What clients say
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              className="
                mt-4
                max-w-2xl
                text-zinc-400
              "
            >
              Real feedback from clients I have
              worked with on Shopify projects.
            </p>
          </Reveal>

          <div
            className="
              mt-10
              grid
              gap-5
              md:grid-cols-3
            "
          >
            {t.map((x, i) => (
              <Reveal
                key={x.id}
                delay={i * 0.08}
              >
                <div
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-7
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/[0.04]
                  "
                >
                  {/* Rating */}

                  <div
                    className="
                      text-[var(--primary)]
                    "
                  >
                    ★★★★★
                  </div>

                  {/* Quote */}

                  <p
                    className="
                      mt-5
                      leading-7
                      text-zinc-300
                    "
                  >
                    “{x.quote}”
                  </p>

                  {/* Client */}

                  <div className="mt-7">
                    <p className="font-semibold">
                      {x.name}
                    </p>

                    <p
                      className="
                        text-sm
                        text-zinc-500
                      "
                    >
                      {x.role}

                      {x.company
                        ? ` · ${x.company}`
                        : ""}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =====================================================
            CONTACT / CTA
        ====================================================== */}

        <section
          id="contact"
          className="
            px-5
            pb-24
            sm:px-8
            lg:px-12
          "
        >
          <div
            className="
              relative
              mx-auto
              max-w-7xl
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.025]
              p-10
              md:p-16
            "
          >
            {/* Background Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-80
                w-80
                rounded-full
                bg-emerald-400/10
                blur-[100px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-40
                left-1/3
                h-80
                w-80
                rounded-full
                bg-violet-500/10
                blur-[120px]
              "
            />

            <div className="relative z-10">
              <Reveal>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-[var(--primary)]
                  "
                >
                  Let&apos;s work together
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h2
                  className="
                    mt-4
                    max-w-3xl
                    font-display
                    text-5xl
                    font-bold
                    tracking-[-0.04em]
                    md:text-7xl
                  "
                >
                  Have a Shopify
                  <br />
                  project in mind?
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  className="
                    mt-5
                    max-w-2xl
                    leading-7
                    text-zinc-400
                  "
                >
                  Let&apos;s discuss your idea and
                  turn it into a fast, premium and
                  conversion-focused Shopify
                  experience.
                </p>
              </Reveal>

              <div className="mt-8">
                <Magnetic>
                  <Link
                    href="/appointment"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[var(--primary)]
                      px-7
                      py-3
                      font-semibold
                      text-black
                      transition-transform
                      duration-300
                      hover:scale-[1.02]
                    "
                  >
                    <span>
                      Book a consultation
                    </span>

                    <ArrowUpRight
                      size={17}
                    />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
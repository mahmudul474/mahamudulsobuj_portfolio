 "use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Play,
  Pause,
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

type Service = {
  id?: string | number;
  slug?: string;
  title?: string;
  shortTitle?: string;
  description?: string;
  icon?: string;

  media?: {
    type?: "video" | "image";
    videoUrl?: string;
    thumbnail?: string;
  };

  meta?: {
    delivery?: string;
    type?: string;
    platform?: string;
  };

  timeline?: string;
  startingPrice?: string;

  tags?: string[];

  booking?: {
    available?: boolean;
    buttonText?: string;
  };
};

const serviceList = services as Service[];

/* ============================================================
   VIDEO HELPERS
============================================================ */

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes("youtube.com")
    ) {
      const videoId =
        parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }

      if (
        parsed.pathname.startsWith(
          "/shorts/",
        )
      ) {
        const id =
          parsed.pathname.split(
            "/shorts/",
          )[1];

        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
    }

    if (
      parsed.hostname ===
        "youtu.be" ||
      parsed.hostname ===
        "www.youtu.be"
    ) {
      const id =
        parsed.pathname.replace(
          "/",
          "",
        );

      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }

    return null;
  } catch {
    return null;
  }
}

function getVimeoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes(
        "vimeo.com",
      )
    ) {
      const id =
        parsed.pathname
          .split("/")
          .filter(Boolean)
          .pop();

      if (id) {
        return `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(
    url,
  );
}

/* ============================================================
   VIDEO MEDIA
============================================================ */

function ServiceVideo({
  service,
}: {
  service: Service;
}) {
  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const [playing, setPlaying] =
    useState(false);

  const [error, setError] =
    useState(false);

  const videoUrl =
    service.media?.videoUrl || "";

  const thumbnail =
    service.media?.thumbnail || "";

  const youtubeUrl =
    videoUrl
      ? getYoutubeEmbedUrl(videoUrl)
      : null;

  const vimeoUrl =
    videoUrl
      ? getVimeoEmbedUrl(videoUrl)
      : null;

  const direct =
    videoUrl
      ? isDirectVideo(videoUrl)
      : false;

  const playDirectVideo = async () => {
    if (!videoRef.current) return;

    try {
      if (
        videoRef.current.paused
      ) {
        await videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    } catch {
      setError(true);
    }
  };

  /* ==========================================================
     YOUTUBE / VIMEO
  ========================================================== */

  if (youtubeUrl || vimeoUrl) {
    const embedUrl =
      youtubeUrl || vimeoUrl;

    return (
      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-[14px]
          bg-black
          sm:rounded-[16px]
        "
      >
        {!playing && thumbnail && (
          <button
            type="button"
            onClick={() =>
              setPlaying(true)
            }
            className="
              absolute
              inset-0
              z-20
              h-full
              w-full
              cursor-pointer
              bg-black
            "
            aria-label="Play video"
          >
            <img
              src={thumbnail}
              alt=""
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/25
              "
            />

            <span
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-14
                w-14
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-[#B7FF00]
                text-black
                shadow-[0_0_40px_rgba(183,255,0,.18)]
                transition-transform
                duration-500
                hover:scale-110
                sm:h-16
                sm:w-16
              "
            >
              <Play
                size={19}
                fill="currentColor"
                strokeWidth={1}
                className="ml-0.5"
              />
            </span>
          </button>
        )}

        {playing && embedUrl && (
          <>
            <iframe
              src={embedUrl}
              title={
                service.title ||
                "Service video"
              }
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
                picture-in-picture;
              "
              allowFullScreen
            />

            <button
              type="button"
              onClick={() =>
                setPlaying(false)
              }
              className="
                absolute
                bottom-3
                right-3
                z-30
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/60
                text-white
                backdrop-blur-md
              "
              aria-label="Pause video"
            >
              <Pause
                size={14}
                strokeWidth={1.2}
              />
            </button>
          </>
        )}
      </div>
    );
  }

  /* ==========================================================
     DIRECT MP4 / WEBM
  ========================================================== */

  if (direct) {
    return (
      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-[14px]
          bg-black
          sm:rounded-[16px]
        "
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          playsInline
          preload="metadata"
          onPlay={() =>
            setPlaying(true)
          }
          onPause={() =>
            setPlaying(false)
          }
          onEnded={() =>
            setPlaying(false)
          }
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-black/10
          "
        />

        <button
          type="button"
          onClick={playDirectVideo}
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            flex
            h-14
            w-14
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-[#B7FF00]
            text-black
            shadow-[0_0_40px_rgba(183,255,0,.18)]
            transition-all
            duration-500
            hover:scale-110
            sm:h-16
            sm:w-16
          "
          aria-label={
            playing
              ? "Pause video"
              : "Play video"
          }
        >
          {playing ? (
            <Pause
              size={18}
              strokeWidth={1.2}
            />
          ) : (
            <Play
              size={19}
              fill="currentColor"
              strokeWidth={1}
              className="ml-0.5"
            />
          )}
        </button>

        {error && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/80
              px-6
              text-center
              text-xs
              text-white/70
            "
          >
            Video could not be loaded.
          </div>
        )}
      </div>
    );
  }

  /* ==========================================================
     NO VIDEO
  ========================================================== */

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[14px]
        bg-[#0D110B]
        sm:rounded-[16px]
      "
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          className="
            h-full
            w-full
            object-cover
            opacity-75
          "
        />
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-[radial-gradient(circle_at_center,rgba(183,255,0,.1),transparent_55%)]
          "
        >
          <Sparkles
            size={32}
            strokeWidth={1}
            className="text-[#B7FF00]/60"
          />
        </div>
      )}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/60
          to-transparent
        "
      />
    </div>
  );
}

/* ============================================================
   MAIN SECTION
============================================================ */

export default function ServicesSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  const stackRef =
    useRef<HTMLDivElement | null>(
      null,
    );

const cardsRef = useRef<(HTMLElement | null)[]>([]);

  const activeIndexRef =
    useRef(0);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const total = serviceList.length;

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stack =
      stackRef.current;

    if (
      !section ||
      !stack ||
      total === 0
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm =
        gsap.matchMedia();

      /* ========================================================
         DESKTOP ONLY
      ======================================================== */

      mm.add(
        "(min-width: 768px)",
        () => {
          const scrollPerCard =
            150;

          const totalScrollHeight =
            Math.max(
              total * scrollPerCard,
              700,
            );

          /* ====================================================
             SECTION TITLE ANIMATIONS - Slow + More Delay
          ==================================================== */

          gsap.set(
            ".services-eyebrow",
            {
              opacity: 0,
              y: 100,
              scale: 0.85,
            },
          );

          gsap.set(
            ".services-heading-line",
            {
              opacity: 0,
              y: 120,
              scale: 0.88,
            },
          );

          gsap.set(
            ".services-description",
            {
              opacity: 0,
              y: 90,
              scale: 0.90,
            },
          );

          gsap.set(
            ".services-bottom-text",
            {
              opacity: 0,
              y: 70,
              scale: 0.92,
            },
          );

          gsap.set(
            ".services-bottom-button",
            {
              opacity: 0,
              y: 80,
              scale: 0.88,
            },
          );

          const headerTl =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: "top 95%",

                end: "top 35%",

                scrub: 3.0,

                invalidateOnRefresh:
                  true,
              },
            });

          headerTl
            .to(
              ".services-eyebrow",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
              },
            )
            .to(
              ".services-heading-line",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.8,
                stagger: 0.2,
                ease: "power4.out",
              },
              "-=0.4",
            )
            .to(
              ".services-description",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
              },
              "-=0.3",
            )
            .to(
              ".services-bottom-text",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
                ease: "power4.out",
              },
              "-=0.2",
            )
            .to(
              ".services-bottom-button",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
                ease: "power4.out",
              },
              "-=0.15",
            );

          /* ====================================================
             CARD STACK ANIMATIONS - Slow + More Delay
          ==================================================== */

          /* Card Initial State */

          cardsRef.current.forEach(
            (
              card,
              index,
            ) => {
              if (!card) return;

              const content =
                card.querySelectorAll(
                  ".services-card-content",
                );

              const title =
                card.querySelector(
                  ".card-title",
                );
              const description =
                card.querySelector(
                  ".card-description",
                );
              const tags =
                card.querySelector(
                  ".card-tags",
                );
              const meta =
                card.querySelector(
                  ".card-meta",
                );
              const button =
                card.querySelector(
                  ".card-button",
                );

              gsap.set(card, {
                y:
                  index === 0
                    ? 0
                    : window.innerHeight *
                      1.4,

                scale:
                  index === 0
                    ? 1
                    : 0.90,

                opacity: 1,

                zIndex:
                  100 + index,

                transformOrigin:
                  "center center",

                force3D: true,
              });

              /* Individual elements with delays */
              if (title) {
                gsap.set(title, {
                  opacity: index === 0 ? 1 : 0,
                  y: index === 0 ? 0 : 70,
                  scale: index === 0 ? 1 : 0.92,
                });
              }

              if (description) {
                gsap.set(description, {
                  opacity: index === 0 ? 1 : 0,
                  y: index === 0 ? 0 : 60,
                  scale: index === 0 ? 1 : 0.92,
                });
              }

              if (tags) {
                gsap.set(tags, {
                  opacity: index === 0 ? 1 : 0,
                  y: index === 0 ? 0 : 50,
                });
              }

              if (meta) {
                gsap.set(meta, {
                  opacity: index === 0 ? 1 : 0,
                  y: index === 0 ? 0 : 50,
                });
              }

              if (button) {
                gsap.set(button, {
                  opacity: index === 0 ? 1 : 0,
                  y: index === 0 ? 0 : 45,
                  scale: index === 0 ? 1 : 0.94,
                });
              }
            },
          );

          /* PINNED CARD TIMELINE - Slower */

          const cardTl =
            gsap.timeline({
              scrollTrigger: {
                trigger: stack,

                start: "top top",

                end:
                  `+=${totalScrollHeight}vh`,

                scrub: 3.0,

                pin: true,

                pinSpacing: true,

                anticipatePin: 2,

                fastScrollEnd: false,

                invalidateOnRefresh:
                  true,

                onUpdate: (
                  self,
                ) => {
                  const index =
                    Math.min(
                      total - 1,
                      Math.floor(
                        self.progress *
                          total,
                      ),
                    );

                  if (
                    index !==
                    activeIndexRef.current
                  ) {
                    activeIndexRef.current =
                      index;

                    setActiveIndex(
                      index,
                    );
                  }
                },
              },
            });

          /* CARD STACK - Per Scroll Smooth Slide */

          for (
            let index = 1;
            index < total;
            index++
          ) {
            const currentCard =
              cardsRef.current[
                index
              ];

            const previousCard =
              cardsRef.current[
                index - 1
              ];

            if (!currentCard)
              continue;

            const title =
              currentCard.querySelector(
                ".card-title",
              );
            const description =
              currentCard.querySelector(
                ".card-description",
              );
            const tags =
              currentCard.querySelector(
                ".card-tags",
              );
            const meta =
              currentCard.querySelector(
                ".card-meta",
              );
            const button =
              currentCard.querySelector(
                ".card-button",
              );

            const label =
              `card-${index}`;

            gsap.set(
              currentCard,
              {
                y:
                  window.innerHeight *
                  1.4,

                scale: 0.90,

                opacity: 1,

                zIndex:
                  100 + index,

                force3D: true,
              },
            );

            if (title) {
              gsap.set(title, {
                opacity: 0,
                y: 70,
                scale: 0.92,
              });
            }

            if (description) {
              gsap.set(description, {
                opacity: 0,
                y: 60,
                scale: 0.92,
              });
            }

            if (tags) {
              gsap.set(tags, {
                opacity: 0,
                y: 50,
              });
            }

            if (meta) {
              gsap.set(meta, {
                opacity: 0,
                y: 50,
              });
            }

            if (button) {
              gsap.set(button, {
                opacity: 0,
                y: 45,
                scale: 0.94,
              });
            }

            cardTl.addLabel(
              label,
            );

            /* Previous Card - Smooth */
            if (previousCard) {
              cardTl.to(
                previousCard,
                {
                  y: -40,
                  scale: 0.93,

                  duration: 2.5,

                  ease: "power2.inOut",

                  force3D: true,
                },
                label,
              );
            }

            /* Older Cards - Depth */
            for (
              let depth = 0;
              depth < index - 1;
              depth++
            ) {
              const oldCard =
                cardsRef.current[
                  depth
                ];

              if (!oldCard)
                continue;

              const distance =
                index - depth;

              cardTl.to(
                oldCard,
                {
                  y:
                    -Math.min(
                      distance * 15,
                      60,
                    ),

                  scale:
                    Math.max(
                      1 -
                        distance *
                          0.025,
                      0.88,
                    ),

                  duration: 2.5,

                  ease: "power2.inOut",
                },
                label,
              );
            }

            /* Current Card - Smooth Slide In */
            cardTl.to(
              currentCard,
              {
                y: 0,

                scale: 1,

                duration: 2.5,

                ease: "power4.inOut",

                force3D: true,
              },
              label,
            );

            /* Title - Slow + More Delay */
            if (title) {
              cardTl.to(
                title,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.3,
                  ease: "power4.out",
                },
                `${label}+=0.8`,
              );
            }

            /* Description - Slow + More Delay */
            if (description) {
              cardTl.to(
                description,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.3,
                  ease: "power4.out",
                },
                `${label}+=1.2`,
              );
            }

            /* Tags - Slow + More Delay */
            if (tags) {
              cardTl.to(
                tags,
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.1,
                  ease: "power4.out",
                },
                `${label}+=1.6`,
              );
            }

            /* Meta - Slow + More Delay */
            if (meta) {
              cardTl.to(
                meta,
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.1,
                  ease: "power4.out",
                },
                `${label}+=1.9`,
              );
            }

            /* Button - Slow + More Delay */
            if (button) {
              cardTl.to(
                button,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.1,
                  ease: "power4.out",
                },
                `${label}+=2.2`,
              );
            }

            cardTl.to(
              {},
              {
                duration: 0.8,
              },
            );
          }

          cardTl.to(
            {},
            {
              duration: 1.5,
            },
          );

          /* ====================================================
             BACKGROUND ANIMATIONS
          ==================================================== */

          gsap.to(
            ".services-glow-one",
            {
              x: 70,
              y: -30,
              scale: 1.08,

              duration: 8,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          gsap.to(
            ".services-glow-two",
            {
              x: -60,
              y: 30,
              scale: 1.08,

              duration: 10,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          gsap.to(
            ".services-card-glow",
            {
              x: 40,
              y: -20,
              scale: 1.08,

              duration: 7,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();
            },
          );
        },
      );

      /* ========================================================
         MOBILE - Slow + More Delay
      ======================================================== */

      mm.add(
        "(max-width: 767px)",
        () => {
          /* ====================================================
             MOBILE SECTION TITLE ANIMATIONS
          ==================================================== */

          gsap.set(
            ".services-eyebrow",
            {
              opacity: 0,
              y: 80,
              scale: 0.88,
            },
          );

          gsap.set(
            ".services-heading-line",
            {
              opacity: 0,
              y: 90,
              scale: 0.90,
            },
          );

          gsap.set(
            ".services-description",
            {
              opacity: 0,
              y: 70,
              scale: 0.92,
            },
          );

          const mobileHeader =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: "top 95%",

                end: "top 45%",

                scrub: 2.5,
              },
            });

          mobileHeader
            .to(
              ".services-eyebrow",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
                ease: "power4.out",
              },
            )
            .to(
              ".services-heading-line",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out",
              },
              "-=0.3",
            )
            .to(
              ".services-description",
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
                ease: "power4.out",
              },
              "-=0.25",
            );

          /* ====================================================
             MOBILE CARDS - Slow + More Delay
          ==================================================== */

          const mobileCards =
            document.querySelectorAll(
              ".services-mobile-card",
            );

          mobileCards.forEach(
            (card, index) => {
              /* Card Container - Slower Animation */
              gsap.fromTo(
                card,
                {
                  opacity: 0,
                  y: 120,
                  scale: 0.88,
                  rotationX: 12,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationX: 0,
                  duration: 1.8,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    end: "top 20%",
                    scrub: 2.5,
                    toggleActions:
                      "play none none reverse",
                  },
                },
              );

              /* Individual Elements - Slower + More Delays */
              const items =
                card.querySelectorAll(
                  ".mobile-animate-item",
                );

              items.forEach(
                (item, itemIndex) => {
                  const delay =
                    itemIndex * 0.2;

                  gsap.fromTo(
                    item,
                    {
                      opacity: 0,
                      y: 50,
                      scale: 0.94,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 1.1,
                      delay: delay,
                      ease: "power4.out",
                      scrollTrigger: {
                        trigger: item,
                        start: "top 96%",
                        end: "top 30%",
                        scrub: 1.8,
                        toggleActions:
                          "play none none reverse",
                      },
                    },
                  );
                },
              );
            },
          );

          /* ====================================================
             MOBILE BACKGROUND
          ==================================================== */

          gsap.to(
            ".services-glow-one",
            {
              x: 20,
              y: -10,
              scale: 1.06,

              duration: 8,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );

          gsap.to(
            ".services-glow-two",
            {
              x: -20,
              y: 15,
              scale: 1.06,

              duration: 10,

              repeat: -1,

              yoyo: true,

              ease: "sine.inOut",
            },
          );
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
        m-0
        w-full
        overflow-hidden
        bg-[#050505]
        p-0
        text-white
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

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
            left-[-18%]
            top-[5%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#B7FF00]/[0.045]
            blur-[120px]
            md:h-[540px]
            md:w-[540px]
          "
        />

        <div
          className="
            services-glow-two
            absolute
            right-[-18%]
            bottom-[5%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#B7FF00]/[0.025]
            blur-[120px]
            md:h-[540px]
            md:w-[540px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.012]
            bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)]
            bg-[size:90px_90px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,.82)_100%)]
          "
        />
      </div>

      {/* ======================================================
          SECTION TITLE
      ======================================================= */}

      <div
        className="
          relative
          z-10
          m-0
          w-full
          px-4
          pt-12
          text-center
          sm:px-6
          sm:pt-16
          md:px-8
          lg:px-10
          lg:pt-20
        "
      >
        <div
          className="
            services-eyebrow
            mb-3
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <span
            className="
              h-[5px]
              w-[5px]
              rounded-full
              bg-[#B7FF00]
              shadow-[0_0_14px_rgba(183,255,0,.7)]
            "
          />

          <span
            className="
              bg-gradient-to-r
              from-[#B7FF00]
              via-[#D7FF70]
              to-white/60
              bg-clip-text
              text-transparent
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.24em]
              sm:text-[11px]
            "
          >
            What I Do
          </span>
        </div>

        <div className="overflow-hidden">
          <h2
            className="
              m-0
              font-sans
              font-medium
              leading-[0.91]
              tracking-[-0.055em]
              text-[clamp(2.6rem,5.8vw,5rem)]
            "
          >
            <span
              className="
                services-heading-line
                block
                bg-gradient-to-r
                from-white
                via-white
                to-white/55
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
                from-white/90
                via-[#B7FF00]
                to-[#8FB520]
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
                to-white/55
                bg-clip-text
                text-transparent
              "
            >
              brands forward.
            </span>
          </h2>
        </div>

        <p
          className="
            services-description
            mx-auto
            mt-4
            max-w-[620px]
            bg-gradient-to-r
            from-white/85
            via-white/65
            to-white/45
            bg-clip-text
            text-transparent
            text-[13px]
            leading-[1.7]
            sm:text-[14px]
            lg:text-[15px]
            lg:leading-[1.75]
          "
        >
          From Shopify development to
          conversion optimization, I
          build digital experiences
          that look exceptional, work
          effortlessly, and are designed
          for growth.
        </p>
      </div>

      {/* ======================================================
          DESKTOP / TABLET CARD STACK
      ======================================================= */}

      <div
        ref={stackRef}
        className="
          relative
          m-0
          mt-6
          hidden
          h-[100svh]
          w-full
          md:block
          sm:mt-8
          lg:mt-10
        "
      >
        <div
          className="
            relative
            flex
            h-[100svh]
            min-h-[540px]
            w-full
            items-center
            justify-center
            overflow-hidden
          "
        >
          <div
            className="
              relative
              h-[72svh]
              min-h-[480px]
              max-h-[680px]
              w-full
              overflow-visible
            "
          >
            {serviceList.map(
              (
                service,
                index,
              ) => {
                const title =
                  service.title ||
                  "Shopify Service";

                const slug =
                  service.slug ||
                  `service-${index + 1}`;

                const description =
                  service.description ||
                  "";

                const tags =
                  service.tags ||
                  [];

                const timeline =
                  service.timeline ||
                  service.meta
                    ?.delivery ||
                  "Flexible";

                const price =
                  service.startingPrice ||
                  "Custom";

                const platform =
                  service.meta
                    ?.platform ||
                  "Shopify";

                const booking =
                  service.booking
                    ?.available !==
                  false;

                return (
                  <article
                    key={
                      service.id ??
                      slug
                    }
                    ref={(el) => {
                      // FIXED: Proper ref assignment
                      if (el) {
                        cardsRef.current[
                          index
                        ] = el;
                      }
                    }}
                    className="
                      services-card
                      absolute
                      inset-0
                      h-full
                      w-full
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-white/[0.14]
                      bg-[#090B08]
                      shadow-[0_25px_100px_rgba(0,0,0,.75)]
                      will-change-transform
                      [backface-visibility:hidden]
                      [transform:translateZ(0)]
                      sm:rounded-[24px]
                      lg:rounded-[28px]
                    "
                    style={{
                      zIndex:
                        100 +
                        index,
                    }}
                  >
                    {/* CARD GLOW */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        overflow-hidden
                      "
                    >
                      <div
                        className="
                          services-card-glow
                          absolute
                          right-[-8%]
                          top-[-20%]
                          h-[65%]
                          w-[45%]
                          rounded-full
                          bg-[#B7FF00]/[0.07]
                          blur-[110px]
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-[-25%]
                          left-[5%]
                          h-[45%]
                          w-[40%]
                          rounded-full
                          bg-[#B7FF00]/[0.025]
                          blur-[100px]
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-br
                          from-white/[0.045]
                          via-transparent
                          to-black/[0.75]
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-[radial-gradient(circle_at_82%_15%,rgba(183,255,0,.09),transparent_28%)]
                        "
                      />
                    </div>

                    {/* INNER BORDER */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[1px]
                        rounded-[19px]
                        border
                        border-white/[0.025]
                        sm:rounded-[23px]
                        lg:rounded-[27px]
                      "
                    />

                    {/* CONTENT */}

                    <div
                      className="
                        services-card-content
                        relative
                        z-10
                        grid
                        h-full
                        grid-cols-1
                        gap-5
                        p-4
                        sm:p-5
                        md:grid-cols-[0.95fr_1.05fr]
                        md:gap-6
                        md:p-6
                        lg:gap-8
                        lg:p-8
                        xl:p-10
                      "
                    >
                      {/* =================================================
                          VIDEO
                      ================================================== */}

                      <div
                        className="
                          relative
                          min-h-[210px]
                          overflow-hidden
                          rounded-[14px]
                          border
                          border-white/[0.10]
                          bg-black
                          md:min-h-0
                          md:h-full
                          sm:rounded-[16px]
                        "
                      >
                        <ServiceVideo
                          service={
                            service
                          }
                        />

                        {/* MEDIA LABEL */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            left-2
                            top-2
                            z-30
                            rounded-full
                            border
                            border-white/[0.12]
                            bg-black/45
                            px-2.5
                            py-1
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-white/65
                            backdrop-blur-md
                          "
                        >
                          {service.media
                            ?.type ===
                          "video"
                            ? "Video"
                            : "Preview"}
                        </div>
                      </div>

                      {/* =================================================
                          INFO
                      ================================================== */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-col
                          justify-between
                        "
                      >
                        {/* TOP */}

                        <div>
                          <div
                            className="
                              mb-4
                              flex
                              items-center
                              justify-between
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
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-[#B7FF00]/35
                                  bg-[#B7FF00]/[0.05]
                                  font-mono
                                  text-[12px]
                                  font-semibold
                                  text-[#B7FF00]
                                "
                              >
                                {String(
                                  index +
                                    1,
                                ).padStart(
                                  2,
                                  "0",
                                )}
                              </span>

                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.2em]
                                  text-white/45
                                "
                              >
                                Service
                              </span>
                            </div>

                            <Link
                              href={`/services/${slug}`}
                              className="
                                group
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.14]
                                bg-white/[0.025]
                                text-white/70
                                transition-all
                                duration-500
                                hover:border-[#B7FF00]/60
                                hover:bg-[#B7FF00]
                                hover:text-black
                              "
                            >
                              <ArrowUpRight
                                size={
                                  17
                                }
                                strokeWidth={
                                  1.2
                                }
                                className="
                                  transition-transform
                                  duration-500
                                  group-hover:translate-x-0.5
                                  group-hover:-translate-y-0.5
                                "
                              />
                            </Link>
                          </div>

                          {/* TITLE */}

                          <h3
                            className="
                              card-title
                              m-0
                              max-w-[700px]
                              bg-gradient-to-r
                              from-white
                              via-white
                              to-[#B7FF00]/80
                              bg-clip-text
                              text-transparent
                              text-[clamp(2.6rem,4.5vw,5.5rem)]
                              font-medium
                              leading-[0.94]
                              tracking-[-0.055em]
                            "
                          >
                            {title}
                          </h3>

                          {/* DESCRIPTION */}

                          <p
                            className="
                              card-description
                              mt-4
                              max-w-[600px]
                              text-[15px]
                              leading-[1.75]
                              text-white/62
                              sm:text-[16px]
                              lg:text-[17px]
                            "
                          >
                            {description}
                          </p>

                          {/* TAGS */}

                          {tags.length >
                            0 && (
                            <div
                              className="
                                card-tags
                                mt-4
                                flex
                                flex-wrap
                                gap-2
                              "
                            >
                              {tags
                                .slice(
                                  0,
                                  5,
                                )
                                .map(
                                  (
                                    tag,
                                    tagIndex,
                                  ) => (
                                    <span
                                      key={`${tag}-${tagIndex}`}
                                      className="
                                        rounded-full
                                        border
                                        border-white/[0.12]
                                        bg-white/[0.025]
                                        px-3.5
                                        py-1.5
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.08em]
                                        text-white/60
                                        sm:text-[11px]
                                      "
                                    >
                                      {
                                        tag
                                      }
                                    </span>
                                  ),
                                )}
                            </div>
                          )}
                        </div>

                        {/* BOTTOM */}

                        <div
                          className="
                            card-meta
                            mt-5
                            border-t
                            border-white/[0.08]
                            pt-4
                          "
                        >
                          <div
                            className="
                              grid
                              grid-cols-3
                              gap-3
                              sm:gap-5
                            "
                          >
                            <div>
                              <p
                                className="
                                  mb-1
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-white/35
                                "
                              >
                                Timeline
                              </p>

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-1.5
                                  text-[12px]
                                  text-white/75
                                  sm:text-[13px]
                                "
                              >
                                <Clock3
                                  size={
                                    13
                                  }
                                  strokeWidth={
                                    1.2
                                  }
                                  className="text-[#B7FF00]"
                                />

                                {
                                  timeline
                                }
                              </div>
                            </div>

                            <div>
                              <p
                                className="
                                  mb-1
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-white/35
                                "
                              >
                                Investment
                              </p>

                              <p
                                className="
                                  m-0
                                  text-[12px]
                                  font-semibold
                                  text-[#B7FF00]
                                  sm:text-[13px]
                                "
                              >
                                {
                                  price
                                }
                              </p>
                            </div>

                            <div>
                              <p
                                className="
                                  mb-1
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-white/35
                                "
                              >
                                Platform
                              </p>

                              <p
                                className="
                                  m-0
                                  text-[12px]
                                  text-white/70
                                  sm:text-[13px]
                                "
                              >
                                {
                                  platform
                                }
                              </p>
                            </div>
                          </div>

                          {/* BOOK BUTTON */}

                          {booking && (
                            <Link
                              href={`/contact?service=${slug}`}
                              className="
                                card-button
                                group
                                mt-4
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-gradient-to-r
                                from-[#B7FF00]
                                via-[#D7FF70]
                                to-[#9BCB00]
                                px-6
                                py-3.5
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-black
                                transition-all
                                duration-500
                                hover:-translate-y-1
                                hover:shadow-[0_15px_40px_rgba(183,255,0,.18)]
                              "
                            >
                              {service
                                .booking
                                ?.buttonText ||
                                "Book This Service"}

                              <ArrowUpRight
                                size={
                                  15
                                }
                                strokeWidth={
                                  1.2
                                }
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
                    </div>
                  </article>
                );
              },
            )}

            {/* DESKTOP PROGRESS */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-26px]
                left-1/2
                z-[500]
                flex
                -translate-x-1/2
                items-center
                gap-1.5
              "
            >
              {serviceList.map(
                (_, index) => (
                  <span
                    key={index}
                    className="
                      h-[3px]
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width:
                        index ===
                        activeIndex
                          ? 26
                          : 6,
                      background:
                        index ===
                        activeIndex
                          ? "#B7FF00"
                          : "rgba(255,255,255,.18)",
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          MOBILE CARD LIST
      ======================================================= */}

      <div
        className="
          services-mobile-list
          relative
          z-10
          m-0
          mt-6
          flex
          w-full
          flex-col
          gap-4
          px-3
          pb-12
          sm:px-4
          md:hidden
        "
      >
        {serviceList.map(
          (
            service,
            index,
          ) => {
            const title =
              service.title ||
              "Shopify Service";

            const slug =
              service.slug ||
              `service-${index + 1}`;

            const description =
              service.description ||
              "";

            const tags =
              service.tags ||
              [];

            const timeline =
              service.timeline ||
              service.meta
                ?.delivery ||
              "Flexible";

            const price =
              service.startingPrice ||
              "Custom";

            const platform =
              service.meta
                ?.platform ||
              "Shopify";

            return (
              <article
                key={
                  service.id ??
                  slug
                }
                className="
                  services-mobile-card
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-white/[0.13]
                  bg-[#090B08]
                  p-3
                  shadow-[0_20px_70px_rgba(0,0,0,.5)]
                "
              >
                {/* MOBILE VIDEO */}

                <div
                  className="
                    relative
                    h-[200px]
                    w-full
                    overflow-hidden
                    rounded-[14px]
                    bg-black
                  "
                >
                  <ServiceVideo
                    service={
                      service
                    }
                  />
                </div>

                {/* MOBILE CONTENT */}

                <div
                  className="
                    mobile-card-content
                    px-1
                    pb-1
                    pt-4
                  "
                >
                  <div
                    className="
                      mobile-animate-item
                      mb-2.5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[11px]
                        font-semibold
                        text-[#B7FF00]
                      "
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <Link
                      href={`/services/${slug}`}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.13]
                        text-white/65
                      "
                    >
                      <ArrowUpRight
                        size={
                          15
                        }
                        strokeWidth={
                          1.2
                        }
                      />
                    </Link>
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      mobile-animate-item
                      m-0
                      bg-gradient-to-r
                      from-white
                      to-[#B7FF00]
                      bg-clip-text
                      text-transparent
                      text-[clamp(2.2rem,10vw,3.2rem)]
                      font-medium
                      leading-[0.95]
                      tracking-[-0.05em]
                    "
                  >
                    {title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mobile-animate-item
                      mt-3.5
                      text-[14px]
                      leading-[1.7]
                      text-white/60
                    "
                  >
                    {
                      description
                    }
                  </p>

                  {/* TAGS */}

                  {tags.length >
                    0 && (
                    <div
                      className="
                        mobile-animate-item
                        mt-3.5
                        flex
                        flex-wrap
                        gap-1.5
                      "
                    >
                      {tags
                        .slice(
                          0,
                          5,
                        )
                        .map(
                          (
                            tag,
                            tagIndex,
                          ) => (
                            <span
                              key={`${tag}-${tagIndex}`}
                              className="
                                rounded-full
                                border
                                border-white/[0.12]
                                bg-white/[0.025]
                                px-3
                                py-1.5
                                text-[9px]
                                uppercase
                                tracking-[0.08em]
                                text-white/60
                              "
                            >
                              {
                                tag
                              }
                            </span>
                          ),
                        )}
                    </div>
                  )}

                  {/* META */}

                  <div
                    className="
                      mobile-animate-item
                      mt-4
                      grid
                      grid-cols-3
                      gap-2
                      border-t
                      border-white/[0.08]
                      pt-3.5
                    "
                  >
                    <div>
                      <p
                        className="
                          mb-1
                          text-[8px]
                          uppercase
                          tracking-[0.14em]
                          text-white/35
                        "
                      >
                        Timeline
                      </p>

                      <p
                        className="
                          m-0
                          text-[10px]
                          text-white/70
                        "
                      >
                        {
                          timeline
                        }
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          mb-1
                          text-[8px]
                          uppercase
                          tracking-[0.14em]
                          text-white/35
                        "
                      >
                        Investment
                      </p>

                      <p
                        className="
                          m-0
                          text-[10px]
                          font-semibold
                          text-[#B7FF00]
                        "
                      >
                        {
                          price
                        }
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          mb-1
                          text-[8px]
                          uppercase
                          tracking-[0.14em]
                          text-white/35
                        "
                      >
                        Platform
                      </p>

                      <p
                        className="
                          m-0
                          text-[10px]
                          text-white/70
                        "
                      >
                        {
                          platform
                        }
                      </p>
                    </div>
                  </div>

                  {/* BOOK BUTTON */}

                  {service.booking
                    ?.available !==
                    false && (
                    <Link
                      href={`/contact?service=${slug}`}
                      className="
                        mobile-animate-item
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        bg-gradient-to-r
                        from-[#B7FF00]
                        via-[#D7FF70]
                        to-[#9BCB00]
                        px-6
                        py-3.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-black
                      "
                    >
                      {service
                        .booking
                        ?.buttonText ||
                        "Book This Service"}

                      <ArrowUpRight
                        size={
                          14
                        }
                        strokeWidth={
                          1.2
                        }
                      />
                    </Link>
                  )}
                </div>
              </article>
            );
          },
        )}

        {/* MOBILE VIEW ALL */}

        <Link
          href="/services"
          className="
            mobile-animate-item
            mt-1
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-white/[0.16]
            bg-white/[0.025]
            px-5
            py-3.5
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-white/75
          "
        >
          View All Services

          <ArrowUpRight
            size={14}
            strokeWidth={1.2}
          />
        </Link>
      </div>

      {/* ======================================================
          DESKTOP BOTTOM CTA
      ======================================================= */}

      <div
        className="
          services-bottom
          relative
          z-30
          hidden
          flex-col
          items-center
          justify-center
          gap-4
          px-4
          pb-14
          pt-10
          text-center
          md:flex
        "
      >
        <p
          className="
            services-bottom-text
            max-w-[480px]
            text-[12px]
            leading-[1.7]
            text-white/55
          "
        >
          Have a project in mind?
          Let&apos;s build something
          exceptional together.
        </p>

        <Link
          href="/services"
          className="
            services-bottom-button
            group
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-white/[0.18]
            bg-white/[0.025]
            px-6
            py-3.5
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-white/80
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-[#B7FF00]/55
            hover:bg-[#B7FF00]
            hover:text-black
          "
        >
          View All Services

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
    </section>
  );
}
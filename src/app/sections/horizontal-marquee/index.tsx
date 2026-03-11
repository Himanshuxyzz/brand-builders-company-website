"use client";

import * as Scrollytelling from "~/lib/scrollytelling-client";
import s from "./horizontal-marquee.module.scss";
import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phrase = "WE ARE BRAND BUILDERS.";
const splitted = phrase.split("");
const charsLength = splitted.length;

/* ─── Text lines for staggered reveal ──────────────────────────────── */
const bodyLines = [
  "A full-service brand agency specialized in e-commerce growth,",
  "marketplace management, visual content production,",
  "and digital brand infrastructure.",
];
const popLine = "We help businesses launch, scale, and dominate online marketplaces.";

export const HorizontalMarquee = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || hasAnimated.current) return;

    const lines = textRef.current.querySelectorAll(`.${s.textLine}`);
    const pop = textRef.current.querySelector(`.${s.textLinePop}`);

    // Set initial state
    gsap.set(lines, { opacity: 0, y: 40 });
    if (pop) gsap.set(pop, { opacity: 0, y: 40, scale: 0.96 });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;

        // Staggered line reveal
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });

        // Pop effect on final line
        if (pop) {
          gsap.to(pop, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: bodyLines.length * 0.12 + 0.15,
            ease: "back.out(1.4)",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Scrollytelling.Root start="top top+=300px">
      <section className={s.section}>
        <div className={s.pinned}>
          <Scrollytelling.Animation
            tween={{
              start: 0,
              end: 90,
              from: { xPercent: 98, ease: "linear" },
            }}
          >
            <div className={s.animated}>
              <Scrollytelling.Animation
                tween={{
                  start: 90,
                  end: 100,
                  to: { x: "-=50vw", ease: "linear" },
                }}
              >
                <p>
                  {splitted.map((char, i) => {
                    const charDuration = 90 / charsLength;
                    const charStart = charDuration * i;
                    const charEnd = charStart + charDuration;

                    return (
                      <Scrollytelling.Animation
                        key={i}
                        tween={{
                          start: charStart * 0.7,
                          end: charEnd,
                          fromTo: [
                            {
                              yPercent: 40,
                              scale: 0.5,
                              autoAlpha: 0,
                              transformOrigin: "center right",
                            },
                            {
                              keyframes: {
                                "0%": { autoAlpha: 0, scale: 0.5 },
                                "50%": { autoAlpha: 1, scale: 1 },
                                "100%": { yPercent: 0 },
                                easeEach: "linear",
                              },
                              ease: "linear",
                            },
                          ],
                        }}
                      >
                        <span
                          data-character
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? <>&nbsp;</> : char}
                        </span>
                      </Scrollytelling.Animation>
                    );
                  })}
                </p>
              </Scrollytelling.Animation>

              {/* Logo with CSS infinite float animation */}
              <Scrollytelling.Animation
                tween={{
                  start: 90,
                  end: 100,
                  fromTo: [
                    { scale: 0.8, opacity: 0 },
                    { scale: 1.45, opacity: 1, ease: "linear" },
                  ],
                }}
              >
                <LogoImage />
              </Scrollytelling.Animation>

              {/* Animated text lines */}
              <Scrollytelling.Animation
                tween={{
                  start: 90,
                  end: 100,
                  fromTo: [
                    { opacity: 0 },
                    { opacity: 1, ease: "linear" },
                  ],
                }}
              >
                <div className={s.bodyText} ref={textRef}>
                  {bodyLines.map((line, i) => (
                    <span key={i} className={s.textLine}>
                      {line}
                    </span>
                  ))}
                  <br />
                  <span className={s.textLinePop}>{popLine}</span>
                </div>
              </Scrollytelling.Animation>
            </div>
          </Scrollytelling.Animation>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};

const LogoImage = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={s.logoContainer} ref={ref}>
      <Image
        src="/logo.png"
        alt="Brand Builder's Agency Logo"
        width={500}
        height={500}
        className={s.logoImage}
        draggable={false}
        priority
      />
    </div>
  );
});

LogoImage.displayName = "LogoImage";

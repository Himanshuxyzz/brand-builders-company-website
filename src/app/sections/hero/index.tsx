"use client";

import * as Scrollytelling from "~/lib/scrollytelling-client";

import s from "./hero.module.scss";
import Link from "next/link";
import Image from "next/image";
import { CanvasWithMacModel } from "./mac-model";
import { toVw } from "~/lib/utils";
import { useMedia } from "~/hooks/use-media";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const Hero = () => {
  const isMobileSize = useMedia("(max-width: 768px)");
  const shineRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!shineRef.current) return;

    tweenRef.current = gsap.to(shineRef.current, {
      backgroundPosition: "200% center",
      duration: 2.8,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.4,
    });

    const el = shineRef.current;
    const handleEnter = () => {
      if (tweenRef.current) tweenRef.current.timeScale(0.65);
      gsap.to(el, {
        filter: "brightness(1.07)",
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      if (tweenRef.current) tweenRef.current.timeScale(1);
      gsap.to(el, {
        filter: "brightness(1)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    // Initial entrance animations for premium feel on load
    gsap.fromTo(
      ".hero-word",
      { opacity: 0, y: 50, rotationX: -50, transformPerspective: 600 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    gsap.fromTo(
      ".hero-footer",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.9 }
    );

    return () => {
      tweenRef.current?.kill();
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Scrollytelling.Root defaults={{ ease: "linear" }}>
      <Scrollytelling.Pin
        childHeight={"100vh"}
        pinSpacerHeight={"300vh"}
        pinSpacerClassName={s["pin-spacer"]}
      >
        <header className={s["header"]}>
          <Link
            title="Digital Infrastructure Company"
            href="/"
            className={s["brand-link"]}
          >
            <span ref={shineRef} className={s["brand-text"]}>
              Digital Infrastructure{"\n"}Company
            </span>
          </Link>

          <svg
            className={s["star"]}
            fill="none"
            viewBox="0 0 679 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                fill="#fff"
                d="M209.804 73.71a12.593 12.593 0 00-3.901-8.19 12.543 12.543 0 00-8.384-3.43L0 59.49l197.519-2.6c3.12-.058 6.107-1.278 8.378-3.422s3.664-5.06 3.907-8.177L211.568 22l1.829 24.084a12.587 12.587 0 003.642 7.938 12.546 12.546 0 007.923 3.649L249 59.503l-24.038 1.833a12.542 12.542 0 00-7.923 3.644 12.59 12.59 0 00-3.642 7.936L211.568 97l-1.764-23.29z"
              />
            </g>
            <g clipPath="url(#b)">
              <path
                fill="#fff"
                d="M469.196 45.29a12.593 12.593 0 003.901 8.19 12.543 12.543 0 008.384 3.43L679 59.51l-197.519 2.6c-3.12.058-6.107 1.278-8.378 3.422s-3.664 5.06-3.907 8.177L467.432 97l-1.829-24.084a12.587 12.587 0 00-3.642-7.938 12.546 12.546 0 00-7.923-3.649L430 59.497l24.038-1.833a12.542 12.542 0 007.923-3.644 12.59 12.59 0 003.642-7.936L467.432 22l1.764 23.29z"
              />
            </g>
            <Scrollytelling.Animation
              tween={{
                start: 0,
                end: 100,
                to: {
                  transformOrigin: "50% 50%",
                  rotate: 360,
                },
              }}
            >
              <g>
                {/* Brand Builder's B² Logo */}
                <circle cx="341" cy="60" r="60" fill="#111111" />
                {/* Large B letter */}
                <path
                  fill="#38bdf8"
                  d="M320 30 L320 90 C320 90 348 90 348 75 C348 66 340 63 340 63 C340 63 346 60 346 52 C346 38 320 38 320 30 Z M329 40 C329 40 338 40 338 50 C338 57 329 57 329 57 Z M329 63 C329 63 340 63 340 75 C340 83 329 83 329 83 Z"
                />
                {/* Superscript 2 */}
                <text
                  x="350"
                  y="42"
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="700"
                  fontFamily="Arial, sans-serif"
                >
                  2
                </text>
                {/* BRAND text */}
                <text
                  x="350"
                  y="62"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Arial, sans-serif"
                  letterSpacing="2"
                >
                  BRAND
                </text>
                {/* BUILDER'S text */}
                <text
                  x="350"
                  y="76"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Arial, sans-serif"
                  letterSpacing="2"
                >
                  BUILDER&apos;S
                </text>
              </g>
            </Scrollytelling.Animation>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M249 22H0v75h249z" />
              </clipPath>
              <clipPath id="b">
                <path fill="#fff" d="M430 97h249V22H430z" />
              </clipPath>
            </defs>
          </svg>
          <div className={s["cta"]}>
            <pre>
              <code>Start Your Brand Evolution</code>
            </pre>

          </div>
        </header>

        <section className={s["section"]}>
          <div className={s["model-container"]}>
            <CanvasWithMacModel />
          </div>

          <div className="wrapper">
            <div className={s["content"]}>
              <Scrollytelling.Animation
                tween={{
                  start: 15,
                  end: 45,
                  fromTo: [
                    { opacity: 1, y: 0, scale: 1 },
                    { opacity: 0, y: -60, scale: 0.95, ease: "power2.inOut" },
                  ],
                }}
              >
                <div className={s["hero-title"]}>
                  {[
                    "WE",
                    "DON’T",
                    "JUST",
                    "BUILD",
                    "BRANDS.",
                    "WE",
                    "ENGINEER",
                    "MARKET",
                    "LEADERS.",
                  ].map((word, i) => (
                    <span
                      key={i}
                      className="hero-word"
                      style={{
                        display: "inline-block",
                        marginRight: "0.22em",
                        marginBottom: "0.1em",
                        opacity: 0,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </Scrollytelling.Animation>

              <Scrollytelling.Animation
                tween={{
                  start: 18,
                  end: 45,
                  fromTo: [
                    { opacity: 1, y: 0 },
                    { opacity: 0, y: -30, ease: "power2.inOut" },
                  ],
                }}
              >
                <div
                  className={`${s["footer"]} hero-footer`}
                  style={{ opacity: 0 }}
                >
                  <p>
                    Brand Strategy • E-commerce Growth • Digital Experiences •
                    Content Production
                  </p>
                  <svg
                    viewBox="0 0 24 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 0.226562L24 6.00007L14 11.7736L14 7.00006L0 7.00006V5.00006L14 5.00007L14 0.226562Z"
                      fill="white"
                    />
                  </svg>
                  <p>
                    We help businesses launch, scale, and dominate online
                    marketplaces through strategy, technology, and high-impact
                    visual content.
                  </p>
                </div>
              </Scrollytelling.Animation>
            </div>
          </div>

          {/* Trusted Platforms — fills the empty space at bottom of hero */}
          <Scrollytelling.Animation
            tween={[
              {
                start: 55,
                end: 80,
                fromTo: [
                  { opacity: 0, y: 40 },
                  { opacity: 1, y: 0, ease: "power3.out" },
                ],
              },
              {
                start: 92,
                end: 100,
                to: { opacity: 0, y: -20, ease: "power2.inOut" },
              },
            ]}
          >
            <div className={s["hero-logos"]}>
              <p className={s["hero-logos-label"]}>
                Trusted by Leading Platforms
              </p>
              <div className={s["hero-logos-row"]}>
                <Scrollytelling.Stagger
                  overlap={0.25}
                  tween={{
                    start: 60,
                    end: 90,
                    fromTo: [
                      {
                        filter: "grayscale(100%) brightness(0.4)",
                        scale: 0.85,
                      },
                      {
                        filter: "grayscale(0%) brightness(1.1)",
                        scale: 1,
                        ease: "power3.out",
                      },
                    ],
                  }}
                >
                  {[
                    { name: "Amazon", src: "/logos/amazon.png" },
                    { name: "Flipkart", src: "/logos/flipkart.png" },
                    { name: "Blinkit", src: "/logos/blinkit.png" },
                    { name: "Myntra", src: "/logos/myntra.png" },
                    { name: "Shopify", src: "/logos/shopify.png" },
                    {
                      name: "Swiggy Instamart",
                      src: "/logos/swiggyinstamart.png",
                    },
                    { name: "Zepto", src: "/logos/zepto.png" },
                  ].map(({ name, src }) => (
                    <div
                      key={name}
                      className={s["hero-logo-item"]}
                      title={name}
                    >
                      <Image
                        src={src}
                        alt={`${name} logo`}
                        width={160}
                        height={60}
                        className={s["hero-logo-img"]}
                        loading="lazy"
                        quality={90}
                      />
                    </div>
                  ))}
                </Scrollytelling.Stagger>
              </div>
            </div>
          </Scrollytelling.Animation>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  );
};

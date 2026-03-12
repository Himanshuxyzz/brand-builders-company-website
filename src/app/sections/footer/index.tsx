"use client";

import Image from "next/image";
import * as Scrollytelling from "~/lib/scrollytelling-client";
import confetti from "canvas-confetti";
import { gsap } from "gsap";

import s from "./footer.module.scss";
import Link from "next/link";
import { DottedDiv } from "../../components/dotted-container";
// import basementTeamSVG from "../../../../public/footer/basement-team.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

const ghHref = "https://github.com/basementstudio/scrollytelling";

export const Footer = () => {
  return (
    <Scrollytelling.Root start="top 80%">
      <footer className={s.footer}>
        <PreFooter />

        <div
          style={{
            width: "92%",
            maxWidth: "1100px",
            margin: "6vw auto 4vw",
            aspectRatio: "16 / 9",
            borderRadius: "clamp(8px, 2vw, 12px)",
            overflow: "hidden",
            position: "relative",
            zIndex: 10,
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <video
            src="/promotional-video/brand-builder-promotional-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <h2 className={s["footer-heading-text"]}>BRAND BUILDER&apos;S</h2>
        <div className={s.links}>
          <div>
            <span>social media</span>
            <ul>
              {socials.map((social, idx) => (
                <li key={idx}>
                  {idx !== 0 && <span>&nbsp;—&nbsp;</span>}
                  <Link
                    className="link"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span>Location</span>
            <span>14 MARIMATA SQUARE</span>
          </div>
          <div>
            <span>get in touch</span>
            <Link
              className="link"
              href="mailto:brandbuilders1122@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              brandbuilders1122@gmail.com
            </Link>
          </div>
          <div>
            <span>Brand Builder&apos;s Agency {new Date().getFullYear()}</span>
            <span>all rights reserved</span>
          </div>
        </div>
      </footer>
    </Scrollytelling.Root>
  );
};

const PreFooter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;

    btnTweenRef.current = gsap.to(btnRef.current, {
      backgroundPosition: "200% center",
      duration: 2.8,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.5,
    });

    const el = btnRef.current;
    const handleEnter = () => {
      if (btnTweenRef.current) btnTweenRef.current.timeScale(0.6);
      gsap.to(el, {
        filter: "brightness(1.08)",
        duration: 0.35,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      if (btnTweenRef.current) btnTweenRef.current.timeScale(1);
      gsap.to(el, {
        filter: "brightness(1)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      btnTweenRef.current?.kill();
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })({
      startVelocity: 20,
      particleCount: 140,
      spread: 2000,
      gravity: 0.6,
      origin: { y: 0.425 },
      colors: [
        "#ff4d00",
        "#ff5e00",
        "#ff8000",
        "#ffa200",
        "#b23500",
        "#d84000",
      ],
    });
  }, []);

  return (
    <div className={s["pre-footer"]}>
      <canvas ref={canvasRef} className={s.confetti} />
      <Scrollytelling.Waypoint at={50} onCall={triggerConfetti} />
      <Scrollytelling.Waypoint
        at={75}
        tween={{
          target: ["body"],
          to: { background: "black", color: "white" },
          duration: 0.35,
        }}
      />
      <div className={s["left-content"]}>
        <h2 className={s["cta-heading"]}>
          <Scrollytelling.Stagger
            overlap={0.15}
            tween={{
              start: 0,
              end: 60,
              fromTo: [
                {
                  opacity: 0,
                  y: 40,
                  scale: 0.85,
                  filter: "blur(8px)",
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  ease: "power3.out",
                },
              ],
            }}
          >
            {["Ready", "to", "Launch", "or", "Scale", "Your", "Brand?"].map(
              (word, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    marginRight: "0.22em",
                    marginBottom: "0.1em",
                  }}
                >
                  {word}
                </span>
              ),
            )}
          </Scrollytelling.Stagger>
        </h2>
        <p className={s["cta-subtitle"]}>
          Whether you&apos;re launching a new product or expanding an existing
          business, Brand Builder&apos;s provides the strategy, visuals, and
          technology needed to scale.
        </p>
        <a
          ref={btnRef}
          className={clsx(s["cta-button"], "link")}
          href="https://wa.me/919340322922"
          target="_blank"
          rel="noreferrer"
        >
          💬 Start Your Brand Evolution
        </a>
        <a
          className={s["cta-button-secondary"]}
          href="https://wa.me/919340322922"
          target="_blank"
          rel="noreferrer"
        >
          📅 Book a Free Strategy Call
        </a>
        <a
          className={s["mobile-qr-link"]}
          href={ghHref}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          View Source on GitHub
        </a>
      </div>
    </div>
  );
};

const Terminal = () => {
  const [isCopied, setIsCopied] = useState(false);

  const contentRef = useRef<HTMLParagraphElement>(null);

  const copyTextContent = () => {
    if (contentRef.current) {
      const text = contentRef.current.textContent;
      if (text) {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
      }
    }
  };

  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCopied || !confettiRef.current) return;

    const confeto = confettiRef.current;

    const canvas = document.createElement("canvas");
    confeto.appendChild(canvas);
    canvas.setAttribute(
      "style",
      "width: 100%; height: 100%; position: absolute; top: 0; left: 0;",
    );

    import("canvas-confetti").then(({ create }) => {
      create(canvas, {
        resize: true,
      })({
        startVelocity: 20,
        particleCount: 60,
        spread: 100,
        gravity: 0.6,
        origin: { y: 0.42 },
        colors: [
          "#ff4d00",
          "#ff5e00",
          "#ff8000",
          "#ffa200",
          "#b23500",
          "#d84000",
        ],
      });
    });

    const timeId = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
      confeto?.removeChild(canvas);
    };
  }, [isCopied]);

  return (
    <>
      <div className={s.terminal}>
        <div className={s["upper-bar"]}>
          <span className={s.dots}>
            {[1, 2, 3].map((_, idx) => (
              <span key={idx} className={s.circle} />
            ))}
          </span>
          <span className={s["terminal-title"]}>terminal</span>
        </div>
        <DottedDiv className={s.content}>
          <p ref={contentRef}>yarn add @bsmnt/scrollytelling</p>
          <button
            title="copy text"
            className={s["copy-button"]}
            onClick={copyTextContent}
          >
            <CopyIconSVG />
          </button>
        </DottedDiv>
        <CopiedNotification
          className={clsx(isCopied && s["text-copied-notif--visible"])}
        />
      </div>
      <div ref={confettiRef} className={s.confetti} />
    </>
  );
};

const socials = [
  {
    name: "instagram",
    url: "https://www.instagram.com/brand.builders__?igsh=M3NxY255cDN5cmdk",
  },
];

const CopiedNotification = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(s["text-copied-notif"], className)}>
      <p>Copied!</p>
    </div>
  );
};

const CopyIconSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className ?? ""}
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25592 20.7437C2.25592 22.529 3.70318 23.9764 5.48849 23.9764H8.72106V21.8213H5.48849C4.89339 21.8213 4.41097 21.3388 4.41097 20.7437V5.65838C4.41097 5.06329 4.89339 4.58086 5.48849 4.58086H20.5738C21.1689 4.58086 21.6513 5.06329 21.6513 5.65838V8.89086H11.9536C10.1683 8.89086 8.72106 10.3381 8.72106 12.1234V27.2087C8.72106 28.9939 10.1683 30.4413 11.9536 30.4413H27.0389C28.8242 30.4413 30.2715 28.9939 30.2715 27.2087V12.1234C30.2715 10.3381 28.8242 8.89086 27.0389 8.89086H23.8064V5.65838C23.8064 3.87308 22.3591 2.42581 20.5738 2.42581H5.48849C3.70318 2.42581 2.25592 3.87308 2.25592 5.65838V20.7437ZM10.8761 12.1234C10.8761 11.5283 11.3585 11.0459 11.9536 11.0459H27.0389C27.634 11.0459 28.1165 11.5283 28.1165 12.1234V27.2087C28.1165 27.8039 27.634 28.2862 27.0389 28.2862H11.9536C11.3585 28.2862 10.8761 27.8039 10.8761 27.2087V12.1234Z"
        fill="currentColor"
      />
    </svg>
  );
};

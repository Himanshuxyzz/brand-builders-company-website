"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import s from "./brand-sections.module.scss";

const clients = [
  "E-commerce brands launching on Amazon and Flipkart",
  "D2C startups building stores on Shopify",
  "Fashion brands selling through Myntra",
  "Quick-commerce brands distributing through Blinkit, Instamart, and Zepto",
  "Founders launching new product brands",
];

const reasons = [
  {
    title: "Complete Brand Infrastructure",
    desc: "Strategy, design, content, and technology under one roof.",
  },
  {
    title: "Marketplace Expertise",
    desc: "Deep understanding of modern e-commerce platforms and how they drive sales.",
  },
  {
    title: "Creative + Technical Team",
    desc: "Designers, developers, photographers, and marketers working together.",
  },
  {
    title: "Built for Growth",
    desc: "Our goal is not just launching brands but scaling them.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "Shopify",
  "WooCommerce",
  "Figma",
  "AWS",
  "IoT",
  "TypeScript",
  "React Native",
  "Expo",
  "Google Ads",
  "Meta Ads",
  "Razorpay",
];

const industries = [
  "Fashion",
  "Consumer Products",
  "Food & Beverage",
  "Beauty & Cosmetics",
  "D2C Startups",
];

const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "Market research and brand understanding.",
  },
  {
    num: "02",
    title: "Strategize",
    desc: "Brand positioning and growth planning.",
  },
  {
    num: "03",
    title: "Create",
    desc: "Design systems, visual assets, and digital experiences.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Website deployment, marketplace listings, and marketing activation.",
  },
  {
    num: "05",
    title: "Scale",
    desc: "Optimization, analytics, and growth expansion.",
  },
];

function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  selector: string,
  stagger = 0.1
) {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const els = ref.current.querySelectorAll(selector);
    gsap.fromTo(
      els,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [ref, selector, stagger]);
}

export const BrandSections = () => {
  const processRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const reasonsRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);

  useScrollReveal(processRef, `.${s.step}`, 0.1);
  useScrollReveal(clientsRef, `.${s.clientItem}`, 0.1);
  useScrollReveal(reasonsRef, `.${s.reasonCard}`, 0.12);
  useScrollReveal(techRef, `.${s.techItem}`, 0.08);

  // Founder section: special circular photo + quote reveal
  useEffect(() => {
    if (typeof window === "undefined" || !founderRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const photo = founderRef.current.querySelector(`.${s.founderPhoto}`);
    const quote = founderRef.current.querySelector(`.${s.founderQuote}`);
    const meta = founderRef.current.querySelector(`.${s.founderMeta}`);
    gsap.fromTo(
      photo,
      { scale: 0.6, opacity: 0, rotate: -8 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
    gsap.fromTo(
      [quote, meta],
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.95,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      {/* ── PROCESS SECTION ─────────────────────────── */}
      <section className={s.section} ref={processRef}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <span className={s.pretag}>How We Work</span>
            <h2 className={s.sectionTitle}>THE PROCESS</h2>
          </div>
          <div className={s.processGrid}>
            {processSteps.map((step) => (
              <div key={step.num} className={s.step}>
                <span className={s.stepNum}>{step.num}</span>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ────────────────────────── */}
      <section className={`${s.section} ${s.sectionAlt}`} ref={clientsRef}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <span className={s.pretag}>Our Clients</span>
            <h2 className={s.sectionTitle}>WHO WE WORK WITH</h2>
            <p className={s.sectionSub}>
              We collaborate with ambitious businesses building modern brands.
            </p>
          </div>
          <ul className={s.clientList}>
            {clients.map((item, i) => (
              <li key={i} className={s.clientItem}>
                <span className={s.bullet}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHY BRAND BUILDER'S ─────────────────────── */}
      <section className={s.section} ref={reasonsRef}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <span className={s.pretag}>Our Advantage</span>
            <h2 className={s.sectionTitle}>WHY BRANDS CHOOSE US</h2>
          </div>
          <div className={s.reasonsGrid}>
            {reasons.map((r, i) => (
              <div key={i} className={s.reasonCard}>
                <h3 className={s.reasonTitle}>{r.title}</h3>
                <p className={s.reasonDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH + INDUSTRIES ───────────────────────── */}
      <section className={`${s.section} ${s.sectionAlt}`} ref={techRef}>
        <div className={s.container}>
          <div className={s.twoCol}>
            <div>
              <div className={s.sectionHeader}>
                <span className={s.pretag}>Our Stack</span>
                <h2 className={s.sectionTitle}>TECHNOLOGY</h2>
              </div>
              <div className={s.techGrid}>
                {techStack.map((t) => (
                  <div key={t} className={s.techItem}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={s.sectionHeader}>
                <span className={s.pretag}>Where We Play</span>
                <h2 className={s.sectionTitle}>INDUSTRIES</h2>
              </div>
              <ul className={s.industryList}>
                {industries.map((ind, i) => (
                  <li key={i} className={s.techItem}>
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* ── FOUNDER SECTION ─────────────────────────── */}
      <section className={`${s.section} ${s.founderSection}`} ref={founderRef}>
        <div className={s.container}>
          <div className={s.founderWrap}>
            <div className={s.founderPhotoWrap}>
              <div className={s.founderPhoto}>
                <Image
                  src="/founder.jpg"
                  alt="Founder of Brand Builder's Agency"
                  fill
                  sizes="(max-width: 800px) 160px, 260px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  quality={95}
                  priority
                />
                <div className={s.founderGlow} />
              </div>
            </div>
            <div className={s.founderContent}>
              <span className={s.pretag}>Message from the Founder</span>
              <blockquote className={s.founderQuote}>
                &ldquo;Most brands don&apos;t fail because of a bad product —
                they fail because no one knows who they are, what they stand
                for, or why they deserve to be chosen. We exist to change that.
                At Brand Builder&apos;s, we don&apos;t just build brands. We
                engineer market leaders.&rdquo;
              </blockquote>
              <div className={s.founderMeta}>
                <strong className={s.founderName}>Vinayak Sharma</strong>
                <span className={s.founderTitle}>
                  Founder &amp; CEO, Brand Builder&apos;s Agency
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

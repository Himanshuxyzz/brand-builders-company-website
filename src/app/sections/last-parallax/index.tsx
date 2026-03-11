"use client";

import { useState, useEffect } from "react";
import * as Scrollytelling from "~/lib/scrollytelling-client";
import Image from "next/image";
// Removed PC_IMAGE and SMILE_IMAGE imports

import s from "./last-parallax.module.scss";

export const LastParallax = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 800);
  }, []);

  return (
    <Scrollytelling.Root
      start="top bottom"
      scrub={0.75}
    >
      <section className={s["section"]}>
        <div className="wrapper">
          {/* Background transition to white */}
          <Scrollytelling.Waypoint
            at={50}
            tween={{
              target: ["body"],
              to: { background: "white", color: "black" },
              duration: 0.35,
            }}
          />

          {/*
            Title: scroll-tied animation with TWO phases
            Phase 1 (0→45%): scales up from 0 to full
            Phase 2 (55→70%): fades out and shrinks
            Both phases are scrub-locked — always correct regardless of scroll speed
          */}
          <Scrollytelling.Animation
            tween={[
              {
                start: 0,
                end: 45,
                fromTo: [
                  { scale: 0, opacity: 0 },
                  { scale: 1, opacity: 1, ease: "power2.out" },
                ],
              },
              {
                start: 55,
                end: 70,
                fromTo: [
                  { scale: 1, opacity: 1 },
                  { scale: 0.3, opacity: 0, ease: "power2.in" },
                ],
              },
            ]}
          >
            <h2 className={s["title"]}>
              BRANDS THAT
              <br />
              TRUSTED THE PROCESS
            </h2>
          </Scrollytelling.Animation>

          {/*
            Cards: scroll-tied animation with target selector
            Scrub-locked from 60→95% — cards always visible at correct state
            Filter blur disabled on mobile for performance
          */}
          <Scrollytelling.Animation
            tween={{
              start: 60,
              end: 95,
              target: ".testimonial-card",
              fromTo: [
                {
                  opacity: 0,
                  scale: 0.75,
                  y: 70,
                  ...(isMobile ? {} : { filter: "blur(6px)" }),
                },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  ...(isMobile ? {} : { filter: "blur(0px)" }),
                  ease: "power3.out",
                  stagger: 0.18,
                },
              ],
            }}
          />

          <div className={s["testimonials-grid"]}>
            <div className={`testimonial-card ${s["testimonial-card"]}`}>
              <p>&ldquo;Brand Builder&apos;s helped us create professional product visuals and optimize our marketplace listings. Our product finally looks premium online.&rdquo;</p>
              <span>— Founder, D2C Brand</span>
            </div>
            <div className={`testimonial-card ${s["testimonial-card"]}`}>
              <p>&ldquo;From product shoot to website design, their team handled everything smoothly. The entire brand launch process became much easier.&rdquo;</p>
              <span>— E-commerce Seller</span>
            </div>
            <div className={`testimonial-card ${s["testimonial-card"]}`}>
              <p>&ldquo;Their understanding of marketplaces like Amazon and Flipkart really helped improve our product presentation and conversions.&rdquo;</p>
              <span>— Marketplace Brand Owner</span>
            </div>
          </div>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};

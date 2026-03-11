"use client";

import Image from "next/image";
import * as Scrollytelling from "~/lib/scrollytelling-client";
import s from "./bento-grid.module.scss";
import clsx from "clsx";

/*
  Layout plan (4-col grid):
  Row 1:  [video – 2 cols]       [grabpure]     [manup]
  Row 2:  [cenvitan]             [khaofull – 2 cols, 2 rows]  [pvl]
  Row 3:  [little-rituals – tall][                          ]  [petvit]
  Row 4:  [prolixr]              [tiger]        [arihant – 2 cols]
*/

interface BentoItem {
  src: string;
  label: string;
  type: "image" | "video";
  span?: "wide" | "tall" | "large";
}

const items: BentoItem[] = [
  {
    src: "/bento-grid/brand-promo-video-egate-s9-pro.mp4",
    label: "Egate S9 Pro",
    type: "video",
    span: "wide",
  },
  {
    src: "/bento-grid/brand-promo-creative-grabpure.jpg",
    label: "GrabPure",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-manup.jpg",
    label: "ManUp",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-cenvitan.jpg",
    label: "Cenvitan",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-khaofull.png",
    label: "KhaoFull",
    type: "image",
    span: "large",
  },
  {
    src: "/bento-grid/brand-promo-creative-pvl-fitness.jpg",
    label: "PVL Fitness",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-little-rituals.jpg",
    label: "Little Rituals",
    type: "image",
    span: "tall",
  },
  {
    src: "/bento-grid/brand-promo-creative-petvit.jpg",
    label: "PetVit",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-video-smart-goat.mp4",
    label: "Smart Goat",
    type: "video",
    span: "wide",
  },
  {
    src: "/bento-grid/brand-promo-creative-prolixr.jpg",
    label: "Prolixr",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-tiger.jpg",
    label: "Tiger",
    type: "image",
  },
  {
    src: "/bento-grid/brand-promo-creative-arihant-gems.jpg",
    label: "Arihant Gems",
    type: "image",
    span: "wide",
  },
];

export const BentoGrid = () => {
  return (
    <section className={s.section}>
      <Scrollytelling.Root>
        <div className={s.container}>
          <div className={s.header}>
            <span className={s.pretag}>Our Creatives</span>
            <h2 className={s.title}>BRAND SHOWCASE</h2>
          </div>

          <div className={s.grid}>
            <Scrollytelling.Stagger
              overlap={0.4}
              tween={{
                start: 0,
                end: 50,
                fromTo: [
                  { opacity: 0, y: 40, scale: 0.96 },
                  { opacity: 1, y: 0, scale: 1, ease: "power3.out" },
                ],
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className={clsx(
                    s.card,
                    item.span === "wide" && s["card--wide"],
                    item.span === "tall" && s["card--tall"],
                    item.span === "large" && s["card--large"],
                  )}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={s["card-video"]}
                    />
                  ) : (
                    <div className={s["card-image-wrap"]}>
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className={s["card-image"]}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className={s["card-overlay"]}>
                    <span className={s["card-label"]}>{item.label}</span>
                  </div>
                </div>
              ))}
            </Scrollytelling.Stagger>
          </div>
        </div>
      </Scrollytelling.Root>
    </section>
  );
};

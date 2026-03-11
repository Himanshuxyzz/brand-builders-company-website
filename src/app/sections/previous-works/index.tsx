"use client";

import { useState, useCallback, useEffect } from "react";
import * as Scrollytelling from "~/lib/scrollytelling-client";
import s from "./previous-works.module.scss";
import Image from "next/image";

const projects = [
  {
    title: "Carlust - Car Rental For Travel",
    category: "Mobile App Development",
    image: "/project/carlust/cover.webp",
    tech: ["React Native", "Expo", "Zustand", "Sentry", "EAS", "Firebase"],
    description:
      "Discover and rent the ideal vehicle for your needs with our trusted car-rental platform in India. Our app enables seamless booking of cars on daily, weekly, fortnightly, or monthly plans, ensuring you find your dream ride every time.",
    features: [
      "Extensive Fleet Selection: Browse a wide range of sedans, SUVs, hatchbacks, and luxury cars sourced from verified partners across India.",
      "Flexible Rental Durations: Choose rental periods from one day up to one month, with transparent pricing and no hidden fees.",
      "Real-Time Availability: See live updates on vehicle availability and reserve instantly from your smartphone.",
      "In-App Management: Modify bookings, extend rental periods, or switch vehicles directly within the app.",
    ],
    howItWorks: [
      "Search & Select – Enter pickup location and dates to view available cars that match your requirements.",
      "Book & Confirm – Choose your preferred vehicle, review rental terms, and confirm with secure in-app payment.",
      "Pickup & Drive – Collect the car at your chosen location, complete a quick vehicle inspection, and hit the road.",
    ],
    links: [
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=com.carlust.automotive.app",
      },
      {
        label: "App Store",
        url: "https://apps.apple.com/ca/app/carlust-car-rental-for-travel/id6746840857",
      },
    ],
  },
  {
    title: "FLORESTA WUD - Premium Furniture Store",
    category: "Mobile App Development",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    tech: ["React Native", "Expo", "Zustand", "Sentry", "EAS", "Firebase"],
    description:
      "Discover premium wooden furniture designed to enhance your home with comfort and style. Our app lets you explore a wide range of high-quality furniture including beds, sofas, tables, wardrobes, and storage solutions.",
    features: [
      "Browse a curated collection of wooden furniture",
      "Detailed product descriptions and images",
      "Easy ordering and secure checkout",
      "Affordable pricing with reliable delivery",
      "Customer support for a smooth shopping experience",
    ],
    links: [
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=com.florestawud.app.org",
      },
      {
        label: "Website",
        url: "https://www.florestawud.com/",
      },
      {
        label: "Amazon Store",
        url: "https://www.amazon.in/Home-Kitchen-FLORESTA-WUD/s?rh=n%3A976442031%2Cp_6%3AA1EL1F2OYK7ALR",
      },
    ],
  },
];

export const PreviousWorks = () => {
  const [selectedProject, setSelectedProject] = useState<
    null | typeof projects[0]
  >(null);

  const openModal = useCallback((project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section id="previous-works" className={s["section"]}>
      <Scrollytelling.Root>
        <div className={s["container"]}>
          <div className={s["header"]}>
            <span className={s["pretag"]}>Our Portfolio</span>
            <h2 className={s["title"]}>PREVIOUS WORKS</h2>
          </div>

          <div className={s["gallery"]}>
            <Scrollytelling.Stagger
              overlap={0.5}
              tween={{
                start: 0,
                end: 40,
                fromTo: [
                  { opacity: 0, y: 60, scale: 0.95 },
                  { opacity: 1, y: 0, scale: 1, ease: "power3.out" },
                ],
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={s["card"]}
                  onClick={() => openModal(project)}
                >
                  <div className={s["card-image-wrap"]}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={s["card-image"]}
                      sizes="(max-width: 800px) 100vw, 50vw"
                    />
                  </div>
                  <div className={s["card-content"]}>
                    <h3 className={s["card-title"]}>{project.title}</h3>
                    <span className={s["card-category"]}>
                      {project.category}
                    </span>
                    <div className={s["card-tech"]}>
                      {project.tech.map((t) => (
                        <span key={t} className={s["tech-tag"]}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Scrollytelling.Stagger>
          </div>
        </div>
      </Scrollytelling.Root>

      {/* Project Modal */}
      {selectedProject && (
        <div className={s["modal-overlay"]} onClick={closeModal}>
          <div
            className={s["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={s["modal-close"]} onClick={closeModal}>
              &times;
            </button>
            <div className={s["modal-grid"]}>
              <div className={s["modal-image-wrap"]}>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className={s["modal-image"]}
                />
              </div>
              <div className={s["modal-info"]}>
                <span className={s["modal-category"]}>
                  {selectedProject.category}
                </span>
                <h2 className={s["modal-title"]}>{selectedProject.title}</h2>
                <div className={s["modal-tech-list"]}>
                  {selectedProject.tech.map((t) => (
                    <span key={t} className={s["modal-tech-tag"]}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={s["modal-description"]}>
                  <p>{selectedProject.description}</p>
                </div>

                {selectedProject.features && (
                  <div className={s["modal-features"]}>
                    <h3>Key Features</h3>
                    <ul>
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(selectedProject as any).howItWorks && (
                  <div className={s["modal-features"]}>
                    <h3>How It Works</h3>
                    <ul>
                      {(selectedProject as any).howItWorks.map(
                        (step: string, idx: number) => (
                          <li key={idx}>{step}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {selectedProject.links && (
                  <div className={s["modal-links"]}>
                    {selectedProject.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s["modal-link-btn"]}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

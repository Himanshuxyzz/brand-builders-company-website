import clsx from "clsx";
import * as Scrollytelling from "~/lib/scrollytelling-client";

import s from "./intro.module.scss";

export const LabIntro = () => {
  return (
    <Scrollytelling.Root
      start="top bottom"
      end="bottom top"
      scrub={1.1}
    >
      <div className={s.container}>
        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: -20, unit: "px" },
          }}
        >
          <div className={s.pretitle}>
            <svg
              width="5"
              height="9"
              viewBox="0 0 5 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>chevron right</title>
              <path
                d="M5 4.5L-5.28505e-07 8.5L-1.78814e-07 0.5L5 4.5Z"
                fill="#EFEFEF"
              />
            </svg>
            <span>the methodology</span>
          </div>
        </Scrollytelling.Parallax>

        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: 40, unit: "px" },
          }}
        >
          <svg
            width="732"
            height="301"
            viewBox="0 0 732 301"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.backgroundSvg}
          >
            <path
              d="M628.193 67.9406C563.929 76.1379 499.499 80.8854 435.955 96.0051C305.698 126.998 179.75 177.007 51.0966 215.747C34.6395 220.702 18.1584 225.379 1.76567 230.636C-1.91449 231.817 8.67902 226.737 12.1913 224.946C45.404 208.006 78.9877 192.231 112.379 175.833C199.078 133.255 284.291 86.7261 369.968 41.2015C398.131 26.2371 431.344 45.0069 460 31.6905C473.381 25.4724 427.33 8.36477 413.578 13.215C358.347 32.6947 302.314 50.0199 247.976 73.0858C237.151 77.6805 246.928 71.8535 250.963 68.5643C267.595 55.0097 284.224 41.5293 302.074 30.4434C319.353 19.7126 337.563 11.1069 356.237 4.79568C359.563 3.67159 362.932 2.68719 366.344 2.0672C367.541 1.84983 370.219 0.850123 369.968 2.30107C369.551 4.71396 367.028 5.67547 365.454 7.21234C362.024 10.5639 358.396 13.605 354.965 16.9569C301.888 68.8149 252.906 130.958 223.882 207.171C216.075 227.674 201.661 266.424 209.452 290.741C215.687 310.204 244.734 293.52 252.998 289.805C346.865 247.615 434.589 183.803 521.012 122.978C525.943 119.508 530.874 116.038 535.824 112.61C539.753 109.889 550.214 100.266 547.839 104.97C544.42 111.743 537.95 115.301 532.964 120.406C518.223 135.498 511.105 143.302 494.821 157.981C465.725 184.208 434.916 206.569 401.245 222.919C375.388 235.474 345.128 247.895 316.823 247.475C296.913 247.18 306.308 232.553 317.331 222.763C366.433 179.154 426.957 148.469 482.234 120.094C546.383 87.1639 611.846 57.9003 679.939 39.8762C694.7 35.969 711.518 32.9041 726.855 31.6908C757.409 29.2734 665.67 34.8845 635.058 35.6665"
              stroke="#FF4D00"
              strokeWidth="1.15257"
              strokeLinecap="round"
              strokeDasharray="7 7"
            />
          </svg>
        </Scrollytelling.Parallax>

        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: -40, unit: "px" },
          }}
        >
          <h2 className={s.title}>OUR SERVICES</h2>
        </Scrollytelling.Parallax>
        <div className={s.panelsContainer}>
          <Scrollytelling.Stagger
            overlap={0.12}
            tween={{
              start: 5,
              end: 85,
              fromTo: [
                { opacity: 0, y: 60, scale: 0.92, filter: "blur(4px)" },
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power3.out" }
              ]
            }}
          >
            {[
              {
                title: "Brand Strategy & Positioning",
                desc: "We define how your brand competes in the market — messaging, positioning, and growth direction."
              },
              {
                title: "Product Photography & Video Production",
                desc: "Professional product shoots, studio photography, reels, and brand visuals designed for e-commerce and social media."
              },
              {
                title: "E-commerce Marketplace Setup",
                desc: "Complete product listing setup and optimization for platforms like Amazon, Flipkart, Meesho, and Myntra."
              },
              {
                title: "Marketplace Growth & Account Management",
                desc: "Listing optimization, A+ content, storefront creation, reviews strategy, and ongoing marketplace management."
              },
              {
                title: "Website, App & IoT Development",
                desc: "High-performance websites, scalable mobile applications, and IoT-enabled digital systems for modern connected businesses."
              },
              {
                title: "Social Media Marketing & Content Strategy",
                desc: "Social media management, reels, brand storytelling, and growth strategies for digital visibility."
              },
              {
                title: "3D Rendering & Product Visualization",
                desc: "Photorealistic 3D product renders and marketing visuals for advertising, e-commerce, and brand campaigns."
              },
              {
                title: "AI Content Production & Automation",
                desc: "AI-generated marketing content, product videos, creative assets, and automation tools to scale brand communication."
              },
              {
                title: "Digital Brand Infrastructure",
                desc: "Complete digital foundation including website, marketplace presence, visual content, and marketing systems to launch and scale a brand."
              }
            ].map((panel, idx) => (
              <div key={idx} className={s.panel}>
                <h3>{panel.title}</h3>
                <p>{panel.desc}</p>
              </div>
            ))}
          </Scrollytelling.Stagger>
        </div>
      </div>
    </Scrollytelling.Root>
  );
};

import { FallingCaps } from "./sections/falling-caps";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { HorizontalMarquee } from "./sections/horizontal-marquee";
import { LastParallax } from "./sections/last-parallax";
import { LabIntro } from "./sections/lab-cylinder/intro";
import { LabCylinder } from "./sections/lab-cylinder";
import { BrandSections } from "./sections/brand-sections";
import { BentoGrid } from "./sections/bento-grid";
import { PreviousWorks } from "./sections/previous-works";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FallingCaps />
      <HorizontalMarquee />
      <LabIntro />
      <LabCylinder />
      <BrandSections />
      <PreviousWorks />
      <BentoGrid />
      <LastParallax />
      <Footer />
    </main>
  );
}

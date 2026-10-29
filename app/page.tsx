import { Hero } from "@/components/sections/hero";
import { ToolStrip } from "@/components/sections/tool-strip";
import { ProblemOutcome } from "@/components/sections/problem-outcome";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Process } from "@/components/sections/process";
import { LeadBand } from "@/components/sections/lead-band";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolStrip />
      <ProblemOutcome />
      <ServicesGrid />
      <FeaturedWork />
      <Process />
      <LeadBand />
      <FaqSection />
      <FinalCta />
    </>
  );
}

import { ContactSection } from "./ContactSection";
import { EngineeringSection } from "./EngineeringSection";
import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { AudienceSection } from "./sections/AudienceSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { FaqSection } from "./sections/FaqSection";
import { MaterialsSection } from "./sections/MaterialsSection";
import { ProcessSection } from "./sections/ProcessSection";
import { SeoTextSection } from "./sections/SeoTextSection";
import { TrustSection } from "./sections/TrustSection";

export function V1Page() {
  return (
    <main id="content" tabIndex={-1} className="theme-v1">
      <HeroSection />
      <AudienceSection />
      <CapabilitiesSection />
      <GallerySection />
      <EngineeringSection />
      <MaterialsSection />
      <ProcessSection />
      <TrustSection />
      <SeoTextSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}

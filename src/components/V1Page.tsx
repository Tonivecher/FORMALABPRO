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

interface V1PageProps {
  isDesktopView: boolean;
  setIsDesktopView: (value: boolean) => void;
}

export function V1Page({ isDesktopView, setIsDesktopView }: V1PageProps) {
  return (
    <main id="content" tabIndex={-1} className="theme-v1">
      <HeroSection isDesktopView={isDesktopView} setIsDesktopView={setIsDesktopView} />
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

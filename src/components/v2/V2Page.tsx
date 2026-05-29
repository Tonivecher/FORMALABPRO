import { AudienceV2 } from "./AudienceV2";
import { CapabilitiesV2 } from "./CapabilitiesV2";
import { ContactV2 } from "./ContactV2";
import { EngineeringV2 } from "./EngineeringV2";
import { FaqV2 } from "./FaqV2";
import { GalleryV2 } from "./GalleryV2";
import { HeroV2 } from "./HeroV2";
import { MaterialsV2 } from "./MaterialsV2";
import { ProcessV2 } from "./ProcessV2";
import { SeoTextV2 } from "./SeoTextV2";
import { TrustV2 } from "./TrustV2";

export default function V2Page() {
  return (
    <main id="content" tabIndex={-1} className="theme-v2 bg-[#F0F1F4] text-[#091423]">
      <HeroV2 />
      <AudienceV2 />
      <CapabilitiesV2 />
      <GalleryV2 />
      <EngineeringV2 />
      <MaterialsV2 />
      <ProcessV2 />
      <TrustV2 />
      <SeoTextV2 />
      <FaqV2 />
      <ContactV2 />
    </main>
  );
}

import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Applications",
    bullets: [
      "Residential, commercial, and light industrial wiring",
      "Distribution boards, feeders, and risers up to 1 kV",
      "Fire-resistant options for emergency and life safety circuits",
    ],
  },
  {
    title: "Technical Range",
    bullets: [
      "Copper and aluminum conductors, Class 1/2/5 stranding",
      "PVC, XLPE, or LSZH insulation and sheathing",
      "Armored (SWA/AWA) and non-armored constructions",
      "Compliance: IEC 60227, ES standards, CE/CB ready",
    ],
  },
  {
    title: "Why Addis Cable",
    bullets: [
      "Factory type-tested batches with routine resistance verification",
      "Local stock for fast deliveries across Ethiopia",
      "Custom color coding, drum lengths, and labeling on request",
    ],
  },
];

export default function LowVoltagePage() {
  return (
    <InfoPage
      title="Low Voltage Cables"
      intro="PVC, XLPE, and LSZH low voltage power and control cables engineered for reliable distribution up to 1 kV."
      sections={sections}
      primaryCta={{ label: "Request LV datasheets", href: "/resources/technical-specs" }}
    />
  );
}

import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Applications",
    bullets: [
      "Urban distribution networks and primary feeders",
      "Industrial parks, mining sites, and renewable plants",
      "Underground and ducted installations up to 33 kV",
    ],
  },
  {
    title: "Technical Range",
    bullets: [
      "XLPE insulation with copper or aluminum conductors",
      "Single-core and three-core, armored and non-armored",
      "Screening with copper wire/tape for MV reliability",
      "Compliance: IEC 60502-2 and utility specifications",
    ],
  },
  {
    title: "Quality & Testing",
    bullets: [
      "Routine partial discharge, insulation resistance, and sheath tests",
      "Type-tested constructions for Ethiopian grid conditions",
      "Traceable QA records and factory acceptance witnessing",
    ],
  },
];

export default function MediumVoltagePage() {
  return (
    <InfoPage
      title="Medium Voltage Cables"
      intro="XLPE insulated MV cables for dependable power transmission in utilities, renewables, and industrial networks."
      sections={sections}
      primaryCta={{ label: "Discuss MV projects", href: "/resources/contact-support" }}
    />
  );
}

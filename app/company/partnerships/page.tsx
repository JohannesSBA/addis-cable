import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Who We Work With",
    bullets: [
      "Utilities and EPC firms delivering grid expansion projects",
      "Industrial and real estate developers needing reliable supply",
      "OEMs and repair centers sourcing winding wires and specialized conductors",
    ],
  },
  {
    title: "Partnership Models",
    bullets: [
      "Framework supply agreements with forecast-based stocking",
      "Joint development for custom cable constructions",
      "Training and technical workshops for installation teams",
    ],
  },
  {
    title: "Why Partner",
    bullets: [
      "Local manufacturing responsiveness and shorter lead times",
      "Engineering support from design through commissioning",
      "Documented QA and certification packages for compliance",
    ],
  },
];

export default function PartnershipsPage() {
  return (
    <InfoPage
      title="Partnerships"
      intro="Building long-term relationships with utilities, EPCs, OEMs, and developers to deliver reliable power and connectivity."
      sections={sections}
      primaryCta={{ label: "Start a partnership discussion", href: "/resources/contact-support" }}
    />
  );
}
